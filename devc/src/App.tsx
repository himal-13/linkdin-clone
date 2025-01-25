import Navbar from "./section-components/Navbar"
import './App.css'
import Leftbar from "./section-components/Leftbar"
import {  useEffect, useState } from "react"
import { useAuth } from "./context/AuthContext"
import { User } from "firebase/auth"
import Newsfeed from "./section-components/Newsfeed"

const App = () => {
  const[currentUser,setCurrentUser] = useState<User |null>(null)
  const[loading,setLoading] = useState(true)
  const{user} = useAuth();

  const fetchUser = async()=>{
    if(user){
      setCurrentUser(user)

    }

  }

  useEffect(()=>{
    const fetchData = async()=>{
    await fetchUser();
    setLoading(false)
    console.log(currentUser)

    }
    fetchData()

  },[])


  return (
    <div className="">
      {!loading?(
        <>
          <Navbar/>
        <main className="bg-gray-300 py-4 min-h-screen flex justify-center gap-[5vw]">
          <Leftbar/>
          <Newsfeed/>
        
        </main></>):(
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Loading...</h1>
        )
        }
    </div>
  )
}

export default App
