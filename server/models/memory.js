import mongoose from "mongoose";

const memorySchema = mongoose.Schema({
  userID: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  message: { type: String, required: true },
  dateAndTime: { type: Date, required: true },
  postedOn: { type: Date, required: true },
});

const MemorySchema = mongoose.model("memory", memorySchema);

export default MemorySchema;
