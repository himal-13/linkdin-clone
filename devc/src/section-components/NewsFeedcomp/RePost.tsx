import {  BiRepost } from "react-icons/bi"
import { PostType } from "../Newsfeed"
import { useState } from "react"
import { MdAccountBox, MdCancel } from "react-icons/md"
import { useAuth } from "../../context/AuthContext"
import { addDoc, collection, doc, increment, updateDoc } from "firebase/firestore"
import { db } from "../../services/Firebase"

const RePost = ({post,updatePost}:{post:PostType,updatePost:()=>void}) => {
    const[showRepostDialog,setShowRepostDialog] = useState(false)
    const[repostTitle,setRepostTitle] = useState('')
    const{user,dbUser} = useAuth()
    

    const handlePostClick = async()=>{
        if(!dbUser) return;
        try{
            setShowRepostDialog(false)
            await addDoc(collection(db, "posts"), {
                content:post.content,
                userId:post.userId,
                createdAt: post.createdAt,
                likes: 0,
                likedBy: [],
                repost:0,
                edited:false,
                isReposted:true,
                rePostedby:dbUser.userName,
                rePostContent:repostTitle
              });
              const postRef = doc(db,'posts',post.id)
              await updateDoc(postRef,{
                repost:increment(1)

              })
            updatePost()
        }catch(e){
            console.log('repost error',e)
        }


    }
  return (
    <>
            <button onClick={()=>setShowRepostDialog(true)} className="cursor-pointer flex flex-col items-center text-[15px] p-2">
                <BiRepost />
                <span>{post.repost}</span>
            </button>
            <div className={`fixed top-0 left-0 z-10 bg-slate-700/80 h-screen w-screen ${showRepostDialog?'flex':'hidden'} justify-center items-center`}>
                <div className="rounded-md shadow-xl bg-white px-5 py-1 flex flex-col justify-start">
                   <MdCancel className="cursor-pointer p-1 text-3xl absolute -translate-x-4" onClick={()=>setShowRepostDialog(false)}/>
                    <header className="flex gap-2 mt-6 mb-4 items-center ">
                            <MdAccountBox/>
                            <span className="text-xl">{user?.displayName}</span>
                    </header>
                    <input type="text" value={repostTitle} onChange={(e)=>setRepostTitle(e.target.value)} placeholder="write something" className="resize-none border-none outline-none shadow-none" />
                    <div className="border-[1px] border-gray-400 mx-4 my-2 px-2 rounded-md">
                        <header className="flex gap-2 my-2 items-center">
                            <MdAccountBox/>
                            <span className="text-xl">{post.userId}</span>
                        </header>
                        <main>
                            <article className="text-2xl">{post.content}</article>
                        </main>
                    </div>
                    <button onClick={handlePostClick} className="px-2 py-1 bg-blue-600 text-white rounded-md self-end">Post</button>
                </div>
            </div>
    </>
  )
}

export default RePost
