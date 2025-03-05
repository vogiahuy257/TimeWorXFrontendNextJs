import { useEffect, useState } from 'react'
import './css/SummaryReport.css'
import LoadingSmall from '../loading/LoadingSmall'
import SummaryReportItem from './SummaryReportItem'
import { toast } from 'react-toastify'
import { summaryReportService } from '@/services/summaryReportService'

export default function SummaryReport({ handleOpenForm }) {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await summaryReportService.getSummaryReports()
                setReports(data)
                console.log(data)
            } catch (err) {
                toast.error('loading report error')
            } finally {
                setLoading(false)
            }
        }

        fetchReports()
    }, [])

    return (
        <SummaryLayoutReport handleOpenForm={handleOpenForm}>
            {loading ? (
                <LoadingSmall />
            ) :(
                Array.isArray(reports) && reports.length > 0 ? (
                    reports.map((report, index) => <SummaryReportItem key={`${report.summary_report_id}${index}`} report={report} />)
                ) : (
                    <p className="text-center text-gray-500">No reports.</p>
                )
            )}
        </SummaryLayoutReport>
    )
}

const SummaryLayoutReport = ({handleOpenForm,children}) => {
    return (
        <section className="custom-sumary-report h-[506px]">
            {/* nút bấm mở formSummaryReport */}
            <button
                onClick={handleOpenForm}
                className="btn btn-create flex justify-center items-center gap-1 rounded-md absolute top-3 left-3"
            >
                <p>Create</p>
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.2192 14.9993H15.0005M15.0005 14.9993H10.7817M15.0005 14.9993V19.218M15.0005 14.9993L15.0005 10.7806M26.25 7.96873L26.25 22.0313C26.25 24.3612 24.3612 26.25 22.0312 26.25H7.96875C5.6388 26.25 3.75 24.3612 3.75 22.0313V7.96873C3.75 5.63879 5.6388 3.75 7.96875 3.75H22.0313C24.3612 3.75 26.25 5.63879 26.25 7.96873Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>

            <div className="w-full h-full bg-while overflow-y-auto max-h-[504px] scrollbar-hide rounded-md mt-8">
                {children}
            </div>
        </section>
    )
}
