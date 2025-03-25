import { GanttChartSquare } from "lucide-react"

// Server Component for the chart header
export function GanttChartHeader() {
  return (
    <div className="flex items-center gap-2 mb-4 text-white">
      <GanttChartSquare size={24} />
      <h2 className="text-lg font-semibold">Project Plan</h2>
    </div>
  )
}

