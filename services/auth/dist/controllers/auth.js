import User from "../modals/userModal.js";
import jwt from "jsonwebtoken";
const loginUser = async (req, res) => {
    try {
        const { name, email, picture, password } = req.body;
        if (!email || !name || !picture || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        else {
            const user = await User.create({
                email: email,
                name: name,
                image: picture,
                password: password,
            });
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res
                .status(201)
                .json({ message: "User created successfully", token, user: user });
            const allowedRoles = ["customer", "admin", "delivery"];
            const { role } = req.body;
            if (!allowedRoles.includes(role)) {
                return res.status(400).json({ message: "Invalid role" });
            }
            if (!user._id) {
                return res.status(400).json({ message: "User not found" });
            }
            const updateduser = await User.findByIdAndUpdate(user._id, { role: role }, { new: true });
            const updatedToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res
                .status(201)
                .json({
                message: "User created successfully",
                updatedToken,
                user: updateduser,
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const updateRole = async (req, res) => {
    try {
        const user = req.newuser;
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const allowedRoles = ["customer", "admin", "delivery"];
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
        const updateduser = await User.findByIdAndUpdate(user._id, { role: role }, { new: true });
        const updatedToken = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res
            .status(201)
            .json({
            message: "role updated successfully",
            updatedToken,
            user: updateduser,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export { loginUser, updateRole };
