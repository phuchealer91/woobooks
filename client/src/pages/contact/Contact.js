import {
  EnvironmentOutlined,
  FieldTimeOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons'
import React from 'react'

const iframe = `<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8525363227486!2d105.77278441411121!3d10.029025175287186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08823dda9a779%3A0xa2ca35be274e8d47!2zSOG6u20gNCBN4bqtdSBUaMOibiwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1622599958377!5m2!1sen!2s"
width="80%"
height="450"
style="border:0;"
allowfullscreen=""
loading="lazy"
></iframe>`
function Contact(props) {
  function Iframe(props) {
    return (
      <div
        style={{ display: 'grid', placeItems: 'center' }}
        dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }}
      />
    )
  }
  return (
    <div className="mx-6 py-6 bg-white">
      <div>
        <h3 className="text-2xl text-center font-semibold text-gray-600">
          Thông tin liên hệ
        </h3>
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center justify-center">
            <span className="text-blue-600 my-3" style={{ fontSize: '32px' }}>
              <WhatsAppOutlined />
            </span>
            <h3 className="font-semibold text-sm mb-1">Số điện thoại</h3>
            <span>0966197305</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-blue-600 my-3" style={{ fontSize: '32px' }}>
              <EnvironmentOutlined />
            </span>
            <h3 className="font-semibold text-sm mb-1">Địa chỉ</h3>
            <span>Số 44, hẻm 4, Mậu Thân, Ninh Kiều, TP Cần Thơ</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-blue-600 my-3" style={{ fontSize: '32px' }}>
              <FieldTimeOutlined />
            </span>
            <h3 className="font-semibold text-sm mb-1">Thời gian hoạt động</h3>
            <span>Từ: 8:00 AM Đến 21:00 PM</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-blue-600 my-3" style={{ fontSize: '32px' }}>
              <MailOutlined />
            </span>
            <h3 className="font-semibold text-sm mb-1">Email</h3>
            <span>support@workbook.com</span>
          </div>
        </div>
      </div>
      <div className="my-5">
        <Iframe iframe={iframe} />
      </div>
    </div>
  )
}

export default Contact
