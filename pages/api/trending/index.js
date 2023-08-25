import data from "../data";

export default function handler(req, res) {
  const { Trending } = data;
  if (Trending) {
    res.status(200).json(Trending);
  } else {
    res.status(404).json({ error: "Data Not Found" });
  }
}
