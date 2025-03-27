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
  "to-do": "bg-blue-600",
  "in-progress": "bg-yellow-500",
  "verify": "bg-red-500",
  "done": "bg-green-500",
}

// Client Component for the timeline grid and task bars
export function TimelineGrid({ dateRange, tasks, isWeekend }: TimelineGridProps) {
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null)
  const [hoveredTask, setHoveredTask] = useState<FormattedTask | null>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, task: FormattedTask) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY })
    setHoveredTask(task)
  }

  const handleMouseLeave = () => {
    setHoveredTask(null)
    setTooltipPosition(null)
  }

  return (
    <>
      {tasks.map((task, taskIndex) => (
        <div key={taskIndex} className="flex border-b border-gray-700 relative h-10">
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
            onMouseEnter={(e) => handleMouseEnter(e, task)}
            onMouseLeave={handleMouseLeave}
          >
            {task.duration > 2 ? task.content : ""}
          </div>
        </div>
      ))}

      {/* Tooltip (Render chỉ 1 lần) */}
      {hoveredTask && tooltipPosition && (
        <Tooltip
          content={hoveredTask.content}
          startDate={hoveredTask.startDate.toLocaleDateString()}
          endDate={hoveredTask.endDate.toLocaleDateString()}
          status={hoveredTask.status_key as "to-do" | "in-progress" | "verify" | "done"}
          show={!!hoveredTask}
          position={tooltipPosition} // ✅ Tooltip theo chuột
        />
      )}
    </>
  )
}
