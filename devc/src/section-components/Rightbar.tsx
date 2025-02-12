import { useEffect, useState } from "react"
import { dbUserType, useAuth } from "../context/AuthContext"
import RigntBarAccount from "./RightbarAccount"

const Rightbar = () =>{
  const[allUsers,setAllUsers] = useState<dbUserType[] | []>()
    const{alldbUser,dbUser} =  useAuth()
    useEffect(()=>{
      const getUsers = async()=>{
        if(alldbUser && dbUser){
          setAllUsers(alldbUser.filter((usr)=>usr.userName !== dbUser.userName ))
        }
      }
      getUsers()


    },[alldbUser])
  return (
    <div className="bg-white p-6 ">
      <div className=" border-[.1px] border-gray-300 rounded-lg p-2">
        <h1 className="text-2xl">Trending</h1>
        <div className="ml-2">
          <p className="text-sm">#React</p>
          <p className="text-sm">#Node</p>
          <p className="text-sm">#Firebase</p>
          <p className="text-sm">#Tailwind</p>
          <p className="text-sm">#ReactNative</p>
          <p className="text-sm">#Flutter</p>
          <p className="text-sm">#Dart</p>
          <p className="text-sm">#Python</p>
          <p className="text-sm">#Java</p>

        </div>

      </div>
      {allUsers && (<div className="p-2 border-[.1px] border-gray-300 rounded-lg mt-2">
      <h1 >Who to follow</h1>
          {allUsers.map((user)=><RigntBarAccount handleRemoveUser={()=>setAllUsers(allUsers.filter((usr)=>usr !==user))} key={user.id} user={user}/>)}
    </div>)}
    </div>
  )
}

export default Rightbar
