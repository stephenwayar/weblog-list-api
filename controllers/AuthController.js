const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const logger = require('../utils/logger')

exports.register_user = async (req, res, next) => {
  const { username, name, password } = req.body

  const user = await User.findOne({ username: username })

  if(!(username && password)){
    return res.status(400).json({
      success: false,
      message: "Username and password is required"
    })
  }

  if(!password.length < 3){
    return res.status(400).json({
      success: false,
      message: "Password must be more than 3 char"
    })
  }

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
      } catch(error) {next(error)}
    })
  })
}

exports.login_user = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordIsCorrect = user ? await bcrypt.compare(password, user.password) : false

  if(!(user && passwordIsCorrect)){
    logger.info(user, passwordIsCorrect)
    return res.status(401).json({
      success: false,
      message: "Username or password is incorrect"
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  })
}