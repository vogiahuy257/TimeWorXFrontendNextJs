// Project: TaskFormSelectedUsers.jsx
import { User } from "lucide-react"

export default function TaskFormSelectedUsers({ selectedUser, inChargeUserId, setInChargeUserId, is_staff = false }) {
  return (
    <div className="w-full p-4 rounded-lg border border-gray-200 shadow-sm bg-white-css flex items-center justify-between gap-4 transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-100">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        <span className="font-medium text-gray-900">{selectedUser.name}</span>
      </div>

      <button
        type="button"
        className={`px-3 py-1 rounded-md transition-all ${
          inChargeUserId === selectedUser.id ? "bg-black-css text-white-css" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        } ${is_staff ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        disabled={is_staff && inChargeUserId !== selectedUser.id}
        onClick={() => setInChargeUserId(selectedUser.id)}
      >
        {inChargeUserId === selectedUser.id ? (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-white-css animate-pulse"></span>
            Đang phụ trách
          </span>
        ) : (
          "Chọn phụ trách"
        )}
      </button>
    </div>
  )
}
