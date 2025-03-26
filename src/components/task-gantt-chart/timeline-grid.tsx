import { useState } from "react"
import type { FormattedTask } from "./types"
import Tooltip from "./Tooltip"

interface TimelineGridProps {
  dateRange: Date[]
  tasks: FormattedTask[]
  isWeekend: (date: Date) => boolean
}

// Màu sắc cho từng trạng thái của task
const statusColors: Record<string, string> = {
  "to-do": "bg-blue-600", // Màu xám cho task chưa làm
  "in-progress": "bg-yellow-500", // Màu vàng cho task đang làm
  "verify": "bg-red-500", // Màu xanh dương cho task cần kiểm tra
  "done": "bg-green-500", // Màu xanh lá cho task đã hoàn thành
}

// Client Component for the timeline grid and task bars
export function TimelineGrid({ dateRange, tasks, isWeekend }: TimelineGridProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <>
      {tasks.map((task, taskIndex) => (
        <div key={taskIndex} className="flex border-b border-gray-700 hover:bg-blue-500 relative h-10">
          {/* Timeline grid */}
          {dateRange.map((date, index) => (
            <div
              key={index}
              className={`w-10 flex-shrink-0 h-10 border-r border-gray-700 ${isWeekend(date) ? "bg-blue-500/50" : ""}`}
            />
          ))}

          {/* Task bar */}
          <div
            className={`absolute top-1 h-8 ${statusColors[task.status_key] || "bg-gray-500"} text-white rounded-md cursor-pointer flex items-center justify-center text-xs group font-medium`}
            style={{
              left: `${task.startPosition * 40}px`,
              width: `${task.duration * 40 - 4}px`,
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {task.duration > 2 ? task.content : ""}

            {/* Tooltip */}
            <Tooltip 
              content={task.content} 
              startDate={task.startDate.toLocaleDateString()} 
              endDate={task.endDate.toLocaleDateString()} 
              status={task.status_key as "to-do" | "in-progress" | "verify" | "done"}
              show={showTooltip}
            />
          </div>
        </div>
      ))}
    </>
  )
}

