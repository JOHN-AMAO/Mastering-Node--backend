const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  class: { type: String, required: false },
});

const UserModel = mongoose.model("Users", UserSchema);

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const BlogModel = mongoose.model("Blog", BlogSchema);

const data = () =>
  UserModel.create({
    name: "John",
    age: "18",
    class: "100L",
  });

module.exports = { data, UserModel, BlogModel };
