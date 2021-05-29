const Product = require('../models/product.model')
const slugify = require('slugify')
const User = require('../models/user.model')
module.exports.createProduct = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title)
    const productExists = await Product.findOne({ slug: req.body.slug })
    if (productExists)
      return res.status(400).json({ error: 'Product đã tồn tại' })
    const newProduct = new Product(req.body)
    await newProduct.save()
    return res.status(201).json({ product: newProduct })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.getListAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate('author')
      .populate('supplier')
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']])
      .exec()
    if (!products)
      return res.status(400).json({ error: 'Products không tồn tại' })
    return res.status(200).json({ products })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('author')
      .populate('supplier')
      .populate('category')
      .populate('subs')
      .exec()
    if (!product)
      return res.status(400).json({ error: 'Product không tồn tại' })
    return res.status(200).json({ product })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.getProductsCount = async (req, res) => {
  try {
    const productTotal = await Product.find({}).estimatedDocumentCount().exec()
    return res.status(200).json({ total: productTotal })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.getListProducts = async (req, res) => {
  try {
    const { sort, order, page } = req.body
    const currentPage = page || 1
    const perPage = 10

    const listProducts = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('author')
      .populate('supplier')
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec()
    return res.status(200).json({ products: listProducts })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.getListProductSale = async (req, res) => {
  try {
    const { page } = req.body
    const currentPage = page || 1
    const perPage = 10

    const listProducts = await Product.find({ sale: { $gt: 0 } })
      .skip((currentPage - 1) * perPage)
      .populate('author')
      .populate('supplier')
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']])
      .limit(perPage)
      .exec()
    const productTotal = await Product.find({ sale: { $gt: 0 } })
      .estimatedDocumentCount()
      .exec()
    return res.status(200).json({ products: listProducts, productTotal })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.getListRelated = async (req, res) => {
  const { productId } = req.params
  try {
    const product = await Product.findById({ _id: productId }).exec()
    const related = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .limit(4)
      .populate('author')
      .populate('supplier')
      .populate('category')
      .populate('subs')
      // .populate('postedBy')
      .exec()
    return res.status(200).json({ products: related })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.updateProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const productUpdated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec()
    if (!productUpdated)
      return res.status(400).json({ error: 'Update product failed' })
    return res.status(200).json({ product: productUpdated })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec()
    return res.status(200).json({ deleted })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.productReivews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).exec()
    const user = await User.findOne({ email: req.user.email }).exec()
    const { rating, comment } = req.body
    let existingRatingObj = product.reviews.find(
      (ele) => ele.postedBy.toString() === user._id.toString()
    )
    if (existingRatingObj === undefined) {
      let reviewAdd = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: {
            reviews: { name: user.name, rating, comment, postedBy: user._id },
          },
        },
        { new: true }
      ).exec()
      return res
        .status(200)
        .json({ reviews: reviewAdd, msg: 'Review add success' })
    } else {
      let reviewUpdate = await Product.updateOne(
        {
          reviews: { $elemMatch: existingRatingObj },
        },
        { $set: { 'reviews.$.rating': rating, 'reviews.$.comment': comment } },
        { new: true }
      ).exec()
      return res
        .status(200)
        .json({ reviews: reviewUpdate, msg: 'Review update success' })
    }
    // product.ratings =
    //   product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    //   product.reviews.length
    // return await product.save()
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
const handleQuery = async (req, res, query) => {
  try {
    const products = await Product.find({ $text: { $search: query } })
      .populate('category', '_id name')
      .populate('author', '_id name')
      .populate('supplier', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec()
    return res.status(200).json({ products })
  } catch (error) {
    console.log('error', error)
  }
}
const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate('category', '_id name')
      .populate('author', '_id name')
      .populate('supplier', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec()

    return res.status(200).json({ products })
  } catch (err) {
    console.log(err)
  }
}
const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('author', '_id name')
      .populate('supplier', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec()

    return res.status(200).json({ products })
  } catch (err) {
    console.log(err)
  }
}
const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: '$$ROOT',
        floorAverage: {
          $floor: {
            $avg: '$reviews.rating',
          },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log('AGGREGATE ERROR', err)
      Product.find({ _id: aggregates })
        .populate('category', '_id name')
        .populate('author', '_id name')
        .populate('supplier', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec((err, products) => {
          if (err) console.log('PRODUCT AGGREGATE ERROR', err)
          return res.status(200).json({ products })
        })
    })
}

const handleSub = async (req, res, subs) => {
  try {
    let products = await Product.find({ subs })
      .populate('category', '_id name')
      .populate('author', '_id name')
      .populate('supplier', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec()

    return res.status(200).json({ products })
  } catch (err) {
    console.log(err)
  }
}
const handleLayout = async (req, res, layout) => {
  try {
    let products = await Product.find({ layout })
      .populate('category', '_id name')
      .populate('author', '_id name')
      .populate('supplier', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec()

    return res.status(200).json({ products })
  } catch (err) {
    console.log(err)
  }
}
module.exports.productSearchFilters = async (req, res) => {
  try {
    const { query, price, category, stars, subs, layout } = req.body
    // text
    if (query) {
      await handleQuery(req, res, query.trim())
    }
    // price
    if (price !== undefined) {
      await handlePrice(req, res, price)
    }
    // category
    if (category) {
      await handleCategory(req, res, category)
    }
    // stars
    if (stars) {
      await handleStar(req, res, stars)
    }
    // sub category
    if (subs) {
      await handleSub(req, res, subs)
    }
    // layout
    if (layout) {
      await handleLayout(req, res, layout)
    }
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.getProductsRating = (req, res) => {
  try {
    Product.aggregate([
      {
        $match: {},
      },
      // {
      //   $project: { reviews: 1 },
      // },
      {
        $unwind: '$reviews',
      },
      {
        $group: {
          _id: 0,
          count: { $sum: 1 },
        },
      },
    ]).then((err, ratings) => {
      console.log('raitngs', err)
      return res.status(200).json({ ratings })
    })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
