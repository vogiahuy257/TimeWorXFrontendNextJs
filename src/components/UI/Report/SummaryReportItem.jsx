import { memo } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, ArrowRight } from "lucide-react"

const SummaryReportItem = memo(({ report }) => {
    const router = useRouter()

    const formatDate = (dateString) => {
        if (!dateString) return ""
        if (dateString.includes("/")) return dateString // Already formatted
  
        try {
          const date = new Date(dateString)
          return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        } catch {
          return dateString
        }
      }
  

    const onView = () => {
        router.push(`/dashboard/reports/summaryReport/${report.summary_report_id}`)
    }
    return (
        <button
            onClick={onView}
            className="w-full group relative cardBox p-5 rounded-xl"
        >
            {/* Top section with report name, project name and arrow */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 text-left">
                    <h3 className="text-lg font-medium mb-1 pr-8 line-clamp-1">{report.name}</h3>
                        {report.project_name && (
                        <div className="flex items-center text-sm text-gray-css">
                            <span>{report.project_name}</span>
                        </div>
                        )}
                </div>

                <div className="flex-shrink-0 p-2 rounded-md transition-all duration-300 
                                group-hover:bg-blue-600/80 group-hover:shadow-lg 
                                group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowRight className="h-5 w-5 group-hover:text-white transform -rotate-45 transition-all duration-300 group-hover:scale-110" />
                </div>

            </div>

            {/* Summary section */}
            {report.summary && (
            <div className="mb-4 text-left">
                <p className=" line-clamp-2">{report.summary}</p>
            </div>
            )}

            {/* Bottom metadata section */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 border-t border-gray-100 text-left">
            <div className="flex items-center text-sm text-gray-css">
                <Calendar className="h-4 w-4 mr-1.5 text-gray-css" />
                <span>{formatDate(report.report_date)}</span>
            </div>

            {report.created_at && (
                <div className="flex items-center text-sm text-gray-css">
                <Clock className="h-4 w-4 mr-1.5 text-gray-css" />
                <span>Tạo: {formatDate(report.created_at)}</span>
                </div>
            )}

            {/* {report.reported_by_user_id && (
                <div className="flex items-center text-sm text-gray-css">
                <User className="h-4 w-4 mr-1.5 text-gray-css" />
                <span>{report.reported_by_user_id}</span>
                </div>
            )} */}

            {/* Status indicator */}
            {report.deleted_at && (
                <span className="ml-auto px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-400/30 rounded-full">
                Đã xóa
                </span>
            )}

            {/* Download indicator if zip exists */}
            {report.zip_file_path && !report.deleted_at && (
                <span className="ml-auto px-2 py-1 text-xs font-medium text-green-600 bg-green-50 bg-green-400/30 rounded-full">
                Có file đính kèm
                </span>
            )}
            </div>
        </button>
    )
}, (prevProps, nextProps) => prevProps.report.summary_report_id === nextProps.report.summary_report_id)
// 🟢 Thêm display name để fix lỗi react/display-name
SummaryReportItem.displayName = "SummaryReportItem"
export default SummaryReportItem
