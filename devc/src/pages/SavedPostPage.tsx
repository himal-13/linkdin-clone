import { useEffect, useState } from "react"
import { PostType } from "../section-components/Newsfeed"
import { useAuth } from "../context/AuthContext"
import { arrayRemove, collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../services/Firebase"
import Post from "../section-components/NewsFeedcomp/Post"
import Navbar from "../section-components/Navbar"
import { FaBookmark } from "react-icons/fa"
import { TbMoodEmpty } from "react-icons/tb";

const SavedPostPage = () => {
  const[savedPosts,setSavedPosts] = useState<PostType[]|[]>([])
  const[loading,setLoading] = useState(true)
  const{dbUser,fetchdbUser} = useAuth()

  const fetchSavedPosts= async()=>{
    setLoading(true)
    if(dbUser){
              const querrySnapshot = await getDocs(collection(db,'posts'));
              const fetchData =querrySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(), 
                })as PostType)
                setSavedPosts(fetchData.filter((post)=>dbUser.savedPost.includes(post.id)))
                setLoading(false)

    }
    if(!dbUser && !loading){

    }
  }




  useEffect(()=>{
    fetchSavedPosts()

  },[dbUser])
  const removeSaved = async(postId:string)=>{
    if(dbUser){
    const userRef = doc(db,'users',dbUser.id)
        await updateDoc(userRef,{
            savedPost:arrayRemove(postId)
        })
    fetchdbUser()
    await fetchSavedPosts()

    }
  }

  return (
   <div className="min-h-screen w-screen bg-gray-400">
    <Navbar/>
    <main className=" mx-auto min-h-screen pt-[11vh] px-4 bg-white sm:w-[60%] lg:w-[40%]">
    <h1 className="text-3xl font-bold p-2 border-b-[1px] border-gray-300">Saved Posts</h1>
    {loading?<h1>loading...</h1>:(
    <div className="">
      {savedPosts.length !== 0? savedPosts.map((post)=>(
        <div className="border-[1px] relative border-gray-300 mb-2" key={post.id}>
          <h4 className="absolute bottom-10 right-2 flex flex-col items-center cursor-pointer" onClick={()=>removeSaved(post.id)}><span>remove </span><FaBookmark /></h4>
          <Post post={post} postUpdated={fetchSavedPosts}/>
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

export default SavedPostPage;
