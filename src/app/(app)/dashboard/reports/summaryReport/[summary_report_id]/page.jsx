"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { summaryReportService } from "@/services/summaryReportService"

const SummaryReportDetail = () => {
    const router = useRouter()
    const { summary_report_id } = useParams()
    const [report, setReport] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!summary_report_id) return

        const fetchReport = async () => {
            try {
                setLoading(true)
                const data = await summaryReportService.getSummaryReportById(summary_report_id)
                setReport(data)
                console.log(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchReport()
    }, [summary_report_id])

    const memoizedReport = useMemo(() => report, [report])

    if (loading) return <p className="text-center mt-5">Đang tải...</p>
    if (error) return <p className="text-center mt-5 text-red-500">{error}</p>
    if (!memoizedReport) return <p className="text-center mt-5">Không tìm thấy báo cáo</p>

    return (
        // thiết kế lại layout
        <div className="">
            <h1 className="text-2xl font-bold mb-4">{memoizedReport.name}</h1>
            <p className="text-gray-600">📅 Ngày tạo: {memoizedReport.report_date}</p>
            <p className="mt-3">{memoizedReport.description || "Không có mô tả."}</p>

            <button 
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                onClick={() => router.push('/dashboard/reports')}
            >
                Quay lại
            </button>
        </div>
    )
}

export default SummaryReportDetail
