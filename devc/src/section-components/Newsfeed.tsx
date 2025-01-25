import Divider from "./NewsFeedcomp/Divider"
import News from "./NewsFeedcomp/News"
import UserAddPost from "./NewsFeedcomp/UserAddPost"

const Newsfeed = () => {
  return (
    <div className="min-h-screen w-[40%]">
        <UserAddPost/>
        <Divider/>
        <News/>
        

    </div>
  )
}

export default Newsfeed
