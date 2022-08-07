const User = require('../models/User')

exports.get_users = async (req, res, next) => {
  try{
    const users = await User.find({}).populate('blogs')

    res.status(200).json(users)
  } catch(error){
    next(error)
  }
}