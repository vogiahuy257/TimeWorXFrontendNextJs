
import type { FormattedTask } from "./types"

interface TimelineGridProps {
  dateRange: Date[]
  tasks: FormattedTask[]
  isWeekend: (date: Date) => boolean
}

// Client Component for the timeline grid and task bars
export function TimelineGrid({ dateRange, tasks, isWeekend }: TimelineGridProps) {
  return (
    <>
      {tasks.map((task, taskIndex) => (
        <div key={taskIndex} className="flex border-b border-gray-700 hover:bg-gray-800 relative h-10">
          {/* Timeline grid */}
          {dateRange.map((date, index) => (
            <div
              key={index}
              className={`w-10 flex-shrink-0 h-10 border-r border-gray-700 ${isWeekend(date) ? "bg-gray-800" : ""}`}
            ></div>
          ))}

          {/* Task bar */}
          <div
            className="absolute top-1 h-8 bg-blue-500 rounded-sm flex items-center justify-center text-xs text-white font-medium"
            style={{
              left: `${task.startPosition * 40}px`,
              width: `${task.duration * 40 - 4}px`,
            }}
            title={`${task.content}: ${task.startDate.toLocaleDateString()} - ${task.endDate.toLocaleDateString()}`}
          >
            {task.duration > 2 ? task.content : ""}
          </div>
        </div>
      ))}
    </>
  )
}

