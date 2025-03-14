'use client'
import { useEffect, useRef, useState } from 'react'
import LoadingSmall from '../loading/LoadingSmall'
import SummaryReportItem from './SummaryReportItem'
import SummaryLayoutReport from './SummaryLayoutReport'
import { useSummaryReports } from '@/hooks/useSummaryReports'

export default function SummaryPageReport({
    memoizedProjects,
    selectedProjectId,
}) {
    const [isOpenFormSummary, setIsOpenFormSummary] = useState(false)
    const {
        reports,
        pagination,
        loadingSummaryReport,
        searchTerm,
        setSearchTerm,
        loadReports,
        addNewReport
    } = useSummaryReports()
    const observerRef = useRef(null)

    const handleOpenForm = () => setIsOpenFormSummary(prev => !prev)
    // Infinite scroll: Tải thêm báo cáo khi cuộn đến cuối
    useEffect(() => {
        if (loadingSummaryReport || searchTerm.trim() !== '') return

        if (
            pagination.total > 0 &&
            pagination.current_page * pagination.per_page >= pagination.total
        )
            return

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadReports(pagination.current_page + 1)
                }
            },
            { threshold: 1 },
        )

        if (observerRef.current) observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [pagination.current_page, searchTerm])

    return (
        <SummaryLayoutReport
            addNewReport ={addNewReport}
            memoizedProjects={memoizedProjects}
            selectedProjectId={selectedProjectId}
            handleOpenForm={handleOpenForm}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isOpenFormSummary={isOpenFormSummary}>
            {reports.length > 0
                ? reports.map(report => (
                      <SummaryReportItem
                          key={report.summary_report_id}
                          report={report}
                      />
                  ))
                : !loadingSummaryReport && (
                      <p className="text-center text-gray-500">No reports.</p>
                  )}

            {/* Vùng theo dõi cuộn */}
            <div ref={observerRef} style={{ height: '10px' }} />

            {/* Hiển thị loader khi đang tải thêm dữ liệu */}
            {loadingSummaryReport && <LoadingSmall />}
        </SummaryLayoutReport>
    )
}
