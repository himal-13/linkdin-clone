import { MdAccountCircle, MdWork } from "react-icons/md";
import { useAuth } from "../context/AuthContext"
import Navbar from "../section-components/Navbar"
import UserAddPost from "../section-components/NewsFeedcomp/UserAddPost";
import Post from "../section-components/NewsFeedcomp/Post";
import { useEffect, useState } from "react";
import { PostType } from "../section-components/Newsfeed";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/Firebase";
import { useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import EditMyProfilePop from "./components/EditMyProfilePop";

const Profile = () => {
  const{user,dbUser,fetchdbUser} = useAuth()
  const[myPosts,setMyPosts] = useState<PostType[] | undefined>();
  const navigate = useNavigate();
  const[loading,setLoading] = useState(true)
  const[showEditMenu,setShowEditMenu] = useState(false)

  const fetchPosts=async()=>{
    if(dbUser){
      try{
        setLoading(true)
        const querrySnapshot = await getDocs(collection(db,'posts'));
      const fetchData =querrySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), 
      })as PostType)
      setMyPosts(fetchData.filter(pos=>pos.userId ===dbUser.userName || pos.rePostedby === dbUser.userName))
    }catch(e){
      console.log('error etching my posts',e)
      
    }finally{
      setLoading(false)
    }
    }
  }

  useEffect(()=>{

    const fetchData =async()=>{
      if(!user && !loading){
        navigate('/login')
        return;
      }
    await  fetchPosts()
    console.log(myPosts)


    }
fetchData()

  },[user,dbUser])
 
  return (
    <div className="">
        <Navbar/>
        <main className="bg-gray-300 w-screen min-h-screen flex justify-center">
          <main className=" pt-[10vh] w-[80%] sm:w-[60%] md:w-[40%] bg-white min-h-screen">
            <div className="text-center relative top-3  p-4 border-b-[1px] border-gray-200">
                <div className="flex justify-between ">
                  <MdAccountCircle className="text-7xl" />  
                  <button className="p-2 border-[1px] border-black font-bold self-end text-sm rounded-lg" onClick={()=>setShowEditMenu(true)}>edit profile</button>
                </div>               
                <div className="text-start">
                  <h4 className="font-bold  ">{dbUser?.fullName}</h4>
                  <h5 className="text-[14px] text-gray-500">@{dbUser?.userName}</h5>
                  <h4>{dbUser?.userDetails.bio}</h4>
                  <h4 className="flex items-center gap-1 text-gray-700 text-sm"><GrLocation />{dbUser?.userDetails.location}</h4>
                  <h4 className="flex gap-1 items-center  text-gray-700 text-sm"><MdWork/> works at {dbUser?.userDetails.work}/studied at {dbUser?.userDetails.study}</h4>
                </div>
                
                <div className="text-sm flex gap-2">
                  <span className="p-1 flex gap-[1px] hover:underline cursor-pointer"><span className="font-bold">{dbUser?.followers.length}</span>followers </span>
                  <span className="p-1 flex gap-[1px] hover:underline cursor-pointer"> <span className="font-bold">{dbUser?.following.length}</span>following</span>
                </div>
        
            </div>
            <div className={`${showEditMenu?'block':'hidden'}`}>
            < EditMyProfilePop closeMenu={()=>setShowEditMenu(false)}/>
            </div>
       
            <UserAddPost handleLoading={async()=>{}}/>
              <div className="">
                {
                 !loading || myPosts ? myPosts && myPosts.map((pos)=>(
                  <Post post={pos} key={pos.id} postUpdated={()=>{ fetchdbUser()}} />
                )):(
                  <div className="">
                   <h1>wait loading...</h1>
                  </div>
                )
              }
              {myPosts?.length ==0 && <p className="text-center py-2">You haven't post</p>}
              </div>
          </main>
        </main>
   

    </div>
  )
}

export default Profile
