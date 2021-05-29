import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { addAddresss } from '../../apis/cart'
import {
  getDistrictWards,
  getProvinceDistrict,
  getProvinces,
} from '../../apis/province'

function Addressx(props) {
  const history = useHistory()
  const [province, setProvince] = useState('')
  // const [district, setDistrict] = useState('')
  const [provinceDistrict, setProvinceDistrict] = useState('')
  const [districtWard, setDistrictWard] = useState('')
  const [valuesx, setValuesx] = useState([])
  const [valuess, setValuess] = useState([])
  const [valuesss, setValuesss] = useState([])
  useEffect(() => {
    getProvincess()
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
  return (
    <div>
      <div className="xl:max-w-7xl mx-auto bg-white rounded">
        <div className="px-3 pt-3 pb-8">
          <div className="uppercase border-b border-gray-100 pb-1 text-gray-700 font-semibold  border-solid px-4">
            ĐỊA CHỈ GIAO HÀNG
          </div>
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
              onSubmit={(values, { setSubmitting }) => {
                const valuesss = { ...values, mainAddress: districtWard }
                addAddresss(valuesss).then((res) => {
                  history.push('/check-out')
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
                  <div className="my-5 px-4">
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
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-1/2"
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
    </div>
  )
}

export default Addressx
