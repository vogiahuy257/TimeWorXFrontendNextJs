import { TaskGanttChartClient } from "./task-gantt-chart-client"
import { GanttChartHeader } from "./gantt-chart-header"
import type { Task } from "./types"

interface TaskGanttChartProps {
  tasks: Task[]
}

// This is a Server Component that wraps the client components
export default function TaskGanttChart({ tasks }: TaskGanttChartProps) {
  // Pre-process data on the server
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

  return (
    <div className="bg-gray-900 p-4 rounded-2xl shadow-lg w-full max-w-5xl mx-auto">
      <GanttChartHeader />
      <TaskGanttChartClient tasks={sortedTasks} />
    </div>
  )
}

