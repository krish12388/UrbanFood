import { NextFunction, Request, Response } from "express";
import jwt,{JwtPayload} from "jsonwebtoken";
import { IUser } from "../modals/userModal.js";

export interface AuthenticatedRequest extends Request {
  newuser?: IUser | null;
}

const isAuthorised = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
      return res.status(401).json({ message: "please login - no auth header" });
    }
    const token = authHeader.split(" ")[1];
    if(!token){
      return res.status(401).json({ message: "please login - no token" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    if(!decodedToken || !decodedToken.user){
      return res.status(401).json({ message: "please login - invalid token" });
    }
    (req as AuthenticatedRequest).newuser = decodedToken.user;
    next();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default isAuthorised;
