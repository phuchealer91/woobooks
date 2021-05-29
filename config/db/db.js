const mongoose = require('mongoose')

async function connectDB(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log('Database connected!')
  } catch (error) {
    console.error('Database error', error)
  }
}

module.exports = { connectDB }
