import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { BiPhotoAlbum, BiText } from "react-icons/bi"
import { GrArticle } from "react-icons/gr"
import { db } from "../../services/Firebase"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const UserAddPost = ({handleLoading}:{handleLoading:()=>Promise<void>}) => {
  const[addPostMode,setAddPostMode] = useState(false)
  const[postInput,setPostInput] = useState('')
  const[loading,setLoading] = useState(false)
  const{user} = useAuth()
  const navigate = useNavigate()

  const addPost = async()=>{
    setLoading(true)
    if(!postInput.trim()){
      setLoading(false)
      return;
    }
    if(!user){
      navigate('/login')
      return;

    }
    try{
      await addDoc(collection(db, "posts"), {
        content:postInput,
        userId:user.displayName??'Anonymous user',
        createdAt: serverTimestamp(),
        likes: 0,
        likedBy: [],
        repost:0
      });
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
    <div className="bg-white p-5 w-full">
        <section className="flex gap-4 w-full ">
            <img src="./assets/profile.jpg" height={50} width={50} className="rounded-full border-2 border-blue-600" alt="" />
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
