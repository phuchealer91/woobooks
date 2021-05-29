import { Form } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import { getCategory, updateCategories } from '../../../redux/actions/category'
import './Categories.scss'
import FormCategory from './FormCategory'

const UpdateCategory = ({ match }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  const { categoryEditing } = useSelector((state) => state.category)

  const { slug } = match.params
  useEffect(() => {
    dispatch(getCategory(slug))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  function onFinish({ name }) {
    dispatch(updateCategories({ name }))
    history.push('/admin/category')
    form.resetFields()
  }
  useEffect(() => {
    form.setFieldsValue({
      name: (categoryEditing && categoryEditing.name) || '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryEditing])
  return (
    <React.Fragment>
      <Layouts>
        <SectionTitle>Danh mục sách</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-2">
            {' '}
            Cập nhật danh mục sách
          </h3>
          <Form form={form} onFinish={onFinish}>
            <FormCategory />
          </Form>
        </div>
      </Layouts>
    </React.Fragment>
  )
}

UpdateCategory.propTypes = {}

export default UpdateCategory
