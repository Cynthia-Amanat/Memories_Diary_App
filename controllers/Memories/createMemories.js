/** @format */

import MemorySchema from "../../models/memory.js";
import fs from "fs";

export const createMemories = async (req, res, next) => {
  const {userID, title, message, date} = req.body;
  const memoryDetails = {
    userID,
    title,
    message,
    date,
  };
  try {
    // Create Memory with details
    const newMemory = await MemorySchema.create(memoryDetails);

    // if Image upload Image else do not save image
    if (req.file) {
      newMemory.image = fs.readFileSync("public/" + req.file.filename, "base64");
    }
    newMemory.save();
    res.status(201).json({success: true, message: newMemory});
  } catch (error) {
    res.status(409).json({success: false, message: error.message});
  }
};
export default createMemories;
