import { Form, Space, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAuthors } from '../../../apis/author'
import { getCategories, getCategorySubs } from '../../../apis/category'
import { createProducts } from '../../../apis/product'
import { getSuppliers } from '../../../apis/supplier'
import FileUpload from '../../../components/FileUpload'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import FormCreateProduct from './FormCreateProduct'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  sale: '',
  quantity: '',
  totalQuantity: '',
  pages: '',
  author: [],
  supplier: '',
  publisher: '',
  publication: null,

  images: [],
  layouts: ['Bìa Cứng', 'Bìa Mềm'],
  languages: ['Tiếng Việt', 'Tiếng Anh'],
  layout: '',
  lang: '',
}
const CreateProducts = () => {
  const [form] = Form.useForm()
  const [product, setProduct] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [categorySubs, setCategorySubs] = useState([])
  const [authors, setAuthors] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [showSub, setShowSub] = useState(false)

  useEffect(() => {
    loadCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    loadAuthors()
  }, [])
  useEffect(() => {
    loadSuppliers()
  }, [])

  const loadCategories = () =>
    getCategories().then((c) =>
      setProduct({ ...product, categories: c.data.categories })
    )
  const loadAuthors = () => getAuthors().then((c) => setAuthors(c.data.authors))
  const loadSuppliers = () =>
    getSuppliers().then((c) => setSuppliers(c.data.suppliers))

  function onFinish(value) {
    const values = {
      ...product,
      ...value,
      totalQuantity: value['quantity'],
      publication: value['publication']
        ? value['publication'].format('DD-MM-YYYY')
        : null,
    }
    createProducts(values)
      .then((res) => {
        toast.success(`Tạo ${res.data.product.title} thành công `)
        window.location.reload()
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data.error)
      })
  }
  function onChange(value) {}
  function onChangeCategory(_id) {
    setProduct({ ...product, subs: [] })
    getCategorySubs(_id).then((res) => {
      setCategorySubs(res.data.subs)
    })
    setShowSub(true)
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  return (
    <React.Fragment>
      {/* <ModalConfirm
        showModal={showModal}
        closeModal={closeModal}
        onHandleDeleteItem={onHandleDeleteItem}
        title="danh mục"
        categoryToDelete={categoryToDelete}
      /> */}

      <Layouts>
        <SectionTitle>Sản phẩm</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          {isLoading ? (
            <Space size="middle">
              <Spin size="large" />
            </Space>
          ) : (
            <h3 className="text-sm text-gray-600 pb-2"> Tạo mới sản phẩm</h3>
          )}

          <Form {...layout} form={form} onFinish={onFinish}>
            <div className="product__form">
              <FileUpload
                setIsLoading={setIsLoading}
                product={product}
                setProduct={setProduct}
              />
              <FormCreateProduct
                product={product}
                onChange={onChange}
                onChangeCategory={onChangeCategory}
                categorySubss={categorySubs}
                showSub={showSub}
                setProduct={setProduct}
                authors={authors}
                suppliers={suppliers}
              />
            </div>
          </Form>
        </div>
      </Layouts>
    </React.Fragment>
  )
}

CreateProducts.propTypes = {}

export default CreateProducts
