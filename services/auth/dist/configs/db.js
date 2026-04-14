import mongoose from 'mongoose';
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'urbanfood'
        });
        console.log("Database connected to mongo db");
    }
    catch (error) {
        console.log(error);
    }
};
export default connectDb;
