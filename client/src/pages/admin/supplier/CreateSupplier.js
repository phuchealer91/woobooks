import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  createSuppliers,
  deleteSuppliers,
  getSuppliers,
} from '../../../apis/supplier'
import { SearchItem } from '../../../components/LocalSearch'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import FormSupplier from './FormSupplier'
import './Suppliers.scss'

const CreateSupplier = () => {
  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [suppliers, setSuppliers] = useState([])

  const [supplierToDelete, setSupplierToDelete] = useState('')
  const [keyword, setKeyword] = useState('')
  const totalSupplier = suppliers.length

  useEffect(() => {
    loadSuppliers()
  }, [])
  const loadSuppliers = () =>
    getSuppliers().then((c) => {
      setSuppliers(c.data.suppliers)
    })
  function onFinish({ name }) {
    createSuppliers({ name })
      .then((res) => {
        setLoading(false)
        toast.success(`Tạo ${res.data.supplier.name} thành công `)
        loadSuppliers()
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
    setSupplierToDelete(slug)
  }

  function onHandleDeleteItem() {
    deleteSuppliers(supplierToDelete)
      .then((res) => {
        setLoading(false)
        toast.success(`${res.data.msg} `)
        loadSuppliers()
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
  // Search
  const searched = (keyword) => (supplier) =>
    supplier.name.toLowerCase().includes(keyword)
  const dataSource =
    suppliers &&
    suppliers.filter(searched(keyword)).map((item) => ({
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
              to={`/admin/supplier/${record.Slug}`}
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
        title="Nhà cung cấp"
        categoryToDelete={supplierToDelete}
      />

      <Layouts>
        <SectionTitle>Nhà cung cấp</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          {loading ? (
            <Spin tip="Loading..." />
          ) : (
            <h3 className="text-sm text-gray-600 pb-2">
              {' '}
              Tạo mới nhà cung cấp
            </h3>
          )}
          <Form form={form} onFinish={onFinish}>
            <FormSupplier />
          </Form>
          <h3 className="text-sm text-gray-600 pb-1">
            {' '}
            Danh sách nhà cung cấp{' '}
            <span className="font-semibold">({totalSupplier})</span>
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

CreateSupplier.propTypes = {}

export default CreateSupplier
