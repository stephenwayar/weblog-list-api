require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

require("./database/mongodb")
const indexRouter = require('./routes/index')
const blogRouter = require('./routes/blog')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))

app.use(indexRouter)
app.use(authRouter)
app.use(userRouter)
app.use(blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app