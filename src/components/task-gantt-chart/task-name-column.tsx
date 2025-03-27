
import type { FormattedTask } from "./types"

interface TaskNameColumnProps {
  tasks: FormattedTask[]
  onTaskClick: (taskIndex: number) => void
}

// Client Component for the task names column with click handlers
export function TaskNameColumn({ tasks, onTaskClick }: TaskNameColumnProps) {
  return (
    <div className="w-auto flex-shrink-0 sticky left-0 z-10">
      {/* Task name header */}
      <div className="h-[72px] border-b border-r border-gray-700">  
        <div className="h-9 p-2"/>
        <div className="h-9 p-2 font-medium">Task Name</div>
      </div>

      {/* Task names */}
      {tasks.map((task, taskIndex) => (
        <div
          key={taskIndex}
          className="h-10 p-2 border-b border-r border-gray-700 hover:bg-blue-500/80 cursor-pointer"
          onClick={() => onTaskClick(taskIndex)}
          title="Click to scroll to this task"
        >
          {task.content}
        </div>
      ))}
    </div>
  )
}

