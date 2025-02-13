import { useEffect, useState } from "react"
import { dbUserType, useAuth } from "../../context/AuthContext"

interface OtherunFollowBtnProps{
    user:dbUserType,
    follow:(userName:string)=>void,
}
const OtherunFollowBtn = ({user,follow}:OtherunFollowBtnProps) => {
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
              {alreadyFollowing?<span className="text-sm  text-white bg-gray-500 px-2 py-1 rounded-md">following</span>:(
            <button onClick={()=>follow(user.userName)} className="text-sm  text-white bg-blue-500 px-2 py-1 rounded-md">follow</button>)}
        </>
  )
}

export default OtherunFollowBtn
