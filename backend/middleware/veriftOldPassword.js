import bcrypt from "bcrypt";
import { getUserById } from "../models/usersModel";

export const verifyOldPassword = async (req, res, next) => {
  const { id } = req.params;
  const { oldPassword } = req.body;
  if (!oldPassword) {
    return res.status(404).json({ message: "old password is required" });
  }
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found with this ID" });
    }
    // validate password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "old password is invalid" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export default verifyOldPassword;
