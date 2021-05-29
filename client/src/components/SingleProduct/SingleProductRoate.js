import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Form, Input, Rate, Tabs, Tooltip } from 'antd'
import _ from 'lodash'
import React, { useEffect, useRef } from 'react'
import 'react-image-lightbox/style.css'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as THREE from 'three'
import oc from 'three-orbit-controls'
import { addWishLists } from '../../apis/cart'
import { formatPrice } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
import { showDrawer } from '../../redux/actions/ui'
import { ImagePreviewList } from '../Community/ImagePreview/ImagePreview'
import ModalRating from '../ModalConfirm/ModalRating'
import ShowRatings from '../Ratings/ShowRatings'

const OrbitControls = oc(THREE)

const { TabPane } = Tabs
function SingleProductRoate({ productEditing }) {
  const dispatch = useDispatch()
  const section = useRef()
  const {
    title,

    quantity,
    images,
    description,
    layout,
    publisher,
    author,
    price,
  } = productEditing

  const myMesh = React.useRef()
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

  useEffect(() => {
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(75, 420 / 400, 0.1, 1000)

    var renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(420, 400)
    section.current.appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    renderer.setClearColor(0xf2f2f2)
    // camera.position.set(0, 20, 100)
    controls.autoRotate = true
    controls.update()
    var geometry = new THREE.BoxGeometry(3.5, 5, 0.5)

    const light = new THREE.DirectionalLight(0xffffff)
    const ambient = new THREE.AmbientLight(0xffffff)
    light.position.set(0, 0, 6)
    scene.add(light)
    scene.add(ambient)

    camera.position.z = 5
    const loader = new THREE.TextureLoader()
    // const urls = [
    //   'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673518/wkt6vka3tqijadqkuntd.jpg',
    //   'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673519/c1uckbdftljwyxhdy9lw.jpg',
    //   'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673518/cenbivni42pgp0hugrzo.jpg',
    //   'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673518/t6xeprhxbz9mhljeilpr.jpg',
    //   'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673519/uvufcwicytuglkkys2sr.jpg',
    //   'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673519/rj6hwym8tzvf2qlvyg89.jpg',
    // ]
    const urls = [
      'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673518/wkt6vka3tqijadqkuntd.jpg',
      images[0]?.url ||
        'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673519/c1uckbdftljwyxhdy9lw.jpg',
      'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673518/cenbivni42pgp0hugrzo.jpg',
      'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673518/t6xeprhxbz9mhljeilpr.jpg',
      images[1]?.url ||
        'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673519/uvufcwicytuglkkys2sr.jpg',
      images[2]?.url ||
        'https://res.cloudinary.com/ecommerce-mp/image/upload/v1621673519/rj6hwym8tzvf2qlvyg89.jpg',
    ]
    const materials = urls.map((url) => {
      return new THREE.MeshLambertMaterial({
        map: loader.load(url),
      })
    })
    var cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)

    var animate = function () {
      requestAnimationFrame(animate)
      controls.update()
      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()
  }, [])

  return (
    <>
      <div className="py-4 bg-white block md:flex">
        <div className="w-full px-4 md:w-5/12 md:px-0">
          <div className="flex flex-col-reverse md:flex-row justify-center">
            <div className=" w-full border-r-0 border border-gray-200 md:w-28 ">
              <div className="p-2 flex md:block items-center">
                {' '}
                <ImagePreviewList data={images} />
              </div>
            </div>
            <div
              className="border-none border-gray-200 p-0 pt-0 full-img md:p-2 md:border"
              style={{ width: 'calc(100% - 112px)', height: '400px' }}
            >
              <div ref={section}></div>
              {/* <Canvas>
                <Suspense fallback={null}>
                  <div ref={section}></div>
                  <OrbitControls autoRotate />
                </Suspense>
              </Canvas> */}
            </div>
          </div>
        </div>
        <div className=" w-full px-4 md:w-7/12 pt-3 md:pt-0">
          <h2 className="text-gray-700 text-lg font-semibold pb-2">{title}</h2>
          <div className="hidden pb-1 md:block">
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
          <div className="hidden pb-2 md:block">
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
              className=" btn btn-primary btn-addToCart mr-4"
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
SingleProductRoate.propTypes = {}

export default SingleProductRoate
