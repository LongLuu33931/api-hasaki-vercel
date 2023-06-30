import mongoose, { Schema } from "mongoose";

const Slide = mongoose.model(
  "Slide",
  new Schema({
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  })
);

export default Slide;
