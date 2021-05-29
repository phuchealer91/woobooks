import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteProducts, getListAllProducts } from '../../../apis/product'
import imageDefault from '../../../assets/images/default-image.jpg'
import { SearchItem } from '../../../components/LocalSearch'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import './Product.scss'

const ListProduct = () => {
  // const [form] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')

  const totalProducts = products.length
  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getListAllProducts(100)
      .then((res) => {
        setProducts(res.data.products)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  function onHandleDelete(slug) {
    setShowModal(true)
    setProductToDelete(slug)
  }
  function onHandleDeleteItem() {
    deleteProducts(productToDelete)
      .then((res) => {
        loadAllProducts()
        toast.success(`Xóa ${res.data.deleted.title} thành công`)
        setShowModal(false)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data.error)
        }
        setShowModal(false)
      })
  }
  function closeModal() {
    setShowModal(false)
  }
  // Search
  const searched = (keyword) => (product) =>
    product.title.toLowerCase().includes(keyword)
  const dataSource =
    products &&
    products?.filter(searched(keyword)).map((item) => ({
      Id: item._id.substring(0, 10),
      Title: item.title,
      Sold: item.sold,
      Price: item.price,
      Sale: item.sale,
      Author: item.author,
      Image: item.images[0] ? item.images[0].url : imageDefault,
      Quantity: item.quantity,
    }))
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'Id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'Title',
      key: 'title',
    },
    {
      title: 'Đã bán',
      dataIndex: 'Sold',
      key: 'sold',
    },
    {
      title: 'Số lượng',
      dataIndex: 'Quantity',
      key: 'quantity',
    },
    {
      title: 'Giá',
      dataIndex: 'Price',
      key: 'price',
    },
    {
      title: 'Giảm giá',
      dataIndex: 'Sale',
      key: 'sale',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'Image',
      key: 'image',
      render: (image) => <Avatar size={64} src={image} />,
    },
    {
      title: 'Tác giả',
      dataIndex: 'Author',
      key: 'author',
      render: (author) => (
        <>
          {author.map((author) => {
            return <span>{author.name}</span>
          })}
        </>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'x',
      width: '200px',
      render: (text, record) => (
        <>
          <Button type="primary" className="rounded mr-1">
            <Link to={`/admin/product/${record.Slug}`} className="sub__edit">
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
        title="sản phẩm"
        categoryToDelete={productToDelete}
      />

      <Layouts>
        <SectionTitle>Sản phẩm</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-1">
            {' '}
            Danh sách loại sản phẩm{' '}
            <span className="font-semibold">({totalProducts})</span>
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
          />
        </div>
      </Layouts>
    </React.Fragment>
  )
}

ListProduct.propTypes = {}

export default ListProduct
