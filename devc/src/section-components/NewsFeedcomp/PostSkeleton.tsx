
const PostSkeleton = () => {
  return (
    <div className="p-3 bg-white flex flex-col gap-3 my-1">
        <div className="flex justify-between">
            <div className=" h-3 w-6 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-[80%] h-4 bg-gray-300 rounded-full"></div>
        <div className="flex justify-between border-t-[1px] border-gray-100">
            <div className="h-2 w-2 rounded-2xl bg-gray-300"></div>
            <div className="h-2 w-2 rounded-2xl bg-gray-300"></div>
            <div className="h-2 w-2 rounded-2xl bg-gray-300"></div>
            <div className="h-2 w-2 rounded-2xl bg-gray-300"></div>

        </div>
    </div>
  )
}

export default PostSkeleton
