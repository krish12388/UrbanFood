import { Router } from "express";
import { loginUser, updateRole, myProfile } from "../controllers/auth.js";
import isAuthorised from "../middleware/authmiddleware.js";
const UserRoute = Router();
UserRoute.post('/login', loginUser);
UserRoute.get('/myprofile', isAuthorised, myProfile);
UserRoute.put('/add/role', isAuthorised, updateRole);
export default UserRoute;
