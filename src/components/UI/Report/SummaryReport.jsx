'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import LoadingSmall from '../loading/LoadingSmall'
import SummaryReportItem from './SummaryReportItem'
import SummaryLayoutReport from './SummaryLayoutReport'
import { toast } from 'react-toastify'
import { summaryReportService } from '@/services/summaryReportService'

export default function SummaryPageReport({ handleOpenForm }) {
    const [reports, setReports] = useState([]) // Danh sách báo cáo
    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 10,
        current_page: 1
    }) // Thông tin phân trang
    const [loading, setLoading] = useState(false) // Trạng thái loading
    const observerRef = useRef(null) // Ref để theo dõi cuộn
    const [searchTerm, setSearchTerm] = useState('')
    const searchTimeout = useRef(null) // Lưu trữ timeout

    useEffect(() => {
        if (searchTimeout.current) clearTimeout(searchTimeout.current)
    
        if (searchTerm.trim() === '') {
            if (reports.length > 0) return
            loadReports(1)
            return
        }
    
        searchTimeout.current = setTimeout(() => {
            searchReports()
        }, 500)
    
        return () => clearTimeout(searchTimeout.current)
    }, [searchTerm])
    
    

    const searchReports = useCallback(async () => {
        if (loading || (pagination.total > 0 && reports.length >= pagination.total)) return
    
        setLoading(true)
    
        try {
            const res = await summaryReportService.getSummaryReports({
                page: 1,
                per_page: 10,
                search: searchTerm.trim()
            })
    
            setReports(res.data || []) 
            setPagination({
                total: res.total,
                per_page: res.per_page,
                current_page: 1
            })
        } catch (error) {
            toast.error('Error searching reports')
        } finally {
            setLoading(false)
        }
    }, [searchTerm, loading])
    

    const loadReports = useCallback(async (pageNumber) => {
        if (loading || searchTerm) return // Tránh gọi API liên tục
        
        // Chỉ chặn nếu `pagination.total > 0`, tránh chặn lần gọi API đầu tiên
        if (pagination.total > 0 && (pagination.current_page * pagination.per_page) >= pagination.total) return
    
        setLoading(true)
    
        try {
            const res = await summaryReportService.getSummaryReports({ page: pageNumber, per_page: 10 })

            if (!res.data || res.data.length === 0) {
                setLoading(false)  // ✅ Đặt lại `loading`
                return
            }

            setReports((prev) => {
                const newReports = [...prev, ...res.data]
                const uniqueReports = Array.from(new Map(newReports.map(r => [r.summary_report_id, r])).values()) 
                return uniqueReports.slice(-30) 
            })       

            setPagination({
                total: res.total, 
                per_page: res.per_page, 
                current_page: res.current_page 
            })
        } catch (error) {

            toast.error('Error loading reports')

        } finally {
            setLoading(false)
        }
    }, [loading, pagination, reports,searchTerm])
    
    useEffect(() => {
        if (searchTerm === '') {
            loadReports(1) 
        }
    }, [searchTerm])
    
    useEffect(() => {
        
        if (loading || reports.length === 0 || searchTerm) return // Chặn gọi API liên tục khi loading
        if (pagination.total > 0 && (pagination.current_page * pagination.per_page) >= pagination.total) return // Chặn gọi API khi đã tải hết dữ liệu
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadReports(pagination.current_page + 1) // Tải trang tiếp theo
                }
            },
            { threshold: 1 }
        )

        if (observerRef.current) observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [reports.length, loading, pagination.current_page, loadReports])

    return (
        <SummaryLayoutReport handleOpenForm={handleOpenForm} searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
            {reports.length > 0 ? (
                reports.map((report) => (
                    <SummaryReportItem key={report.summary_report_id} report={report} />
                ))
            ) : !loading &&(
                <p className="text-center text-gray-500">No reports.</p>
            )}

            {/* Vùng theo dõi cuộn */}
            <div ref={observerRef} style={{ height: '10px' }} />

            {/* Hiển thị loader khi đang tải thêm dữ liệu */}
            {loading && <LoadingSmall />}
        </SummaryLayoutReport>
    )
}
