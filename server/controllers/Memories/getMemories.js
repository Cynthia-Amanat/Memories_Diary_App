import MemorySchema from "../../models/memory.js";
import mongoose from "mongoose";

const getMemories = async (req, res) => {
  try {
    const memories = await MemorySchema.find();
    res.status(201).json(memories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default getMemories;
