import { GoogleApis } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const google = new GoogleApis();

const OAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "auth message"
);  

export default OAuth2Client;