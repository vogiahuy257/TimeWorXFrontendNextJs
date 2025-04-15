export default function NoteHorixontal()
{
    return(
        <div className="p-4 flex justify-center space-x-6 bg-gray-100-css">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"/>
          <span className="text-sm text-gray-black-css">Todo</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-400 rounded-sm mr-2"/>
          <span className="text-sm text-gray-black-css">In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"/>
          <span className="text-sm text-gray-black-css">Verify</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"/>
          <span className="text-sm text-gray-black-css">Done</span>
        </div>
      </div>
    )
}