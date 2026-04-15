import { Request, Response } from "express";
import User from "../modals/userModal.js";
import jwt from 'jsonwebtoken'
export const loginUser = async (req:Request,res:Response)=>{
    try {
      const {name,email,picture,password} = req.body;
      if(!email || !name || !picture || !password){
        return res.status(400).json({message:"All fields are required"})
      }
      const user = await User.findOne({email:email});
      if(user){
        return res.status(400).json({message:"User already exists"})
      }
      else{
        const newUser = User.create({
          email:email,
          name:name,
          image:picture,
          password:password
        });
        const token = jwt.sign({newUser},process.env.JWT_SECRET! as string,{expiresIn:"1h"})
        return res.status(201).json({message:"User created successfully",
          token,
          user:newUser
        })
      }
    } catch (error:any) {
      return res.status(500).json({message:error.message})
    }
}