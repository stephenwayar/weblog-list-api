const dummy = (blogs) => {
  return blogs.length + 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)

  const result = likes.reduce((total, num) => {
    return total + num
  })

  return result
}

module.exports = { dummy, totalLikes }