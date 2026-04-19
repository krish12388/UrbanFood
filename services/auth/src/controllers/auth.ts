import { Request, Response } from "express";
import User, { IUser } from "../modals/userModal.js";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/authmiddleware.js";
const loginUser = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { name, email, picture, password } = req.body;
    if (!email || !name || !picture || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const allowedRoles = ["customer", "admin", "delivery"] as const;
      const { role } = req.body;
      
      if (role && !allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const user: IUser = await User.create({
        email: email,
        name: name,
        image: picture,
        password: password,
        role: role || null
      });

      const token = jwt.sign({ user }, process.env.JWT_SECRET! as string, {
        expiresIn: "1h",
      });

      return res
        .status(201)
        .json({ message: "User created successfully", token, user });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).newuser;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const allowedRoles = ["customer", "admin", "delivery"] as const;
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (!user._id) {
      return res.status(400).json({ message: "User not found" });
    }
    const updateduser = await User.findByIdAndUpdate(
      user._id,
      { role: role },
      { new: true },
    );

    const updatedToken = jwt.sign({ user }, process.env.JWT_SECRET! as string, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({
        message: "role updated successfully",
        updatedToken,
        user: updateduser,
      });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export { loginUser, updateRole };
