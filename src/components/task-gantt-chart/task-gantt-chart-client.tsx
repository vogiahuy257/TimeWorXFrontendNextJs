"use client"

import { useEffect, useState, useRef } from "react"
import { TaskNameColumn } from "./task-name-column"
import { TimelineHeaders } from "./timeline-headers"
import { TimelineGrid } from "./timeline-grid"
import type { Task, FormattedTask, MonthHeader } from "./types"
import LoadingBox from "../UI/loading/LoadingBox"

interface TaskGanttChartClientProps {
  tasks: Task[]
}

export function TaskGanttChartClient({ tasks }: TaskGanttChartClientProps) {
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<Date[]>([])
  const [formattedTasks, setFormattedTasks] = useState<FormattedTask[]>([])
  const [monthHeaders, setMonthHeaders] = useState<MonthHeader[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tasks || tasks.length === 0) return // Tránh lỗi khi tasks rỗng
  
    setLoading(true) // Bắt đầu loading
  
    try {
      let minDate = new Date(tasks[0].time_start)
      const [day, month, year, time] = tasks[0].deadline.split(/[- ]/)
      let maxDate = new Date(`${month}/${day}/${year} ${time}`)
  
      tasks.forEach(({ time_start, deadline }) => {
        const startDate = new Date(time_start)
        const [day, month, year, time] = deadline.split(/[- ]/)
        const endDate = new Date(`${month}/${day}/${year} ${time}`)
  
        if (startDate < minDate) minDate = startDate
        if (endDate > maxDate) maxDate = endDate
      })
  
      // Tạo mảng ngày từ minDate đến maxDate
      const allDates: Date[] = Array.from(
        { length: Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 },
        (_, i) => new Date(minDate.getTime() + i * (1000 * 60 * 60 * 24))
      )
  
      // Tạo header tháng
      const months: MonthHeader[] = []
      let currentMonth = ""
      let colSpan = 0
  
      allDates.forEach((date, index) => {
        const monthYear = date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
        if (monthYear !== currentMonth) {
          if (currentMonth !== "") months.push({ month: currentMonth, colSpan })
          currentMonth = monthYear
          colSpan = 1
        } else {
          colSpan++
        }
  
        if (index === allDates.length - 1) months.push({ month: currentMonth, colSpan }) // Thêm tháng cuối cùng
      })
  
      // Định dạng task với vị trí
      const formatted = tasks.map((task) => {
        const startDate = new Date(task.time_start)
        const [day, month, year, time] = task.deadline.split(/[- ]/)
        const endDate = new Date(`${month}/${day}/${year} ${time}`)
  
        return {
          ...task,
          startPosition: Math.floor((startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)),
          duration: Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1,
          startDate,
          endDate,
        }
      })
  
      // Chỉ cập nhật state nếu dữ liệu thay đổi để tránh re-render không cần thiết
      setDateRange((prev) => (JSON.stringify(prev) !== JSON.stringify(allDates) ? allDates : prev))
      setMonthHeaders((prev) => (JSON.stringify(prev) !== JSON.stringify(months) ? months : prev))
      setFormattedTasks((prev) => (JSON.stringify(prev) !== JSON.stringify(formatted) ? formatted : prev))
    } finally {
      setLoading(false)
    }
  }, [tasks])  

  // Function to check if a date is a weekend
  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // 0 là Chủ nhật, 6 là Thứ Bảy
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

  if(loading) return  <LoadingBox content={'loading timeline...'} className={''}/>

  return (
    <div className=" p-4 border-2 border-gray-500 rounded-lg w-auto mx-0 mt-8 mb-12">
      <div className="flex w-full">
        {/* Hiển thị loading spinner khi đang tải */}
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
    </div>
  )
}
