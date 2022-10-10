/** @format */
import UserSchema from "../../models/user.js";
import MemorySchema from "../../models/memory.js";
import mongoose from "mongoose";

const deleteUser = async (req, res) => {
  const {id} = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `user not found with ${id}`});

    // Find a deleted all the memories
    const memories = await MemorySchema.find({userID: id});
    memories.forEach(async (memory) => await MemorySchema.findOneAndDelete({userID: id}));

    // Delete the User
    await UserSchema.findByIdAndDelete(id);

    res.status(200).json({success: true, message: `user with id ${id} deleted successfully`});
  } catch (error) {
    res.status(400).json({success: false, message: error.message});
  }
};
export default deleteUser;
