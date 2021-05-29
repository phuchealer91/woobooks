import { Button, Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatPrice, formatPriceSale } from '../../helpers/formatPrice'
import { hideDrawer } from '../../redux/actions/ui'
import './SidebarDrawer.scss'
function SideDrawer(props) {
  const { ui, cart } = useSelector((state) => ({ ...state }))
  let { cartLists } = cart
  const dispatch = useDispatch()
  function onClose() {
    dispatch(hideDrawer())
  }
  function onHandleCheckOut() {
    dispatch(hideDrawer())
  }
  return (
    <Drawer
      title={`Giỏ Hàng Của Bạn (${cartLists.length})`}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={ui.visible}
      width="380px"
    >
      <ul className="dra__list">
        {cartLists &&
          cartLists.map((c) => (
            <li className="dra__list-item" key={c._id}>
              <div className="dra__wrap">
                <img
                  src={c?.images[1]?.url}
                  alt={c.title}
                  className="dra__wrap-avatar"
                  style={{ objectFit: 'cover', width: '80px', height: '80px' }}
                />
                <div className="dra__content">
                  <h3 className="dra__content-name">{c.title}</h3>
                  <span className="text-blue-600 font-semibold">
                    {c.sale > 0
                      ? formatPriceSale(c.price * c.count, c.sale)
                      : formatPrice(c.price * c.count)}
                    đ
                  </span>
                </div>
              </div>
            </li>
          ))}
        <div className="dra__btn ">
          <Link to="/cart">
            <Button
              type="primary"
              size="large"
              className="btn btn-primary btn-addToCart uppercase mx-auto w-4/5"
              onClick={onHandleCheckOut}
            >
              Thanh Toán
            </Button>
          </Link>
        </div>
      </ul>
    </Drawer>
  )
}
SideDrawer.propTypes = {}
export default SideDrawer
