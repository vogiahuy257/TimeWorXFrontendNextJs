import { useEffect } from "react"
import { useSummaryReports } from "@/hooks/useSummaryReports"
import LoadingBox from "../../loading/LoadingBox"
import NoData from "@/components/NoData"
import { Trash2, RotateCw,X } from 'lucide-react'

export default function ReportHistorySummary ({ isOpen, onClose })
{
    const { deletedReports, loadDeletedReports, loadingDeletedReports, handleRestore, handlePermanentDelete } = useSummaryReports()

    useEffect(() => {
        if (isOpen) {
            loadDeletedReports()
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white-css rounded-2xl h-auto w-96 relative pb-4">
                <h2 className="text-lg font-medium mb-2 pt-4 pl-4">Deleted Reports</h2>

                <div className="h-auto flex px-2 justify-center items-center relative">
                {loadingDeletedReports ? (
                    <div className="h-52 w-full">
                        <LoadingBox/>
                    </div>
                ) : deletedReports.length === 0 ? (
                    <NoData message="No deleted reports found." className={'text-gray-css'}/>
                ) : (
                    <ul className="max-h-60 flex flex-col w-full p-2 gap-3 overflow-y-auto scrollbar-hide">
                        {deletedReports.map((report) => (
                            <li key={report.summary_report_id} className="flex group cursor-pointer justify-between items-center p-3 bg-white-css shadow-sm rounded-lg border border-gray-400 hover:shadow-lg transition-all">
                                {/* Tên báo cáo */}
                                <span className="text-sm font-medium truncate pr-2">{report.name}</span>
                            
                                {/* Nút hành động */}
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                                    {/* Restore */}
                                    <button
                                        onClick={() => handleRestore(report.summary_report_id)}
                                        className="p-2 text-blue-500 bg-blue-400/10 rounded-lg hover:bg-blue-400/20 transition">
                                        <RotateCw size={16} />
                                    </button>
                            
                                    {/* Xóa vĩnh viễn */}
                                    <button
                                        onClick={() => handlePermanentDelete(report.summary_report_id)}
                                        className="p-2 text-red-500 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition">
                                        <Trash2 size={16} />
                                    </button>

                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                </div>

                <button
                    onClick={onClose}
                    className=" absolute top-2 right-2 p-2 font-bold hover:text-red-500">
                    <X size={20} />
                </button>
            </div>
        </div>
    )
}


