import { GiSaveArrow } from "react-icons/gi"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";

const Leftbar = () => {
  const{user} = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    console.log(user)

  },[])


  return (
    <section className="w-[300px] bg-white h-fit relative rounded-2xl">
        <div className="h-[8vh] bg-stone-500"></div>
        <div className="text-center absolute top-[5vh] left-[50%] -translate-x-1/2 flex flex-col justify-center items-center">
            <MdAccountCircle className="text-7xl bg-white rounded-full" />

            <Link to={'/profile'}><h4 className="font-bold cursor-pointer hover:underline">{user?.email}</h4></Link>
            <h5 className="text-[14px]">Fullstack Developer</h5>
        </div>
        <div className="mt-[25vh] border-t-2 border-b-2 text-[14px] py-5">
            <p className="flex justify-between mx-4"><span>Profile view</span> <span className="font-bold">50</span></p>
            <p className="flex justify-between mx-4"><span>Post impression</span> <span className="font-bold">238</span></p>

        </div>
        <div className="">
            <button className="flex gap-1 justify-center items-center w-full py-2 hover:bg-gray-100" ><GiSaveArrow /> <span>Saved post</span></button>
            <button className="flex gap-1 justify-center items-center w-full py-2 hover:bg-gray-100 hover:rounded-lg" onClick={async()=>{await signOut(auth); navigate('/login')}}><CiLogout/> <span>Log out</span></button>
        </div>

        
    </section>
  )
}

export default Leftbar
