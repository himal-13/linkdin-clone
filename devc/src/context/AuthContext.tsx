import {  onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db, } from "../services/Firebase";
import React from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { PostType } from "../section-components/Newsfeed";
// import { collection, getDoc, getDocs } from "firebase/firestore";


interface AuthContextType{
    user:User | null,
    dbUser:dbUserType | undefined,
    fetchdbUser:()=>void,
    alldbUser:dbUserType[] | undefined,
    userLoading:boolean


}
interface useDetailsType{
    bio:string,
    location:string,
    study:string,
    work:string
}
export interface dbUserType{
    id:string
    userName:string,
    email:string,
    blocked:[],
    following:string[],
    followers:string[],
    savedPost:string[],
    posts:PostType[],
    fullName:string,
    userDetails:useDetailsType ,
    joinDate:Timestamp
}
interface AuthProviderType{
    children:ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

 const AuthProvider:React.FC<AuthProviderType> =({children})=>{
    const[user,setUser] = useState< User |null>(null)
    const[userLoading,setUserLoading] = useState(true)
    const[alldbUser,setAlldbUser] = useState<dbUserType[] | undefined>()
    const[dbUser,setdbUser] = useState<dbUserType | undefined>()

    useEffect(()=>{
        setUserLoading(true)
        const unSubscribe = onAuthStateChanged(auth,(curentUser)=>{
            setUser(curentUser)
        
        })
    
        setUserLoading(false)

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
        <AuthContext.Provider value={{user,dbUser,fetchdbUser,alldbUser,userLoading}}>
            {!userLoading && children}
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
