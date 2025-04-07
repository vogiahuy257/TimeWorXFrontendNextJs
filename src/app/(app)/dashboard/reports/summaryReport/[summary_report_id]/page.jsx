"use client"

import {  useParams,useRouter } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { summaryReportService } from "@/services/summaryReportService"
import LoadingBox from "@/components/UI/loading/LoadingBox"
import NoData from "@/components/NoData"
import dynamic from "next/dynamic"
import { format } from "date-fns"
import { useAuthContext } from "@/hooks/context/AuthContext"
import { Calendar, CheckCircle, Download, FileText, Info, User, AlertTriangle, Clock,ArrowLeft,Trash2 } from "lucide-react"
import { toast } from "react-toastify"

const DeleteModal = dynamic(() => import("@/components/DeleteModal"),
{
    ssr: true,
});

const SummaryReportDetail = () => {
    
    const router = useRouter()
    const { user } = useAuthContext()
    const { summary_report_id } = useParams()
    const [report, setReport] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [errorDownload, setErrorDownload] = useState(null)
    const [isDownloading, setIsDownloading] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [activeTab, setActiveTab] = useState("completed")
    const [isDeleting, setIsDeleting] = useState(false)

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        try {
            return format(new Date(dateString), "dd/MM/yyyy HH:mm")
        } catch {
            return dateString
        }
    }

    useEffect(() => {
        if (!summary_report_id) return

        const fetchReport = async () => {
            try {
                setLoading(true)
                const data = await summaryReportService.getSummaryReportById(summary_report_id)
                setReport(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchReport()
    }, [summary_report_id])

    if (loading) return <LoadingBox content={`loading data ${summary_report_id} ...`}/>
    if (error) return 
    (
        <div className="w-full h-full ">
            <p className="text-center mt-5 text-red-500">{error}</p>
        </div>
    )
    if (!memoizedReport) return (
        <NoData className={`w-full h-full `} message={`No data to ${summary_report_id}.`}/>
    )

    const memoizedReport = useMemo(() => report, [report])

    const handleDownloadZip = async () => {
            if (!report.zip_file_path || !report.summary_report_id) return

            setIsDownloading(true)
            setErrorDownload(null)
            try {
                const { blob, filename } = await summaryReportService.downloadSummaryReportZip(report.summary_report_id,`summary_report_${report.name}`)

                // Tạo URL từ blob và tự động tải xuống
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = url
                link.download = filename
                document.body.appendChild(link)
                link.click()

                // Xóa URL sau khi tải xong
                window.URL.revokeObjectURL(url)
                document.body.removeChild(link)
            } catch (error) {
                console.error("Download failed:", error)
                setErrorDownload(error?.message)
            } finally {
                setIsDownloading(false)
            }
    }

    const handleDelete = async () => {
        if (!report?.summary_report_id) return
    
        try {
            setIsDeleting(true)
            await summaryReportService.softDeleteSummaryReport(report.summary_report_id)
            toast.success(`Summary Report ${report.summary_report_id} deleted successfully!`)
            router.push("/dashboard/reports")
        } catch (error) {
            console.error("Error deleting report:", error)
            toast.error("Failed to delete report.")
        } finally {
            setIsDeleting(false)
            setShowDeleteModal(false)
        }
    }

    const handleGoBack = () => {
        router.back()
      }
    return (
        // thiết kế lại layout
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col gap-6">
                <button
                    onClick={handleGoBack}
                    className="group flex items-center w-fit px-4 py-2 rounded-lg font-medium
                                        transition-all duration-200 ease-out
                                        hover:text-blue-600 dark:hover:text-blue-400"
                >
                    <ArrowLeft
                        className="h-5 w-5 mr-2 transition-transform duration-300 
                                                    group-hover:-translate-x-1"
                    />
                    <span className="relative">
                        Back
                        <span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400
                                                transition-all duration-300 ease-out
                                                group-hover:w-full"
                        />
                    </span>
                </button>


                {/* Header with report name and download button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">{report.name}</h1>
                        <p className="text-gray-500">Report ID: {report.summary_report_id}</p>
                    </div>

                    <div className="">
                        {report.zip_file_path && (
                            <button
                                onClick={handleDownloadZip}
                                disabled={isDownloading}
                                className={`flex items-center justify-center px-4 py-2 rounded-md text-white font-medium
                                    transition-all duration-300 ease-in-out w-full sm:w-auto
                                    ${isDownloading ? "bg-gray-400 scale-95 opacity-50 cursor-not-allowed" 
                                                    : "bg-blue-700 hover:bg-blue-800 hover:scale-105 active:scale-100"}`}
                            >
                                <Download
                                    className={`mr-2 h-4 w-4 transition-transform duration-300 ease-in-out
                                        ${isDownloading ? "animate-bounce" : ""}`}
                                />
                                {isDownloading ? "Downloading..." : `Download ${report.zip_name || "ZIP File"}`}
                            </button>
                        )}
                        {errorDownload && <span className="text-xs text-red-500 font-semibold">{errorDownload}</span>}
                    </div>
                </div>

                {/* Main report information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - Project info */}
                <div className="bg-white-css-css rounded-lg shadow-md overflow-hidden border border-gray-200 md:col-span-1">
                    <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-blue-500" />
                        Project Information
                    </h2>
                    </div>
                    <div className="p-4 space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Project Name</p>
                        <p className="font-medium">{report.project_name || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Project ID</p>
                        <p className="font-medium">{report.project_id || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Project Description</p>
                        <p className="text-sm">{report.project_description || "No description available"}</p>
                    </div>
                    </div>
                </div>

                {/* Middle column - Report details */}
                <div className="bg-white-css rounded-lg shadow-md overflow-hidden border border-gray-200 md:col-span-2">
                    <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold flex items-center">
                        <Info className="mr-2 h-5 w-5 text-blue-500" />
                        Report Details
                    </h2>
                    </div>
                    <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                        <p className="text-sm font-medium text-gray-500">Reported By</p>
                        <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-gray-500" />
                            <p className="font-medium">{user?.name || "Unknown user"}</p>
                        </div>
                        </div>
                        <div>
                        <p className="text-sm font-medium text-gray-500">Report Date</p>
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                            <p className="font-medium">{formatDate(report.report_date)}</p>
                        </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">Summary</p>
                        <div className="mt-1 p-3 bg-gray-css-100 rounded-md">
                            <p className="text-sm whitespace-pre-line">{report.summary}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Tabs for tasks and issues */}
                <div className="bg-white-css rounded-lg shadow-md overflow-hidden border border-gray-200">
                    <div className="border-b border-gray-200">
                        <div className="flex">
                        <button
                            onClick={() => setActiveTab("completed")}
                            className={`px-4 py-3 text-sm font-medium flex-1 sm:flex-none sm:w-40 text-center
                            ${
                                activeTab === "completed"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : " hover:text-blue-600"
                            }`}
                        >
                            Completed Tasks
                        </button>
                        <button
                            onClick={() => setActiveTab("upcoming")}
                            className={`px-4 py-3 text-sm font-medium flex-1 sm:flex-none sm:w-40 text-center
                            ${
                                activeTab === "upcoming"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : " hover:text-blue-600"
                            }`}
                        >
                            Upcoming Tasks
                        </button>
                        <button
                            onClick={() => setActiveTab("issues")}
                            className={`px-4 py-3 text-sm font-medium flex-1 sm:flex-none sm:w-40 text-center
                            ${
                                activeTab === "issues"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : " hover:text-blue-600"
                            }`}
                        >
                            Issues
                        </button>
                        </div>
                    </div>

                    <div className="p-4">
                        {activeTab === "completed" && (
                        <div>
                            <h3 className="text-lg font-semibold flex items-center mb-3">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                            Completed Tasks
                            </h3>
                            {report.completed_tasks ? (
                            <div className="whitespace-pre-line text-sm">{report.completed_tasks}</div>
                            ) : (
                            <p className="text-gray-500 text-sm">No completed tasks reported</p>
                            )}
                        </div>
                        )}

                        {activeTab === "upcoming" && (
                        <div>
                            <h3 className="text-lg font-semibold flex items-center mb-3">
                            <Clock className="mr-2 h-5 w-5 text-blue-500" />
                            Upcoming Tasks
                            </h3>
                            {report.upcoming_tasks ? (
                            <div className="whitespace-pre-line text-sm">{report.upcoming_tasks}</div>
                            ) : (
                            <p className="text-gray-500 text-sm">No upcoming tasks reported</p>
                            )}
                        </div>
                        )}

                        {activeTab === "issues" && (
                        <div>
                            <h3 className="text-lg font-semibold flex items-center mb-3">
                            <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                            Project Issues
                            </h3>
                            {report.project_issues ? (
                            <div className="whitespace-pre-line text-sm">{report.project_issues}</div>
                            ) : (
                            <p className="text-gray-500 text-sm">No issues reported</p>
                            )}
                        </div>
                        )}
                    </div>
                </div>

                {/* Metadata footer */}
                <div className="bg-white-css rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-sm font-semibold">Metadata</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Created</p>
                        <p>{formatDate(report.created_at)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Last Updated</p>
                        <p>{formatDate(report.updated_at)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Status</p>
                        <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${report.deleted_at ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                        >
                        {report.deleted_at ? "Deleted" : "Active"}
                        </span>
                        {report.deleted_at && (
                        <p className="text-xs text-gray-500 mt-1">Deleted on: {formatDate(report.deleted_at)}</p>
                        )}
                    </div>
                    </div>
                </div>
                </div>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex items-center justify-center px-4 py-2 rounded-md text-white font-medium
                            transition-all duration-200 ease-in-out w-1/2 sm:w-auto
                            bg-red-600 hover:bg-red-700  active:scale-95"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Report
                    </button>
            </div>

            {showDeleteModal && (
                <DeleteModal 
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    isDeleting={isDeleting}
                />
            )}

        </div>
    )
}

export default SummaryReportDetail
