import type React from "react";

export interface User{
  _id:string,
   name:string;
    email:string;
    password:string;
    role:string;
    image:string
}

export interface LocationData{
  latitude:string,
  longitude:string,
  formattedData:string
}

export interface AppContextType{
  user:User| null,
  loading: boolean,
  isAuth:boolean,
  setUser: React.Dispatch<React.SetStateAction<User|null>>;
  setisAuth:React.Dispatch<React.SetStateAction<boolean>>
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
}