import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("Provide all details...❌");
    }


    const user = await User.findOne({ email:email }); 
    if (user) {
      throw new Error("User already exist with this email...❌"); 
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      error: false,
      message: "User registered successfully...✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password} = req.body;


    if (!email || !password) {
      throw new Error("Please Provide All Details...❌");
    }

    let user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") }, 
    });

    if (!user) {
      throw new Error("User not found with this email...❌");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Incorrect email or password...❌");
    }


    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };


    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
       sameSite:"None"
      })
      .json({
        success: true,
        error: false,
        message: `Welcome back ${user.username}...✅`,
        data: user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.id;

    let user = await User.findById(userId)

    if (!user) {
      throw new Error("User not found ");
    }


    return res
      .status(200)
      .json({
        success: true,
        error: false,
        message: `user✅`,
        data: user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      error: false,
      message: "User logged out successfully...✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};