import { useState, useRef } from "react"
import UserTable from "./horixontal-task-chart/UserTable"
import ScrollableTasksSection from "./horixontal-task-chart/ScrollableTasksSection"
import NoteHorixontal from "./horixontal-task-chart/NoteHorixontal"
import ContentHorixontal from "./horixontal-task-chart/ContentHorixontal"
import HeaderHorixontal from "./horixontal-task-chart/HeaderHorixontal"
import { UserTaskData } from "@/services/HorizontalTaskChartService"

// Define props interface for the component
interface HorizontalTaskChartProps {
  data: UserTaskData[]
  scaleMax: number
  ticks: number[]
  sortOrder: "asc" | "desc" | null
  setSortOrder: (sortOrder: "asc" | "desc" | null) => void
}

export default function HorizontalTaskChart({ data, scaleMax, ticks,sortOrder,setSortOrder }: HorizontalTaskChartProps) {
  const [hoveredUser, setHoveredUser] = useState<string | null>(null)
  const [hoveredSection, setHoveredSection] = useState<{
    type: string
    value: number
  } | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showSortOptions, setShowSortOptions] = useState(false)

  return (
    <div className="w-full bg-white-css ring-gray-css pt-4 rounded-lg shadow-lg overflow-hidden">
      <HeaderHorixontal
          setShowSortOptions = {setShowSortOptions}
          showSortOptions = {showSortOptions}
          setSortOrder = {setSortOrder}
          sortOrder = {sortOrder}
      />

      <ContentHorixontal/>

      <div className="flex">
        {/* Fixed user column */}
        <UserTable data={data}/>

        {/* Scrollable tasks section */}
      
        <ScrollableTasksSection
            hoveredSection = {hoveredSection}
            data = {data}
            hoveredUser = {hoveredUser}
            scrollContainerRef = {scrollContainerRef}
            ticks = {ticks}
            setHoveredSection = {setHoveredSection}
            setHoveredUser = {setHoveredUser}
            scaleMax = {scaleMax}
        />
      </div>

      <NoteHorixontal/>
    </div>
  )
}
