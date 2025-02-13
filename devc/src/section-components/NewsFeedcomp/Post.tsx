import { MdAccountBox,} from "react-icons/md";
import { PostType } from "../Newsfeed";
import { BiComment, BiHeart, BiWorld,  } from "react-icons/bi";
import { arrayRemove, arrayUnion, collection, doc,  getDocs,  increment, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";
import { useAuth } from "../../context/AuthContext";
import { Link,  useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {  FaHeart,  } from "react-icons/fa";
import PostThreeDot from "./PostThreeDot";
import FollowingBtn from "./FollowingBtn";
import RePost from "./RePost";
import ManagePostedTimeUi from "./ManagePostedTimeUi";
import CommentBtn from "./CommentBtn";


export interface CommentType{
  content:string,
  id:string
  likedBy:[],
  commentBy:string,
  createdAt:Timestamp

}

const Post = ({ post, postUpdated }: { post: PostType; postUpdated: () => void }) => {
  const { dbUser} = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [likedBy, setLikedBy] = useState<string[]>(post.likedBy || []);
  const[showAddComment,setShowAddComment] = useState(false)
  const[comments,setComments] = useState<CommentType[] | []>([])
  // const[postSaved,setpostSaved] = useState(false)


  const getComments = async()=>{
    const commentsRef = collection(db,'posts',post.id,'comments')
    const fetchData = (await getDocs(commentsRef)).docs.map((comment)=>({
      id:comment.id,
      ...comment.data()
    })as CommentType)
    setComments(fetchData)
    
  }
  useEffect(() => {
    setLikes(post.likes);
    setLikedBy(post.likedBy || []);
    getComments()
  }, [post.likes, post.likedBy]);

  const updateLikes = useCallback(async () => {
    if (loading) return;
    if (!dbUser) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);

      const postRef = doc(db, 'posts', post.id);
      const wasLiked = likedBy.includes(dbUser.id);

      // Optimistic UI update
      setLikes(prev => wasLiked ? prev - 1 : prev + 1);
      setLikedBy(prev => wasLiked 
        ? prev.filter(id => id !== dbUser.id) 
        : [...prev, dbUser.id]
      );

      // Database update
      await updateDoc(postRef, {
        likes: increment(wasLiked ? -1 : 1),
        likedBy: wasLiked ? arrayRemove(dbUser.id) : arrayUnion(dbUser.id)
      });
      postUpdated();
    } catch (error) {
      console.error("Like update failed:", error);
      // Rollback on error
      setLikes(post.likes);
      setLikedBy(post.likedBy || []);
    } finally {
      setLoading(false);
    }
  }, [ dbUser,dbUser?.id, post.id, post.likes, post.likedBy, likedBy, navigate, postUpdated]);



  return (
    <div className="my-2 p-2 bg-white rounded-lg">
      {
        post.isReposted && (
          <header className="flex text-2xl justify-between">
          <section className="flex items-center gap-2">
            <MdAccountBox className="text-3xl" />
            {post.rePostedby == dbUser?.userName?(
            <Link to={`/${post.rePostedby}`}> <span className="text-sm">{post.rePostedby}</span></Link>

            ):<span className="text-sm">{post.rePostedby}</span>}
            <FollowingBtn postedBy={post.rePostedby} />
          </section>
          <PostThreeDot updatePost={postUpdated} post={post}/>
        </header>
      
      )}
          <Link to={`/post/${post.id}`}><h4>{post.rePostContent}</h4></Link>

      <div className={`${post.isReposted && 'ml-4 p-2 rounded-md border-[.1px] border-gray-400'}`}>
      <header className="flex text-2xl justify-between">
        <section className="flex  gap-2">
          <MdAccountBox className="text-3xl" />
          <div className="flex flex-col justify-center ">
            <div className="flex gap-2 items-center">
              {post.userId === dbUser?.userName? <span className="text-[15px] ">{post.userId} </span>: <Link to={`${post.userId}`}><span className="text-[15px] ">{post.userId} </span></Link>}
              <FollowingBtn postedBy={post.userId}/>
            </div>
            <div className="flex gap-1 items-center -my-2">
              <ManagePostedTimeUi post={post}/>
              {post.edited &&<><span className="-translate-y-2 font-bold ">.</span> <span className="text-xs">edited</span></>}
              <span className="-translate-y-2 font-bold ">.</span>
              <BiWorld className="text-sm"/>

              
          </div></div>
        </section>
        {!post.isReposted && <PostThreeDot updatePost={postUpdated} post={post}/>}
      </header>
        <Link to={`/post/${post.id}`}><p className="my-2 text-2xl">{post.content}</p> </Link>     
      </div>

      <main>
        <section className="flex justify-between border-y-[1px] border-gray-200 py-2">
        {dbUser &&(
            <button
            onClick={updateLikes}
            disabled={loading}
            className={`flex flex-col items-center text-[15px] p-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${likedBy.includes(dbUser.id) ? 'text-red-500' : ''}`}
          >
            {likedBy.includes(dbUser.id)?<FaHeart/>:<BiHeart/>}
            <span>{likes}</span>
          </button>
        )}
          
         <RePost updatePost={postUpdated} post={post}/>
          
          <button onClick={()=>setShowAddComment(!showAddComment)} className="cursor-pointer flex flex-col items-center text-[15px] p-2">
            <BiComment />
            {comments.length}
          </button>
          <div className=""></div>
          
        </section>
        {showAddComment && <CommentBtn post={post} updatePost={()=>{setShowAddComment(false);postUpdated()}}/> }
      </main>
    </div>
  );
};

export default Post;
