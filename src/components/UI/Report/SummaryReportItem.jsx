import { memo } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, ArrowRight } from "lucide-react"

const SummaryReportItem = memo(({ report,setLoadingPage }) => {
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
        setLoadingPage(true)
        try {
            router.push(`/dashboard/reports/summaryReport/${report.summary_report_id}`)
        } catch (error) {
            toast('error', error.message || 'Something went wrong')
        } finally {
            setLoadingPage(false)
        }
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
                                group-hover:bg-gray-950/80 group-hover:shadow-lg 
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


            {/* Download indicator if zip exists */}
            {report.zip_file_path && !report.deleted_at && (
                <span className="flex items-center gap-1 ml-auto px-2 py-1 text-xs font-medium text-green-600 bg-green-50 bg-green-400/30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M648-456v-72h72v72h-72Zm0 72h-72v-72h72v72Zm0 72v-72h72v72h-72ZM450-600l-96-96H168v432h408v-48h72v48h144v-336H648v72h-72v-72H450ZM168-192q-29 0-50.5-21.5T96-264v-432q0-29.7 21.5-50.85Q139-768 168-768h185.64q14.35 0 27.36 5 13 5 24 16l75 75h312q29.7 0 50.85 21.15Q864-629.7 864-600v336q0 29-21.15 50.5T792-192H168Zm0-72v-432 432Z"/></svg>
                    Attached file
                </span>
            )}
            </div>
        </button>
    )
}, (prevProps, nextProps) => prevProps.report.summary_report_id === nextProps.report.summary_report_id)

SummaryReportItem.displayName = "SummaryReportItem"
export default SummaryReportItem
