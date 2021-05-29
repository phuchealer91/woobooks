import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createAuthors, deleteAuthors, getAuthors } from '../../../apis/author'
import { SearchItem } from '../../../components/LocalSearch'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
// import {
//   createAuthor,
//   deleteAuthors,
//   getAuthors,
// } from '../../../redux/actions/category'
import './Authors.scss'
import FormAuthor from './FormAuthor'

const CreateAuthor = () => {
  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authors, setAuthors] = useState([])
  const [authorToDelete, setAuthorToDelete] = useState('')
  const [bio, setBio] = useState('')
  const [keyword, setKeyword] = useState('')

  // const categories = useSelector((state) => state.category.listCategories)
  const totalAuthor = authors.length

  useEffect(() => {
    loadAuthors()
  }, [])
  const loadAuthors = () =>
    getAuthors().then((c) => {
      setAuthors(c.data.authors)
    })
  function onFinish({ name }) {
    createAuthors({ name, bio })
      .then((res) => {
        setLoading(false)
        setBio('')
        toast.success(`Tạo ${res.data.author.name} thành công `)
        loadAuthors()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setLoading(false)
          toast.error(error.response.data.error)
        }
      })
    form.resetFields()
  }
  function onHandleDelete(slug) {
    setShowModal(true)
    setAuthorToDelete(slug)
  }

  function onHandleDeleteItem() {
    deleteAuthors(authorToDelete)
      .then((res) => {
        setLoading(false)
        toast.success(`${res.data.msg} `)
        loadAuthors()
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setLoading(false)
          toast.error(err.response.data.error)
        }
      })
    setShowModal(false)
  }
  function closeModal() {
    setShowModal(false)
  }
  function onHandleChange(value) {
    setBio(value)
  }
  // Search
  const searched = (keyword) => (author) =>
    author.name.toLowerCase().includes(keyword)
  const dataSource =
    authors &&
    authors.filter(searched(keyword)).map((item) => ({
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
              to={`/admin/author/${record.Slug}`}
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
        title="tác giả"
        categoryToDelete={authorToDelete}
      />

      <Layouts>
        <SectionTitle>Tác giả</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          {loading ? (
            <Spin tip="Loading..." />
          ) : (
            <h3 className="text-sm text-gray-600 pb-2"> Tạo mới tác giả</h3>
          )}
          <Form form={form} onFinish={onFinish}>
            <FormAuthor />
            <div className="pb-2 -mt-2">Thông tin của tác giả</div>
            <ReactQuill
              value={bio}
              onChange={onHandleChange}
              placeholder="Điền thông tin của tác giả"
              className="mb-3"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="py-2 rounded font-semibold"
            >
              Thêm
            </Button>
          </Form>
          <h3 className="text-sm text-gray-600 pb-1 mt-3">
            {' '}
            Danh sách tác giả{' '}
            <span className="font-semibold">({totalAuthor})</span>
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

CreateAuthor.propTypes = {}

export default CreateAuthor
