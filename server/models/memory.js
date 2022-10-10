/** @format */

import mongoose from "mongoose";

const memorySchema = mongoose.Schema({
  userID: {type: String, required: true},
  title: {type: String, required: true},
  image: {type: String, required: false},
  message: {type: String, required: true},
  date: {type: Date, required: true},
  postedOn: {type: Date, required: true, default: new Date()},
});

const MemorySchema = mongoose.model("memory", memorySchema);

export default MemorySchema;
