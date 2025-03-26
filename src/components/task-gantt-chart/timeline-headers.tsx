
import type { MonthHeader } from "./types"

interface TimelineHeadersProps {
  monthHeaders: MonthHeader[]
  dateRange: Date[]
  isWeekend: (date: Date) => boolean
}

// Client Component for the timeline headers
export function TimelineHeaders({ monthHeaders, dateRange, isWeekend }: TimelineHeadersProps) {
  return (
    <>
      {/* Month header row */}
      <div className="flex border-b border-gray-700 h-9">
        {monthHeaders.map((header, index) => (
          <div
            key={index}
            className="flex-shrink-0 p-1 text-center text-sm font-medium border-r border-gray-700 "
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
              isWeekend(date) ? " text-gray-black-css" : "text-gray-css"
            } border-r border-gray-700`}
          >
            <div>{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div className="font-bold">{date.getDate()}</div>
          </div>
        ))}
      </div>
    </>
  )
}

