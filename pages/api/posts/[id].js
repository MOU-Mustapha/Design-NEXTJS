import data from "../data";

export default function handler(req, res) {
  const { id } = req.query;
  const { Posts } = data;
  const post = Posts.find((post) => post.id == id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Post Not Found" });
  }
}
