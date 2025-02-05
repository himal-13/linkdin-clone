import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PostType } from "../section-components/Newsfeed";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/Firebase";

interface PostActionContextType{
    allPosts:PostType[] | [],
    fetchAllPosts:()=>Promise<void>
    updatePost:()=>Promise<void>
    loading:boolean


}

export const PostActionContxt = createContext<PostActionContextType | null>(null)

interface Props{
    children:ReactNode
}

const PostProvider:React.FC<Props> =({children})=>{
    const[allPosts,setAllPosts] = useState<PostType[] |[]>([])
    const[loading,setLoading] = useState(true)
    

    const fetchAllPosts =async()=>{
          setLoading(true)
            try{
                const querrySnapshot = await getDocs(collection(db,'posts'));
                const fetchData =querrySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(), 
                  })as PostType)
                  setAllPosts(fetchData)
            }catch(er){
                // console.log(er)
            
            }finally{
              setLoading(false)
            }
        }
        const updatePost = async()=>{
            try{
              const querrySnapshot = await getDocs(collection(db,'posts'));
              const fetchData =querrySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(), 
                })as PostType)
                setAllPosts(fetchData)
          }catch(er){
              // console.log(er)
          
          }
      
          }

          useEffect(()=>{
            const fetchAllData = async()=>{
                await fetchAllPosts()
            }
            fetchAllData()

          },[])

          


    return(
        <PostActionContxt.Provider value={{allPosts,fetchAllPosts,loading,updatePost}}>
            {children}
        </PostActionContxt.Provider>
    )
}
export default PostProvider;

export const usePostsContext = ():PostActionContextType =>{
    const context = useContext(PostActionContxt)
    if(!context){
        throw new Error('Something went wrong while getting Posts')
    }
    return context;
}
