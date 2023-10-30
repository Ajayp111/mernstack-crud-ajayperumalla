const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let students = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    rollno: {
      type: Number,
    },
    branch: {
      type: String,
    },
  },
  {
    collection: "students",
  }
);
module.exports = mongoose.model("Student", students);
