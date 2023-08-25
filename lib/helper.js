const baseURL = "http://localhost:3000/api";

export default async function getPosts(id) {
  const res = await fetch(`${baseURL}/posts`);
  const posts = await res.json();
  if (id) {
    return posts.find((post) => post.id == id);
  }
  return posts;
}
