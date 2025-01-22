import { GiSaveArrow } from "react-icons/gi"

const Leftbar = () => {
  return (
    <section className="w-[300px] bg-white max-h-fit relative rounded-2xl">
        <div className="h-[8vh] bg-stone-500"></div>
        <div className="text-center absolute top-[5vh] left-[50%] -translate-x-1/2 flex flex-col justify-center items-center">
            <img src="./profile.jpg" height={70} width={70} className="rounded-full border-2 border-blue-600" alt="" />
            <h4 className="font-bold cursor-pointer hover:underline">Tina Morgan</h4>
            <h5 className="text-[14px]">Fullstack Developer</h5>
        </div>
        <div className="mt-[25vh] border-t-2 border-b-2 text-[14px] py-5">
            <p className="flex justify-between mx-4"><span>Profile view</span> <span className="font-bold">50</span></p>
            <p className="flex justify-between mx-4"><span>Post impression</span> <span className="font-bold">238</span></p>

        </div>
        <div className="">
            <button className="flex gap-1 justify-center items-center w-full py-2 hover:bg-gray-100"><GiSaveArrow /> <span>Saved post</span></button>
        </div>

        
    </section>
  )
}

export default Leftbar
