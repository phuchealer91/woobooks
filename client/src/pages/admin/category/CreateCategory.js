import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SearchItem } from '../../../components/LocalSearch'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import {
  createCategory,
  deleteCategories,
  getCategories,
} from '../../../redux/actions/category'
import './Categories.scss'
import FormCategory from './FormCategory'

const CreateCategory = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState('')
  const [keyword, setKeyword] = useState('')

  const categories = useSelector((state) => state.category.listCategories)
  const totalCategory = categories.length
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  function onFinish({ name }) {
    dispatch(createCategory({ name }))
    form.resetFields()
  }
  function onHandleDelete(slug) {
    setShowModal(true)
    setCategoryToDelete(slug)
  }
  function onHandleDeleteItem() {
    dispatch(deleteCategories(categoryToDelete))
    setShowModal(false)
  }
  function closeModal() {
    setShowModal(false)
  }
  // Search
  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword)
  const dataSource =
    categories &&
    categories.filter(searched(keyword)).map((item) => ({
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
              to={`/admin/category/${record.Slug}`}
              className="category__edit"
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
            className="rounded"
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
        title="danh mục"
        categoryToDelete={categoryToDelete}
      />
      <Layouts>
        <SectionTitle>Danh mục sách</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-2"> Tạo mới danh mục sách</h3>
          <Form form={form} onFinish={onFinish}>
            <FormCategory />
          </Form>
          <h3 className="text-sm text-gray-600 pb-1">
            {' '}
            Danh sách danh mục sách{' '}
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

CreateCategory.propTypes = {}

export default CreateCategory
