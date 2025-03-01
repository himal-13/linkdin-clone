import { useEffect, useState } from "react"
import { PostType } from "../section-components/Newsfeed"
import { useAuth } from "../context/AuthContext"
import {  collection,  getDocs, } from "firebase/firestore"
import { db } from "../services/Firebase"
import Post from "../section-components/NewsFeedcomp/Post"
import Navbar from "../section-components/Navbar"
import { TbMoodEmpty } from "react-icons/tb";
import { useNavigate } from "react-router-dom"

const LikedPostsPage = () => {
  const[likedPosts,setLikedPosts] = useState<PostType[]|[]>([])
  const[loading,setLoading] = useState(true)
  const{dbUser} = useAuth()
  const navigate = useNavigate()

  const fetchLikedPosts= async()=>{
    if(dbUser){
              const querrySnapshot = await getDocs(collection(db,'posts'));
              const fetchData =querrySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(), 
                })as PostType)
                setLikedPosts(fetchData.filter((post)=>post.likedBy.includes(dbUser.id)))
                setLoading(false)

    }
    if(!dbUser && !loading){
        navigate('/login')

    }
  }




  useEffect(()=>{
    fetchLikedPosts()

  },[dbUser])


  return (
   <div className="min-h-screen w-screen bg-gray-400">
    <Navbar/>
    <main className=" mx-auto min-h-screen pt-[11vh] px-4 bg-white sm:w-[60%] lg:w-[40%]">
    <h1 className="text-3xl font-bold p-2 border-b-[1px] border-gray-300">Liked Posts</h1>
    {loading?<h1>loading...</h1>:(
    <div className="">
      {likedPosts.length !== 0? likedPosts.map((post)=>(
        <div className="border-[1px] relative border-gray-300 mb-2" key={post.id}>
          <Post post={post} postUpdated={fetchLikedPosts}/>
        </div>
      )):(
        <div className="flex flex-col items-center justify-center mt-4">
          <TbMoodEmpty className="text-3xl" />
          <h4 className="text-2xl"> Nothing to show here</h4>
        </div>
      )}
    </div>)}
    </main>
    
   </div>
  )
}

export default LikedPostsPage;
