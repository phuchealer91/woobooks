import { Form, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import { getCategories } from '../../../redux/actions/category'
import {
  getSubCategory,
  updateSubCategories,
} from '../../../redux/actions/subCategory'
import FormCategory from './FormSubCategory'
import './SubCategories.scss'
const { Option } = Select
const UpdateSubCategory = ({ match }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [subcategory, setSubcategory] = useState('')
  const history = useHistory()
  const { category } = useSelector((state) => ({ ...state }))
  const { subCategoryEditing } = useSelector((state) => state.subCategory)

  const { slug } = match.params
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getSubCategory(slug))
  }, [dispatch, slug])

  useEffect(() => {
    form.setFieldsValue({
      name: (subCategoryEditing && subCategoryEditing.name) || '',
    })
    setSubcategory((subCategoryEditing && subCategoryEditing.parent) || '')
  }, [form, subCategoryEditing])
  function onFinish({ name }) {
    const values = { name, parent: subcategory }
    dispatch(updateSubCategories(values))
    history.push('/admin/sub-category')
    form.resetFields()
  }
  // Sub category Select
  function onChange(value) {
    setSubcategory(value)
  }

  function onBlur() {
    console.log('blur')
  }

  function onFocus() {
    console.log('focus')
  }

  function onSearch(val) {
    console.log('search:', val)
  }

  return (
    <React.Fragment>
      <Layouts>
        <SectionTitle>Loại sách</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-2"> Cập nhật loại sách</h3>
          <Form form={form} onFinish={onFinish}>
            <div className="sub__form">
              <div className="sub__select">
                <div className="pb-2"> Chọn danh mục sách: </div>
                <Select
                  showSearch
                  style={{ width: 400 }}
                  placeholder="Chọn danh mục"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  value={subcategory}
                  className="rounded py-2"
                >
                  {category.listCategories.length > 0 &&
                    category.listCategories.map((category) => (
                      <Option key={category._id} value={category._id}>
                        {category.name}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="pb-2">Chọn loại sách</div>
              <FormCategory />
            </div>
          </Form>
        </div>
      </Layouts>
    </React.Fragment>
  )
}

UpdateSubCategory.propTypes = {}

export default UpdateSubCategory
