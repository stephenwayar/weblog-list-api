const Blog = require('../models/Blog')

exports.get_blogs = async (req, res, next) => {
  try{
    const request = await Blog.find({})
    res.json(request)
  }catch(error){
    next(error)
  }
}

exports.create_blog = async (req, res, next) => {
  let body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })

  try{
    const newBlog = await blog.save()
    res.json(newBlog)
  }catch(error){
    next(error)
  }
}