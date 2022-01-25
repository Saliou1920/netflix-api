const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    imageFeatured: {
      type: String,
      required: [true, "Image is required"],
    },
    imageTitle: {
      type: String,
      required: [true, "Image is required"],
    },
    imagePoster: {
      type: String,
      required: [true, "Image is required"],
    },
    trailer: {
      type: String,
      required: [true, "Trailer is required"],
    },
    video: {
      type: String,
      required: [true, "Video is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1900, "Year must be at least 1900"],
    },
    rating: {
      type: Number,
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
