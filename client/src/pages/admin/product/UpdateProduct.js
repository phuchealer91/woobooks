import { Col, Form, Row, Space, Spin } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getAuthors } from '../../../apis/author'
import { getCategories, getCategorySubs } from '../../../apis/category'
import { getProduct } from '../../../apis/product'
import { getSuppliers } from '../../../apis/supplier'
import FileUpload from '../../../components/FileUpload'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import FormUpdateProduct from './FormUpdateProduct'
import './Product.scss'
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
  pages: '',
  author: [],
  supplier: [],
  publisher: '',
  publication: null,
  weight: '',
  size: '',
  images: [],
  layouts: ['Bìa Cứng', 'Bìa Mềm'],
  languages: ['Tiếng Việt', 'Tiếng Anh'],
  layout: '',
  lang: '',
}
const UpdateProductss = ({ match }) => {
  const [form] = Form.useForm()
  const [product, setProduct] = useState(initialState)
  const [arrayOfSubs, setArrayOfSubs] = useState([])

  const [arrayOfAuthors, setArrayOfAuthors] = useState([])
  const [categories, setCategories] = useState([])
  // const [selectedCategory, setSelectedCategory] = useState('')
  // const [selectedSupplier, setSelectedSupplier] = useState('')
  const [authors, setAuthors] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [categorySubs, setCategorySubs] = useState([])
  const [showSub] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { slug } = match.params

  useEffect(() => {
    loadProduct()

    loadCategories()
    loadAuthors()
    loadSuppliers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    form.setFieldsValue({
      title: product ? product.title : '',
      description: (product && product.description) || '',
      price: (product && product.price) || '',
      sale: (product && product.sale) || '',
      quantity: (product && product.quantity) || '',
      layout: (product && product.layout) || '',
      // language: (product && product.language) || '',
      category: (product && product.category?.name) || '',
      pages: (product && product.pages) || '',
      publisher: (product && product.publisher) || '',
      publication: (product && moment(product.publication)) || '',
      supplier: (product && product.supplier?.name) || '',
      // category: (product && product.category?.name) || '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  // const loadValues = () => {}
  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // 1 load single proudct
      setProduct({ ...product, ...p.data.product })

      // 2 load single product category subs
      getCategorySubs(p.data.product.category._id).then((res) => {
        setCategorySubs(res.data.subs) // on first load, show default subs
      })
      // 3 prepare array of sub ids to show as default sub product in antd Select

      let arr = []
      let arrAuthors = []
      p.data.product.subs.map((s) => {
        return arr.push(s._id)
      })
      setArrayOfSubs((prev) => arr) // required for ant design select to work
      p.data.product.author.map((s) => {
        return arrAuthors.push(s._id)
      })
      setArrayOfAuthors((prev) => arrAuthors)
    }) // required for ant design select to work
  }

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data.categories)
    })
  const loadAuthors = () => getAuthors().then((c) => setAuthors(c.data.authors))
  const loadSuppliers = () =>
    getSuppliers().then((c) => setSuppliers(c.data.suppliers))

  function onFinish(value) {
    // setIsLoading(true)
    const productUpdate = {
      ...product,
      subs: arrayOfSubs,
      author: arrayOfAuthors,
      publication: value['publication']
        ? value['publication'].format('DD-MM-YYYY')
        : null,
      ...value,
    }

    // updateProducts(slug, productUpdate)
    //   .then((res) => {
    //     setIsLoading(false)
    //     toast.success(`Cập nhật ${res.data.product.title} thành công`)
    //     history.push('/admin/list-products')
    //   })
    //   .catch((err) => {
    //     setIsLoading(false)
    //     toast.error(err.response.data.error)
    //   })
  }
  // // Sub category Select
  function onChange(value) {}
  // function onChangeSupplier(value) {
  //   setSelectedSupplier(value)
  // }
  function onChangeCategory(_id) {
    // setSelectedCategory(_id)
    getCategorySubs(_id).then((res) => {
      setCategorySubs(res.data.subs)
    })
    setProduct({ ...product, subs: [] })
    // if (product.category._id === _id) {
    //   loadProduct()
    // }
    // setArrayOfSubs([])
  }

  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="product">
            {isLoading ? (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            ) : (
              <h3> Cập nhật sản phẩm</h3>
            )}
            <Form
              {...layout}
              form={form}
              onFinish={onFinish}
              // fields={[
              //   {
              //     name: ['title'],
              //     value: product.title,
              //   },
              //   {
              //     name: ['description'],
              //     value: product.description,
              //   },
              //   {
              //     name: ['category'],
              //     value: selectedCategory
              //       ? selectedCategory
              //       : product.category._id,
              //   },
              //   {
              //     name: ['shipping'],
              //     value: product.shipping,
              //   },
              //   {
              //     name: ['quantity'],
              //     value: product.quantity,
              //   },
              //   {
              //     name: ['pages'],
              //     value: product.pages,
              //   },
              //   // {
              //   //   name: ['supplier'],
              //   //   value: selectedSupplier
              //   //     ? selectedSupplier
              //   //     : product.supplier.name,
              //   // },
              //   {
              //     name: ['publisher'],
              //     value: product.publisher,
              //   },
              //   {
              //     name: ['publication'],
              //     value: moment(product.publication),
              //   },
              //   {
              //     name: ['layout'],
              //     value: product.layout,
              //   },
              //   {
              //     name: ['language'],
              //     value: product.language,
              //   },
              //   {
              //     name: ['price'],
              //     value: product.price,
              //   },
              // ]}
            >
              <div className="product__form">
                <FileUpload
                  setIsLoading={setIsLoading}
                  product={product}
                  setProduct={setProduct}
                />
                <FormUpdateProduct
                  product={product}
                  onChange={onChange}
                  onChangeCategory={onChangeCategory}
                  // onChangeSupplier={onChangeSupplier}
                  categorySubss={categorySubs}
                  showSub={showSub}
                  setProduct={setProduct}
                  arrayOfSubs={arrayOfSubs}
                  arrayOfAuthors={arrayOfAuthors}
                  suppliers={suppliers}
                  categories={categories}
                  authors={authors}
                  setArrayOfSubs={setArrayOfSubs}
                  setArrayOfAuthors={setArrayOfAuthors}
                />
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

UpdateProductss.propTypes = {}

export default UpdateProductss
