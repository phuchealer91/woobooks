import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Table } from 'antd'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../../redux/actions/category'
import './SubCategories.scss'
const columns = [
  {
    title: 'Id',
    dataIndex: 'Id',
    key: 'Id',
  },
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
  },
  {
    title: 'Slug',
    dataIndex: 'Slug',
    key: 'Slug',
  },
  {
    title: 'Thao tác',
    dataIndex: '',
    key: 'x',
    render: (text, record) => (
      // <span
      //   className={`${this.props.className}-delete`}
      //   onClick={(e) => { this.onDelete(record.key, e); }}
      // >
      //   Delete
      // </span>

      <>
        <Button type="primary">Sửa</Button>
        <Button type="primary" danger>
          Xóa
        </Button>
      </>
    ),
  },
]
const ListSubCategories = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category.listCategories)
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  const dataSource =
    categories &&
    categories.map((item) => ({
      Id: item._id,
      Name: item.name,
      Slug: item.slug,
    }))

  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="list__category">
            <h3>Tất cả danh mục</h3>
            <Table dataSource={dataSource} columns={columns} rowKey="Id" />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

ListSubCategories.propTypes = {}

export default ListSubCategories
