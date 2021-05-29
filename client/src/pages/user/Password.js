import { Form } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { UserLayouts } from '../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { auth } from '../../firebase'
import { hideLoading, showLoading } from '../../redux/actions/ui'
import FormUpdatePassword from './FormUpdatePassword'
import './Styles.scss'
function Password(props) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const onFinish = async ({ password }) => {
    dispatch(showLoading())
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        dispatch(hideLoading())
        toast.success('Cập nhật mật khẩu thành công !')
      })
      .catch((error) => {
        dispatch(hideLoading())
        toast.error(error.message)
      })
    form.resetFields()
  }
  return (
    <React.Fragment>
      <UserLayouts>
        <SectionTitle>Quản lý mật khẩu</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-2"> Cập nhật mật khẩu</h3>
          <Form form={form} onFinish={onFinish}>
            <FormUpdatePassword />
          </Form>
        </div>
      </UserLayouts>
    </React.Fragment>
  )
}
Password.propTypes = {}

export default Password
