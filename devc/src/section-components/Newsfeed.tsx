import { useEffect, useState } from "react"
import Divider from "./NewsFeedcomp/Divider"
import UserAddPost from "./NewsFeedcomp/UserAddPost"
import { collection, getDocs, Timestamp } from "firebase/firestore"
import { db } from "../services/Firebase"
import Post from "./NewsFeedcomp/Post"
import PostSkeleton from "./NewsFeedcomp/PostSkeleton"


export interface PostType{
    id:string,
    content:string,
    createdAt:Timestamp,
    likedBy:string[],
    likes:number,
    repost:number,
    userId:string,
    edited:boolean,
    isReposted:boolean,
    rePostedby:string,
    rePostContent:string

}

const Newsfeed = () => {
    const[posts,setPosts]= useState<PostType[]>([])
    const[loading,setLoading] = useState(true)

    const fetchPost =async()=>{
      setLoading(true)
        try{
            const querrySnapshot = await getDocs(collection(db,'posts'));
            const fetchData =querrySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(), 
              })as PostType)
              setPosts(fetchData)
        }catch(er){
            // console.log(er)
        
        }finally{
          setLoading(false)
        }
    }
    const updatePost = async()=>{
      try{
        const querrySnapshot = await getDocs(collection(db,'posts'));
        const fetchData =querrySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(), 
          })as PostType)
          setPosts(fetchData)
    }catch(er){
        // console.log(er)
    
    }

    }

    useEffect(()=>{
        fetchPost()
        // console.log(posts)

    },[])

  return (
    <div className="min-h-screen w-[40%] ">
        <UserAddPost handleLoading={async()=>{await fetchPost()}}/>
        <Divider/>
        {loading?(
          [1,2,3,4,5].map((pos)=>(
            <PostSkeleton key={pos}/>
          ))
          
        ):(
          <div className="p-3  ">
          {posts && posts.map((post)=>(
            <Post post={post} key={post.id} postUpdated={async()=>{await updatePost()}} />
          ))}
        </div>
        )
      }
    
        

    </div>
  )
}

export default Newsfeed
