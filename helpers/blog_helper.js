const dummy = (blogs) => {
  return blogs.length + 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const result = likes.reduce((total, num) => (total + num))
  return result
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const max = Math.max(...likes)

  const obj = blogs.find(blog => blog.likes === max )

  return {
    title: obj.title,
    author: obj.author,
    likes: Math.max(...likes)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}