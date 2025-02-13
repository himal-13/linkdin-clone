import { MdAccountBox, MdClose } from "react-icons/md"
import { dbUserType, useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../services/Firebase"
import { useEffect} from "react"
import OtherunFollowBtn from "./OtherUnfollowBtn"

interface OtherFollowersPopupProps{
  users:dbUserType[] |[],
  type:'following' | 'followers',
  handleClose:()=>void,
  updateUi:()=>void
}

const OtherFollowersPopup = ({users,type,handleClose,updateUi}:OtherFollowersPopupProps) => {
  const{alldbUser,dbUser,fetchdbUser} = useAuth()

  useEffect(()=>{
    
  },[dbUser])



      const follow = async(currentUserName:string) => {
        if(!dbUser || !alldbUser){
          // console.log('dbUser is no')
          return;
        }
        if( !dbUser.following.includes(currentUserName)){
          console.log('followback click')
          const followingdbUser:dbUserType | undefined = alldbUser.find((u)=>u.userName ===currentUserName)
          const followingUserRef = doc(db,'users',followingdbUser!.id)
          await updateDoc(followingUserRef,{
              followers:arrayUnion(dbUser.userName)
  
          })
              const followerUserRef = doc(db,'users',dbUser.id)
              await updateDoc(followerUserRef,{
                  following:arrayUnion(currentUserName)
              })
        }
        fetchdbUser();
        updateUi();
      }

      

  

  return (
    <div className="fixed h-screen w-screen top-0 left-0 flex justify-center items-center z-10 bg-slate-900/70">
       <section className="p-6 bg-gray-200 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
       <h1 className="text-xl font-bold uppercase">{type}</h1>
       <MdClose className="text-4xl p-1 cursor-pointer" onClick={handleClose}/>

        </div>

        {
          users.length == 0 ?<h1>no {type}</h1>:
        users.map((user)=>( 
              <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto" key={user.id}>
              <div className="p-4 border-b-[1px] border-gray-200">
                <div className="flex gap-2">
                <MdAccountBox className="text-4xl"/>
                <div className="flex flex-col text-sm">
                    <Link to={`/${user.userName}`}><span>{user.userName}</span></Link>
                    <span className="text-xs">{user.followers.length} followers</span>
                </div>
                <div className="flex p-2 items-center gap-2 ">
                    <OtherunFollowBtn follow={follow} user={user} />
                </div>
                </div>
              </div>
            </div>
        ))}

       </section>
    </div>
  )
}

export default OtherFollowersPopup
