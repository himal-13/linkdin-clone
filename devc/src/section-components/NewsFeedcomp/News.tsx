import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../services/Firebase";
import { CgProfile } from "react-icons/cg";

interface PostType{
    id:string,
    content:string,
    createdAt:Timestamp,
    likedBy:string[],
    likes:number,
    repost:number,
    userId:string

}

const News = () => {
    const[posts,setPosts]= useState<PostType[]>([])

    const fetchPost =async()=>{
        try{
            const querrySnapshot = await getDocs(collection(db,'posts'));
            const fetchData =querrySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(), 
              })as PostType)
              setPosts(fetchData)
        }catch(er){
            console.log(er)
        
        }
    }

    useEffect(()=>{
        fetchPost()
        console.log(posts)

    },[])

  return (
    <div className="w-full bg-white p-4">
        {posts && posts.map((post,i)=>(
            <div className="" key={i}>
                <section className="">
                    <CgProfile/>
                    <h1>{post.content}</h1>
                </section>

            </div>

        ))}

    </div>
  )
}

export default News
