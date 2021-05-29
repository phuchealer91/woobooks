import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { searchQuery } from '../../redux/actions/search'
function Searchs(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { text } = useSelector((state) => state.search)

  function handleChange(e) {
    dispatch(searchQuery({ text: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    history.push(`/shop?${text}`)
  }

  return (
    <React.Fragment>
      <div className="items-center hidden md:flex">
        <input
          type="search"
          name="text"
          placeholder="Tìm kiếm sản phẩm mong muốn"
          onChange={handleChange}
          value={text}
          className="px-3 py-2 w-full h-full outline-none focus:border-0 focus:outline-none text-gray-800 text-base border-solid border-2 border-blue-500 rounded "
        />
        ,
        <SearchOutlined
          onClick={handleSubmit}
          style={{
            position: 'relative',
            left: '-60px',

            fontWeight: 600,
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '12px',
            paddingBottom: '12px',
            fontSize: '20px',
          }}
          className="text-blue-600"
        />
      </div>
      <div className="flex items-center md:hidden">
        <input
          type="search"
          name="text"
          placeholder="Tìm kiếm sản phẩm "
          onChange={handleChange}
          value={text}
          className="relative px-3 py-2 w-full h-full outline-none focus:border-0 focus:outline-none text-gray-800 text-base border-solid border-2 border-blue-500 rounded "
        />
        ,
        <SearchOutlined
          onClick={handleSubmit}
          style={{
            position: 'absolute',
            right: '0px',

            fontWeight: 600,
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '12px',
            paddingBottom: '12px',
            fontSize: '20px',
          }}
          className="text-blue-600 font-semibold"
        />
      </div>
    </React.Fragment>
  )
}
Searchs.propTypes = {}
export default Searchs
