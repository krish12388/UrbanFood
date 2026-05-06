import {Children, createContext, useEffect, type ReactNode} from "react"
import { useState } from "react"
import { authService } from "../main"
import axios from "axios"
import { AppContextType, User } from "../types"
const AppContext = createContext<AppContextType|undefined>(undefined)

interface AppProviderProps{
  children: ReactNode
}

export const AppContextProvider = ({children}:AppProviderProps)=>{
  const [user, setuser] = useState<User|null>(null);
  const [isAuth, setIsAuth] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [location, setLocation] = useState(null)
  const [LoadingLocation, setLoadingLocation] = useState(false)
  const [city, setcity ] = useState("fetching location....")

  async function fetchUser(){
    try {
      const token = localStorage.getItem("token")
      const {data} = await axios.get(`${authService}/api/user`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setuser(data.user)
      setIsAuth(true)
    } catch (error) {
      console.log(error,"error in fetcing user");
    }finally{
      setLoading(false)
    }

  }
  useEffect(()=>{fetchUser()},[])
  return <AppContext.Provider value={{isAuth,Loading,setisAuth,setLoading,setuser,user}}>{children}</AppContext.Provider>
}