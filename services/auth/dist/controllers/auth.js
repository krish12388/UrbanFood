import User from "../modals/userModal.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import OAuth2Client from "../configs/googleConfig.js";
const loginUser = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ message: "Code is required" });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET missing");
        }
        const googleRes = await OAuth2Client.getToken(code);
        OAuth2Client.setCredentials(googleRes.tokens);
        if (!googleRes.tokens.access_token) {
            return res.status(500).json({ message: "No access token" });
        }
        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
        const { name, email, picture } = userRes.data;
        if (!email) {
            return res.status(400).json({ message: "Email not found" });
        }
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email,
                name,
                image: picture,
            });
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.status(200).json({
            message: "Login success",
            token,
            user,
        });
    }
    catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(500).json({
            message: error.message || "Internal Server Error",
        });
    }
};
const updateRole = async (req, res) => {
    try {
        const user = req.newuser;
        console.log(user);
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
        const updateduser = await User.findOneAndUpdate({ _id: user._id }, { role: role }, { new: true });
        const updatedToken = jwt.sign({ updateduser }, process.env.JWT_SECRET, {
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
const myProfile = async (req, res) => {
    try {
        const user = req.newuser;
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export { loginUser, updateRole, myProfile };
