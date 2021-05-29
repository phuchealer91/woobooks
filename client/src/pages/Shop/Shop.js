import {
  AimOutlined,
  AudioOutlined,
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Checkbox, Menu, Radio, Slider, Tag } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../apis/category'
import { fetchProductsSearch, getListAllProducts } from '../../apis/product'
import { getSubCategories } from '../../apis/subCategory'
import { CardItem } from '../../components/CardItem'
import NavBar from '../../components/navigation/NavBar/NavBar'
import Star from '../../components/Star'
import { EmptyBox } from '../../helpers/icons'
import { searchQuery } from '../../redux/actions/search'
import { useSpeechRecognition } from '../../useSpeechRecognition'
const { CheckableTag } = Tag

function Shop(props) {
  const dispatch = useDispatch()
  const [price, setPrice] = useState([0, 0])
  const [ok, setOk] = useState(false)
  const [productsAll, setProductsAll] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  const [star, setStar] = useState('')
  const [subs, setSubs] = useState([])
  const [sub, setSub] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [layouts, setLayouts] = useState(['Bìa Cứng', 'Bìa Mềm'])
  const [layout, setLayout] = useState('')
  // const [langs, setLangs] = useState(['Tiếng Việt', 'Tiếng Anh'])
  // const [lang, setLang] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { text } = useSelector((state) => state.search)
  useEffect(() => {
    let cleared = setTimeout(() => {
      loadProductsFilter({ query: text })
      if (!text) {
        loadAllProducts()
      }
    }, 300)
    return () => clearTimeout(cleared)
  }, [text])
  useEffect(() => {
    loadCategory()
    loadSubCategory()
  }, [])
  function loadAllProducts() {
    getListAllProducts(12).then(
      (res) => setProductsAll(res.data.products),
      setIsLoading(false)
    )
  }
  function loadCategory() {
    getCategories().then((res) => {
      if (res.data) {
        setCategories(res.data.categories)
      }
    })
  }
  function loadSubCategory() {
    getSubCategories().then((res) => {
      if (res.data) {
        setSubs(res.data.subCategorys)
      }
    })
  }
  function loadProductsFilter(value) {
    fetchProductsSearch(value).then((res) => setProductsAll(res.data.products))
  }

  useEffect(() => {
    loadProductsFilter({ price: price })
  }, [ok])
  function handleSlider(value) {
    dispatch(searchQuery(''))
    setPrice(value)
    // reset
    setCategoryIds([])
    setSelectedTags([])
    setStar('')
    setSub('')
    setLayout('')
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ))

  const showSubs = () =>
    subs.map((tag) => (
      <CheckableTag
        value={tag._id}
        checked={selectedTags.includes(tag._id)}
        name="subCategory"
        onChange={(checked) => handleSub(tag, checked)}
      >
        {tag.name}
      </CheckableTag>
    ))

  function handleCheck(e) {
    dispatch(searchQuery(''))
    setPrice([0, 0])
    setStar('')
    setSub('')
    setSelectedTags([])
    setLayout('')
    let initState = [...categoryIds]
    let categorySeleted = e.target.value
    let foundCategoryId = initState.indexOf(categorySeleted)

    if (foundCategoryId === -1) {
      initState.push(categorySeleted)
    } else {
      initState.splice(foundCategoryId, 1)
    }
    setCategoryIds(initState)
    if (initState === undefined || initState.length === 0) {
      loadAllProducts()
    } else {
      loadProductsFilter({ category: initState })
    }
  }
  function handleStarClick(num) {
    dispatch(searchQuery(''))
    setPrice([0, 0])
    setCategoryIds([])
    setSelectedTags([])
    setStar(num)
    setSub('')
    setLayout('')
    loadProductsFilter({ stars: num })
  }

  function handleSub(sub) {
    dispatch(searchQuery(''))
    setPrice([0, 0])
    setStar('')
    setLayout('')
    setCategoryIds([])
    let initState = [...selectedTags]
    let subcategorySeleted = sub._id
    let foundSubCategoryId = initState.indexOf(subcategorySeleted)

    if (foundSubCategoryId === -1) {
      initState.push(subcategorySeleted)
    } else {
      initState.splice(foundSubCategoryId, 1)
    }
    setSelectedTags(initState)
    if (initState === undefined || initState.length === 0) {
      loadAllProducts()
    } else {
      loadProductsFilter({ subs: initState })
    }
  }
  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  )

  const showLayouts = () =>
    layouts.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === layout}
        onChange={handleLayout}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ))

  const handleLayout = (e) => {
    setSub('')
    dispatch(searchQuery(''))
    setPrice([0, 0])
    setCategoryIds([])
    setSelectedTags([])
    setStar('')
    setLayout(e.target.value)
    loadProductsFilter({ layout: e.target.value })
  }
  // speech.transcript
  const speech = useSpeechRecognition()

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        searchQuery({ text: speech.transcript ? speech.transcript : text })
      )
    }, 2000)
  }, [speech.transcript, dispatch])
  const menu = (
    <Menu
      defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
      mode="inline"
      style={{ width: '256px', height: 'auto' }}
    >
      <div className="px-1 py-2 flex items-center">
        <button onClick={speech.startListening}>
          <AudioOutlined style={{ fontSize: '32px' }} />
        </button>
        {/* <input
              type="text"
              readOnly
              // onChange={handleChange}
              value={speech.transcript}
              style={{ width: '100%' }}
            /> */}
        <p className="pl-3">
          {speech.listening ? (
            <span style={{ color: 'green' }}>
              <AimOutlined color="green" /> Đang ghi......
            </span>
          ) : (
            <span style={{ color: 'red' }}>
              <AimOutlined color="red" /> Dừng ghi.
            </span>
          )}
        </p>
      </div>
      {/* price */}
      <SubMenu
        key="1"
        title={
          <span className="h6 flex items-center">
            <DollarOutlined /> <span>Giá</span>
          </span>
        }
      >
        <div>
          <Slider
            className="ml-4 mr-4"
            tipFormatter={(v) => `${v}đ`}
            range
            value={price}
            onChange={handleSlider}
            max="500000"
          />
        </div>
      </SubMenu>
      {/* Category */}
      <SubMenu
        key="2"
        title={
          <span className="h6 flex items-center">
            <DownSquareOutlined /> <span>Danh mục</span>
          </span>
        }
      >
        <div style={{ maringTop: '-10px' }}>{showCategories()}</div>
      </SubMenu>

      {/* stars */}
      <SubMenu
        key="3"
        title={
          <span className="h6">
            <StarOutlined /> Đánh giá
          </span>
        }
      >
        <div style={{ maringTop: '-10px' }}>{showStars()}</div>
      </SubMenu>
      {/* sub category */}
      <SubMenu
        key="4"
        title={
          <span className="h6">
            <DownSquareOutlined /> Danh mục con
          </span>
        }
      >
        <div
          style={{ maringTop: '-10px' }}
          className="pl-4 pr-4 flex items-center flex-wrap border border-gray-100 py-3 mb-5"
        >
          {showSubs()}
        </div>
      </SubMenu>
      {/* layout */}
      <SubMenu
        key="5"
        title={
          <span className="h6">
            <DownSquareOutlined /> Hình thức
          </span>
        }
      >
        <div style={{ maringTop: '-10px' }} className="pr-5">
          {showLayouts()}
        </div>
      </SubMenu>
    </Menu>
  )
  return (
    <React.Fragment>
      <h4 className="p-3 pl-2 text-blue-600 font-semibold text-lg">
        Tìm kiếm/Lọc
      </h4>

      {/* hhh */}
      <div className="flex items-center md:hidden pb-3 pl-2">
        <span className="text-gray-600 font-semibold pr-2">
          {' '}
          Tìm kiếm ngay:
        </span>{' '}
        <NavBar menu={menu} />
      </div>
      <div className="px-0 md:px-4 flex dark:bg-gray-900">
        <div className="z-20 hidden w-64  bg-white dark:bg-gray-800 md:block flex-shrink-0">
          {menu}
        </div>

        <div className="flex flex-col flex-1 w-full px-0 md:px-2">
          {/* <HeaderAdmin /> */}
          <div className="">
            {' '}
            <section className="bg-white border border-gray-200 border-solid overflow-hidden rounded-t-lg">
              <div className="flex items-center bg-blue-300 h-12 rounded-t-lg">
                <div className="flex items-center">
                  <img
                    src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/ico_goiy.png"
                    style={{ width: '25px', height: '25px' }}
                    alt="flash sale"
                    className="mx-3"
                  />
                  <span className=" text-base text-gray-600 font-semibold">
                    Sản phẩm đề xuất
                  </span>
                </div>
              </div>
              <div className="mx-3 my-4">
                {productsAll.length < 1 && (
                  <span className="text-gray-700 font-semibold text-xl pl-3 flex justify-center items-center">
                    <EmptyBox />
                  </span>
                )}
                <div className="grid mx-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto grid-flow-row gap-4 mt-6">
                  {productsAll &&
                    productsAll.map((product) => {
                      return (
                        <div className="product-item" key={product._id}>
                          <CardItem product={product} />
                        </div>
                      )
                    })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
Shop.propTypes = {}

export default Shop
