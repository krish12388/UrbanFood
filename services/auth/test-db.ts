import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testDb = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Successfully connected!");
        process.exit(0);
    } catch(err) {
        console.error("Connection failed:", err);
        process.exit(1);
    }
}
testDb();
