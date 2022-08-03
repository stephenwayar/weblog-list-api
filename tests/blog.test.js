const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const dummy = require('../helpers/blog_helper').dummy
const totalLikes = require('../helpers/blog_helper').totalLikes
const favoriteBlog = require('../helpers/blog_helper').favoriteBlog

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

describe('Blog', () => {
  test('blog returns 1', () => {
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('Total likes', () => {
  test('sum of likes', () => {
    const likes = totalLikes(blogs)
    expect(likes).toBe(36)
  })
})

describe('Favourite blog', () => {
  test('highest number of likes', () => {
    const favorite = favoriteBlog(blogs)
    expect(favorite).toStrictEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})

describe('Blog requests', () => {
  test('get all blog posts', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
  }, 50000)

  test('creates new blog post', async () => {
    const newBlog = {
      title: "Jest config",
      author: "Mike Brody",
      url: "facebook.com",
      likes: 34
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
  }, 50000)

  test('confirms db identifyer is id', async () => {
    const request = await api.get('/api/blogs')
    expect(request.body[0].id).toBeDefined()
  }, 50000)

  test('confirms that if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: "Mongoose config",
      author: "Jack Man",
      url: "facebook.com",
    }

    const request = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(request.body.likes).toBe(0)
  }, 50000)

  test('verifies that the title and url properties are present', async () => {
    const newBlog = {
      author: "Jack Man",
    }

    const request = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(400)
  }, 50000)

  test('deleting a blog', async () => {
    await api
      .delete('/api/blogs/62e8e27dadd1d224191dbfd4')
      .expect(200)
  })

  test.only('updating a blog', async () => {
    const blog = {
      title: "JWT Auth",
      author: "Steve",
      likes: 33
    }
    await api
      .put('/api/blogs/62e8e6c5ac172a79e0c2962b')
      .send(blog)
      .expect(200)
  }, 50000)
})