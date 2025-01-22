import { Home, MessageCircle, Search } from "lucide-react"
import { FaLinkedin, FaUserFriends } from "react-icons/fa"
import { GrNotification } from "react-icons/gr"

const Navbar = () => {
  return (
   <header className="flex md:justify-evenly justify-center gap-4  h-[10vh] border-b-[1px] header"> 
        <div className="flex items-center gap-2">
            <FaLinkedin  className="text-4xl text-blue-700"/>
            <input type="search" name="search" className="border-[1px] px-4 py-[5px]  border-black search-input" placeholder='search'  />
            <Search className="search-icon"/>
        </div>
        <div className="flex text-base gap-4 items-center">
            <nav className="flex flex-col justify-center items-center">
                <Home className=""/>
                <span>Home</span>
            </nav>
            <nav className="flex flex-col justify-center items-center">
                <FaUserFriends className="text-2xl"/>
                <span>Add friend</span>
            </nav>
            <nav className="flex flex-col justify-center items-center">
                <MessageCircle/>
                <span>Message</span>
            </nav>
            <nav className="flex flex-col justify-center items-center">
                <GrNotification className="text-2xl"/>
                <span>Notication</span>
                
            </nav>

        </div>
   </header>
  )
}

export default Navbar
