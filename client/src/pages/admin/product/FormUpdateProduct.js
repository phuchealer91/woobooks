import { TagOutlined } from '@ant-design/icons'
import { DatePicker, Form, Input, Select } from 'antd'
import Button from 'antd/lib/button'
import moment from 'moment'
import React from 'react'
const { Option } = Select

const FormUpdateProduct = ({
  handleSubmit,
  handleChange,
  onChange,
  onSearch,
  product,
  onChangeCategory,
  onChangeAuthor,
  onChangeSupplier,
  categorySubss,
  showSub,
  authors,
  setProduct,
  arrayOfSubs,
  arrayOfAuthors,
  setArrayOfSubs,
  setArrayOfAuthors,
  selectedCategory,
  values,
  setValues,
  categories,
  suppliers,
}) => {
  const {
    title,
    description,
    price,

    category,
    subs,
    sale,
    quantity,
    totalQuantity,
    pages,
    author,
    supplier,
    publisher,
    publication,
    images,
    layouts,
    languages,
    layout,
    lang,
  } = values

  return (
    <form onSubmit={handleSubmit} className="mx-0 w-full">
      <div className="my-5 px-4">
        <div className="my-2 flex items-center justify-between">
          <span>Tiêu đề sách</span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề sách"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
            required
          />
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Tóm tắt sách</span>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Nhập tóm tắt sách"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
            required
          />
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Số trang</span>
          <input
            type="number"
            name="pages"
            value={pages}
            onChange={handleChange}
            placeholder="Nhập số trang sách"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
            required
          />
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Nhà sản xuất</span>
          <input
            type="text"
            name="publisher"
            value={publisher}
            onChange={handleChange}
            placeholder="Nhập tên nhà sản xuất"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
            required
          />
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Ngày xuất bản</span>
          <input
            type="date"
            name="publication"
            value={moment(publication).format('YYYY-MM-DD')}
            onChange={handleChange}
            placeholder="Nhập ngày xuất bản"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
            required
          />
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Giá sách</span>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="Nhập giá sách"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
            required
          />
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Số lượng</span>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            placeholder="Nhập số lượng sách"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
          />
        </div>

        <div className="my-2 flex items-center justify-between">
          <span>Giảm giá</span>
          <input
            type="number"
            name="sale"
            value={sale}
            onChange={handleChange}
            placeholder="Nhập số phần trăm giảm"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
          />
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Hình thức</span>
          <select
            type="select"
            name="layout"
            placeholder="Chọn hình thức sách"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
            value={layout}
            defaultValue="Chọn hình thức sách"
            onChange={handleChange}
            required
          >
            <option value="">Chọn hình thức sách</option>
            {layouts &&
              layouts.map((lay, idx) => {
                return (
                  <option key={idx} value={lay}>
                    {lay}
                  </option>
                )
              })}
          </select>
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Ngôn ngữ</span>
          <select
            type="select"
            name="lang"
            placeholder="Chọn ngôn ngữ"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
            value={lang}
            defaultValue="Chọn ngôn ngữ"
            onChange={handleChange}
            required
          >
            <option value="">Chọn ngôn ngữ</option>
            {languages &&
              languages.map((lan, idx) => {
                return (
                  <option key={idx} value={lan}>
                    {lan}
                  </option>
                )
              })}
          </select>
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Nhà cung cấp</span>
          <select
            type="select"
            name="supplier"
            placeholder="Chọn nhà cung cấp"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
            value={supplier._id}
            defaultValue="Chọn nhà cung cấp"
            onChange={handleChange}
            required
          >
            <option value="">Chọn nhà cung cấp</option>
            {suppliers &&
              suppliers.map((sup, idx) => {
                return (
                  <option key={sup._id} value={sup._id}>
                    {sup.name}
                  </option>
                )
              })}
          </select>
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Tác giả</span>
          <Select
            mode="multiple"
            placeholder="Chọn tác giả"
            className="ml-2 w-align"
            style={{ borderRadius: '4px', padding: '8px 0' }}
            defaultValue="Chọn tác giả"
            value={arrayOfAuthors}
            onChange={(value) => setArrayOfAuthors(value)}
            required
          >
            {authors.length &&
              authors.map((cs, idx) => {
                return (
                  <Option key={cs._id} value={cs._id}>
                    {cs.name}
                  </Option>
                )
              })}
          </Select>
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Danh mục</span>
          <select
            type="select"
            name="category"
            placeholder="Chọn danh mục sách"
            className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
            value={selectedCategory ? selectedCategory : category._id}
            defaultValue="Chọn danh mục sách"
            onChange={onChangeCategory}
            required
          >
            <option value="">Chọn danh mục sách</option>
            {categories.length > 0 &&
              categories.map((ca, idx) => {
                return (
                  <option key={ca._id} value={ca._id}>
                    {ca.name}
                  </option>
                )
              })}
          </select>
        </div>
        <div className="my-2 flex items-center justify-between">
          <span>Chọn loại sách</span>
          <Select
            mode="multiple"
            placeholder="Chọn loại sách"
            className="ml-2 w-align"
            style={{ borderRadius: '4px', padding: '8px 0' }}
            defaultValue="Chọn loại sách"
            value={arrayOfSubs}
            onChange={(value) => setArrayOfSubs(value)}
            required
          >
            {categorySubss.length &&
              categorySubss.map((cs, idx) => {
                return (
                  <Option key={cs._id} value={cs._id}>
                    {cs.name}
                  </Option>
                )
              })}
          </Select>
        </div>
      </div>
      <button
        className="text-white font-semibold bg-blue-500 hover:bg-blue-600 w-1/4 px-4 py-2 rounded"
        type="submit"
      >
        Lưu
      </button>
    </form>
    // <React.Fragment>
    //   <Form.Item
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Tên sản phẩm không được để trống',
    //       },
    //       { min: 3, message: 'Tên sản phẩm phải có ít nhất 3 ký tự.' },
    //       { max: 100, message: 'Tên sản phẩm tối đa có 100 ký tự.' },
    //     ]}
    //     name="title"
    //     label="Tên sản phẩm"
    //   >
    //     <Input prefix={<TagOutlined />} placeholder="Nhập tên sản phẩm " />
    //   </Form.Item>
    //   <Form.Item
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Danh mục không được để trống',
    //       },
    //     ]}
    //     name="description"
    //     label="Thông tin chi tiết"
    //   >
    //     <Input
    //       prefix={<TagOutlined />}
    //       placeholder="Nhập thông tin chi tiết của sản phẩm"
    //     />
    //   </Form.Item>
    //   <Form.Item
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Số trang không được để trống',
    //       },
    //     ]}
    //     name="pages"
    //     label="Số trang"
    //   >
    //     <Input
    //       prefix={<TagOutlined />}
    //       placeholder="Nhập số trang của sản phẩm"
    //     />
    //   </Form.Item>
    //   <Form.Item
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Nhà sản xuất không được để trống',
    //       },
    //     ]}
    //     name="publisher"
    //     label="Nhà sản xuất"
    //   >
    //     <Input
    //       prefix={<TagOutlined />}
    //       placeholder="Nhập nhà sản xuất của sản phẩm"
    //     />
    //   </Form.Item>
    //   <Form.Item
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Ngày xuất bản không được để trống',
    //       },
    //     ]}
    //     name="publication"
    //     label="Ngày xuất bản"
    //     // initialValue={publication}
    //   >
    //     <DatePicker format={`DD-MM-YYYY`} />
    //   </Form.Item>

    //   <Form.Item
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Giá tiền không được để trống',
    //       },
    //     ]}
    //     name="price"
    //     label="Giá tiền"
    //   >
    //     <Input
    //       type="number"
    //       min="0"
    //       max="100000000"
    //       prefix={<TagOutlined />}
    //       placeholder="Nhập giá tiền của sản phẩm"
    //     />
    //   </Form.Item>

    //   <Form.Item
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Danh mục không được để trống',
    //       },
    //     ]}
    //     name="quantity"
    //     label="Số lượng"
    //   >
    //     <Input
    //       type="number"
    //       min="1"
    //       max="1000"
    //       prefix={<TagOutlined />}
    //       placeholder="Nhập số lượng của sản phẩm"
    //     />
    //   </Form.Item>
    //   <Form.Item
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Giảm giá không được để trống',
    //       },
    //     ]}
    //     name="sale"
    //     label="Giảm giá"
    //   >
    //     <Input
    //       type="number"
    //       min="1"
    //       max="1000"
    //       prefix={<TagOutlined />}
    //       placeholder="Nhập số phần trăm giảm giá"
    //     />
    //   </Form.Item>
    //   <Form.Item label="Layout" name="layout">
    //     <Select
    //       showSearch
    //       style={{ width: 200 }}
    //       placeholder="Chọn hình thức"
    //       optionFilterProp="children"
    //       onChange={onChange}
    //       onSearch={onSearch}
    //       filterOption={(input, option) =>
    //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //       }
    //     >
    //       {layouts &&
    //         layouts.map((c) => (
    //           <Option value={c} key={c}>
    //             {c}
    //           </Option>
    //         ))}
    //     </Select>
    //   </Form.Item>
    //   <Form.Item
    //     label="Ngôn ngữ"
    //     name="lang"
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Ngôn ngữ không được để trống',
    //       },
    //     ]}
    //   >
    //     <Select
    //       showSearch
    //       style={{ width: 200 }}
    //       placeholder="Chọn ship"
    //       optionFilterProp="children"
    //       onChange={onChange}
    //       onSearch={onSearch}
    //       filterOption={(input, option) =>
    //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //       }
    //     >
    //       {languages &&
    //         languages.map((b) => (
    //           <Option value={b} key={b}>
    //             {b}
    //           </Option>
    //         ))}
    //     </Select>
    //   </Form.Item>
    //   <Form.Item
    //     label="Tác giả"
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Tác giả không được để trống',
    //       },
    //     ]}
    //   >
    //     <Select
    //       showSearch
    //       mode="multiple"
    //       style={{ width: 200 }}
    //       placeholder="Chọn tác giả"
    //       optionFilterProp="children"
    //       value={arrayOfAuthors}
    //       onChange={(value) => setArrayOfAuthors(value)}
    //       onSearch={onSearch}
    //       filterOption={(input, option) =>
    //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //       }
    //     >
    //       {authors &&
    //         authors.map((ca) => (
    //           <Option value={ca._id} key={ca._id}>
    //             {ca.name}
    //           </Option>
    //         ))}
    //     </Select>
    //   </Form.Item>
    //   <Form.Item
    //     label="Nhà cung cấp"
    //     name="supplier"
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Nhà cung cấp không được để trống',
    //       },
    //     ]}
    //   >
    //     <Select
    //       showSearch
    //       style={{ width: 200 }}
    //       placeholder="Chọn nhà cung cấp"
    //       optionFilterProp="children"
    //       onChange={onChange}
    //       onSearch={onSearch}
    //       filterOption={(input, option) =>
    //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //       }
    //     >
    //       {suppliers &&
    //         suppliers.map((ca) => (
    //           <Option value={ca._id} key={ca._id}>
    //             {ca.name}
    //           </Option>
    //         ))}
    //     </Select>
    //   </Form.Item>
    //   <Form.Item
    //     label="Danh mục"
    //     // name="category"
    //     rules={[
    //       {
    //         required: false,
    //         message: 'Danh mục không được để trống',
    //       },
    //     ]}
    //   >
    //     <Select
    //       showSearch
    //       style={{ width: 200 }}
    //       placeholder="Chọn danh mục"
    //       optionFilterProp="children"
    //       onChange={onChangeCategory}
    //       onSearch={onSearch}
    //       filterOption={(input, option) =>
    //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //       }
    //     >
    //       {categories.length > 0 &&
    //         categories.map((ca) => (
    //           <Option value={ca._id} key={ca._id}>
    //             {ca.name}
    //           </Option>
    //         ))}
    //     </Select>
    //   </Form.Item>
    //   <Form.Item
    //     label="Thể loại"
    //     rules={[
    //       {
    //         required: true,
    //         message: 'Thể loại không được để trống',
    //       },
    //     ]}
    //   >
    //     <Select
    //       mode="multiple"
    //       allowClear
    //       style={{ width: '100%' }}
    //       placeholder="Chọn thể loại"
    //       // defaultValue={['a10', 'c12']}
    //       value={arrayOfSubs}
    //       onChange={(value) => setArrayOfSubs(value)}
    //     >
    //       {categorySubss.length &&
    //         categorySubss.map((cs) => (
    //           <Option value={cs._id} key={cs._id}>
    //             {cs.name}
    //           </Option>
    //         ))}
    //     </Select>
    //   </Form.Item>

    //   <Button htmlType="submit" type="primary" className="category__btn">
    //     Thêm
    //   </Button>
    // </React.Fragment>
  )
}
FormUpdateProduct.propTypes = {}

export default FormUpdateProduct
