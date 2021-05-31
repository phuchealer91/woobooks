import { Form, Space, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { getAuthors } from '../../../apis/author'
import { getCategories, getCategorySubs } from '../../../apis/category'
import { getProduct, updateProducts } from '../../../apis/product'
import { getSuppliers } from '../../../apis/supplier'
import FileUpload from '../../../components/FileUpload'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import FormUpdateProduct from './FormUpdateProduct'
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
  const { user } = useSelector((state) => ({ ...state }))
  const [product, setProduct] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [categorySubs, setCategorySubs] = useState([])
  const [showSub, setShowSub] = useState(false)
  const [arrayOfSubs, setArrayOfSubs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [values, setValues] = useState(initialState)
  const [arrayOfAuthors, setArrayOfAuthors] = useState([])
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const history = useHistory()
  // router
  const { slug } = useParams()
  useEffect(() => {
    loadProduct()
    loadCategories()
    loadAuthors()
    loadSuppliers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data.categories)
    })
  const loadAuthors = () => getAuthors().then((c) => setAuthors(c.data.authors))
  const loadSuppliers = () =>
    getSuppliers().then((c) => setSuppliers(c.data.suppliers))

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log("single product", p);
      // 1 load single proudct
      setValues({ ...values, ...p.data.product })
      // 2 load single product category subs
      getCategorySubs(p.data.product.category._id).then((res) => {
        setCategorySubs(res.data.subs) // on first load, show default subs
      })
      // 3 prepare array of sub ids to show as default sub values in antd Select
      let arr = []
      let arrAuthors = []
      p.data.product.subs.map((s) => {
        arr.push(s._id)
      })
      setArrayOfSubs((prev) => arr) // required for ant design select to work
      p.data.product.author.map((s) => {
        return arrAuthors.push(s._id)
      })
      setArrayOfAuthors((prev) => arrAuthors)
    })
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    values.subs = arrayOfSubs
    values.author = arrayOfAuthors
    values.category = selectedCategory ? selectedCategory : values.category
    let valuexxxx = { ...values, totalQuantity: values['quantity'] }
    updateProducts(slug, valuexxxx)
      .then((res) => {
        setIsLoading(false)
        toast.success(`Cập nhật ${res.data.product.title} thành công`)
        history.push('/admin/list-products')
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        toast.error(err.response.data.err)
      })
  }
  const onChangeCategory = (e) => {
    e.preventDefault()
    setValues({ ...values, subs: [] })

    setSelectedCategory(e.target.value)

    getCategorySubs(e.target.value).then((res) => {
      setCategorySubs(res.data.subs)
    })
    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct()
    }
    // clear old sub category ids
    setArrayOfSubs([])
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

          <div className="p-3">
            <FileUpload
              setIsLoading={setIsLoading}
              values={values}
              setValues={setValues}
            />
          </div>
          <FormUpdateProduct
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            onChangeCategory={onChangeCategory}
            categories={categories}
            categorySubss={categorySubs}
            showSub={showSub}
            authors={authors}
            suppliers={suppliers}
            arrayOfSubs={arrayOfSubs}
            arrayOfAuthors={arrayOfAuthors}
            setArrayOfSubs={setArrayOfSubs}
            setArrayOfAuthors={setArrayOfAuthors}
            selectedCategory={selectedCategory}
          />

          {/* <Form {...layout} form={form} onFinish={onFinish}>
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
          </Form> */}
        </div>
      </Layouts>
    </React.Fragment>
  )
}

CreateProducts.propTypes = {}

export default CreateProducts
