import UserSchema from "../../models/user.js";

const createUser = async (req, res) => {
  const { firstName, lastName, email, password, phone, dob } = req.body;
  const userDetails = {
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
  };

  try {
    let query = UserSchema.where({ email });

    query.findOne(async (err, existingUser) => {
      if (err) {
        return res.status(422).json({
          message: err.message,
        });
      }
      if (existingUser) {
        return res.status(422).json({
          error: "User already exists.",
        });
      } else {
        const myUser = await UserSchema.create(userDetails);
        res.status(201).json({
          success: true,
          message: `user with ${myUser._id} is created`,
        });
      }
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export default createUser;
