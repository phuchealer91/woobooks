import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Form, Input, Rate, Tabs, Tag, Tooltip } from 'antd'
import _ from 'lodash'
import React, { useState } from 'react'
import 'react-image-lightbox/style.css'
import { useDispatch } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as THREE from 'three'
import oc from 'three-orbit-controls'
import { addWishLists } from '../../apis/cart'
import { formatPrice, formatPriceSale } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
import { showDrawer } from '../../redux/actions/ui'
import { ImagePreviewList } from '../Community/ImagePreview/ImagePreview'
import ModalRating from '../ModalConfirm/ModalRating'
import ShowRatings from '../Ratings/ShowRatings'
import Image3D from './Image3D'
const OrbitControls = oc(THREE)

const { TabPane } = Tabs
function SingleProductRoate({ productEditing }) {
  const dispatch = useDispatch()

  const [now, setNow] = useState(Date.now())
  const { slug } = useRouteMatch().params
  const {
    title,
    supplier,
    quantity,
    images,
    description,
    layout,
    publisher,
    author,
    price,
    sale,
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

            <Image3D images={images} />
            {/* <Canvas>
                <Suspense fallback={null}>
                  <div ref={section}></div>
                  <OrbitControls autoRotate />
                </Suspense>
              </Canvas> */}
          </div>
        </div>
        <div className=" w-full px-4 md:w-7/12 pt-3 md:pt-0">
          <h2 className="text-gray-700 text-lg font-semibold pb-2">{title}</h2>
          <div className="hidden pb-1 md:block">
            <div className="inline-block w-3/5 pr-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
              <span>Nhà cung cấp: </span>
              {supplier.name}
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
            {sale > 0 ? (
              <div className="flex items-center">
                <div className="text-blue-600 font-semibold text-3xl ">
                  {formatPriceSale(price, sale)}đ
                </div>
                <div className="text-gray-600 text-lg opacity-70 line-through mx-3">
                  {formatPrice(price)} đ
                </div>
                <Tag color="orange" className="opacity-60 ">
                  <span className="text-yellow-600 font-semibold">
                    {' '}
                    -{sale}%
                  </span>
                </Tag>
              </div>
            ) : (
              <div className="text-blue-600 font-semibold text-3xl ">
                {formatPrice(price)} đ
              </div>
            )}
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
