
import {
  Calendar,
  CheckSquare,
  FileText,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  ListChecks,
} from "lucide-react"
import styles from "./project-detail-box/project-detail.module.css"
import ProjectPriority from "./UI/Project/ProjectPriority"

// Project data interface
export interface ProjectData {
  project_name: string
  project_description: string
  start_date: string
  end_date: string
  project_priority: "Low" | "Medium" | "High"
  taskCount: number
  inProgress: number
  done: number
}

// Priority styling
export const priorityConfig = {
  Low: {
    color: "bg-gray-100 text-gray-800",
    icon: <AlertTriangle size={14} className="mr-1 opacity-70" />,
    label: "Low Priority",
  },
  Medium: {
    color: "bg-gray-300 text-gray-800",
    icon: <AlertTriangle size={14} className="mr-1 opacity-80" />,
    label: "Medium Priority",
  },
  High: {
    color: "bg-black text-white",
    icon: <AlertTriangle size={14} className="mr-1" />,
    label: "High Priority",
  }
}

// Utility functions
export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function calculateDaysRemaining(endDate: string) {
  const end = new Date(endDate)
  const today = new Date()
  const diffTime = end.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function calculateDuration(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = end.getTime() - start.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function calculateProgress(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const today = new Date()

  if (today < start) return 0
  if (today > end) return 100

  const totalDuration = end.getTime() - start.getTime()
  const elapsedDuration = today.getTime() - start.getTime()

  return Math.round((elapsedDuration / totalDuration) * 100)
}

export function calculateTaskPercentage(count: number, total: number) {
  if (total === 0) return 0
  return Math.round((count / total) * 100)
}

interface ProjectDetailProps {
  project: ProjectData
  isDescriptionExpanded: boolean
  onToggleDescription: () => void
}

export default function ProjectDetail({ project, isDescriptionExpanded, onToggleDescription }: ProjectDetailProps) {
  if (!project) return // hoặc loading indicator

  const daysRemaining = calculateDaysRemaining(project.end_date)
  const duration = calculateDuration(project.start_date, project.end_date)

  const inProgressPercentage = calculateTaskPercentage(project.inProgress, project.taskCount)
  const donePercentage = calculateTaskPercentage(project.done, project.taskCount)
  const remainingTasks = project.taskCount - project.inProgress - project.done

  return (
    <div className={`${styles.projectCard} rounded-lg shadow-lg overflow-hidden w-full h-auto`}>
      {/* Header */}
      <div className="bg-black/90 text-white p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center">
            <FileText className="mr-2 flex-shrink-0" />
            {project.project_name}
          </h2>
          <div className="flex items-center">
            {/* <span
              className={`text-xs px-3 py-2 rounded-full ${
                priorityConfig[project.project_priority].color
              } ${styles.badge}`}
            >
              <span className="flex items-center">
                {priorityConfig[project.project_priority].icon}
                {priorityConfig[project.project_priority].label}
              </span>
            </span> */}
            <ProjectPriority
              priority={project.project_priority}
              className={'px-4 py-2'}
              classNameText={''}
              sizeIcon={'16'}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-black-css font-semibold flex items-center">
              <FileText size={16} className="mr-2" />
              Project Description
            </h3>
            <button
              onClick={onToggleDescription}
              className="text-gray-black-css focus:outline-none transition-colors"
              aria-label={isDescriptionExpanded ? "Collapse description" : "Expand description"}
            >
              {isDescriptionExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          <div className={`text-sm text-gray-css ${isDescriptionExpanded ? "" : "line-clamp-2"}`}>
            {project.project_description}
          </div>
        </div>

        {/* Task Progress */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-black-css flex items-center">
            <ListChecks size={16} className="mr-2 text-gray-black-css" />
            Task Progress
          </h3>

          <div className="bg-gray-css-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-sm font-medium">Total Tasks:</span>
                <span className="ml-2 text-xs text-center bg-gray-css-50 px-2 py-0.5 rounded-full">{project.taskCount}</span>
              </div>
              <div className="text-xs text-gray-css">{remainingTasks} remaining</div>
            </div>

            {/* In Progress Tasks */}
            <div className="space-y-1 mb-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-css flex items-center">
                  <Clock size={12} className="mr-1" />
                  In Progress
                </span>
                <div className="flex items-center">
                  <span className="text-xs font-medium mr-2">{project.inProgress}</span>
                  <span className="text-xs text-gray-css">({inProgressPercentage}%)</span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${inProgressPercentage}%` }}
                  className="h-full bg-yellow-400 rounded-l-full transition-all duration-1000 ease-in-out"
                />
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-css flex items-center">
                  <CheckSquare size={12} className="mr-1" />
                  Done
                </span>
                <div className="flex items-center">
                  <span className="text-xs font-medium mr-2">{project.done}</span>
                  <span className="text-xs text-gray-css">({donePercentage}%)</span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${donePercentage}%` }}
                  className="h-full bg-green-500 rounded-l-full transition-all duration-1000 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-black-css flex items-center">
            <CalendarDays size={16} className="mr-2 text-gray-css" />
            Timeline
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-css-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-black-css">Start Date</span>
                <span className="text-xs text-gray-black-css">End Date</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1 text-gray-css" />
                  <span className="text-sm font-medium">{formatDate(project.start_date)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1 text-gray-css" />
                  <span className="text-sm font-medium">{formatDate(project.end_date)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-css-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-black-css">Duration</span>
                <span className="text-xs text-gray-black-css">Remaining</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1 text-gray-css" />
                  <span className="text-sm font-medium">{duration} days</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1 text-gray-css" />
                  <span
                    className={`text-sm font-medium ${
                      daysRemaining < 0 ? "text-gray-css line-through" : daysRemaining < 7 ? "font-bold" : ""
                    }`}
                  >
                    {daysRemaining < 0 ? "Overdue" : `${daysRemaining} days`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Progress bar */}
          {/* <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Time Progress</span>
              <span className="text-xs font-medium">{timeProgress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                style={{ width: `${timeProgress}%` }}
                className="h-full bg-black transition-all duration-1000 ease-in-out"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
