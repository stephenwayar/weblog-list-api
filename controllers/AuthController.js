const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Blog = require('../models/Blog')

exports.register_user = async (req, res) => {
  const { username, name, password } = req.body

  const user = await User.findOne({ username: username })

  if(user){
    return res.status(400).json({
      success: false,
      message: "There is a user with this username already"
    })
  }

  const newUser = new User({
    username,
    name,
    password
  })

  bcrypt.genSalt(10, (_err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err

      newUser.password = hash

      try{
        const savedUser = await newUser.save()

        res.status(201).json(savedUser)
      } catch(error){
        res.status(400).json({
          success: false,
          message: "Failed to save user"
        })
      }
    })
  })
}

exports.login_user = async (req, res) => {
}