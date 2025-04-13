export default function NoteHorixontal()
{
    return(
        <div className="p-4 border-t border-gray-200 flex justify-center space-x-6 bg-gray-50">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-700">Todo</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-400 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-700">In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-700">Verify</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-700">Done</span>
        </div>
      </div>
    )
}