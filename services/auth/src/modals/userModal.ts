import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    role:string;
    image:string
}

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:null
    }
},{timestamps:true})
const user  =mongoose.model<IUser>("User",userSchema);
export default user;