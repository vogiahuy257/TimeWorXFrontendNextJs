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
    const [loading, setLoading] = useState(false) 
    const observerRef = useRef(null) 
    const [searchTerm, setSearchTerm] = useState('')
    const searchTimeout = useRef(null) 
    const searchTermRef = useRef(searchTerm) 

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setReports([])
            setPagination({
                total: 0,
                per_page: 10,
                current_page: 1
            })

            setLoading(false)

            setTimeout(() => {
                loadReports(1)
            }, 100)
            return
        }

        searchTermRef.current = searchTerm // ✅ Cập nhật giá trị mới nhất của searchTerm
    
        if (searchTimeout.current) clearTimeout(searchTimeout.current)
    
        searchTimeout.current = setTimeout(() => {
            searchReports()
        }, 400)
    
        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current)
        }
    }, [searchTerm])    

    const searchReports = useCallback(async () => {
        setLoading(true)
        
        try {
            const res = await summaryReportService.getSummaryReports({
                page: 1,
                per_page: 10,
                search: searchTermRef.current.trim()
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
    }, [pagination.total, reports.length]) // ✅ Không phụ thuộc vào `searchTerm`

    const loadReports = useCallback(async (pageNumber) => {
        if (loading || searchTerm.trim() !== '') return // 🔥 Nếu searchTerm rỗng, API phải được gọi
        // dang làm sửa dieu kien cho truong hợp lỗi
        setLoading(true)
    
        try {
            const res = await summaryReportService.getSummaryReports({ page: pageNumber, per_page: 10 })
    
            if (!res.data || res.data.length === 0) {
                setLoading(false)
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
    }, [loading, searchTerm])
    
    useEffect(() => {
        if (loading || searchTerm.trim() !== '') return

        if (pagination.total > 0 && (pagination.current_page * pagination.per_page) >= pagination.total) return
        
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadReports(pagination.current_page + 1)
                }
            },
            { threshold: 1 }
        )

        if (observerRef.current) observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [pagination.current_page, searchTerm])

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
