import {  onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db, } from "../services/Firebase";
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { PostType } from "../section-components/Newsfeed";
// import { collection, getDoc, getDocs } from "firebase/firestore";


interface AuthContextType{
    user:User | null,
    dbUser:dbUserType | undefined,
    fetchdbUser:()=>void,
    alldbUser:dbUserType[] | undefined,


}
export interface dbUserType{
    id:string
    userName:string,
    email:string,
    blocked:[],
    following:string[],
    followers:[],
    savedPost:string[],
    posts:PostType[]
}
interface AuthProviderType{
    children:ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

 const AuthProvider:React.FC<AuthProviderType> =({children})=>{
    const[user,setUser] = useState< User |null>(null)
    const[loading,setLoading] = useState(true)
    const[alldbUser,setAlldbUser] = useState<dbUserType[] | undefined>()
    const[dbUser,setdbUser] = useState<dbUserType | undefined>()

    useEffect(()=>{
        setLoading(true)
        const unSubscribe = onAuthStateChanged(auth,(curentUser)=>{
            setUser(curentUser)

        })
    
        setLoading(false)

        return ()=>unSubscribe()

    },[])
    const fetchdbUser = async()=>{
        if(user){
            const userSnapshot =await getDocs(collection(db,'users'))
            const fetchData = userSnapshot.docs.map((d)=>({
                id:d.id,
                ...d.data()

            })as dbUserType)
            setAlldbUser(fetchData)
            setdbUser(fetchData.find((d)=>d.email == user.email))

        }
    }
    
    useEffect(()=>{
        fetchdbUser()

    },[user])

    return(
        <AuthContext.Provider value={{user,dbUser,fetchdbUser,alldbUser}}>
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
