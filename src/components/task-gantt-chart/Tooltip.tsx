"use client"

import { useState, useEffect } from "react"
import { CalendarClock, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface TooltipProps {
  content: string
  startDate: string
  endDate: string
  status: "to-do" | "in-progress" | "verify" | "done"
  show: boolean // ✅ Kiểm soát hiển thị tooltip
}

export default function Tooltip({ content, startDate, endDate, status, show }: TooltipProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!show) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY + 10 }) 
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove) // Cleanup
  }, [show]) // 🔄 Chỉ chạy khi `show` thay đổi

  const getStatusColor = (status: string) => {
    switch (status) {
      case "to-do": return "bg-blue-600"
      case "in-progress": return "bg-yellow-500"
      case "verify": return "bg-red-500"
      case "done": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "to-do": return <Clock className="h-4 w-4" />
      case "in-progress": return <CalendarClock className="h-4 w-4" />
      case "verify": return <AlertCircle className="h-4 w-4" />
      case "done": return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  if (!show) return null // ❌ Chỉ render khi cần thiết

  return (
    <div
      className="fixed z-50 w-64 rounded-lg bg-white p-3 shadow-lg ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10 
      opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <h3 className="font-medium text-sm text-slate-900 dark:text-slate-100">{content}</h3>
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <Clock className="h-3.5 w-3.5 text-slate-500" />
          <span className="font-medium">Start:</span> {startDate}
        </div>
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <CalendarClock className="h-3.5 w-3.5 text-slate-500" />
          <span className="font-medium">End:</span> {endDate}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-white ${getStatusColor(status)}`}>
            {getStatusIcon(status)}
            <span className="capitalize">{status.replace("-", " ")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
