import { Home, MessageCircle, Search } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import { GrNotification } from "react-icons/gr"
import {  NavLink } from "react-router-dom"
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
   <header className="flex md:justify-evenly justify-center gap-4  h-[10vh] header fixed w-full bg-white z-50 border-b-[1px] border-gray-500"> 
        <div className="flex items-center gap-2">
            <NavLink to={'/'}><FaLinkedin  className="text-4xl text-blue-700"/></NavLink>
            <input type="search" name="search" className="border-[1px] px-4 py-[5px]  border-black search-input" placeholder='search'  />
            <Search className="search-icon"/>
        </div>
        <div className="flex text-base gap-4 items-center">
            <NavLink to={'/'} className={({ isActive }) => (isActive ? 'text-black font-extrabold' : 'text-gray-600 font-semibold')} >
                <nav className="flex flex-col justify-center items-center">
                    <Home className=""/>
                    <span>Home</span>
                </nav>
            </NavLink>
            <NavLink to={'/profile'}  className={({ isActive }) => (isActive ? 'text-black font-extrabold' : 'text-gray-600 font-semibold')} > 
                <nav className="flex flex-col justify-center items-center">
                    <CgProfile className="text-2xl"/>
                    <span>Profile</span>
                </nav>
            </NavLink>
            <NavLink to={'/messages'}  className={({ isActive }) => (isActive ? 'text-black font-extrabold' : 'text-gray-600 font-semibold')} >
                <nav className="flex flex-col justify-center items-center">
                    <MessageCircle/>
                    <span>Message</span>
                </nav>
            </NavLink>
            <NavLink to={'/notification'}  className={({ isActive }) => (isActive ? 'text-black font-extrabold' : 'text-gray-600 font-semibold')} >
                <nav className="flex flex-col justify-center items-center">
                    <GrNotification className="text-2xl"/>
                    <span>Notication</span>
                </nav>
            </NavLink>

        </div>
   </header>
  )
}

export default Navbar
