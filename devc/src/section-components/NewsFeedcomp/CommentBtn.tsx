import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { PostType } from "../Newsfeed"
import { MdAccountBox } from "react-icons/md"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../services/Firebase"

const CommentBtn = ({post,updatePost}:{post:PostType,updatePost:()=>void}) => {
    const[commentInput,setCommentInput] = useState('')
    const{user} = useAuth()

    const handleAddComment =async()=>{
        if(user && commentInput){
            setCommentInput('')
            try{
                const postRef = doc(db,'posts',post.id)
            await updateDoc(postRef,{
                comments:arrayUnion({content:commentInput,likes:0,likedBy:[]})
            })
            updatePost()

            }catch(e){
                // console.log('eror while commenting',e)
            }
        }

    }
  return (
     <div className="flex justify-center gap-2 my-2 items-center">
            <MdAccountBox className="text-2xl"/>
            <input type="text" placeholder="write your comment" value={commentInput} onChange={(e)=>setCommentInput(e.target.value)} className="border-[1px] border-black rounded-full px-3 py-1 flex-1" />
            <button onClick={handleAddComment} className="text-sm px-2 py-1 rounded-md bg-blue-500 text-white">Add</button>
     </div>
  )
}

export default CommentBtn
