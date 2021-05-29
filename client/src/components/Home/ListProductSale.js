import { Pagination, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getListProductSales } from '../../apis/product'
import { CardItem } from '../CardItem'
import LoadingCard from '../LoadingCard'
import './ListProduct.scss'

ListProductSale.propTypes = {}

function ListProductSale({ flashSale }) {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [listproduct, setListproduct] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadProductSales()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  function loadProductSales() {
    setIsLoading(true)
    getListProductSales(page).then((res) => {
      setListproduct(res.data.products)
      setTotalProducts(res.data.productTotal)
      setIsLoading(false)
    })
  }

  return (
    <>
      {isLoading ? (
        <LoadingCard count={5} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-auto grid-flow-row gap-2 mt-6">
          {listproduct &&
            listproduct.map((product) => {
              return (
                <div className="product-item" key={product._id}>
                  <CardItem product={product} flashSale={flashSale} />
                </div>
              )
            })}
        </div>
      )}
      <Row gutter={[2, 12]}>
        <div className="pagination">
          <Pagination
            current={page}
            total={(totalProducts / 10) * 10}
            onChange={(value) => setPage(value)}
          />
        </div>
      </Row>
    </>
  )
}

export default ListProductSale
