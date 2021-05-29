import { DeleteOutlined } from '@ant-design/icons'
import { Modal, Pagination } from 'antd'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { addAddresss, getAddresss, removeAddress } from '../../apis/cart'
import {
  getDistrictWards,
  getProvinceDistrict,
  getProvinces,
} from '../../apis/province'
import { UserLayouts } from '../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { EmptyBox } from '../../helpers/icons'

function UserAddress(props) {
  const [province, setProvince] = useState('')
  // const [district, setDistrict] = useState('')
  const [provinceDistrict, setProvinceDistrict] = useState('')
  const [districtWard, setDistrictWard] = useState('')
  const [valuesx, setValuesx] = useState([])
  const [valuess, setValuess] = useState([])
  const [valuesss, setValuesss] = useState([])
  const [listAddress, setListAddress] = useState([])
  const [addressId, setAddressId] = useState('')
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    getProvincess()
    loadUserAddress()
  }, [])

  function getProvincess() {
    getProvinces({})
      .then((res) => {
        setValuesx(res.data.provinces)
      })
      .catch((err) => console.log('Error anh em', err))
  }
  function getProvinceDistrictss(idProvince) {
    getProvinceDistrict(idProvince)
      .then((res) => {
        setValuess(res.data.districts)
      })
      .catch((err) => console.log('Error anh em', err))
  }
  function getDistrictWardss(idDistrict) {
    getDistrictWards(idDistrict)
      .then((res) => {
        setValuesss(res.data.wards)
      })
      .catch((err) => console.log('Error anh em', err))
  }
  function handleChanges(e) {
    setDistrictWard('')
    setProvinceDistrict('')
    const idProvince = e.target.value
    setProvince(idProvince)
    getProvinceDistrictss(idProvince)
  }
  function handleChangeProvinceDistrict(e) {
    const idDistrict = e.target.value
    setProvinceDistrict(idDistrict)
    if (province) {
      setDistrictWard('')
    }
    getDistrictWardss(idDistrict)
  }
  function handleChangeDistrictWard(e) {
    setDistrictWard(e.target.value)
  }
  function loadUserAddress() {
    getAddresss()
      .then((res) => {
        setListAddress(res.data.listUserAddress.address)
      })
      .catch((error) => {
        toast.error('Lỗi lấy địa chỉ', error)
      })
  }
  function onHandleDelete(addressId) {
    setAddressId(addressId)
    setVisible(true)
  }
  function onHandleDeleted() {
    removeAddress(addressId)
      .then((res) => {
        toast.success('Xóa địa chỉ thành công')
        setVisible(false)
        loadUserAddress()
      })
      .catch((error) => {
        setVisible(false)
        toast.error('Xóa địa chỉ thất bại')
      })
  }
  return (
    <React.Fragment>
      <Modal
        title="Xóa địa chỉ giao hàng"
        visible={visible}
        onOk={onHandleDeleted}
        onCancel={() => setVisible(false)}
        okText="Chấp nhận"
        cancelText="Hủy"
      >
        <p>
          Khi bạn xóa địa chỉ giao hàng hiện tại, bạn sẽ{' '}
          <span className="text-red-600">không thể</span> khôi phục nó.
        </p>
      </Modal>
      <UserLayouts>
        <div className="w-full mx-auto bg-white rounded">
          <div className="px-3 pt-3 pb-8">
            <SectionTitle>
              Danh sách địa chỉ giao hàng ({listAddress.length})
            </SectionTitle>
            {listAddress && listAddress.length > 0 ? (
              <div className=" mt-4">
                {/* <div className="uppercase pb-1 text-gray-600 font-semibold">
                  CÁC ĐƠN HÀNG CỦA BẠN{' '}
                  <span className="text-gray-500 text-xs">({orderTotals})</span>
                </div> */}
                <div>
                  <div className="w-full">
                    <div className="bg-white shadow-md rounded my-4 overflow-x-auto">
                      <table className=" w-full table-auto">
                        <thead>
                          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-4 text-left">STT</th>
                            <th className="py-3 px-4 text-left">
                              Tên người nhận
                            </th>
                            <th className="py-3 px-4 text-left">Địa chỉ</th>
                            <th className="py-3 px-4 text-left">Điện thoại</th>

                            <th className="py-3 px-4 text-left">Thao tác</th>
                          </tr>
                        </thead>
                        {listAddress &&
                          listAddress.map((addr, idx) => {
                            return (
                              <tbody className="text-gray-600 text-sm font-light">
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                  <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                      <span className="font-medium">
                                        {idx + 1}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                      <span>{addr.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div className="">
                                      {addr.fullAddress} - {addr.mainAddress}
                                    </div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <span className="">{addr.phone}</span>
                                  </td>

                                  <td className="py-3 px-6 text-center">
                                    <button
                                      onClick={() => onHandleDelete(addr._id)}
                                      className=" px-8 py-2 bg-red-500 text-blue-50 max-w-max shadow-sm hover:shadow-lg rounded"
                                    >
                                      <DeleteOutlined />
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            )
                          })}
                      </table>
                      {/* <div className="py-6 flex justify-center">
                        <Pagination
                          current={page}
                          total={(orderTotals / 10) * 10}
                          onChange={(value) => setPage(value)}
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-3 mt-3 mx-auto ">
                <div className="flex justify-center">
                  <EmptyBox />
                </div>
              </div>
            )}

            <SectionTitle>Thêm địa chỉ giao hàng</SectionTitle>
            <div>
              <Formik
                initialValues={{
                  name: '',
                  phone: '',
                  fullAddress: '',
                }}
                //  validate={values => {
                //    const errors = {};
                //    if (!values.email) {
                //      errors.email = 'Required';
                //    } else if (
                //      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                //    ) {
                //      errors.email = 'Invalid email address';
                //    }
                //    return errors;
                //  }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  const valuesss = { ...values, mainAddress: districtWard }
                  addAddresss(valuesss).then((res) => {
                    loadUserAddress()
                    resetForm({})
                    setProvince('')
                    setProvinceDistrict('')
                    setDistrictWard('')
                  })
                  setSubmitting(false)
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit} className="mx-0 w-full">
                    <div className="my-5 px-0 md:px-4">
                      <div className="my-2 flex items-center justify-between">
                        <span> Họ và tên người nhận </span>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          placeholder="Nhập họ và tên người nhận"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                        />
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span> Số điện thoại </span>
                        <input
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          placeholder="Nhập số điện thoại"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                        />
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span> Tỉnh/Thành Phố </span>
                        <select
                          type="select"
                          placeholder="Chọn tỉnh/thành phố"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                          value={province}
                          defaultValue="Chọn tỉnh/thành phố"
                          onChange={handleChanges}
                          required
                        >
                          <option value="">Chọn tỉnh/thành phố</option>
                          {valuesx &&
                            valuesx.map((arr) => {
                              return (
                                <option key={arr._id} value={arr.code}>
                                  {arr.name}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span> Quận/Huyện</span>
                        <select
                          type="select"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                          value={provinceDistrict}
                          onChange={handleChangeProvinceDistrict}
                          disabled={province ? false : true}
                          required
                        >
                          <option value="" disabled selected hidden>
                            Chọn quận/huyện
                          </option>
                          {valuess &&
                            valuess.map((arr) => {
                              return (
                                <option key={arr._id} value={arr.code}>
                                  {arr.name}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span> Phường/Xã</span>
                        <select
                          type="select"
                          // name="mainAddress"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                          value={districtWard}
                          onChange={handleChangeDistrictWard}
                          disabled={provinceDistrict ? false : true}
                          required
                        >
                          <option value="" disabled selected hidden>
                            Chọn phường/xã
                          </option>
                          {valuesss &&
                            valuesss.map((arr) => {
                              return (
                                <option key={arr._id} value={arr.full_name}>
                                  {arr.name}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span> Địa chỉ nhận hàng</span>
                        <input
                          type="text"
                          name="fullAddress"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fullAddress}
                          placeholder="Nhập địa chỉ nhận hàng"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded calc"
                        />
                      </div>
                    </div>

                    <div className="px-4 py-3 text-center sm:px-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full md:w-1/2 font-semibold"
                      >
                        Lưu
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </UserLayouts>
    </React.Fragment>
  )
}

export default UserAddress
