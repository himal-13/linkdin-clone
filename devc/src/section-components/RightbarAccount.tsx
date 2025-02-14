import { GrClose } from "react-icons/gr"
import { MdAccountBox } from "react-icons/md"
import { dbUserType, useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../services/Firebase"
import { Link } from "react-router-dom"

const RightBarAccount = ({user,handleRemoveUser}:{user:dbUserType,handleRemoveUser:()=>void}) => {
  const[isFollowed,setIsFollowed] = useState(false)
  const{dbUser,fetchdbUser} = useAuth()

  useEffect(()=>{
    if(dbUser){
      if(dbUser.following.indexOf(user.userName)!==-1){
        setIsFollowed(true)
      }else{
        setIsFollowed(false)
      }

  }
  }
,[dbUser,user])

const addFollowing = async()=>{
  if(dbUser){
  try{
    const followingUserRef = doc(db,'users',user.id)
    await updateDoc(followingUserRef,{
        followers:arrayUnion(dbUser.userName)

    })
        const followerUserRef = doc(db,'users',dbUser.id)
        await updateDoc(followerUserRef,{
            following:arrayUnion(user.userName)
        })
        fetchdbUser();

  }catch(e){
    console.log('error following user',e)
  }
    fetchdbUser()

  }
}
  return (
    <div className="flex gap-2 items-center m-2 border-[.1px] border-gray-200 ">
            <MdAccountBox className="text-4xl"/>
            <div className="flex flex-col text-sm">
                <Link to={`/user/${user.userName}`}><span>{user.userName}</span></Link>
                <span className="text-xs">{user.followers.length} followers</span>
            </div>
            <div className="flex p-2 items-center gap-2 ">
                {isFollowed?<span className="bg-gray-200 text-sm px-2 py-1 rounded-lg">Following</span>:(
                  <>
                  <button className="text-sm bg-blue-500 text-white px-2 py-1 rounded-md" onClick={()=>addFollowing()}>Follow +</button>
                  <GrClose className="cursor-pointer" onClick={handleRemoveUser}/>
                  </>
                )}
            </div>
      </div>

                
  )
}

export default RightBarAccount
