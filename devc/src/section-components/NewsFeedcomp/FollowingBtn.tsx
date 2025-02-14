import { BiPlus } from "react-icons/bi"
import { dbUserType, useAuth } from "../../context/AuthContext"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../services/Firebase"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const FollowingBtn = ({postedBy}:{postedBy:string}) => {
    const{dbUser,fetchdbUser,user,alldbUser} = useAuth()
    const[isFollowing,setIsFollowing] = useState<boolean | undefined>()
    const[isMe,setisMe] = useState<boolean | undefined>()
    const navigate = useNavigate()

    useEffect(()=>{
        if(dbUser && user){
            if( dbUser.userName === postedBy){
                setisMe(true)
            }else{
                setisMe(false)
            }
            if(dbUser.following.includes(postedBy)){
                setIsFollowing(true)
            }else{
                setIsFollowing(false)
            }
        }

    },[dbUser])

    const handleFollow =async()=>{
        if(!dbUser || !alldbUser){
            navigate('/login')
            return;
        }
        const followingdbUser:dbUserType | undefined = alldbUser?.find((u)=>u.userName ===postedBy)

        const followingUserRef = doc(db,'users',followingdbUser!.id)
        await updateDoc(followingUserRef,{
            followers:arrayUnion(dbUser.userName)

        })
            const followerUserRef = doc(db,'users',dbUser.id)
            await updateDoc(followerUserRef,{
                following:arrayUnion(postedBy)
            })
            fetchdbUser();
        

    }
  return (
    <>
    {
        isMe?<><div className="flex items-center gap-2"><span className="text-2xl font-bold -mt-3">.</span><span className="text-xs bg-slate-200 px-1 rounded-full">me</span> </div></> : (<>

    {
        isFollowing?<div className="flex items-center gap-2"><span className="text-2xl font-bold -mt-3">.</span><span className="text-xs bg-slate-200 px-1 rounded-full">following</span> </div>:(
        <button onClick={handleFollow} className="rounded-full items-center px-2 bg-blue-600 text-white text-xs flex">Follow <BiPlus/></button>
        )
    }
    </>)
}
    </>
  )
}

export default FollowingBtn
