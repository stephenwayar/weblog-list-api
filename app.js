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
const { unknownEndpoint, errorHandler } = require('./middlewares/error')
const { tokenExtractor } = require('./middlewares/tokenExtractor')
const { userExtractor } = require('./middlewares/userExtractor')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))

app.use(tokenExtractor)

app.use(indexRouter)
app.use(authRouter)
app.use(userRouter)
app.use(userExtractor, blogRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app