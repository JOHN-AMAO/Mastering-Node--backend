const express = require("express");
const http = require("node:http");
const axios = require("axios");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 5000;
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const { UserModel, BlogModel } = require("./models/data");

const server = http.createServer(app);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ name: "My name is John" });
});

app.get("/api", async (req, res) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  res.json(response.data);
});

app.get("/api/database", async (req, res) => {
  const data = await UserModel.find();
  res.json(data);
});
app.get("/blog", async (req, res) => {
  const data = await BlogModel.find();
  res.json(data);
});

app.get("/api/database/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = await UserModel.findById(_id);
  res.json(data);
});
app.delete("/api/database/:_id", async (req, res) => {
  const { _id } = req.params;
  await UserModel.findByIdAndDelete(_id);
});

app.post("/api/database", async (req, res) => {
  const data = req.body;
  await UserModel.create(data);
});

app.listen(port, () => {
  console.log(`your app is running at http://localhost:${port}`);
});
const db = () => mongoose.connect(MONGO_URL);
db();
mongoose.connection.on("error", (error) => {
  console.log(error);
});
