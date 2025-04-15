import { motion } from "framer-motion"
import TaskProgressBarSection from "./TaskProgressBarSection"
export default function ScrollableTasksSection({
    data,
    hoveredUser,
    scrollContainerRef,
    ticks,
    setHoveredSection,
    setHoveredUser,
    hoveredSection,
    scaleMax,
}) {
    return (
        <div className="flex-1 overflow-x-auto" ref={scrollContainerRef}>
            <div className="min-w-[600px]">
                <div>
                    {data.map((user, index) => {
                        // Calculate percentages for each task type
                        const todoPercent = (user.todo / user.countTask) * 100
                        const pendingPercent =
                            (user.in_progress / user.countTask) * 100
                        const verifyPercent =
                            (user.verify / user.countTask) * 100
                        const donePercent = (user.done / user.countTask) * 100

                        // Calculate the width of the entire bar relative to the scale max
                        const barWidth = (user.countTask / scaleMax) * 100

                        const isHovered = hoveredUser === user.username

                        return (
                            <div
                                key={`task-${index}`}
                                className="p-4 h-[72px]"
                                onMouseEnter={() =>
                                    setHoveredUser(user.username)
                                }
                                onMouseLeave={() => {
                                    setHoveredUser(null)
                                    setHoveredSection(null)
                                }}>
                                <div className="relative">
                                    <div className="relative h-8 bg-gray-100/30 rounded-lg overflow-hidden">
                                        {/* Grid lines */}
                                        <div className="absolute inset-0 flex">
                                            {ticks.map((tick, i) => (
                                                <div
                                                    key={i}
                                                    className="h-full border-l border-gray-200"
                                                    style={{
                                                        left: `${(tick / scaleMax) * 100}%`,
                                                    }}/>
                                            ))}
                                        </div>

                                        <motion.div
                                            className="absolute top-0 left-0 h-full flex rounded-lg"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${barWidth}%` }}
                                            transition={{
                                                duration: 0.8,
                                                ease: 'easeOut',
                                            }}>
                                                <TaskProgressBarSection
                                                type="todo"
                                                percent={todoPercent}
                                                color="bg-blue-500"
                                                label="Todo"
                                                value={user.todo}
                                                isHovered={isHovered}
                                                hoveredSection={hoveredSection}
                                                setHoveredSection={setHoveredSection}
                                                />

                                                <TaskProgressBarSection
                                                type="pending"
                                                percent={pendingPercent}
                                                color="bg-yellow-400"
                                                label="In Progress"
                                                value={user.in_progress}
                                                isHovered={isHovered}
                                                hoveredSection={hoveredSection}
                                                setHoveredSection={setHoveredSection}
                                                />

                                                <TaskProgressBarSection
                                                type="verify"
                                                percent={verifyPercent}
                                                color="bg-red-500"
                                                label="Verify"
                                                value={user.verify}
                                                isHovered={isHovered}
                                                hoveredSection={hoveredSection}
                                                setHoveredSection={setHoveredSection}
                                                />

                                                <TaskProgressBarSection
                                                type="done"
                                                percent={donePercent}
                                                color="bg-green-500"
                                                label="Done"
                                                value={user.done}
                                                isHovered={isHovered}
                                                hoveredSection={hoveredSection}
                                                setHoveredSection={setHoveredSection}
                                                roundedRight
                                                />

                                            
                                        </motion.div>
                                    </div>

                                    <div className="text-right text-xs text-gray-500 mt-1">
                                        {user.countTask} tasks
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Numerical scale */}
                <div className="relative h-6 px-4 mb-4">
                    <div className="absolute left-4 right-4 top-0 h-[1px] bg-gray-300"/>

                    {ticks.map((tick, index) => {
                        const position = (tick / scaleMax) * 100
                        return (
                            <div
                                key={index}
                                className="absolute"
                                style={{ left: `calc(${position}% + 4px)` }}>
                                <div className="h-2 w-[1px] bg-gray-400"/>
                                <div className="text-xs text-gray-600 mt-1 transform -translate-x-1/2">
                                    {tick}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
