import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";

const Leftbar = () => {
  const{user,dbUser} = useAuth()
  const navigate = useNavigate()

  return (
    <section className="w-[300px] bg-white h-fit relative rounded-2xl hidden sm:block">
{user?(
    <>
          <div className="h-[8vh] bg-stone-500"></div>
          <div className="text-center absolute top-[5vh] left-[50%] -translate-x-1/2 flex flex-col justify-center items-center">
              <MdAccountCircle className="text-7xl bg-white rounded-full" />
  
              <Link to={'/profile'}><h4 className="font-bold cursor-pointer hover:underline">{dbUser?.userName}</h4></Link>
              <h5 className="text-[14px]">{dbUser?.userDetails.bio}</h5>
          </div>
          <div className="mt-[25vh] border-t-2 border-b-2 text-[14px] py-5">
              <p className="flex justify-between mx-4"><span>Followers</span> <span className="font-bold">{dbUser?.followers.length}</span></p>
              <p className="flex justify-between mx-4"><span>Following</span> <span className="font-bold">{dbUser?.following.length}</span></p>
  
          </div>
          <div className="">
              <button onClick={()=>navigate('/savedposts')} className="flex gap-1 justify-center items-center w-full py-2 hover:bg-gray-100" ><FaBookmark /><span>Saved post</span></button>
              <button onClick={()=>navigate('/likedposts')} className="flex gap-1 justify-center items-center w-full py-2 hover:bg-gray-100" > <BiSolidLike /><span>Liked Post</span></button>
              <button className="flex gap-1 justify-center items-center w-full py-2 hover:bg-gray-100 hover:rounded-lg" onClick={async()=>{await signOut(auth); navigate('/login')}}><CiLogout/> <span>Log out</span></button>
          </div>
  
      </>  
):(
  <div className=" p-4 text-center">
         <div className="h-[10vh] bg-stone-500"></div>
          <div className="text-center absolute top-[5vh] left-[50%] -translate-x-1/2 flex flex-col justify-center items-center">
              <MdAccountCircle className="text-7xl bg-white rounded-full" />
  
              <Link to={'/profile'}><h4 className="font-bold cursor-pointer hover:underline">{dbUser?.userName}</h4></Link>
              <h5 className="text-[14px]">{dbUser?.userDetails.bio}</h5>
          </div>
          <div className="py-4">
            <h2>You haven't login</h2>
            <button className="bg-blue-500 text-white p-2 rounded-xl" onClick={()=>navigate('/login')}>Sign in</button>
          </div>
    </div>
)}
    </section>
  )
}

export default Leftbar
