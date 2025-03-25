
import { useEffect, useState, useRef } from "react"
import { GanttChartSquare } from "lucide-react"

interface Task {
  id: string;
  content: string;
  created_at: string;
  deadline: string;
  description: string;
  is_late: boolean;
  is_near_deadline: boolean;
  project_id: number;
  status: string;
  user_count: number;
}

interface TaskGanttChartProps {
  tasks: Task[]
}

const TaskGanttChart = ({ tasks }: TaskGanttChartProps) => {
  const [dateRange, setDateRange] = useState<Date[]>([])
  const [formattedTasks, setFormattedTasks] = useState<any[]>([])
  const [monthHeaders, setMonthHeaders] = useState<{ month: string; colSpan: number }[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Find the earliest start date and latest end date
    let minDate = new Date(tasks[0].create_at)
    let maxDate = new Date(tasks[0].update_at)

    tasks.forEach((task) => {
      const startDate = new Date(task.create_at)
      const endDate = new Date(task.update_at)

      if (startDate < minDate) minDate = startDate
      if (endDate > maxDate) maxDate = endDate
    })

    // Create an array of all dates between min and max
    const allDates: Date[] = []
    const currentDate = new Date(minDate)

    while (currentDate <= maxDate) {
      allDates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    setDateRange(allDates)

    // Create month headers
    const months: { month: string; colSpan: number }[] = []
    let currentMonth = ""
    let colSpan = 0

    allDates.forEach((date) => {
      const monthYear = date.toLocaleDateString("en-US", { month: "long", year: "numeric" })

      if (monthYear !== currentMonth) {
        if (currentMonth !== "") {
          months.push({ month: currentMonth, colSpan })
        }
        currentMonth = monthYear
        colSpan = 1
      } else {
        colSpan++
      }
    })

    // Add the last month
    if (currentMonth !== "") {
      months.push({ month: currentMonth, colSpan })
    }

    setMonthHeaders(months)

    // Format tasks with position calculations
    const formatted = tasks.map((task) => {
      const startDate = new Date(task.create_at)
      const endDate = new Date(task.update_at)

      // Calculate position relative to the first date
      const startPosition = Math.floor((startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))
      const duration = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

      return {
        ...task,
        startPosition,
        duration,
        startDate,
        endDate,
      }
    })

    setFormattedTasks(formatted)
  }, [tasks])

  // Function to check if a date is a weekend
  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
  }

  // Function to scroll to a specific task
  const scrollToTask = (taskIndex: number) => {
    if (!timelineRef.current) return

    const task = formattedTasks[taskIndex]
    const taskStartPosition = task.startPosition * 40 // 40px per day
    const containerWidth = timelineRef.current.clientWidth

    // Calculate scroll position to center the task in the view if possible
    const scrollPosition = Math.max(0, taskStartPosition - containerWidth / 2 + (task.duration * 40) / 2)

    // Scroll to the position with smooth animation
    timelineRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    })
  }

  return (
    <div className="bg-gray-900 p-4 rounded-2xl shadow-lg w-full max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-4 text-white">
        <GanttChartSquare size={24} />
        <h2 className="text-lg font-semibold">Project Plan</h2>
      </div>

      <div className="flex">
        {/* Fixed task name column */}
        <div className="w-48 flex-shrink-0 sticky left-0 z-10">
          {/* Task name header */}
          <div className="h-[72px] border-b border-r border-gray-700 bg-gray-900">
            <div className="h-9 p-2"></div>
            <div className="h-9 p-2 font-medium text-white">Task Name</div>
          </div>

          {/* Task names */}
          {formattedTasks.map((task, taskIndex) => (
            <div
              key={taskIndex}
              className="h-10 p-2 text-white border-b border-r border-gray-700 bg-gray-900 hover:bg-gray-800 cursor-pointer transition-colors"
              onClick={() => scrollToTask(taskIndex)}
              title="Click to scroll to this task"
            >
              {task.taskname}
            </div>
          ))}
        </div>

        {/* Scrollable timeline area */}
        <div className="overflow-x-auto" ref={timelineRef}>
          <div style={{ minWidth: `${dateRange.length * 40}px` }}>
            {/* Month header row */}
            <div className="flex border-b border-gray-700 h-9">
              {monthHeaders.map((header, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 p-1 text-center text-sm font-medium text-white border-r border-gray-700 bg-gray-800"
                  style={{ width: `${header.colSpan * 40}px` }}
                >
                  {header.month}
                </div>
              ))}
            </div>

            {/* Day header row */}
            <div className="flex border-b border-gray-700 h-9">
              {dateRange.map((date, index) => (
                <div
                  key={index}
                  className={`w-10 flex-shrink-0 p-1 text-center text-xs ${
                    isWeekend(date) ? "bg-gray-800 text-gray-400" : "text-gray-300"
                  } border-r border-gray-700`}
                >
                  <div>{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                  <div className="font-bold">{date.getDate()}</div>
                </div>
              ))}
            </div>

            {/* Task timeline rows */}
            {formattedTasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex border-b border-gray-700 hover:bg-gray-800 relative h-10">
                {/* Timeline grid */}
                {dateRange.map((date, index) => (
                  <div
                    key={index}
                    className={`w-10 flex-shrink-0 h-10 border-r border-gray-700 ${
                      isWeekend(date) ? "bg-gray-800" : ""
                    }`}
                  ></div>
                ))}

                {/* Task bar */}
                <div
                  className="absolute top-1 h-8 bg-blue-500 rounded-sm flex items-center justify-center text-xs text-white font-medium"
                  style={{
                    left: `${task.startPosition * 40}px`,
                    width: `${task.duration * 40 - 4}px`,
                  }}
                  title={`${task.taskname}: ${task.startDate.toLocaleDateString()} - ${task.endDate.toLocaleDateString()}`}
                >
                  {task.duration > 2 ? task.taskname : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskGanttChart

