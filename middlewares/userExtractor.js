const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
  if (!request.token) {
    console.log('token is missing')
    return next()
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET, (err, result) => {
    if(err) return null
    return result
  })

  if(!decodedToken){
    console.log('token present but invalid')
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  request.user = decodedToken

  next()
}

module.exports = { userExtractor }