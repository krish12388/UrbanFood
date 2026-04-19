import { Router,Request,Response } from "express";
import { loginUser,updateRole } from "../controllers/auth.js";
import isAuthorised from "../middleware/authmiddleware.js";

const UserRoute = Router();

UserRoute.post('/login',loginUser);
UserRoute.put('/add/role',isAuthorised,updateRole)

export default UserRoute;