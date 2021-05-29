import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Form, Input, Rate, Tabs, Tooltip } from 'antd'
import _ from 'lodash'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import 'react-image-lightbox/style.css'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { animated, config, useSpring, useTransition } from 'react-spring/three'
import { Canvas, useThree } from 'react-three-fiber'
import { toast } from 'react-toastify'
import { useDrag } from 'react-use-gesture'
import * as THREE from 'three'
import { Math as ThreeMath, UniformsUtils } from 'three'
import { addWishLists } from '../../apis/cart'
import { formatPrice } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
import { showDrawer } from '../../redux/actions/ui'
import { ImagePreviewList } from '../Community/ImagePreview/ImagePreview'
import ModalRating from '../ModalConfirm/ModalRating'
import ShowRatings from '../Ratings/ShowRatings'
// import HoverImageShader from '../shaders/HoverImageShader'
// import './SingleProduct.scss'
const image =
  'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
const image2 =
  'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

const { TabPane } = Tabs
const { degToRad } = ThreeMath
var HoverImageShader = {
  vertexShader: `
    varying vec2 vUv; 

    void main() {
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float; 

    uniform sampler2D texture;
    uniform float imageAspectRatio;
    uniform float aspectRatio;
    uniform float opacity;
    uniform float hover;
    varying vec2 vUv;

    float exponentialInOut(float t) {
      return t == 0.0 || t == 1.0 
        ? t 
        : t < 0.5
          ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
          : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
    } 

    void main() {
      vec2 uv = vUv;

      // fix aspectRatio
      float u = imageAspectRatio/aspectRatio;
      if(imageAspectRatio > aspectRatio) {
        u = 1. / u;
      }

      uv.y *= u;
      uv.y -= (u)/2.-.5;

      // hover effect
      float zoomLevel = .2;
      float hoverLevel = exponentialInOut(min(1., (distance(vec2(.5), uv) * hover) + hover));
      uv *= 1. - zoomLevel * hoverLevel;
      uv += zoomLevel / 2. * hoverLevel;
      uv = clamp(uv, 0., 1.);
      vec4 color = texture2D(texture, uv);
      if(hoverLevel > 0.) {
        hoverLevel = 1.-abs(hoverLevel-.5)*2.;
        //Pixel displace
        uv.y += color.r * hoverLevel * .05;
        color = texture2D(texture, uv);
        // RGBshift
        color.r = texture2D(texture, uv+(hoverLevel)*0.01).r;
        color.g = texture2D(texture, uv-(hoverLevel)*0.01).g;
      }

      gl_FragColor = mix(vec4(1.,1.,1.,opacity), color, opacity);
    }
  `,
  uniforms: {
    texture: {
      type: 't',
      value: '',
    },
    imageAspectRatio: {
      type: 'f',
      value: 1.0,
    },
    aspectRatio: {
      type: 'f',
      value: 1.0,
    },
    opacity: {
      type: 'f',
      value: 1.0,
    },
    hover: {
      type: 'f',
      value: 0.0,
    },
  },
}
// Texture
function Texture({ texture, hoverValue, opacity, onHover, ...props }) {
  return (
    <animated.mesh
      onPointerMove={(e) => onHover(true)}
      onPointerOver={(e) => onHover(true)}
      onPointerOut={(e) => onHover(false)}
      {...props}
    >
      <planeBufferGeometry attach="geometry" args={[5, 7]} />
      <animated.shaderMaterial
        attach="material"
        transparent
        args={[
          {
            ...HoverImageShader,
            uniforms: UniformsUtils.clone(HoverImageShader.uniforms),
          },
        ]}
        uniforms-texture-value={texture}
        uniforms-hover-value={hoverValue}
        uniforms-opacity-value={opacity}
      />
    </animated.mesh>
  )
}
// Image component
function Image({ url, backUrl, rotation, ...props }) {
  const [hovered, setHover] = useState(false)
  const loader = new THREE.TextureLoader()
  const { invalidate } = useThree()
  const textures = useMemo(() => {
    return [
      { id: 'front', texture: loader.load(url, invalidate), deg: 0 },
      { id: 'back', texture: loader.load(backUrl, invalidate), deg: 180 },
    ]
  }, [url, backUrl, invalidate])

  const { hoverValue } = useSpring({
    hoverValue: hovered ? 1 : 0,
    config: config.molasses,
  })

  const transitions = useTransition(textures, (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.default,
  })

  return transitions.map(({ item, props, key }) => (
    <Texture
      key={key}
      {...props}
      texture={item?.texture}
      hoverValue={hoverValue}
      onHover={setHover}
      rotation={rotation.interpolate((x, y, z) => [
        degToRad(x),
        degToRad(y + item?.deg),
        degToRad(z),
      ])}
      opacity={props.opacity}
    />
  ))
}
function SingleProduct({ productEditing }) {
  const dispatch = useDispatch()
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const dragDelta = useRef(0)
  const history = useHistory()

  const {
    title,
    quantity,
    images,
    description,
    layout,
    publisher,
    author,
    price,
  } = productEditing ? productEditing : ''
  function handleAddToCart() {
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
    }
    // push new product
    cart.push({
      ...productEditing,
      count: 1,
    })
    // remove duplicates
    let unique = _.uniqBy(cart, (c) => c._id)
    // let unique = _.uniqWith(cart, _.isEqual)
    // save localstorage
    localStorage.setItem('cart', JSON.stringify(unique))
    dispatch(addToCart(unique))
    dispatch(showDrawer())
  }
  function handleAddToWishlist(e) {
    e.preventDefault()
    addWishLists({ productId: productEditing._id })
      .then((res) => {
        if (res) {
          toast.success('Đã thêm vào yêu thích')
          // history.push('/user/wishlist')
        }
      })
      .catch((error) => {
        toast.error('Lỗi thêm yêu thích', error)
      })
  }

  const [props, set] = useSpring(() => ({
    pos: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  }))

  const [{ rotation }, setRotation] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  }))

  const onHandleClick = useCallback(
    (e) => {
      // filter clicks from dragging
      if (dragDelta.current < 100) {
        const [x, y, z] = rotation.getValue()

        setRotation({
          rotation: [x, y + 180, z],
          config: config.default,
        })
      }
    },
    [rotation, setRotation]
  )
  const bind = useDrag(
    ({
      first,
      last,
      time,
      down,
      delta,
      velocity,
      direction,
      memo = rotation.getValue(),
    }) => {
      if (first) {
        dragDelta.current = time
      }

      if (last) {
        dragDelta.current = time - dragDelta.current
      }

      const x = memo[0] + (delta[1] / window.innerWidth) * 180
      const y = memo[1] + (delta[0] / window.innerHeight) * 180
      const vxyz = [
        direction[1] * (velocity / 1),
        direction[0] * (velocity / 1),
        0,
      ]

      setRotation({
        rotation: [x, y, 0],
        immediate: down,
        config: { velocity: vxyz, decay: true },
      })

      return memo
    }
  )
  return (
    <>
      <div className="px-4 py-4 bg-white flex">
        <div className="px-4 w-2/5">
          <div className="flex justify-center">
            <div className="w-28 border-r-0 border border-gray-200">
              <div className="p-2">
                {' '}
                <ImagePreviewList data={images} />
              </div>
            </div>
            <div
              className="border border-gray-200 h-96 p-2"
              style={{ width: 'calc(100% - 112px)' }}
            >
              <div
                className="main"
                {...bind()}
                onMouseMove={({ clientX, clientY }) => {
                  const x = (clientX / window.innerWidth) * 2 - 1
                  const y = -(clientY / window.innerHeight) * 2 + 1

                  set({
                    pos: [x, 0, 0],
                    scale: [1 - y * 0.1, 1 - y * 0.1, 1],
                  })
                }}
              >
                <Canvas
                  pixelRatio={window.devicePixelRatio || 1}
                  style={{ background: 'transparent', height: '384px' }}
                  camera={{ fov: 75, position: [0, 0, 7] }}
                >
                  <Image
                    url={images && images[0]?.url}
                    backUrl={
                      images && images[1]?.url
                        ? images[1]?.url
                        : images && images[0]?.url
                    }
                    {...props}
                    onClick={onHandleClick}
                    rotation={rotation}
                  />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 w-3/5">
          <h2 className="text-gray-700 text-lg font-semibold pb-2">{title}</h2>
          <div className="pb-1">
            <div className="inline-block w-3/5 pr-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
              <span>Nhà cung cấp: </span>
              <Link to="/" className="no-underline">
                NHã nam
              </Link>
            </div>
            <div className="inline-block w-2/5 pl-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
              <span>Tác giả: </span>

              {author &&
                author.map((s) => (
                  <Link
                    key={s._id}
                    to={`/author/${s.slug}`}
                    className="px-1 font-semibold no-underline text-gray-600 text-sm"
                  >
                    {s.name},
                  </Link>
                ))}
            </div>
          </div>
          <div className="pb-2">
            <div className="inline-block w-3/5 pr-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
              <span>Nhà xuất bản:</span>
              <span className="font-semibold pl-1 text-sm">{publisher}</span>
            </div>
            <div className="inline-block w-2/5 pl-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
              <span>Hình thức bìa: </span>
              <span className="font-semibold pl-1 text-sm">{layout}</span>
            </div>
          </div>
          <div className="pb-3">
            {' '}
            {productEditing &&
            productEditing.reviews &&
            productEditing.reviews.length > 0 ? (
              ShowRatings(productEditing)
            ) : (
              <>
                {' '}
                <Rate disabled style={{ fontSize: '24px' }} />{' '}
                <span className="text-blue-600 text-xs">(0 đánh giá)</span>
              </>
            )}
          </div>
          <div className="pb-2 flex items-center justify-between">
            <div className="text-blue-600 font-semibold text-3xl">
              {formatPrice(price)} đ
            </div>
            <div className="text-blue-600 font-semibold ">
              <Tooltip placement="left" title="Yêu thích">
                <button
                  onClick={handleAddToWishlist}
                  className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center"
                >
                  <HeartOutlined
                    className="text-red-600"
                    style={{ fontSize: '24px' }}
                  />{' '}
                  <br />
                </button>
                ,
              </Tooltip>
            </div>
          </div>
          <div className="pb-2 flex items-center">
            <button
              onClick={handleAddToCart}
              disabled={quantity < 1}
              className=" btn btn-primary btn-addToCart uppercase mr-4"
            >
              <span className="mr-2">
                {' '}
                <ShoppingOutlined
                  className="leading-none"
                  style={{ fontSize: '20px' }}
                />
              </span>
              <span>{quantity < 1 ? 'Tạm hết hàng' : 'Thêm vào giỏ hàng'}</span>
            </button>
            <ModalRating productId={productEditing?._id}>
              {/* <StarRating
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor="red"
                /> */}
              <Form.Item
                name="rating"
                rules={[{ required: true, message: 'Vui lòng chọn số điểm!' }]}
              >
                <Rate size className="pb-2" />
              </Form.Item>
              <Form.Item
                name="comment"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </ModalRating>
          </div>
        </div>
      </div>
    </>
  )
}
SingleProduct.propTypes = {}

export default SingleProduct
