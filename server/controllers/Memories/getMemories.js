/** @format */

import MemorySchema from "../../models/memory.js";

const getMemories = async (req, res) => {
  try {
    const memories = await MemorySchema.find({userID: req.params.userID}).sort({postedOn: -1});

    res.status(201).json({success: true, data: memories});
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

export default getMemories;
