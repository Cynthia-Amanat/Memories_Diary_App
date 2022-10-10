/** @format */

import UserSchema from "../../models/user.js";
import mongoose from "mongoose";

const deleteUser = async (req, res) => {
  const {id} = req.body;
  console.log(id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `user not found with ${id}`});

    await UserSchema.findByIdAndDelete(id);
    res.json({success: true, message: `user with id ${id} deleted successfully`});
  } catch (error) {
    console.log(error.message);
  }
};
export default deleteUser;
