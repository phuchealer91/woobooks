import { Input } from 'antd'
import React from 'react'

const SearchItem = ({ keyword, setKeyword }) => {
  // Search
  function onHandleChangeSearch(e) {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }
  return (
    <div className="py-2 mb-4">
      <Input
        type="search"
        placeholder="Tìm kiếm"
        name="key"
        value={keyword}
        onChange={onHandleChangeSearch}
        className="rounded py-2 text-base"
      />
    </div>
  )
}

SearchItem.propTypes = {}

export default SearchItem
