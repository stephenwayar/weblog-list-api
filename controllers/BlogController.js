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

exports.delete_blog = async (req, res) => {
  let ID = req.params.id

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