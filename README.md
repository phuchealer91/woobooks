## Setup Project
1. Client

2. Server
 **Vô file .env**
- Đăng ký account để upload image lên bên thứ 3 [Cloudinary](https://cloudinary.com/users/login)
- Chỉnh sửa lại các biến dưới đây.
```
 CLOUDINARY_CLOUD_NAME=ecommerce-mp    
 CLOUDINARY_API_KEY=945425879786779   
 CLOUDINARY_API_SECRET=T2tSAEbcEjWdTllmTFmDb3PiOkw  
```
- Nếu có làm cộng đồng -> Chỉnh sửa lại các biến trong file 'client\src\helpers\ImageUpload.js'
    
```
formData.append('upload_preset', 'wppoal56')
    formData.append('cloud_name', 'ecommerce-mp')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/ecommerce-mp/upload',
      {
        method: 'POST',
        body: formData,
      }
   )
```
    
## Run Project
