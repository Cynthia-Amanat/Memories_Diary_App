import MemorySchema from "../../models/memory.js";
import mongoose from "mongoose";
const updateMemory = async (req, res) => {
  const { id, title, message, image, dateAndTime, postedOn } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {
      title,
      message,
      image,
      dateAndTime,
      postedOn,
      _id: id,
    };

    await MemorySchema.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
  } catch (error) {
    console.log(error.message);
  }
};

export default updateMemory;
