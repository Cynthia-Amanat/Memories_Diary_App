/** @format */

// import UserSchema from "../../models/user.js";
import MemorySchema from "../../models/memory.js";

const getUser = async (req, res) => {
  const {id} = req.body;

  try {
    // const user = await UserSchema.findOne({ _id: id }); // keep it safe for testing
    const memories = await MemorySchema.find({userID: id});

    res.status(200).json({success: true, message: memories});
  } catch (err) {
    res.status(400).json({success: false, message: err.message});
  }
};

export default getUser;
