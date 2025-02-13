import { useEffect, useState } from "react"
import { dbUserType, useAuth } from "../../context/AuthContext"

interface UnfollowFollowbackBtnProps{
    type:'followers' | 'following',
    user:dbUserType,
    unfollow:(userName:string)=>void,
    followBack:(userName:string)=>void
}
const UnfollowFollowbackBtn = ({type,user,unfollow,followBack}:UnfollowFollowbackBtnProps) => {
  const[alreadyFollowing,setAlreadyFollowing] = useState<boolean | undefined>()
    const{dbUser} = useAuth()

    useEffect(()=>{
        if(dbUser && dbUser.following.includes(user.userName)){
            setAlreadyFollowing(true)

        }else{
            setAlreadyFollowing(false)
        }

    },[user])
  return (
    <>
    {type==='following'?<button onClick={()=>unfollow(user.userName)} className="text-sm  text-white bg-red-500 px-2 py-1 rounded-md">unfollow</button>:(
        <>
              {alreadyFollowing?<span className="text-sm  text-white bg-gray-500 px-2 py-1 rounded-md">following</span>:(
            <button onClick={()=>followBack(user.userName)} className="text-sm  text-white bg-blue-500 px-2 py-1 rounded-md">follow back</button>)}
        </>
    )}
    </>
  )
}

export default UnfollowFollowbackBtn
