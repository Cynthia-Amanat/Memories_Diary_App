/** @format */

import MemorySchema from "../../models/memory.js";
import fs from "fs";

export const createMemories = async (req, res, next) => {
  const newImage = fs.readFileSync("public/" + req.file.filename, "base64");
  const {userID, title, message, image, date} = req.body;
  const memoryDetails = {
    userID,
    title,
    message,
    date,
  };
  try {
    const newMemory = await MemorySchema.create(memoryDetails);
    newMemory.image = newImage;
    newMemory.save();
    console.log("success");

    res.status(201).json({success: true, message: newMemory});
  } catch (error) {
    res.status(409).json({success: false, message: error.message});
  }
};
export default createMemories;
