import UserSchema from "../../models/user.js";
import mongoose from "mongoose";

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, phone, dob } = req.body;

  const updateUser = {
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
  };

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: `no user found with id ${id}` });
    await UserSchema.findByIdAndUpdate(id, updateUser);
    res.status(200).json(updateUser);
  } catch (error) {}
};

export default updateUser;
