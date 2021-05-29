const Order = require('../models/order.model')
const moment = require('moment')
const Product = require('../models/product.model')
module.exports.getOrders = async (req, res) => {
  const { page } = req.body
  const currentPage = page || 1
  const perPage = 10
  try {
    let allOrders = await Order.find({})
      .skip((currentPage - 1) * perPage)
      .sort('-createdAt')
      .populate('products.product')
      .limit(perPage)
      .exec()
    const orderTotal = await Order.find({}).estimatedDocumentCount().exec()
    return res.status(200).json({ orders: allOrders, orderTotal })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body
  try {
    const { products } = await Order.findOne({
      _id: orderId,
    }).exec()
    let updatedOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    ).exec()
    // increment sold, decrement quantity
    if (orderStatus === 'Hủy') {
      let bulk = products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: +item.count, sold: -item.count } },
          },
        }
      })
      // SD bulkWrite (Thực hiện nhiều thao tác)
      await Product.bulkWrite(bulk, {})
    }
    return res.status(200).json({ updatedOrderStatus, msg: 'Updated Success' })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.getTotalOrders = async (req, res) => {
  try {
    let totals = await Order.find({}).estimatedDocumentCount().exec()
    return res.status(200).json({ total: totals })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

// current week
const handleCurrentWeek = (req, res) => {
  let currentDate = moment()
  let weekStart = currentDate.clone().startOf('week')
  let weekEnd = currentDate.clone().endOf('week')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(weekStart), $lte: new Date(weekEnd) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
// Month ago
const handleMonthAgo = (req, res) => {
  let monthStart = moment().clone().subtract(1, 'months').startOf('month')
  let monthEnd = moment().clone().subtract(1, 'months').endOf('month')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(monthStart),
            $lte: new Date(monthEnd),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
// Current Month
const handleCurrentMonth = (req, res) => {
  let currentDate = moment()
  let monthStart = currentDate.clone().startOf('month')
  // let monthEnd = currentDate.clone().endOf('month')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(monthStart),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
// 365 day
const handleYear365 = (req, res) => {
  let day365 = moment().clone().subtract(365, 'days')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(day365),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
      { $sort: { _id: 1 } }, // and this will sort based on your date
    ])
      // .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

const handleDay7Ago = (req, res) => {
  let day7 = moment().clone().subtract(7, 'days')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(day7),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
      { $sort: { _id: -1 } }, // and this will sort based on your date
    ]).then((orderFilters) => {
      return res.status(200).json({ orderFilters })
    })
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.orderStatisticalByDate = async (req, res) => {
  try {
    if (req.body.value === 'day7Ago') {
      await handleDay7Ago(req, res)
    } else if (req.body.value === 'currentWeek') {
      await handleCurrentWeek(req, res)
    } else if (req.body.value === 'monthAgo') {
      await handleMonthAgo(req, res)
    } else if (req.body.value === 'currentMonth') {
      await handleCurrentMonth(req, res)
    } else {
      await handleYear365(req, res)
    }
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.orderStatisticalFilters = (req, res) => {
  const { startDate, endDate } = req.body
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.getOrdersCompleted = async (req, res) => {
  try {
    let OrdersCompleted = await Order.find({ orderStatus: 'Đã bàn giao' })
      .sort('-createdAt')
      .populate('products.product')
      .populate('applyCoupon')
      .exec()

    return res.status(200).json({ orders: OrdersCompleted })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.getTotalPriceDay = async (req, res) => {
  const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
  const endOfDay = new Date(
    new Date().setUTCHours(23, 59, 59, 999)
  ).toISOString()
  try {
    Order.aggregate([
      {
        $match: {
          orderStatus: 'Đã bàn giao',
          createdAt: {
            $gte: new Date(startOfDay),
            $lte: new Date(endOfDay),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderPriceTotal) => {
        return res.status(200).json({ orderPriceTotal })
      })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.getTotalPriceWeek = async (req, res) => {
  let currentDate = moment()
  let monthStart = currentDate.clone().startOf('week')
  let monthEnd = currentDate.clone().endOf('week')
  try {
    Order.aggregate([
      {
        $match: {
          orderStatus: 'Đã bàn giao',
          createdAt: {
            $gte: new Date(monthStart),
            $lte: new Date(monthEnd),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderPriceTotal) => {
        return res.status(200).json({ orderPriceTotal })
      })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.getTotalPriceMonth = async (req, res) => {
  let currentDate = moment()
  let weekStart = currentDate.clone().startOf('month')
  let weekEnd = currentDate.clone().endOf('month')
  try {
    Order.aggregate([
      {
        $match: {
          orderStatus: 'Đã bàn giao',
          createdAt: {
            $gte: new Date(weekStart),
            $lte: new Date(weekEnd),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderPriceTotal) => {
        return res.status(200).json({ orderPriceTotal })
      })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.getTotalPriceYear = async (req, res) => {
  let currentDate = moment()
  let yearStart = currentDate.clone().startOf('year')
  let yearEnd = currentDate.clone().endOf('year')
  try {
    Order.aggregate([
      {
        $match: {
          orderStatus: 'Đã bàn giao',
          createdAt: {
            $gte: new Date(yearStart),
            $lte: new Date(yearEnd),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderPriceTotal) => {
        return res.status(200).json({ orderPriceTotal })
      })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
// Thong ke trang thai don hang
module.exports.getTotalOrderStatusMonth = async (req, res) => {
  let currentDate = moment()
  let monthStart = currentDate.clone().startOf('month')
  let monthEnd = currentDate.clone().endOf('month')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(monthStart),
            $lte: new Date(monthEnd),
          },
        },
      },
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 },
        },
      },
    ])
      .sort({ _id: -1 })
      .then((orderStatus) => {
        return res.status(200).json({ orderStatus })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
// Thong ke top san pham ban chay
module.exports.getTopSellers = async (req, res) => {
  let currentDate = moment()
  let monthStart = currentDate.clone().startOf('month')
  let monthEnd = currentDate.clone().endOf('month')
  try {
    Order.aggregate([
      {
        $match: {
          orderStatus: 'Đã bàn giao',
          createdAt: {
            $gte: new Date(monthStart),
            $lte: new Date(monthEnd),
          },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'products.product',
        },
      },
      { $unwind: '$products' },
      { $sort: { 'products.product.sold': -1 } },
      {
        $limit: 8,
      },
    ]).then((products) => {
      return res.status(200).json({ products })
    })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

// module.exports.getTopSellers = async (req, res) => {
//   let currentDate = moment()
//   let monthStart = currentDate.clone().startOf('month')
//   let monthEnd = currentDate.clone().endOf('month')
//   try {
//     const products = await Order.find({
//       orderStatus: 'Đã bàn giao',
//       createdAt: {
//         $gte: new Date(monthStart),
//         $lte: new Date(monthEnd),
//       },
//     })
//       .populate('products.product', '_id title images price sold')
//       .sort({ products: -1 })
//       .exec()
//     return res.status(200).json({ products })
//   } catch (error) {
//     console.log('error', error)
//     return res.status(500).json({ msg: 'Server error' })
//   }
// }

module.exports.getNewOrders = async (req, res) => {
  try {
    let newOrders = await Order.find({})
      .sort('-createdAt')
      .populate('products.product')
      .limit(6)
      .exec()
    return res.status(200).json({ orders: newOrders })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

// Hủy đơn hàng
module.exports.orderCancelStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body
  try {
    const { products } = await Order.findOne({
      _id: orderId,
    }).exec()
    let updatedOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    ).exec()
    // increment sold, decrement quantity
    if (orderStatus === 'Hủy') {
      let bulk = products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: +item.count, sold: -item.count } },
          },
        }
      })
      // SD bulkWrite (Thực hiện nhiều thao tác)
      await Product.bulkWrite(bulk, {})
    } else {
      let bulk = products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -item.count, sold: +item.count } },
          },
        }
      })
      // SD bulkWrite (Thực hiện nhiều thao tác)
      await Product.bulkWrite(bulk, {})
    }

    return res.status(200).json({ updatedOrderStatus, msg: 'Updated Success' })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.removeOrder = async (req, res) => {
  const { orderId, orderStatus } = req.body
  try {
    const { products } = await Order.findOne({
      _id: orderId,
    }).exec()
    await Order.findOneAndRemove({
      _id: orderId,
    }).exec()

    // Không cộng lại
    if (orderStatus !== 'Đã bàn giao' && orderStatus !== 'Hủy') {
      let bulk = products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: +item.count, sold: -item.count } },
          },
        }
      })
      // SD bulkWrite (Thực hiện nhiều thao tác)
      await Product.bulkWrite(bulk, {})
    }

    return res.status(200).json({ msg: 'Delete success' })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
