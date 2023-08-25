import data from "../data";

export default function handler(req, res) {
  const { Popular } = data;
  if (Popular) {
    res.status(200).json(Popular);
  } else {
    res.status(404).json({ error: "Data Not Found" });
  }
}
