import { BsEmojiAstonished } from "react-icons/bs"
import Navbar from "../section-components/Navbar"

const Messages = () => {
  return (
    <div className="">
        <Navbar/>
        <main className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
            <BsEmojiAstonished className="text-7xl"/>
            <h1 className="text-2xl sm:text-4xl">Message page isn't ready...</h1>
            </div>
        </main>
    </div>
  )
}

export default Messages
