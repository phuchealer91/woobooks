import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../helpers/formatPrice'
import './ProductListItem.scss'
function ProductListItem({ productEditing }) {
  const {
    price,
    quantity,
    sold,
    category,
    publisher,
    sale,
    subs,
    author,
    layout,
    pages,
    publication,
  } = productEditing ? productEditing : ''

  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          Giá{' '}
          <span className="list-group__right font-semibold">
            {formatPrice(price)} VND
          </span>
        </li>
        <li className="list-group-item">
          Nhà xuất bản{' '}
          <span className="list-group__right font-semibold">{publisher}</span>
        </li>
        <li className="list-group-item">
          Số trang{' '}
          <span className="list-group__right font-semibold">{pages}</span>
        </li>
        <li className="list-group-item">
          Ngày sản xuất{' '}
          <span className="list-group__right font-semibold">
            {moment(publication).format('DD/MM/YYYY')}
          </span>
        </li>

        {category && (
          <li className="list-group-item">
            Loại{' '}
            <Link
              to={`/category/${category.slug}`}
              className="font-semibold list-group__right text-green-600 underline"
            >
              {category.name}
            </Link>
          </li>
        )}

        {subs && (
          <li className="list-group-item">
            Danh mục
            {subs.map((s) => (
              <Link
                key={s._id}
                to={`/sub-category/${s.slug}`}
                className="font-semibold list-group__right text-green-600 underline"
              >
                {s.name}
              </Link>
            ))}
          </li>
        )}

        <li className="list-group-item">
          Sale <span className="list-group__right font-semibold">{sale}%</span>
        </li>

        {author && (
          <li className="list-group-item">
            Tác giả
            {author.map((s) => (
              <Link
                key={s._id}
                to={`/author/${s.slug}`}
                className="font-semibold list-group__right text-green-600 underline"
              >
                {s.name}
              </Link>
            ))}
          </li>
        )}

        <li className="list-group-item">
          Bố cục{' '}
          <span className="list-group__right font-semibold">{layout}</span>
        </li>

        <li className="list-group-item">
          Số lượng trong kho{' '}
          <span className="list-group__right font-semibold">
            {formatPrice(quantity)}
          </span>
        </li>

        <li className="list-group-item">
          Đã bán <span className="list-group__right font-semibold">{sold}</span>
        </li>
      </ul>
    </>
  )
}
ProductListItem.propTypes = {}

export default ProductListItem
