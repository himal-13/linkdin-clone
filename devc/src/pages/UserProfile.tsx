import { MdAccountCircle, MdWork } from "react-icons/md";
import { dbUserType, useAuth } from "../context/AuthContext"
import Navbar from "../section-components/Navbar"
import Post from "../section-components/NewsFeedcomp/Post";
import { useCallback, useEffect, useState } from "react";
import { PostType } from "../section-components/Newsfeed";
import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../services/Firebase";
import { useNavigate, useParams } from "react-router-dom"
import { GrLocation } from "react-icons/gr";
import OtherFollowersPopup from "./components/OtherFollowersPop";
import { BsEmojiExpressionless } from "react-icons/bs";

interface ShowFollowersProps{
  show:boolean,
  type:'followers' | 'following'
}

const UserProfile = () => {
  const params = useParams();
  const[currentdbUser,setCurrentdbUser] = useState<dbUserType | undefined>()
  const{user,dbUser,fetchdbUser,alldbUser} = useAuth()
  const[userPosts,setUserPosts] = useState<PostType[] | undefined>();
  const[showFollowers,setShowFollowers] = useState<ShowFollowersProps>({show:false,type:'followers'})
  const[loading,setLoading] = useState(true)
  const[followers,setFollowers] = useState<dbUserType[] | []>([])
  const[following,setFollowing] = useState<dbUserType[] | []>([])
  const[isFollowing,setIsFollowing] = useState<boolean | undefined>()
  const[showUnfollowDialog,setShowUnfollowDialog] = useState<boolean>(false)
  const navigate = useNavigate()

  const fetchUserData=async()=>{
    if(alldbUser){
      setCurrentdbUser(alldbUser.find((data)=>data.userName === params.userId))
    }else{
      navigate('/login')
    }
  
  }
    const fetchFollowers = useCallback(async() => {
      if(currentdbUser && alldbUser){
        const followers = alldbUser.filter((u)=>currentdbUser.followers.includes(u.userName))
        const following = alldbUser.filter((u)=>currentdbUser.following.includes(u.userName))
        setFollowers(followers)
        setFollowing(following)
      }
    }, [alldbUser]);

  useEffect(()=>{

    const fetchData =async()=>{
      await fetchUserData()
      await  fetchPosts()
      if(currentdbUser && alldbUser){
        const followers = alldbUser.filter((u)=>currentdbUser.followers.includes(u.userName))
        const following = alldbUser.filter((u)=>currentdbUser.following.includes(u.userName))
        setFollowers(followers)
        setFollowing(following)
        if(dbUser && dbUser.following.includes(currentdbUser.userName)){
          setIsFollowing(true)
        }else{
          setIsFollowing(false)
        }
      }

    }
fetchData()

  },[user,dbUser,currentdbUser])
 

  const fetchPosts=async()=>{
    if(dbUser){
      try{
        setLoading(true)
        const querrySnapshot = await getDocs(collection(db,'posts'));
      const fetchData =querrySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), 
      })as PostType)
      setUserPosts(fetchData.filter(pos=>pos.userId === params.userId))
    }catch(e){
      console.log('error etching my posts',e)
      
    }finally{
      setLoading(false)
    }
    }else{

    }
  }

  const handleFollow = async()=>{
    if(!alldbUser || !currentdbUser || !dbUser){
      return;
    }
    if(isFollowing){
      setShowUnfollowDialog(true)
      setShowUnfollowDialog(true)
    }else{
      const followingdbUser:dbUserType | undefined = alldbUser?.find((u)=>u.userName ===currentdbUser.userName)
      const followingUserRef = doc(db,'users',followingdbUser!.id)
      await updateDoc(followingUserRef,{
          followers:arrayUnion(dbUser.userName)

      })
          const followerUserRef = doc(db,'users',dbUser.id)
          await updateDoc(followerUserRef,{
              following:arrayUnion(currentdbUser.userName)
          })
          fetchdbUser()
          setIsFollowing(true)
    }

  }
  const handleUnfollow = async()=>{
    if(!alldbUser || !currentdbUser || !dbUser){
      return;
    }
    const followingdbUser:dbUserType | undefined = alldbUser?.find((u)=>u.userName ===currentdbUser.userName)
    const followingUserRef = doc(db,'users',followingdbUser!.id)
    await updateDoc(followingUserRef,{
        followers:arrayRemove(dbUser.userName)

    })
        const followerUserRef = doc(db,'users',dbUser.id)
        await updateDoc(followerUserRef,{
            following:arrayRemove(currentdbUser.userName)
        })
        fetchdbUser()
        setIsFollowing(false)
        setShowUnfollowDialog(false)

  }
  
  return (
    <div className="">
        <Navbar/>
        <main className="bg-gray-300 w-screen min-h-screen flex justify-center">
        <main className=" pt-[10vh] px-4 sm:px-1 w-[100%] sm:w-[60%] md:w-[40%] bg-white min-h-screen ">
            <div className=" relative top-3 p-4 items-center ">
            <div className="flex justify-between">
                  <MdAccountCircle className="text-7xl" />  
                  <button className="p-2 border-[1px] border-black font-bold self-end text-sm rounded-lg" onClick={()=>handleFollow()}>{isFollowing? 'following':'follow'}</button>
                </div>    
              <div className="text-start">
                  <h4 className="font-bold  ">{currentdbUser?.fullName}</h4>
                  <h5 className="text-[14px] text-gray-500">@{currentdbUser?.userName}</h5>
                  <h4>{currentdbUser?.userDetails.bio}</h4>
                  <h4 className="flex items-center gap-1 text-gray-700 text-sm"><GrLocation />{currentdbUser?.userDetails.location}</h4>
                  <h4 className="flex gap-1 items-center  text-gray-700 text-sm"><MdWork/> works at {currentdbUser?.userDetails.work}/studied at {dbUser?.userDetails.study}</h4>
              </div>
              <div className="text-sm flex gap-2">
                  <span className="p-1 flex gap-[1px] hover:underline cursor-pointer" onClick={()=>setShowFollowers({show:true,type:'followers'})}><span className="font-bold">{currentdbUser?.followers.length}</span>followers </span>
                  <span className="p-1 flex gap-[1px] hover:underline cursor-pointer" onClick={()=>setShowFollowers({show:true,type:'following'})}> <span className="font-bold">{currentdbUser?.following.length}</span>following</span>
                </div>
        
            </div>
            <hr />
            <div className={`${showFollowers.show?'block':'hidden'}`}>
              <OtherFollowersPopup updateUi={fetchFollowers} type={showFollowers.type} users={showFollowers.type ==='followers'?followers:following} handleClose={()=>setShowFollowers({show:false,type:'followers'})}/>
            </div>
            <div className={`fixed h-screen w-screen top-0 left-0 justify-center items-center z-10 bg-slate-900/70 ${showUnfollowDialog?'flex':'hidden'}`}>
              <div className="p-4 bg-white rounded-lg max-w-[80vw] ">
                <h1 className="text-xl my-3">Do you want to unfollow {currentdbUser?.fullName}?</h1>
                <div className="flex gap-2 justify-end items-center">
                  <button className="p-2 border-[1px] border-black font-bold self-end text-sm rounded-lg" onClick={()=>setShowUnfollowDialog(false)}>cancel</button>
                  <button className="p-2 bg-blue-500 text-white font-bold self-end text-sm rounded-lg" onClick={async()=>handleUnfollow()}>unfollow</button>

                </div>
              </div>
            </div>

              <div className="">
                {
                 !loading || userPosts ? userPosts && userPosts.map((pos)=>(
                  <Post post={pos} key={pos.id} postUpdated={()=>{ fetchdbUser()}} />
                )):(
                  <div className="">
                   <h1>wait loading...</h1>
                  </div>
                )
              }
              {userPosts?.length ==0 && (
                <div className="flex flex-col items-center gap-2 mt-4 " >
                  <BsEmojiExpressionless className="text-7xl" />
                  <h1 className="text-xl">no post yet...</h1>

                </div>
              )}
              </div>
          </main>
        </main>
   

    </div>
  )
}

export default UserProfile
