import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListProductss } from '../../../../apis/product'
import { Layouts } from '../../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import { getProductsCount } from '../../../../redux/actions/product'
import TableInventoryWarehouse from './TableInventoryWarehouse'
InventoryWareHouseList.propTypes = {}

function InventoryWareHouseList(props) {
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { totalProducts } = useSelector((state) => state.product)
  useEffect(() => {
    dispatch(getProductsCount())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    loadAllProducts()
  }, [page])

  const loadAllProducts = () => {
    setIsLoading(true)
    getListProductss('sold', 'desc', page)
      .then((res) => {
        if (res.data) {
          setProducts(res.data.products)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  return (
    <div>
      <Layouts>
        <SectionTitle>Quản lý tồn kho</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 my-4">
            {' '}
            Danh sách các sản phẩm tồn kho{' '}
            <span className="font-semibold">({totalProducts})</span>
          </h3>
          <div className="bg-white shadow-md rounded mx-auto overflow-x-auto">
            <table className=" w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-xs leading-normal">
                  <th className="py-3 px-3 text-left">Mã</th>
                  <th className="py-3 px-3 text-left">Tên SP</th>
                  <th className="py-3 px-3 text-left">Danh mục</th>
                  <th className="py-3 px-3 text-left">Ảnh</th>
                  <th className="py-3 px-3 text-left">Số lượng nhập</th>
                  <th className="py-3 px-3 text-left">Số lượng còn lại</th>
                  <th className="py-3 px-3 text-left">Giá</th>
                </tr>
              </thead>
              {products &&
                products.map((product) => {
                  return (
                    <TableInventoryWarehouse
                      key={product._id}
                      product={product}
                    />
                  )
                })}
            </table>
            <div className="flex items-center justify-center py-6 px-6">
              <Pagination
                current={page}
                total={(totalProducts / 8) * 10}
                onChange={(value) => setPage(value)}
              />
            </div>
          </div>
        </div>
      </Layouts>
    </div>
  )
}

export default InventoryWareHouseList
