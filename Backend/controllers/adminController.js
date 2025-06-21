import User from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("-password");
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }

    if (users.length === 0) {
      return res.json({ message: "No user in database" });
    }

    return res.status(200).json({
      success: true,
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    next();
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (req.user.id.toString() === userId.toString()) {
      return res
        .status(404)
        .json({ success: false, message: "You cannot delete yourself" });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next();
  }
};
