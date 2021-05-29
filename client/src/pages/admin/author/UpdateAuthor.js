import { Button, Form, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuthor, updateAuthors } from '../../../apis/author'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import './Authors.scss'
import FormAuthor from './FormAuthor'

const UpdateAuthor = ({ match }) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)

  const { slug } = match.params
  useEffect(() => {
    loadAuthor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const loadAuthor = () =>
    getAuthor(slug).then((au) => {
      setName(au.data.author.name)
      setBio(au.data.author.bio)
    })
  function onFinish({ name }) {
    updateAuthors(slug, { name, bio })
      .then((res) => {
        setLoading(false)
        setName('')
        setBio('')
        toast.success(`Cập nhật '${res.data.author.name}' thành công `)
        history.push('/admin/author')
      })
      .catch((error) => {
        setLoading(false)
        if (error.response.status === 400)
          toast.error(error.response.data.error)
      })
  }
  function onHandleChange(value) {
    setBio(value)
  }

  return (
    <React.Fragment>
      <Layouts>
        <SectionTitle>Tác giả</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          {loading ? (
            <Spin tip="Loading..." />
          ) : (
            <h3 className="text-sm text-gray-600 pb-2"> Cập nhật tác giả</h3>
          )}
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
            <FormAuthor />
            <div className="pb-2 -mt-2">Thông tin của tác giả</div>
            <ReactQuill
              value={bio}
              onChange={onHandleChange}
              placeholder="Điền thông tin của tác giả"
              className="mb-3"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="py-2 rounded font-semibold"
            >
              Thêm
            </Button>
          </Form>
        </div>
      </Layouts>
    </React.Fragment>
  )
}

UpdateAuthor.propTypes = {}

export default UpdateAuthor
