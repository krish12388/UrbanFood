import User from "../modals/userModal.js";
import jwt from 'jsonwebtoken';
export const loginUser = async (req, res) => {
    try {
        const { email, name, picture } = req.body;
        if (!email || !name || !picture) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            const newUser = User.create({
                email: email,
                name: name,
                image: picture
            });
            const token = jwt.sign({ newUser }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(201).json({ message: "User created successfully",
                token,
                newUser
            });
        }
        return res.status(400).json({ message: "User already exists" });
    }
    catch (error) {
    }
};
