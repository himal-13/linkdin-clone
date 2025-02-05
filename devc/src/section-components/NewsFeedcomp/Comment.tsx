import { BiLike } from "react-icons/bi"
import { MdAccountBox, MdDelete } from "react-icons/md"
import { PostType } from "../Newsfeed"
import { useAuth } from "../../context/AuthContext"
import { BsThreeDots } from "react-icons/bs"
import { useEffect, useState } from "react"
import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../services/Firebase"
import { usePostsContext } from "../../context/PostActionContext"


interface Props{
    likedBy:string[],
    content:string,
    commentBy:string,
    id:string
}
const Comment = ({comment,post}:{comment:Props,post:PostType}) => {
    const[showCommentMenu,setShowCommentMenu] = useState(false)
    const[loadingLike,setLoadingLike] = useState(false)
    const{dbUser} = useAuth()
    const{updatePost} = usePostsContext()
    

    useEffect(()=>{


    },[])
    const deleteComment = async()=>{
        try{
            setShowCommentMenu(false)
            const commentRef = doc(db,'posts',post.id,'comments',comment.id)
            await deleteDoc(commentRef)
            await updatePost();

        }catch(e){}

    }
    const updateLike = async()=>{
        try{
            setLoadingLike(true)
            if(!loadingLike && dbUser){
                const postRef = doc(db,'posts',post.id)
                const commentRef = doc(postRef,'comments',comment.id)
                if(comment.likedBy.indexOf(dbUser.userName)!==-1){
                    await updateDoc(commentRef,{
                        likedBy:arrayRemove(dbUser.userName)                   

                    })
                }else{
                    await updateDoc(commentRef,{
                        likedBy:arrayUnion(dbUser.userName)                   

                    })

                }

   
            }
            setLoadingLike(false)
            updatePost()

        }catch{

        }
    }

  return (
    <div className="m-2 py-1 border-[.1px] border-gray-200 w-[80%] relative">
        <header className="w-full px-2 flex justify-between items-center">
            <section className="flex gap-2 items-center">
                <MdAccountBox className="text-xl"/>
                <span>{comment.commentBy}</span>
            </section>
            {post.userId === dbUser?.userName || comment.commentBy === dbUser?.userName ? <BsThreeDots onClick={()=>setShowCommentMenu(!showCommentMenu)} className="cursor-pointer p-1 text-2xl"/>:<></>}
            {
                showCommentMenu && (
                    <button onClick={deleteComment} className=" rounded-md absolute shadow-lg px-3 py-1 text-sm flex gap-1 right-6 top-3 "><span>Delete</span> <MdDelete/></button>
                )
            }

        </header>
        <main className="p-2">
            <h4>{comment.content}</h4>
            <div className="">
                {loadingLike?(
                <button  className="flex items-center gap-[1px] cursor-wait"><BiLike/> <span>{comment.likedBy.length}</span></button>

                ):(
                <button onClick={updateLike} className="flex items-center gap-[1px]"><BiLike/> <span>{comment.likedBy.length}</span></button>

                )}


            </div>
        </main>
    </div>
    
  )
}

export default Comment
