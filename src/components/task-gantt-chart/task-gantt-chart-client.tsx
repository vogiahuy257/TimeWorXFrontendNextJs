"use client"

import { useEffect, useState, useRef } from "react"
import { TaskNameColumn } from "./task-name-column"
import { TimelineHeaders } from "./timeline-headers"
import { TimelineGrid } from "./timeline-grid"
import type { Task, FormattedTask, MonthHeader } from "./types"

interface TaskGanttChartClientProps {
  tasks: Task[]
}

// Main Client Component that handles state and interactivity
export function TaskGanttChartClient({ tasks }: TaskGanttChartClientProps) {
  const [dateRange, setDateRange] = useState<Date[]>([])
  const [formattedTasks, setFormattedTasks] = useState<FormattedTask[]>([])
  const [monthHeaders, setMonthHeaders] = useState<MonthHeader[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Find the earliest start date and latest end date
    let minDate = new Date(tasks[0].created_at)
    const [day, month, year, time] = tasks[0].deadline.split(/[- ]/)
    let maxDate = new Date(`${month}/${day}/${year} ${time}`)

    tasks.forEach((task) => {
      const startDate = new Date(task.created_at)
      const [day, month, year, time] = task.deadline.split(/[- ]/)
      const endDate = new Date(`${month}/${day}/${year} ${time}`)

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
    const months: MonthHeader[] = []
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
      const startDate = new Date(task.created_at)
      const [day, month, year, time] = task.deadline.split(/[- ]/)
      const endDate = new Date(`${month}/${day}/${year} ${time}`)

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
    <div className="flex">
      {/* Task name column */}
      <TaskNameColumn tasks={formattedTasks} onTaskClick={scrollToTask} />

      {/* Scrollable timeline area */}
      <div className="overflow-x-auto" ref={timelineRef}>
        <div style={{ minWidth: `${dateRange.length * 40}px` }}>
          {/* Timeline headers */}
          <TimelineHeaders monthHeaders={monthHeaders} dateRange={dateRange} isWeekend={isWeekend} />

          {/* Timeline grid and task bars */}
          <TimelineGrid dateRange={dateRange} tasks={formattedTasks} isWeekend={isWeekend} />
        </div>
      </div>
    </div>
  )
}

