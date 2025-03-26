import { GanttChartSquare } from "lucide-react"

// Server Component for the chart header
export function GanttChartHeader() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <GanttChartSquare size={24} />
      <h2 className="text-lg font-semibold">Time line</h2>
    </div>
  )
}

