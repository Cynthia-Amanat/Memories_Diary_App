/** @format */

import UserSchema from "../models/user.js";

const login = async (req, res) => {
  const {email, password} = req.body;

  const isUser = await UserSchema.findOne({email});
  if (isUser) {
    if (isUser.password === password) {
      res.status(200).json({
        success: true,
        message: `User ${isUser.email} has been successfully logged in`,
        data: isUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Invalid Password",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid email or No User found with this email",
    });
  }
};

export default login;
