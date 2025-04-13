export default function UserTable({data}) {
    return(
        <div className="w-[120px] sticky left-0 z-10 bg-white-css border-r border-gray-200">
          {data.map((user, index) => (
            <div key={`user-${index}`} className="p-4 h-[72px] flex items-center">
              <div className="font-medium text-gray-800 truncate">{user.username}</div>
            </div>
          ))}
        </div>
    )
}