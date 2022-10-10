/** @format */

import MemorySchema from "../../models/memory.js";

const getMemories = async (req, res) => {
  try {
    const memories = await MemorySchema.find({userID: req.params.userID});

    res.status(201).json(memories);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

export default getMemories;
