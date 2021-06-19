## Setup Project
1. **Client**
- FIREBASE 
  * Thay đổi config khi tạo ở firebase 
 ```
 const firebaseConfig = {
  apiKey: 'AIzaSyDYCD0QAlLtayQvFEL2e-s1iD6fEuR5t6U',
  authDomain: 'ecommeres-8666c.firebaseapp.com',
  databaseURL: 'https://ecommeres-8666c.firebaseio.com',
  projectId: 'ecommeres-8666c',
  storageBucket: 'ecommeres-8666c.appspot.com',
  messagingSenderId: '502319789330',
  appId: '1:502319789330:web:99403c25fb852727ba2fcb',
  measurementId: 'G-VHC60VGCFS',
}
```
- STRIPE
  * Chỉnh sửa biến trong file .env 
 ```
REACT_APP_STRIPE_KEY=pk_test_51HrpPwFdX4LUv0XVNHEgVujg6IQWQu3GNpY4zn164NXUjX1Kxlg0eiTAIpmmRi1pRvjUeYUQLKSXoyhwa04JbQfy00wtkKDC7d 
 ```
- BIẾN REACT AUTH
  * Chỉnh url nếu cần
 ```
REACT_APP_REGISTER_REDIRECT_URL="http://localhost:3000/register/complete"
REACT_APP_FORGOT_PASSWORD_REDIRECT_URL="http://localhost:3000/login"
 ```
2. **Server**
- CLOUDINARY (Thư viện upload ảnh)
   * Vô file .env
   * Đăng ký account để upload image lên bên thứ 3 [Cloudinary](https://cloudinary.com/users/login)
   * Chỉnh sửa lại các biến dưới đây.
 ```
 CLOUDINARY_CLOUD_NAME=ecommerce-mp    
 CLOUDINARY_API_KEY=945425879786779   
 CLOUDINARY_API_SECRET=T2tSAEbcEjWdTllmTFmDb3PiOkw  
```
  * Nếu có làm cộng đồng -> Chỉnh sửa lại các biến trong file 'client\src\helpers\ImageUpload.js'
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
- STRIPE (Thanh toán online)
   * Đăng ký account rồi chỉnh sửa lại biến ở dưới [Stripe](https://dashboard.stripe.com/login)
 ```
 STRIPE_SECRET = sk_test_51HrpPwFdX4LUv0XVSVOUq420GtUMR1hlwefPypWRkQ6WDQFQUpwQYXGGCzCtVnzJXo7GOJuyuezGTgTFpQBaL01q00X01SQcZd
 ```
- DATABASE MONGODB CLOUD ALTAS 
   * Đăng ký account rồi bỏ url vào biến ở dưới [Mongodb](https://account.mongodb.com/account/login?nds=true)
   * TK - MK - tên db
 ```
 DB_URL=mongodb+srv://**admin**:**Phuc20010**@cluster0.tyabe.mongodb.net/**shop-mp**?retryWrites=true&w=majority
```
- FIREBASE 
   * File config lấy từ firebase: chatbot-mbooks-eb346328ebaa.json 
 
## Run Project
- Server 
   * yarn or npm i
   * yarn server or npm run server
- Client
   * cd /client
   * yarn or npm i
   * yarn start or npm run start
