import React, { useEffect, lazy, Suspense } from 'react'
import Peer from 'peerjs'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import io from 'socket.io-client'
import { currentUsers } from '../apis/auth'
import SideDrawer from '../components/Drawer/SideDrawer'
import CallModal from '../components/Community/ChatApp/CallModal'
import Footer from '../components/Footer/Footer'
import { HeaderUser } from '../components/navigation/Header'
import Notify from '../components/Notify/Notify'
import { auth } from '../firebase'
import { getPostsx } from '../redux/actions/post'
import * as types from '../redux/constants/global'
import * as typesMess from '../redux/constants/message'
import PATHS from '../redux/constants/paths'
import AdminRoute from '../routers/AdminRoute'
import UserRoute from '../routers/UserRoute'
import SocketClient from '../SocketClient'
import { Spin } from 'antd'
import MessengerCustomerChat from 'react-messenger-customer-chat'
import { getSuggestions } from '../redux/actions/suggestions'
import ConversationBot from '../ConversationBot'
import axios from 'axios'

const Addressx = lazy(() => import('../pages/address'))
const DashBoard = lazy(() => import('../pages/admin/DashBoard'))
const AdminPassword = lazy(() => import('../pages/admin/AdminPassword'))
const CreateAuthor = lazy(() => import('../pages/admin/author/CreateAuthor'))
const UpdateAuthor = lazy(() => import('../pages/admin/author/UpdateAuthor'))
const CreateCategory = lazy(() =>
  import('../pages/admin/category/CreateCategory')
)
const UpdateCategory = lazy(() =>
  import('../pages/admin/category/UpdateCategory')
)
const CreateFee = lazy(() => import('../pages/admin/fee/CreateFee'))
const CreateCoupon = lazy(() => import('../pages/admin/coupon/CreateCoupon'))
const UsersList = lazy(() => import('../pages/admin/userLists/UsersList'))
const OrdersList = lazy(() => import('../pages/admin/ordersList/OrdersList'))
const CreateProduct = lazy(() => import('../pages/admin/product/CreateProduct'))
const ListProduct = lazy(() => import('../pages/admin/product/ListProduct'))
const UpdateProduct = lazy(() => import('../pages/admin/product/UpdateProduct'))
const CreateSubCategory = lazy(() =>
  import('../pages/admin/subCategory/CreateSubCategory')
)
const UpdateSubCategory = lazy(() =>
  import('../pages/admin/subCategory/UpdateSubCategory')
)
const CreateSupplier = lazy(() =>
  import('../pages/admin/supplier/CreateSupplier')
)
const UpdateSupplier = lazy(() =>
  import('../pages/admin/supplier/UpdateSupplier')
)
const CreateReceipt = lazy(() =>
  import('../pages/admin/warehouse/CreateReceipt')
)
const InventoryWareHouseList = lazy(() =>
  import(
    '../pages/admin/warehouse/InventoryWareHouseList/InventoryWareHouseList'
  )
)
const OutWareHouseList = lazy(() =>
  import('../pages/admin/warehouse/OutWareHouseList/OutWareHouseList')
)
const WareHouseList = lazy(() =>
  import('../pages/admin/warehouse/WareHouseList')
)
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'))
const Login = lazy(() => import('../pages/auth/Login'))
const Register = lazy(() => import('../pages/auth/Register'))
const RegisterComplete = lazy(() => import('../pages/auth/RegisterComplete'))
const Cart = lazy(() => import('../pages/cart/Cart'))
const CategoryMainPage = lazy(() =>
  import('../pages/category/CategoryMainPage')
)
const CheckOut = lazy(() => import('../pages/checkout/CheckOut'))
const Community = lazy(() => import('../pages/Community/home/Community'))
const Messages = lazy(() => import('../pages/Community/message/Messages'))
const Profile = lazy(() => import('../pages/Community/profile'))
const Home = lazy(() => import('../pages/Home/Home'))
const NavBarDropdown = lazy(() => import('../pages/Home/NavBarDropdown'))
const Payment = lazy(() => import('../pages/payment/Payment'))
const Product = lazy(() => import('../pages/product/Product'))
const Shop = lazy(() => import('../pages/Shop/Shop'))
const SubCategoryMainPage = lazy(() =>
  import('../pages/subCategory/SubCategoryMainPage')
)
const History = lazy(() => import('../pages/user/History'))
const Password = lazy(() => import('../pages/user/Password'))
const WishList = lazy(() => import('../pages/user/WishList'))
const UserAddress = lazy(() => import('../pages/user/UserAddress'))
const UserProfile = lazy(() => import('../pages/user/UserProfile'))

