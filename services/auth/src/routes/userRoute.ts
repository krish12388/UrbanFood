import { Router,Request,Response } from "express";
import { loginUser } from "../controllers/auth.js";

const UserRoute = Router();

UserRoute.post('/login',loginUser);

export default UserRoute;