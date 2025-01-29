import {  onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth} from "../services/Firebase";
import React from "react";


interface AuthContextType{
    user:User | null,


}
interface AuthProviderType{
    children:ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

 const AuthProvider:React.FC<AuthProviderType> =({children})=>{
    const[user,setUser] = useState< User |null>(null)
    const[loading,setLoading] = useState(true)



    useEffect(()=>{
        setLoading(true)
        const unSubscribe = onAuthStateChanged(auth,(curentUser)=>{
            setUser(curentUser)

        })
        setLoading(false)

        return ()=>unSubscribe()

    },[])

    return(
        <AuthContext.Provider value={{user}}>
            {!loading && children}
        </AuthContext.Provider>
        
       
    );

};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
  
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
  
    return context;
  };
