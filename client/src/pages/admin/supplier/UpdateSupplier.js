import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSupplier, updateSuppliers } from '../../../apis/supplier'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import FormSupplier from './FormSupplier'
import './Suppliers.scss'

const UpdateSupplier = ({ match }) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [name, setName] = useState('')
  // const [loading, setLoading] = useState(false)

  const { slug } = match.params
  useEffect(() => {
    loadSupplier()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const loadSupplier = () =>
    getSupplier(slug).then((au) => setName(au.data.supplier.name))
  function onFinish({ name }) {
    updateSuppliers(slug, { name })
      .then((res) => {
        // setLoading(false)
        setName('')
        toast.success(`Cập nhật '${res.data.supplier.name}' thành công `)
        history.push('/admin/supplier')
      })
      .catch((error) => {
        // setLoading(false)
        console.log(error.response.data)
        if (error.response.status === 400)
          toast.error(error.response.data.error)
      })
  }

  return (
    <React.Fragment>
      <Layouts>
        <SectionTitle>Nhà cung cấp</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-2">Cập nhật nhà cung cấp</h3>
          <Form
            form={form}
            onFinish={onFinish}
            fields={[
              {
                name: ['name'],
                value: name,
              },
            ]}
          >
            <FormSupplier />
          </Form>
        </div>
      </Layouts>
    </React.Fragment>
  )
}

UpdateSupplier.propTypes = {}

export default UpdateSupplier
