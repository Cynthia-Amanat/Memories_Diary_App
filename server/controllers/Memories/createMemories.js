import MemorySchema from "../../models/memory.js";

export const createMemories = async (req, res) => {
  const { userID, title, message, image, dateAndTime, postedOn } = req.body;
  console.log(req.body);
  const memoryDetails = {
    userID,
    title,
    message,
    image,
    dateAndTime,
    postedOn,
  };

  try {
    const newMemory = await MemorySchema.create(memoryDetails);
    res.status(201).json({ success: true, message: newMemory });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export default createMemories;
