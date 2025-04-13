
import { motion, AnimatePresence } from 'framer-motion'

interface TaskProgressBarSectionProps {
  type: 'todo' | 'in-progress' | 'verify' | 'done'
  percent: number
  color: string
  label: string
  value: number
  isHovered: boolean
  hoveredSection: { type: string; value: number } | null
  setHoveredSection: (section: { type: string; value: number } | null) => void
  roundedRight?: boolean
}

const TaskProgressBarSection: React.FC<TaskProgressBarSectionProps> = ({
  type,
  percent,
  color,
  label,
  value,
  isHovered,
  hoveredSection,
  setHoveredSection,
  roundedRight = false,
}) => {
  if (percent <= 0) return null

  return (
    <div className="relative h-full" style={{ width: `${percent}%` }}>
      <motion.div
        className={`absolute top-0 left-0 h-full flex items-center justify-center overflow-visible ${color} ${
          roundedRight ? 'rounded-r-lg' : ''
        } ${
          hoveredSection?.type === type && isHovered
            ? 'z-10'
            : ''
        }`}
        style={{
          width: '100%',
        }}
        initial={false}
        animate={{
          width:
            hoveredSection?.type === type && isHovered
              ? 'calc(100% + 40px)'
              : '100%',
          zIndex:
            hoveredSection?.type === type && isHovered
              ? 10
              : 1,
        }}
        transition={{
          duration: 0.2,
        }}
        onMouseEnter={() =>
          setHoveredSection({ type, value })
        }
        onMouseLeave={() => setHoveredSection(null)}
      >
        <AnimatePresence>
          {hoveredSection?.type === type && isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`text-xs font-medium px-2 whitespace-nowrap ${
                type === 'in-progress'
                  ? 'text-gray-800'
                  : 'text-white'
              }`}
            >
              {label}: {value}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default TaskProgressBarSection
