import { addDoc,  collection, serverTimestamp, } from "firebase/firestore"
import { useState } from "react"
import { BiPhotoAlbum, BiText } from "react-icons/bi"
import { GrArticle } from "react-icons/gr"
import { db } from "../../services/Firebase"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { MdAccountCircle } from "react-icons/md"

const UserAddPost = ({handleLoading}:{handleLoading:()=>Promise<void>}) => {
  const[addPostMode,setAddPostMode] = useState(false)
  const[postInput,setPostInput] = useState('')
  const[loading,setLoading] = useState(false)
  const{user,dbUser,fetchdbUser} = useAuth()
  const navigate = useNavigate()

  const addPost = async()=>{
    setLoading(true)
    if(!postInput.trim()){
      setLoading(false)
      return;
    }
    if(!user ){
      navigate('/login')
      return;

    }
    if(!dbUser) return;
    try{
      const postRef = collection(db,'posts')
      // const commentRef = collection(postRef,'comments')
      await addDoc(postRef, {
        content:postInput,
        userId:user.displayName?? dbUser.userName,
        createdAt: serverTimestamp(),
        likes: 0,
        likedBy: [],
        repost:0,
        edited:false,
        isReposted:false,
        rePostedby:'',
        rePostContent:'',
      });

      fetchdbUser()
      setPostInput('')
      setAddPostMode(false)
      handleLoading();
    }catch(error){
      // console.log(error)
    }finally{
      setLoading(false)
    }

  }
  return (
    <div className="bg-white p-5 w-full border-b-[.5px] border-gray-400">
        <section className="flex gap-4 w-full ">
              <MdAccountCircle className="text-5xl" /> 
              {addPostMode?(
                <div className="flex w-full gap-2">
                  <input type="text" placeholder="Add your content" value={postInput} onChange={(e)=>setPostInput(e.target.value)} className="px-3 rounded-full border-2 border-black flex-1 text-start font-bold" />
                  {loading?<p className="bg-gray-400 px-3 h-5/6 rounded-sm relative self-center my-auto">Post</p>:(
                    <button onClick={()=>addPost()} className="bg-blue-700 px-3 h-5/6 rounded-sm hover:bg-blue-500 relative text-white">Post</button>

                  )}
                </div>
              ):(
            <button type="button"onClick={()=>setAddPostMode(true)} className="px-3 py-1 rounded-full border-2 border-black flex-1 text-start font-bold" >Add new post</button>
              )}


        </section>
        <section className="flex my-3 justify-around">
          <p className="flex items-center"><BiText/><span>Text</span></p>
          <p className="flex items-center gap-1"><BiPhotoAlbum/><span>Photo</span></p>
          <p className="flex items-center gap-1"><GrArticle/><span>Article</span></p>
        </section>
    </div>
  )
}

export default UserAddPost
