import { MdAccountBox,} from "react-icons/md";
import { PostType } from "../Newsfeed";
import { BiComment, BiHeart, BiRepost, BiWorld,  } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { arrayRemove, arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { FaHeart } from "react-icons/fa";
import PostThreeDot from "./PostThreeDot";

const Post = ({ post, postUpdated }: { post: PostType; postUpdated: () => void }) => {
  const { user} = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [likedBy, setLikedBy] = useState<string[]>(post.likedBy || []);

  // Sync local state with prop updates
  useEffect(() => {
    setLikes(post.likes);
    setLikedBy(post.likedBy || []);
  }, [post.likes, post.likedBy]);

  const updateLikes = useCallback(async () => {
    if (loading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);

      const postRef = doc(db, 'posts', post.id);
      const wasLiked = likedBy.includes(user.uid);

      // Optimistic UI update
      setLikes(prev => wasLiked ? prev - 1 : prev + 1);
      setLikedBy(prev => wasLiked 
        ? prev.filter(id => id !== user.uid) 
        : [...prev, user.uid]
      );

      // Database update
      await updateDoc(postRef, {
        likes: increment(wasLiked ? -1 : 1),
        likedBy: wasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
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
  }, [user!.uid, user, post.id, post.likes, post.likedBy, likedBy, navigate, postUpdated]);

  return (
    <div className="my-2 p-2 bg-white rounded-lg">
      <header className="flex text-2xl justify-between">
        <section className="flex  gap-2">
          <MdAccountBox className="text-3xl" />
          <div className="flex flex-col justify-center ">
            <span className="text-[15px] ">{post.userId} </span>
            <div className="flex gap-1 items-center -my-4">
              <span className="text-xs">{post.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              {post.edited &&<><span className="-translate-y-2 font-bold ">.</span> <span className="text-xs">edited</span></>}
              <span className="-translate-y-2 font-bold ">.</span>
              <BiWorld className="text-sm"/>

              
          </div></div>
        </section>
        <PostThreeDot updatePost={postUpdated} post={post}/>
      </header>
      
      <main>
        <p className="my-2 text-2xl">{post.content}</p>
        
        <section className="flex justify-between border-y-[1px] border-gray-200 py-2">
          <button
            onClick={updateLikes}
            disabled={loading}
            className={`flex flex-col items-center text-[15px] p-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } ${likedBy.includes(user!.uid!) ? 'text-red-500' : ''}`}
          >
            {likedBy.includes(user!.uid!)?<FaHeart/>:<BiHeart/>}
            <span>{likes}</span>
          </button>
          
          <button className="cursor-pointer flex flex-col items-center text-[15px] p-2">
            <BiRepost />
            <span>{post.repost}</span>
          </button>
          
          <button className="cursor-pointer flex flex-col items-center text-[15px] p-2">
            <BiComment />
            <span>0</span>
          </button>
          
          <button className="cursor-pointer flex flex-col items-center text-[16px] font-bold p-2">
          <CiBookmark />
          </button>
        </section>
      </main>
    </div>
  );
};

export default Post;
