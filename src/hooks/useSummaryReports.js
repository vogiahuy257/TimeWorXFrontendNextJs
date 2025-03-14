import { useEffect, useState, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'
import { summaryReportService } from '@/services/summaryReportService'

export function useSummaryReports() {
    const [reports, setReports] = useState([]) 
    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 10,
        current_page: 1
    }) 
    const [loadingSummaryReport, setLoadingSummaryReport] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const searchTimeout = useRef(null)
    const searchTermRef = useRef(searchTerm)

    // Hàm tìm kiếm báo cáo
    const searchReports = useCallback(async () => {
        setLoadingSummaryReport(true)
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
            setLoadingSummaryReport(false)
        }
    }, [])

    // Xử lý thay đổi search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            resetReports()
            return
        }

        searchTermRef.current = searchTerm

        if (searchTimeout.current) clearTimeout(searchTimeout.current)

        searchTimeout.current = setTimeout(() => {
            searchReports()
        }, 400)

        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current)
        }
    }, [searchTerm])

    // Hàm tải báo cáo với phân trang
    const loadReports = useCallback(async (pageNumber) => {
        if (loadingSummaryReport || searchTerm.trim() !== '') return 
        setLoadingSummaryReport(true)

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
            setLoadingSummaryReport(false)
        }
    }, [loadingSummaryReport, searchTerm])

    // Reset danh sách khi tìm kiếm rỗng
    const resetReports = () => {
        setReports([])
        setPagination({
            total: 0,
            per_page: 10,
            current_page: 1
        })
        setLoadingSummaryReport(false)
        setTimeout(() => {
            loadReports(1)
        }, 100)
    }

    // Hàm thêm báo cáo mới vào đầu danh sách
    const addNewReport = useCallback((newReport) => {
        setReports((prev) => [newReport, ...prev.slice(0, 29)]) // Giữ tối đa 30 báo cáo
        setPagination((prev) => ({
            ...prev,
            total: prev.total + 1 // Cập nhật tổng số báo cáo
        }))
    }, [])

    return {
        reports,
        setReports,
        setPagination,
        pagination,
        loadingSummaryReport,
        searchTerm,
        setSearchTerm,
        loadReports,
        addNewReport
    }
}
