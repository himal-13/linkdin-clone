import { useParams } from "react-router-dom"
import Navbar from "../section-components/Navbar"
import { useEffect, useState } from "react"
import { PostType } from "../section-components/Newsfeed"
import { usePostsContext } from "../context/PostActionContext"
import Post, { CommentType } from "../section-components/NewsFeedcomp/Post"
import Leftbar from "../section-components/Leftbar"
import Comment from "../section-components/NewsFeedcomp/Comment"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../services/Firebase"

const PostPage = () => {
    const params = useParams();
    const [post, setPost] = useState<PostType | undefined>();
    const[comments,setComments] = useState<CommentType[] | []>()
    const [loading, setLoading] = useState(true);
    const { allPosts, fetchAllPosts ,updatePost} = usePostsContext();

      const getComments = async()=>{
        if(post){
        const commentsRef = collection(db,'posts',post.id,'comments')
        const fetchData = (await getDocs(commentsRef)).docs.map((c)=>({
          id:c.id,
          ...c.data()
        })as CommentType)
        setComments(fetchData)
      }
      }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            if (!allPosts) {
                await fetchAllPosts();
            }

            const foundPost = allPosts?.find((post) => post.id === params.id);
            setPost(foundPost);
            getComments()

            setLoading(false);
        };

        fetchData();
    }, [params.id, allPosts,post]); 


  return (
    <div className="">
        <Navbar/>
        <main className="bg-gray-300 w-screen min-h-screen flex justify-center pt-[10vh] gap-[10vh]">
            <Leftbar/>
          <div className=" w-[80%] sm:w-[60%] md:w-[40%] bg-white min-h-screen">
            {!loading ?
            
            post && (<div className="">
                <Post post={post} postUpdated={updatePost}/>
                
                    {comments && (comments.map((comm)=>(<Comment post={post} comment={comm} key={comm.id}/>)))}
                
            </div>):(
                <div className="">Loading...</div>
            )

            }
           
            

          </div>
        </main>
    </div>
  )
}

export default PostPage
