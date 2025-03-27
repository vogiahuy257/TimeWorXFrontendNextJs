import { TaskGanttChartClient } from "./task-gantt-chart-client"
import type { Task } from "./types"

interface TaskGanttChartProps {
  tasks: Task[]
}

// This is a Server Component that wraps the client components
export default function TaskGanttChart({ tasks }: TaskGanttChartProps) {
  // Pre-process data on the server

  const sortedTasks = [...tasks].sort((a, b) => new Date(a.time_start).getTime() - new Date(b.time_start).getTime())

  return (
      <TaskGanttChartClient tasks={sortedTasks} />
  )
}

