const express = require('express')
const Router = express.Router()
const BlogController = require('../controllers/BlogController')

Router.get('/api/blogs', BlogController.get_blogs)

Router.post('/api/blogs', BlogController.create_blog)

module.exports = Router