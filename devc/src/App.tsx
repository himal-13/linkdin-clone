import Navbar from "./section-components/Navbar"
import './App.css'
import Leftbar from "./section-components/Leftbar"
import {  useEffect, useState } from "react"
import Newsfeed from "./section-components/Newsfeed"

const App = () => {
  const[loading,setLoading] = useState(true)
  // const{user} = useAuth();

  const fetchUser = async()=>{
 

  }

  useEffect(()=>{
    const fetchData = async()=>{
    await fetchUser();
    setLoading(false)

    }
    fetchData()

  },[])


  return (
    <div className="">
      {!loading?(
        <>
          <Navbar/>
        <main className="bg-gray-300 py-4 min-h-screen flex justify-center gap-[5vw] relative top-[10vh]">
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
