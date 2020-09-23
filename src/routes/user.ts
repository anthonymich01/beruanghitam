// Fake posts database

var posts = [
  { title: "Foo", body: "some foo bar" },
  { title: "Foo bar", body: "more foo bar" },
  { title: "Foo bar baz", body: "more foo bar baz" }
]

const list = (req: any, res: any) => {
  res.send({ posts: { title: "Posts", posts: posts } })
}

export default { list }
