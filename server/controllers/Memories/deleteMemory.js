import MemorySchema from "../../models/memory.js";
import mongoose from "mongoose";

const deleteMemory = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `No post with ${id}` });

    await MemorySchema.findByIdAndRemove(id);
    res.json({ message: "Deleted successfully " });
  } catch (error) {
    console.log(error.message);
  }
};

export default deleteMemory;
