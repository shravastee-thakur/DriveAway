import User from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(402)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      phoneNumber,
      password,
      role,
    });

    return res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("newRefreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid Token" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById({ _id: decoded.id, refreshToken });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    const newAccessToken = generateAccessToken(user);
    const newrefreshToken = generateRefreshToken(user);

    user.refreshToken = newrefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("refreshToken", newrefreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        accessToken: newAccessToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(204);

    const user = await User.findOne({ refreshToken: token });
    if (user) {
      (user.refreshToken = ""), await user.save();
    }

    return res
      .status(200)
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};
