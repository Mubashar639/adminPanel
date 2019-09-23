const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  path: {
    type: String,
    required: true,
    unique: true
  },
  isRoot: {
    type: Boolean,
    default: false
  },
  children: {
    type: [String]
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Categories = mongoose.model("Category", categorySchema);
module.exports = Categories;