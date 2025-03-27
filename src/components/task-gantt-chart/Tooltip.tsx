import React, { useMemo } from "react"
import { CalendarClock, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface TooltipProps {
  content: string
  startDate: string
  endDate: string
  status: "to-do" | "in-progress" | "verify" | "done"
  show: boolean
  position: { x: number; y: number } | null
}

const Tooltip = ({ content, startDate, endDate, status, show, position }: TooltipProps) => {
  if (!show || !position) return null // ✅ Kiểm tra nếu không có vị trí, không render

  const statusInfo = useMemo(() => {
    switch (status) {
      case "to-do":
        return { color: "bg-blue-600", icon: <Clock className="h-4 w-4" /> }
      case "in-progress":
        return { color: "bg-yellow-500", icon: <CalendarClock className="h-4 w-4" /> }
      case "verify":
        return { color: "bg-red-500", icon: <AlertCircle className="h-4 w-4" /> }
      case "done":
        return { color: "bg-green-500", icon: <CheckCircle className="h-4 w-4" /> }
      default:
        return { color: "bg-gray-500", icon: <Clock className="h-4 w-4" /> }
    }
  }, [status]) // ✅ Chỉ tính toán lại khi `status` thay đổi

  return (
    <div
      className="fixed z-50 w-64 rounded-lg bg-black/80 p-3 shadow-md border border-gray-600 text-white animate-fadeIn transition-opacity duration-300 ease-in-out"
      style={{ left: `${position.x + 10}px`, top: `${position.y + 10}px` }} // ✅ Tooltip nằm kế con trỏ
    >
      <h3 className="font-medium text-sm text-white">{content}</h3>
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center gap-1.5 text-gray-300">
          <Clock className="h-3.5 w-3.5 text-gray-400" />
          <span className="font-medium">Start:</span> {startDate}
        </div>
        <div className="flex items-center gap-1.5 text-gray-300">
          <CalendarClock className="h-3.5 w-3.5 text-gray-400" />
          <span className="font-medium">End:</span> {endDate}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-white ${statusInfo.color}`}>
            {statusInfo.icon}
            <span className="capitalize">{status.replace("-", " ")}</span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default React.memo(Tooltip) // ✅ Dùng React.memo để tránh render lại không cần thiết
