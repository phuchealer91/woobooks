const User = require('../models/user.model')

module.exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user
  const user = await User.findOneAndUpdate(
    { email },
    { name: name ? name : email.split('@')[0], photoURL: picture },
    { new: true }
  )
  if (user) {
    res.json(user)
  } else {
    const newUser = await new User({
      email,
      name: name ? name : email.split('@')[0],
      photoURL: picture,
    }).save()
    res.json(newUser)
  }
}

module.exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate(
      'followers following'
    )
    if (!user) return res.status(400).json({ error: 'User does not exits' })
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}
module.exports.getNotifications = async (req, res, next) => {
  // TODO: Lấy 8 thông báo cuối cùng của user
  const { userId } = req
  const { page = 1 } = req.query

  try {
    const userData = await User.findOne({ email: req.user.email })
    const user = await User.findById(userData._id, {
      'notifications.newNotifications': 1,
      'notifications.list': { $slice: [-8 * +page, 8] },
    }).populate({
      path: 'notifications.list.logId',
      populate: {
        path: 'userId',
        select: 'name photoURL',
      },
    })

    if (user.notifications.newNotifications) {
      user.notifications.newNotifications = 0
      await user.save()
    }

    res.json({ notifications: user.notifications.list })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports.notificationUpdate = async (req, res) => {
  try {
    const userNotify = await User.findOne({
      email: req.user.email,
      role: 'admin',
    })
    res.json(userNotify)
  } catch (err) {
    console.log(err)
  }
}