function App() {
  const dispatch = useDispatch()
  let { user: users, call } = useSelector((state) => state)
  const { pathname } = useLocation()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return
      }
      // dispatch({
      //   type: 'NOTIFY',
      //   payload: { loading: true },
      // })
      const token = await user.getIdToken()
      window.localStorage.setItem('token', token)
      try {
        await currentUsers(token).then((res) => {
          dispatch({
            type: 'LOGGIN_IN_USER',
            payload: {
              token,
              userDatas: res.data,
              notificationsCount: res.data.notifications.newNotifications,
            },
          })
          // dispatch({
          //   type: 'NOTIFY',
          //   payload: { loading: false },
          // })
        })
      } catch (error) {
        console.log('error', error)
      }
    })
    const socket = io('http://localhost:8000')
    dispatch({
      type: types.SOCKET,
      payload: socket,
    })
    return () => {
      unsubscribe()
      socket.close()
    }
  }, [dispatch])

  useEffect(() => {
    if (users.token) {
      dispatch(getPostsx())
      dispatch(getSuggestions())
    }
  }, [dispatch, users.token])
  useEffect(() => {
    // const newPeer = new Peer(undefined, {
    //   host: '/',
    //   port: '3001',
    // })
    const newPeer = new Peer(undefined, {
      path: '/',
      secure: true,
    })
    dispatch({
      type: typesMess.PEER,
      payload: newPeer,
    })
  }, [dispatch])
  return (
    <Suspense
      fallback={
        <div className="grid place-items-center h-screen w-full">
          <Spin tip="Đang tải dữ liệu" size="large" />
        </div>
      }
    >
      {users && users.userDatas?.role !== 'admin' && <HeaderUser />}
      {users &&
        users.userDatas?.role !== 'admin' &&
        pathname !== '/' &&
        pathname !== '/admin/dashboard' && (
          <div className="px-4 bg-white hidden md:block">
            <NavBarDropdown />
          </div>
        )}
      {users && users.token && <SocketClient />}
      {call && <CallModal />}
      <Switch>
        <Route exact path={`/${PATHS.LOGIN}`} component={Login} />
        <Route exact path={`/${PATHS.REGISTER}`} component={Register} />
        <Route
          exact
          path={`/${PATHS.REGISTER}/${PATHS.COMPLETE}`}
          component={RegisterComplete}
        />
        <Route
          exact
          path={`/${PATHS.FORGOT}/${PATHS.PASSWORD}`}
          component={ForgotPassword}
        />

        <UserRoute
          exact
          path={`/${PATHS.USER}/${PATHS.HISTORY}`}
          component={History}
        />
        <UserRoute
          exact
          path={`/${PATHS.USER}/${PATHS.ADDRESS}`}
          component={UserAddress}
        />
        <UserRoute
          exact
          path={`/${PATHS.USER}/${PATHS.PROFILE}/:id`}
          component={UserProfile}
        />
        <UserRoute
          exact
          path={`/${PATHS.USER}/${PATHS.PASSWORD}`}
          component={Password}
        />
        <UserRoute
          exact
          path={`/${PATHS.USER}/${PATHS.WISHLIST}`}
          component={WishList}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.PASSWORD}`}
          component={AdminPassword}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.DASHBOARD}`}
          component={DashBoard}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.CATEGORY}`}
          component={CreateCategory}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.CATEGORY}/:slug`}
          component={UpdateCategory}
        />

        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.SUB_CATEGORY}`}
          component={CreateSubCategory}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.SUB_CATEGORY}/:slug`}
          component={UpdateSubCategory}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.AUTHOR}`}
          component={CreateAuthor}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.AUTHOR}/:slug`}
          component={UpdateAuthor}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.SUPPLIER}`}
          component={CreateSupplier}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.SUPPLIER}/:slug`}
          component={UpdateSupplier}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.PRODUCT}`}
          component={CreateProduct}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.PRODUCT}/:slug`}
          component={UpdateProduct}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.LIST_PRODUCTS}`}
          component={ListProduct}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.WAREHOUSE}`}
          component={CreateReceipt}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.LIST_WAREHOUSE}`}
          component={WareHouseList}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.OUT_WAREHOUSE}`}
          component={OutWareHouseList}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.INVENTORY_WAREHOUSE}`}
          component={InventoryWareHouseList}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.FEE}`}
          component={CreateFee}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.COUPON}`}
          component={CreateCoupon}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.ORDER}`}
          component={OrdersList}
        />
        <AdminRoute
          exact
          path={`/${PATHS.ADMIN}/${PATHS.USER}`}
          component={UsersList}
        />
        <Route exact path={`/${PATHS.PRODUCT}/:slug`} component={Product} />
        <Route
          exact
          path={`/${PATHS.CATEGORY}/:slug`}
          component={CategoryMainPage}
        />
        <Route
          exact
          path={`/${PATHS.SUB_CATEGORY}/:slug`}
          component={SubCategoryMainPage}
        />
        <Route exact path={`/${PATHS.CART}`} component={Cart} />
        <Route exact path={`/${PATHS.CHECKOUT}`} component={CheckOut} />
        <Route exact path={`/${PATHS.ADDRESS}`} component={Addressx} />
        <Route exact path={`/${PATHS.PAYMENT}`} component={Payment} />
        <Route exact path={`/${PATHS.HOME}`} component={Home} />
        <Route exact path={`/${PATHS.SHOP}`} component={Shop} />
        <Route exact path={`/${PATHS.COMMUNITY}`} component={Community} />
        <Route
          exact
          path={`/${PATHS.COMMUNITY}/${PATHS.PROFILE}/:id`}
          component={Profile}
        />
        <Route
          exact
          path={`/${PATHS.COMMUNITY}/${PATHS.MESSAGE}`}
          component={Messages}
        />
        <Route
          exact
          path={`/${PATHS.COMMUNITY}/${PATHS.MESSAGE}/:id`}
          component={Messages}
        />
      </Switch>
      {pathname !== '/admin/dashboard' && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Notify />
      <SideDrawer />
      <MessengerCustomerChat
        pageId="102783052012250"
        appId="1419843074891555"
      />
      <ConversationBot />
    </Suspense>
  )
}
export default App
