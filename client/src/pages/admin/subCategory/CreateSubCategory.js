import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SearchItem } from '../../../components/LocalSearch'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import { getCategories } from '../../../redux/actions/category'
import {
  createSubCategory,
  deleteSubCategories,
  getSubCategories,
} from '../../../redux/actions/subCategory'
import FormCategory from './FormSubCategory'
import './SubCategories.scss'

const { Option } = Select

const CreateSubCategory = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [keyword, setKeyword] = useState('')

  const categories = useSelector((state) => state.category.listCategories)
  const subCategories = useSelector(
    (state) => state.subCategory.listSubCategories
  )
  const totalCategory = subCategories.length
  useEffect(() => {
    dispatch(getSubCategories())
    dispatch(getCategories())
  }, [dispatch])

  function onFinish({ name }) {
    const values = { name, parent: subcategory }
    dispatch(createSubCategory(values))
    form.resetFields()
    setSubcategory('')
  }
  function onHandleDelete(slug) {
    setShowModal(true)
    setCategoryToDelete(slug)
  }
  function onHandleDeleteItem() {
    dispatch(deleteSubCategories(categoryToDelete))
    setShowModal(false)
  }
  function closeModal() {
    setShowModal(false)
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
  // Search
  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword)
  const dataSource =
    subCategories &&
    subCategories.filter(searched(keyword)).map((item) => ({
      Id: item._id,
      Name: item.name,
      Slug: item.slug,
    }))
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'Id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'Name',
      key: 'name',
    },
    {
      title: 'Viết Tắt',
      dataIndex: 'Slug',
      key: 'slug',
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'x',
      width: '200px',
      render: (text, record) => (
        <>
          <Button type="primary" className="rounded mr-1 mb-1">
            <Link
              to={`/admin/sub-category/${record.Slug}`}
              className="sub__edit"
            >
              <EditOutlined />
            </Link>
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              onHandleDelete(record.Slug, e)
            }}
            className="rounded mb-1"
          ></Button>
        </>
      ),
    },
  ]
  return (
    <React.Fragment>
      <ModalConfirm
        showModal={showModal}
        closeModal={closeModal}
        onHandleDeleteItem={onHandleDeleteItem}
        title="loại"
        categoryToDelete={categoryToDelete}
      />
      <Layouts>
        <SectionTitle>Loại sách</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-2"> Tạo mới loại sách</h3>
          <Form form={form} onFinish={onFinish}>
            <div className="">
              Chọn danh mục sách:{' '}
              <Select
                showSearch
                style={{ padding: '8px 0' }}
                placeholder="Chọn danh mục"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                className="rounded py-2 text-base w-72 md:w-96"
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>
              <div className="pb-2">Chọn loại sách</div>
              <FormCategory />
            </div>
          </Form>
          <h3 className="text-sm text-gray-600 pb-1">
            {' '}
            Danh sách các loại sách{' '}
            <span className="font-semibold">({totalCategory})</span>
          </h3>
          {/* Search */}
          <SearchItem keyword={keyword} setKeyword={setKeyword} />
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="Id"
            tableLayout="auto"
            bordered
            className="rounded"
            pagination={{ position: ['bottomCenter'] }}
            scroll={{ x: '374px' }}
            sticky
          />
        </div>
      </Layouts>
    </React.Fragment>
  )
}

CreateSubCategory.propTypes = {}

export default CreateSubCategory
