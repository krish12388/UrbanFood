import jwt from "jsonwebtoken";
const isAuthorised = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "please login - no auth header" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "please login - no token" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken || !decodedToken.user) {
            return res.status(401).json({ message: "please login - invalid token" });
        }
        req.newuser = decodedToken.user;
        next();
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export default isAuthorised;
