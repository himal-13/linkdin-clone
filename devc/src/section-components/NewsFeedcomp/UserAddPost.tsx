import { BiPhotoAlbum, BiText } from "react-icons/bi"
import { GrArticle } from "react-icons/gr"

const UserAddPost = () => {
  return (
    <div className="bg-white p-5 w-full">
        <section className="flex gap-4 w-full ">
            <img src="./assets/profile.jpg" height={50} width={50} className="rounded-full border-2 border-blue-600" alt="" />
            <button type="button" className="px-3 py-1 rounded-full border-2 border-black flex-1 text-start font-bold" >Add new post</button>

        </section>
        <section className="flex my-3 justify-around">
          <p className="flex items-center"><BiText/><span>Text</span></p>
          <p className="flex items-center gap-1"><BiPhotoAlbum/><span>Photo</span></p>
          <p className="flex items-center gap-1"><GrArticle/><span>Article</span></p>
        </section>
    </div>
  )
}

export default UserAddPost
