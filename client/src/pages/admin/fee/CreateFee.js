import { DeleteOutlined } from '@ant-design/icons'
import { Button, Form, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createFees, deleteFees, getFees } from '../../../apis/fee'
import { getProvinces } from '../../../apis/province'
import { SearchItem } from '../../../components/LocalSearch'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import FormFee from './FormFee'

const { Option } = Select

const CreateFee = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState('')
  const [kvs, setkvs] = useState('')
  const [keyword, setKeyword] = useState('')
  const [areas, setAreas] = useState('')
  const [feeAreas, setFeeAreas] = useState([])

  useEffect(() => {
    getProvincess()
  }, [])
  useEffect(() => {
    loadFees()
  }, [])

  function getProvincess() {
    getProvinces({})
      .then((res) => {
        setAreas(res.data.provinces)
      })
      .catch((err) => console.log('Error anh em', err))
  }
  function loadFees() {
    getFees()
      .then((res) => {
        setFeeAreas(res.data.fee)
      })
      .catch((err) => console.log('Error anh em', err))
  }
  function onFinish({ feeShipping }) {
    const values = { area: kvs, feeShipping: feeShipping }
    createFees(values).then((res) => {
      if (res.data) {
        loadFees()
        toast.success('Thêm phí thành công')
        setkvs('')
      } else {
        toast.error('Thêm phí thất bại')
      }
    })

    form.resetFields()
    setkvs('')
  }
  function onHandleDelete(slug) {
    setShowModal(true)
    setCategoryToDelete(slug)
  }
  function onHandleDeleteItem() {
    deleteFees(categoryToDelete).then((res) => {
      if (res) {
        loadFees()
        toast.success('Xóa thành công')
      }
    })
    setShowModal(false)
  }
  function closeModal() {
    setShowModal(false)
  }
  // Sub category Select
  function onChange(value) {
    setkvs(value)
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
    category.area.toLowerCase().includes(keyword)
  const dataSource =
    feeAreas &&
    feeAreas.filter(searched(keyword)).map((item) => ({
      Id: item._id,
      Area: item.area,
      FeeShipping: item.feeShipping,
      Slug: item.slug,
    }))
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'Id',
      key: 'id',
    },
    {
      title: 'Khu vực',
      dataIndex: 'Area',
      key: 'area',
    },
    {
      title: 'Viết tắt',
      dataIndex: 'Slug',
      key: 'slug',
    },
    {
      title: 'Phí vận chuyển',
      dataIndex: 'FeeShipping',
      key: 'feeShipping',
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              onHandleDelete(record.Id, e)
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
        title="phí vận chuyển"
        categoryToDelete={categoryToDelete}
      />
      <Layouts>
        <SectionTitle>Phí vận chuyển</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-2">
            {' '}
            Tạo mới phí vận chuyển
          </h3>
          <Form form={form} onFinish={onFinish}>
            <div className="">
              Chọn khu vực:{' '}
              <Select
                showSearch
                style={{ padding: '8px 0' }}
                placeholder="Chọn khu vực"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                value={kvs}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                className="rounded py-2 text-base w-72 md:w-96"
              >
                {areas.length > 0 &&
                  areas.map((area) => (
                    <Option key={area._id} value={area.name}>
                      {area.name}
                    </Option>
                  ))}
              </Select>
              <FormFee />
            </div>
          </Form>
          <h3 className="text-sm text-gray-600 pb-1">
            {' '}
            Danh sách chi phí vận chuyển của các khu vực{' '}
            <span className="font-semibold">({feeAreas.length})</span>
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

CreateFee.propTypes = {}

export default CreateFee
