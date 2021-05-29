import { PlusCircleOutlined } from '@ant-design/icons'
import { InputNumber, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalImage from 'react-modal-image'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { userReceipts } from '../../../apis/cart'
import { getSuppliers, getSuppliersss } from '../../../apis/supplier'
import imageDefault from '../../../assets/images/mac-default.png'
import ViewProductCard from '../../../components/CardItem/ViewProductCard'
import { EmptyCart } from '../../../components/Empty'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import { formatPrice } from '../../../helpers/formatPrice'
import * as types from '../../../redux/constants/receipt'
const { Option } = Select
const CreateReceipt = () => {
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [receipts, setReceipts] = useState([])
  const [inQuatity, setQuatity] = useState('')
  const [inPrice, setInPrice] = useState('')
  const [idSupplier, setIdSupplier] = useState('')
  const [pricePayment, setPricePayment] = useState('')
  const { receipt } = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const [isModalVisible, setIsModalVisible] = useState(false)
  useEffect(() => {
    loadSuppliers()
  }, [])
  useEffect(() => {
    setReceipts(receipt.receiptLists)
  }, [receipt.receiptLists])
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const loadSuppliers = () => {
    getSuppliers()
      .then((res) => {
        if (res.data) {
          setSuppliers(res.data.suppliers)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  function onHandleChange(value) {
    setIdSupplier(value)
    getSuppliersss({ _id: value })
      .then((res) => {
        if (res.data) {
          setProducts(res.data.products)
          setReceipts([])
          dispatch({
            type: types.ADD_TO_RECEIPT,
            payload: { unique: [] },
          })
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  function onHandleTotal() {
    let msgTotal = receipts.reduce(function (prev, cur) {
      return prev + cur.inQuatity * cur.inPrice
    }, 0)
    return msgTotal
  }

  function onHandleCreateReceipt() {
    let newReceipt = {
      receipts,
      receiptTotal: onHandleTotal(),
      supplier: idSupplier,
      receiptPayment: pricePayment,
      statusReceipt: false,
    }
    userReceipts({ newReceipt })
      .then((res) => {
        if (res.data.newReceipts) {
          history.push('/admin/list-warehouse')
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  return (
    <React.Fragment>
      <Layouts>
        <SectionTitle>Thêm mới đơn nhập hàng</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="py-4">
            <form>
              <div>
                <h3 className="text-sm text-gray-600 pb-2">
                  {' '}
                  Nhà cung cấp:<span className="text-red-600">*</span>
                </h3>

                <Select
                  defaultValue="Chọn nhà cung cấp"
                  style={{ width: '300px' }}
                  onChange={onHandleChange}
                  className="rounded"
                >
                  {suppliers &&
                    suppliers.map((supplier) => (
                      <Option key={supplier._id} value={supplier._id}>
                        {supplier.name}
                      </Option>
                    ))}
                </Select>
                <div className="my-3 flex items-center">
                  <div className="text-sm font-semibold text-gray-600 pr-2">
                    Chọn sản phẩm cần nhập hàng:{' '}
                  </div>
                  <div
                    onClick={showModal}
                    className="px-4 py-2 bg-blue-500 inline-block hover:bg-blue-600 rounded cursor-pointer"
                  >
                    <PlusCircleOutlined size={48} style={{ color: 'white' }} />
                    <span className="pl-1 text-white">Chọn sản phẩm</span>
                  </div>
                </div>
                <div>
                  <Modal
                    title="Các sản phẩm từ nhà cung cấp"
                    visible={isModalVisible}
                    footer={null}
                    onCancel={handleCancel}
                    width="50%"
                    height="auto"
                  >
                    <div className="w-full bg-white rounded">
                      {products &&
                        products.map((item) => (
                          <ViewProductCard key={item._id} product={item} />
                        ))}
                    </div>
                  </Modal>
                </div>
              </div>
            </form>
          </div>
          <div className="py-4">
            <h3 className="text-sm text-gray-600 pb-1">
              {' '}
              Danh sách loại sản phẩm{' '}
              <span className="font-semibold">({receipts.length})</span>
            </h3>
            <div className="w-full pt-8 bg-white rounded">
              {!receipts.length ? (
                <div className="shopping__wrap flex items-center justify-center py-12">
                  <EmptyCart />
                </div>
              ) : (
                receipts &&
                receipts.map((item) => (
                  <>
                    <div key={item._id} className="hidden md:block">
                      <div className="py-3 flex-row justify-between  items-center mb-0 hidden md:flex">
                        <div className="w-4/12 lg:w-4/12 xl:w-4/12 flex flex-row items-start border-b-0 border-grey-dark pt-0 pb-0 pl-3 text-left">
                          <div className="w-20 mx-0 relative pr-0 mr-3 ">
                            <div className="h-20 rounded flex items-center justify-center">
                              <div className="aspect-w-1 aspect-h-1 w-full">
                                <ModalImage
                                  small={
                                    item ? item.images[0]?.url : imageDefault
                                  }
                                  large={
                                    item ? item.images[0]?.url : imageDefault
                                  }
                                  alt={`${
                                    item ? item.images[0]?.url : imageDefault
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-start items-start">
                            <span className="text-gray-600 text-base ">
                              {' '}
                              {item.title}
                            </span>
                          </div>
                        </div>

                        <div className="w-4/6 lg:w-4/6 xl:w-4/6 text-right pr-10 xl:pr-10 pb-4 flex items-center justify-center">
                          <div className="custom-number-input h-10 w-full mr-6">
                            <div className="pb-2">Số lượng nhập *</div>
                            <InputNumber
                              size="middle"
                              min={1}
                              defaultValue={1}
                              className="opacity-100"
                              onChange={(count) => {
                                let warehouse = []
                                if (
                                  receipt &&
                                  receipt.receiptLists.length > 0
                                ) {
                                  warehouse = [
                                    ...warehouse,
                                    ...receipt.receiptLists,
                                  ]
                                }
                                warehouse.map((pro, i) => {
                                  if (pro._id === item._id) {
                                    return (warehouse[i].inQuatity = count)
                                  }
                                })
                                dispatch({
                                  type: types.ADD_TO_RECEIPT,
                                  payload: { unique: warehouse },
                                })
                                setQuatity(count)
                              }}
                            />
                          </div>
                          <div className="custom-number-input h-10 w-full">
                            <div className="pb-2">Giá nhập *</div>
                            <InputNumber
                              size="middle"
                              min={0}
                              defaultValue={0}
                              className="opacity-100 w-1/2"
                              onChange={(price) => {
                                let warehouse = []
                                if (
                                  receipt &&
                                  receipt.receiptLists.length > 0
                                ) {
                                  warehouse = [
                                    ...warehouse,
                                    ...receipt.receiptLists,
                                  ]
                                }
                                warehouse.map((pro, i) => {
                                  if (pro._id === item._id) {
                                    return (warehouse[i].inPrice = price)
                                  }
                                })
                                dispatch({
                                  type: types.ADD_TO_RECEIPT,
                                  payload: { unique: warehouse },
                                })
                                setInPrice(price)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              )}
              {receipts.length > 0 && (
                <>
                  <div className="py-4 px-3 ">
                    <div className=" text-blue-700 text-base font-semibold mr-6">
                      <span className="text-sm text-gray-500">
                        Thành tiền:{' '}
                      </span>{' '}
                      <span className="text-base text-white font-semibold bg-gray-500 rounded px-4 py-1">
                        {formatPrice(onHandleTotal())}đ
                      </span>
                    </div>
                    <div className=" text-blue-700 text-base font-semibold flex items-center pt-3">
                      <div className="text-sm text-gray-500">
                        Số tiền đã thanh toán{' '}
                        <span className="text-red-600">*</span>:{' '}
                      </div>{' '}
                      <div className="custom-number-input h-10 w-3/6">
                        <InputNumber
                          size="middle"
                          min={1}
                          max={onHandleTotal()}
                          defaultValue={1}
                          className="opacity-100 w-3/6 text-gray-600"
                          onChange={(price) => {
                            setPricePayment(price)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="py-4 px-4">
                    <button
                      type="button"
                      onClick={onHandleCreateReceipt}
                      className="btn btn-primary btn-addToCart uppercase mx-auto w-1/4 mt-2"
                    >
                      Tạo phiếu nhập hàng
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Layouts>
    </React.Fragment>
  )
}

CreateReceipt.propTypes = {}

export default CreateReceipt
