const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

exports.get_blogs = async (req, res, next) => {
  try{
    const request = await Blog.find({}).populate('user')
    res.json(request)
  }catch(error){
    next(error)
  }
}

exports.create_blog = async (req, res, next) => {
  if (!request.token) {
    console.log('token is missing')
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const body = req.body

  const user = await User.findById(req.user.id)

  const blog = new Blog({
    user: user._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })

  try{
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    res.json(newBlog)
  }catch(error){
    next(error)
  }
}

exports.delete_blog = async (req, res) => {
  if (!request.token) {
    console.log('token is missing')
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  let ID = req.params.id

  const blogToDelete = await Blog.findById(ID)

  if(req.user.id !== blogToDelete.user.toString()){
    return res.status(401).json({
      success: false,
      message: "Unauthorised delete request"
    })
  }

  try{
    const deleteRequest = await Blog.findByIdAndDelete(ID)
    if(deleteRequest){
      res.status(200).json({
        success: true,
        message: "Delted sucessfully"
      })
    }else{
      res.status(400).json({
        suceess: false,
        message: "Blog has already been deleted from server"
      })
    }
  } catch (_error){
    res.status(400).json({
      suceess: false,
      message: "There was an error completing the request"
    })
  }
}

exports.update_blog = async (req, res, next) => {
  if (!request.token) {
    console.log('token is missing')
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const { title, authorr, url, likes } = req.body

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, authorr, url, likes },
      { new: true, runValidators: true, context: 'query' }
    )

    if(updatedBlog){
      return res.status(200).json(updatedBlog)
    }

    res.status(400).json({
      suceess: false,
      message: 'Blog resource does not exist on the server'
    })
  } catch(error){
    next(error)
  }
}