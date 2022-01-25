const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    content: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
