import { useEffect } from "react"
import { useSummaryReports } from "@/hooks/useSummaryReports"
import LoadingBox from "../../loading/LoadingBox"

export default function ReportHistorySummary ({ isOpen, onClose })
{
    const { deletedReports, loadDeletedReports, loadingDeletedReports, handleRestore } = useSummaryReports()

    useEffect(() => {
        if (isOpen) {
            loadDeletedReports()
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 w-96">
                <h2 className="text-lg font-bold mb-2">Deleted Reports</h2>

                {loadingDeletedReports ? (
                    <LoadingBox/>
                ) : deletedReports.length === 0 ? (
                    <p className="text-gray-css">No deleted reports found.</p>
                ) : (
                    <ul className="max-h-60 overflow-y-auto">
                        {deletedReports.map((report) => (
                            <li key={report.summary_report_id} className="flex justify-between items-center p-2 border-b">
                                <span className="text-sm">{report.name}</span>
                                <button
                                    onClick={() => handleRestore(report.summary_report_id)}
                                    className="text-blue-500 text-sm hover:underline">
                                    Restore
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400">
                    Close
                </button>
            </div>
        </div>
    )
}


