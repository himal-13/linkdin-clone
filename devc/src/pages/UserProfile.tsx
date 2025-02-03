import { MdWork } from "react-icons/md";
import { dbUserType, useAuth } from "../context/AuthContext"
import Navbar from "../section-components/Navbar"
import UserAddPost from "../section-components/NewsFeedcomp/UserAddPost";
import { FaUniversity } from "react-icons/fa";
import Post from "../section-components/NewsFeedcomp/Post";
import { useEffect, useState } from "react";
import { PostType } from "../section-components/Newsfeed";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/Firebase";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const params = useParams();
  const[currentdbUser,setCurrentdbUser] = useState<dbUserType | undefined>()
  const{user,dbUser,fetchdbUser,alldbUser} = useAuth()
  const[myPosts,setMyPosts] = useState<PostType[] | undefined>();
  // const navigate = useNavigate();
  const[loading,setLoading] = useState(true)

  const fetchPosts=async()=>{
    if(dbUser){
      try{
        setLoading(true)
        const querrySnapshot = await getDocs(collection(db,'posts'));
      const fetchData =querrySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), 
      })as PostType)
      setMyPosts(fetchData.filter(pos=>pos.userId === params.userId))
    }catch(e){
      console.log('error etching my posts',e)
      
    }finally{
      setLoading(false)
    }
    }
  }
  const fetchUserData=async()=>{
    if(alldbUser){
      setCurrentdbUser(alldbUser.find((data)=>data.userName === params.userId))


    }

  
  }

  useEffect(()=>{

    const fetchData =async()=>{
        await fetchUserData()
    await  fetchPosts()
    console.log(myPosts)


    }
fetchData()

  },[user,dbUser])
 
  return (
    <div className="">
        <Navbar/>
        <main className="bg-gray-300 w-screen min-h-screen flex justify-center">
          <main className=" pt-[10vh] w-[80%] sm:w-[60%] md:w-[40%]  bg-white min-h-screen">
            <div className="text-center relative top-3 flex flex-col justify-center items-center ">
                <img src="./src/assets/profile-img/profile.jpg" height={70} width={70} className="rounded-full border-2 border-blue-600" alt="" />
                <h4 className="font-bold cursor-pointer hover:underline">{params.userId}</h4>
                <h5 className="text-[14px]">Fullstack Developer</h5>
                <div className="text-sm flex gap-2">
                  <span className="px-2 py-1 rounded-full bg-slate-300">followers {currentdbUser?.followers.length}</span>
                  <span className="px-2 py-1 rounded-full bg-slate-300">following {currentdbUser?.following.length}</span>
                </div>
        
            </div>
            <div className="m-4 p-2 border-y-[1px] border-gray-400 ">
                  <h4 className="flex gap-2 items-center"><MdWork/> Works at Microsoft</h4>
                  <h4 className="flex gap-2 items-center"><FaUniversity/> Studied at Harward University</h4>
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
              {myPosts?.length ==0 && <span>You haven't post</span>}
              </div>
          </main>
        </main>
   

    </div>
  )
}

export default UserProfile
