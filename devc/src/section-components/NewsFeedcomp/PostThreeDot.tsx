import { BsThreeDots } from "react-icons/bs"
import { PostType } from "../Newsfeed"
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../services/Firebase"

const PostThreeDot = ({post,updatePost}:{post:PostType,updatePost:()=>void}) => {
    const[itsmyPost,setitmyPost] = useState(false)
    const[showMenu,setshowMenu] = useState(false)
    const[editMode,setEditMode] = useState(false)
    const[editInput,setEditInput] = useState(post.content)
    const{user} =useAuth()

    useEffect(()=>{
        if(user){
            if(user.displayName === post.userId){
                setitmyPost(true)
            }else{
                setitmyPost(false)
            }
        }

    },[])

    const handleThreeDotClick = ()=>{
        setshowMenu(!showMenu)

    }
    const handleDelete =async()=>{
        const postRef = doc(db,'posts',post.id)
        await deleteDoc(postRef);
        updatePost()
    }
    const handleEdit = async()=>{
        if(!editInput.trim() && editInput !==post.content){
            return;
        }
        const postRef = doc(db,'posts',post.id)
        await updateDoc(postRef,{
            content:editInput,
            edited:true,

        })
        setEditMode(false)
        updatePost();

    }
    const cancelBtn = ()=>{
        setEditMode(false)
        setEditInput(post.content)

    }
  return (
    <div className="relative ">
        <button className="" onClick={handleThreeDotClick}>
            <BsThreeDots/>
        </button>
        {
            showMenu && (
                itsmyPost?(
                <ul className="absolute translate-y-0 z-10 -translate-x-[100%] border-[1px] border-gray-300 shadow-md rounded-sm bg-white">
                    <li onClick={()=>setEditMode(true)} className="cursor-pointer p-1 text-[12px] text-nowrap hover:bg-gray-100 border-b-[1px] border-gray-400 flex gap-1 items-center"><span>Edit</span> <BiEdit className="text-[18px]"/></li>
                    <li onClick={async()=>await handleDelete()} className="cursor-pointer p-1 text-[12px] text-nowrap hover:bg-gray-100 border-b-[1px] border-gray-400 flex gap-1 items-center"><span>Delete</span><MdDelete className="text-[18px]"/></li>
                </ul>
                ):(
                <ul className="absolute translate-y-0 z-10 -translate-x-[100%] border-[1px] border-gray-300 shadow-md rounded-sm bg-white">
                    <li className="cursor-pointer p-1 text-[12px] text-nowrap hover:bg-gray-100 border-b-[1px] border-gray-400 ">Follow @{post.userId}</li>
                    <li className="cursor-pointer p-1 text-[12px] text-nowrap hover:bg-gray-100 border-b-[1px] border-gray-400 ">Block @{post.userId}</li>
                </ul>
                )
            )

        }
   
                <div className={`top-0 left-0 h-screen w-screen fixed z-30 bg-gray-400/80 justify-center items-center   ${editMode?"flex":'hidden'}`}>
                <div className="flex justify-center items-center flex-col gap-3 bg-slate-50 p-4">
                    <input type="text" className="border-[1px] border-black px-2 py-1 text-xl " placeholder="write something" value={editInput} onChange={(e)=>setEditInput(e.target.value)}  />
                    <section>
                        <button onClick={handleEdit} className={`bg-blue-600 text-white px-2 py-1 text-xl ${!editInput.trim() && editInput===post.content && 'bg-gray-500'}`} disabled={!editInput.trim()}>save</button>
                        <button className="bg-gray-200 px-2 py-1 text-xl" onClick={cancelBtn}>cancel</button>

                    </section>
                 
                </div>
                </div>


    </div>
  )
}

export default PostThreeDot
