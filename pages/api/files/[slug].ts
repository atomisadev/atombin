import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (mongoose.connections[0].readyState) {
  console.log("Already connected.");
} else {
  mongoose.connect(MONGODB_URI).catch((err) => console.log(err));
}

const fileSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  content: String,
});

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
  } = req;

  if (req.method === "GET") {
    const file = await File.findById(slug);
    res.status(200).json({ content: file.content });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
