
import type { FormattedTask } from "./types"

interface TaskNameColumnProps {
  tasks: FormattedTask[]
  onTaskClick: (taskIndex: number) => void
}

// Client Component for the task names column with click handlers
export function TaskNameColumn({ tasks, onTaskClick }: TaskNameColumnProps) {
  return (
    <div className="w-48 flex-shrink-0 sticky left-0 z-10">
      {/* Task name header */}
      <div className="h-[72px] border-b border-r border-gray-700 bg-gray-900">
        <div className="h-9 p-2"></div>
        <div className="h-9 p-2 font-medium text-white">Task Name</div>
      </div>

      {/* Task names */}
      {tasks.map((task, taskIndex) => (
        <div
          key={taskIndex}
          className="h-10 p-2 text-white border-b border-r border-gray-700 bg-gray-900 hover:bg-gray-800 cursor-pointer transition-colors"
          onClick={() => onTaskClick(taskIndex)}
          title="Click to scroll to this task"
        >
          {task.content}
        </div>
      ))}
    </div>
  )
}

