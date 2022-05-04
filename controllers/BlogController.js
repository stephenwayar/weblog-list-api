const Blog = require('../models/Blog')

exports.get_blogs = (req, res, next) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  }).catch(error => next(error))
}

exports.create_blog = (req, res, next) => {
  let body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save().then(newBlog => {
    res.json(newBlog)
  }).catch(error => next(error))
}