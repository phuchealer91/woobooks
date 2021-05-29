import { TagOutlined } from '@ant-design/icons'
import { DatePicker, Form, Input, Select } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
const { Option } = Select

const FormCreateProduct = ({
  onChange,
  onSearch,
  product,
  onChangeCategory,
  onChangeAuthor,
  onChangeSupplier,
  categorySubss,
  showSub,
  suppliers,
  authors,
  setProduct,
  arrayOfSubs,
  arrayOfAuthors,
  categories,
  setArrayOfSubs,
  setArrayOfAuthors,
  selectedCategory,
}) => {
  const { languages, layouts } = product
  return (
    <React.Fragment>
      <Form.Item
        rules={[
          {
            required: false,
            message: 'Tên sản phẩm không được để trống',
          },
          { min: 3, message: 'Tên sản phẩm phải có ít nhất 3 ký tự.' },
          { max: 100, message: 'Tên sản phẩm tối đa có 100 ký tự.' },
        ]}
        name="title"
        label="Tên sản phẩm"
      >
        <Input prefix={<TagOutlined />} placeholder="Nhập tên sản phẩm " />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: false,
            message: 'Danh mục không được để trống',
          },
        ]}
        name="description"
        label="Thông tin chi tiết"
      >
        <Input
          prefix={<TagOutlined />}
          placeholder="Nhập thông tin chi tiết của sản phẩm"
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: false,
            message: 'Số trang không được để trống',
          },
        ]}
        name="pages"
        label="Số trang"
      >
        <Input
          prefix={<TagOutlined />}
          placeholder="Nhập số trang của sản phẩm"
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: false,
            message: 'Nhà sản xuất không được để trống',
          },
        ]}
        name="publisher"
        label="Nhà sản xuất"
      >
        <Input
          prefix={<TagOutlined />}
          placeholder="Nhập nhà sản xuất của sản phẩm"
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: false,
            message: 'Ngày xuất bản không được để trống',
          },
        ]}
        name="publication"
        label="Ngày xuất bản"
        // initialValue={publication}
      >
        <DatePicker format={`DD-MM-YYYY`} />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: false,
            message: 'Giá tiền không được để trống',
          },
        ]}
        name="price"
        label="Giá tiền"
      >
        <Input
          type="number"
          min="0"
          max="100000000"
          prefix={<TagOutlined />}
          placeholder="Nhập giá tiền của sản phẩm"
        />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: false,
            message: 'Danh mục không được để trống',
          },
        ]}
        name="quantity"
        label="Số lượng"
      >
        <Input
          type="number"
          min="1"
          max="1000"
          prefix={<TagOutlined />}
          placeholder="Nhập số lượng của sản phẩm"
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: false,
            message: 'Giảm giá không được để trống',
          },
        ]}
        name="sale"
        label="Giảm giá"
      >
        <Input
          type="number"
          min="1"
          max="1000"
          prefix={<TagOutlined />}
          placeholder="Nhập số phần trăm giảm giá"
        />
      </Form.Item>
      <Form.Item label="Layout" name="layout">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn hình thức"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {layouts &&
            layouts.map((c) => (
              <Option value={c} key={c}>
                {c}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Ngôn ngữ"
        name="lang"
        rules={[
          {
            required: false,
            message: 'Ngôn ngữ không được để trống',
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn ship"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {languages &&
            languages.map((b) => (
              <Option value={b} key={b}>
                {b}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Tác giả"
        rules={[
          {
            required: false,
            message: 'Tác giả không được để trống',
          },
        ]}
      >
        <Select
          showSearch
          mode="multiple"
          style={{ width: 200 }}
          placeholder="Chọn tác giả"
          optionFilterProp="children"
          value={arrayOfAuthors}
          onChange={(value) => setArrayOfAuthors(value)}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {authors &&
            authors.map((ca) => (
              <Option value={ca._id} key={ca._id}>
                {ca.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Nhà cung cấp"
        name="supplier"
        rules={[
          {
            required: false,
            message: 'Nhà cung cấp không được để trống',
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn nhà cung cấp"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {suppliers &&
            suppliers.map((ca) => (
              <Option value={ca._id} key={ca._id}>
                {ca.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Danh mục"
        // name="category"
        rules={[
          {
            required: false,
            message: 'Danh mục không được để trống',
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn danh mục"
          optionFilterProp="children"
          onChange={onChangeCategory}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {categories.length > 0 &&
            categories.map((ca) => (
              <Option value={ca._id} key={ca._id}>
                {ca.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Thể loại"
        rules={[
          {
            required: true,
            message: 'Thể loại không được để trống',
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Chọn thể loại"
          // defaultValue={['a10', 'c12']}
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {categorySubss.length &&
            categorySubss.map((cs) => (
              <Option value={cs._id} key={cs._id}>
                {cs.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Button htmlType="submit" type="primary" className="category__btn">
        Thêm
      </Button>
    </React.Fragment>
  )
}
FormCreateProduct.propTypes = {}

export default FormCreateProduct
