import data from "../data";

export default function handler(req, res) {
  const { Posts } = data;
  if (Posts) {
    res.status(200).json(Posts);
  } else {
    res.status(404).json({ error: "Data Not Found" });
  }
}
