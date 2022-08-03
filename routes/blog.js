const express = require('express')
const Router = express.Router()
const BlogController = require('../controllers/BlogController')

Router.get('/api/blogs', BlogController.get_blogs)

Router.post('/api/blogs', BlogController.create_blog)

Router.delete('/api/blogs/:id', BlogController.delete_blog)

Router.put('/api/blogs/:id', BlogController.update_blog)

module.exports = Router