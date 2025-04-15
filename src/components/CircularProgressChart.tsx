
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, AlertTriangle } from "lucide-react"
import styles from "@/components/circular-progress-chart/css/colors.module.css"

interface TaskData {
  todo: number
  "in-progress": number
  verify: number
  done: number
}

interface DeadlineData {
  nearDeadline: number
  lateDeadline: number
}

interface ProjectChartProps {
  data: [TaskData, DeadlineData]
}

export default function CircularProgressChart({ data }: ProjectChartProps) {


  const [isHovering, setIsHovering] = useState(false)

  if (!data[0] || !data[1]) return

  const taskData = data[0]
  const deadlineData = data[1]

  // Calculate total tasks and completion percentage
  const totalTasks = taskData.todo + taskData["in-progress"] + taskData.verify + taskData.done
  const completionPercentage = Math.round((taskData.done / totalTasks) * 100)

  // Calculate individual percentages
  const todoPercentage = Math.round((taskData.todo / totalTasks) * 100)
  const inProgressPercentage = Math.round((taskData["in-progress"] / totalTasks) * 100)
  const verifyPercentage = Math.round((taskData.verify / totalTasks) * 100)
  const donePercentage = Math.round((taskData.done / totalTasks) * 100)

  // Colors from CSS module
  const colors = {
    todo: "var(--color-todo)",
    inProgress: "var(--color-in-progress)",
    verify: "var(--color-verify)",
    done: "var(--color-done)",
    background: "var(--color-background)",
    backgroundLight: "var(--color-background-light)",
    text: "var(--color-text)",
    textSecondary: "var(--color-text-secondary)",
    accent: "var(--color-accent)",
    moonGlow: "var(--color-moon-glow)",
    warning: "var(--color-warning)",
    danger: "var(--color-danger)",
  }

  // Calculate stroke dash values for the circular progress
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeWidth = 12
  const doneStrokeDasharray = (completionPercentage / 100) * circumference
  const doneStrokeDashoffset = circumference - doneStrokeDasharray

  // Calculate stroke dash values for each segment when hovering
  const todoStrokeDash = (todoPercentage / 100) * circumference
  const inProgressStrokeDash = (inProgressPercentage / 100) * circumference
  const verifyStrokeDash = (verifyPercentage / 100) * circumference
  const doneStrokeDash = (donePercentage / 100) * circumference

  return (
    <div
      className={`${styles.colors} bg-white-css flex flex-col items-center justify-center w-full h-full p-8 rounded-lg shadow-lg`}
    >
      <div
        className="relative cursor-pointer transition-all duration-300 transform hover:scale-105"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* SVG for circular progress */}
        <svg width="220" height="220" viewBox="0 0 220 220">
          {/* Subtle glow effect */}
          <defs>
            <filter id="moonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background circle with subtle gradient */}
          <circle
            cx="110"
            cy="110"
            r={radius + 5}
            fill="transparent"
            stroke="url(#bgGradient)"
            strokeWidth="1"
            opacity="0.3"
          />

          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.moonGlow} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.background} stopOpacity="0" />
          </radialGradient>

          {/* Background track */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="transparent"
            stroke={colors.moonGlow}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity="0.3"
          />

          <AnimatePresence>
            {!isHovering ? (
              /* Single progress circle when not hovering */
              <motion.circle
                key="singleProgress"
                cx="110"
                cy="110"
                r={radius}
                fill="transparent"
                stroke="url(#progressGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={doneStrokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 110 110)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                filter="url(#moonGlow)"
              />
            ) : (
              /* Multiple segments when hovering */
              <>
                {/* Todo segment */}
                <motion.circle
                  key="todoSegment"
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="transparent"
                  stroke={colors.todo}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - todoStrokeDash}
                  strokeLinecap="round"
                  transform="rotate(-90 110 110)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0 }}
                />

                {/* In Progress segment */}
                <motion.circle
                  key="inProgressSegment"
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="transparent"
                  stroke={colors.inProgress}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - inProgressStrokeDash}
                  strokeLinecap="round"
                  transform={`rotate(${(todoPercentage / 100) * 360 - 90} 110 110)`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />

                {/* Verify segment */}
                <motion.circle
                  key="verifySegment"
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="transparent"
                  stroke={colors.verify}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - verifyStrokeDash}
                  strokeLinecap="round"
                  transform={`rotate(${((todoPercentage + inProgressPercentage) / 100) * 360 - 90} 110 110)`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />

                {/* Done segment */}
                <motion.circle
                  key="doneSegment"
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="transparent"
                  stroke={colors.done}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - doneStrokeDash}
                  strokeLinecap="round"
                  transform={`rotate(${((todoPercentage + inProgressPercentage + verifyPercentage) / 100) * 360 - 90} 110 110)`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Progress gradient definition */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-gradient-start)" />
              <stop offset="50%" stopColor="var(--color-gradient-middle)" />
              <stop offset="100%" stopColor="var(--color-gradient-end)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isHovering ? (
              <motion.div
                key="percentage"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center"
              >
                <span className="text-5xl text-gray-black-css font-bold bg-clip-text text-transparent">
                  {completionPercentage}%
                </span>
                <span className="text-sm text-gray-css mt-1">Completed</span>
              </motion.div>
            ) : (
              <motion.div
                key="breakdown"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center gap-2 w-40 backdrop-blur-sm p-3 rounded-lg shadow-lg"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.todo }}/>
                    <span className="text-xs">Todo</span>
                  </div>
                  <span className="text-xs font-medium">{todoPercentage}%</span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.inProgress }}/>
                    <span className="text-xs">In Progress</span>
                  </div>
                  <span className="text-xs font-medium">{inProgressPercentage}%</span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.verify }}/>
                    <span className="text-xs">Verify</span>
                  </div>
                  <span className="text-xs font-medium ">{verifyPercentage}%</span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.done }}/>
                    <span className="text-xs">Done</span>
                  </div>
                  <span className="text-xs font-medium ">{donePercentage}%</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Deadline information */}
      <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
        <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-amber-500/10">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-sm font-medium text-slate-700">Near Deadline</span>
          </div>
          <span className="text-lg font-semibold text-amber-500">{deadlineData.nearDeadline}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-500/10">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-sm font-medium text-slate-700">Late Deadline</span>
          </div>
          <span className="text-lg font-semibold text-red-500">{deadlineData.lateDeadline}</span>
        </div>
      </div>
    </div>
  )
}
