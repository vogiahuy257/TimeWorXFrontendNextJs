import { useEffect, useState, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'
import { summaryReportService } from '@/services/summaryReportService'

export function useSummaryReports() {
    const [reports, setReports] = useState([]) 
    const [deletedReports, setDeletedReports] = useState([])
    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 10,
        current_page: 1
    }) 
    const [loadingSummaryReport, setLoadingSummaryReport] = useState(false)
    const [loadingDeletedReports, setLoadingDeletedReports] = useState(false)
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
        } catch {
            toast.error('Error searching reports')
        } finally {
            setLoadingSummaryReport(false)
        }
    }, [searchTermRef.current]) // Cập nhật mỗi khi search term thay đổ    

    // Xử lý thay đổi search term
    useEffect(() => {
        searchTermRef.current = searchTerm
    
        if (searchTimeout.current) clearTimeout(searchTimeout.current)
    
        if (searchTerm.trim() === '') {
            resetReports() // Gọi API lấy dữ liệu trang 1 ngay khi searchTerm rỗng
        } else {
            searchTimeout.current = setTimeout(() => {
                searchReports()
            }, 400)
        }
    
        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current)
        }
    }, [searchTerm])    

    // Hàm tải báo cáo với phân trang
    const loadReports = useCallback(async (pageNumber) => {
        if (loadingSummaryReport) return
    
        setLoadingSummaryReport(true)
        try {
            const res = await summaryReportService.getSummaryReports({ page: pageNumber, per_page: 10 })
    
            if (!res.data || res.data.length === 0) {
                return
            }
    
            setReports((prev) => {
                const newReports = [...prev, ...res.data]
                return Array.from(new Map(newReports.map(r => [r.summary_report_id, r])).values()).slice(-30)
            })
    
            setPagination((prev) => ({
                ...prev,
                total: res.total,
                current_page: res.current_page
            }))
        } catch {
            toast.error('Error loading reports')
        } finally {
            setLoadingSummaryReport(false)
        }
    }, []) // Không phụ thuộc vào loadingSummaryReport
    
    

    // Reset danh sách khi tìm kiếm rỗng
    const resetReports = useCallback(async () => {
        setPagination({ total: 0, per_page: 10, current_page: 1 })
        setReports([]) // Xóa danh sách cũ trước khi tải mới
    
        setLoadingSummaryReport(true)
        try {
            const res = await summaryReportService.getSummaryReports({ page: 1, per_page: 10 })
            setReports(res.data || [])
            setPagination({
                total: res.total,
                per_page: res.per_page,
                current_page: 1
            })
        } catch{
            toast.error('Error loading reports')
        } finally {
            setLoadingSummaryReport(false)
        }
    }, [])

    // Hàm thêm báo cáo mới vào đầu danh sách
    const addNewReport = useCallback((newReport) => {
        setReports((prev) => [newReport, ...prev.slice(0, 29)]) // Giữ tối đa 30 báo cáo
        setPagination((prev) => ({
            ...prev,
            total: prev.total + 1 // Cập nhật tổng số báo cáo
        }))
    }, [])

    // 🟢 Tải danh sách báo cáo đã xóa
    const loadDeletedReports = useCallback(async () => {
        setLoadingDeletedReports(true)
        try {
            const reports = await summaryReportService.getDeletedSummaryReports()
            setDeletedReports(reports)
        } catch (error) {
            console.error("Error fetching deleted reports:", error)
        } finally {
            setLoadingDeletedReports(false)
        }
    }, [])

    // 🟢 Khôi phục báo cáo đã xóa
    const handleRestore = async (id) => {
        try {
            await summaryReportService.restoreSummaryReport(id)
            toast.success("Report restored successfully!")
            // Lấy báo cáo vừa khôi phục từ danh sách đã xóa
            const restoredReport = deletedReports.find(report => report.summary_report_id === id)

            // Cập nhật danh sách báo cáo chính ngay lập tức
            if (restoredReport) {
                setReports(prev => [restoredReport, ...prev.slice(0, 29)])
            }

            // Xóa báo cáo khỏi danh sách đã xóa
            setDeletedReports(prev => prev.filter(report => report.summary_report_id !== id))
            
            // Cập nhật tổng số báo cáo
            setPagination(prev => ({
                ...prev,
                total: prev.total + 1
            }))
        } catch (error) {
            console.error("Error restoring report:", error)
            toast.error("Failed to restore report.")
        }
    }

    // 🟢 Xóa vĩnh viễn báo cáo
    const handlePermanentDelete = async (id) => {
        try {
            await summaryReportService.permanentlyDeleteSummaryReport(id)
            toast.success("Report permanently deleted!")

            // Cập nhật danh sách đã xóa
            setDeletedReports(prev => prev.filter(report => report.summary_report_id !== id))

        } catch (error) {
            console.error("Error permanently deleting report:", error)
            toast.error("Failed to permanently delete report.")
        }
    }

    return {
        reports,
        deletedReports,
        searchTermRef,
        setLoadingSummaryReport,
        setReports,
        setPagination,
        pagination,
        loadingSummaryReport,
        loadingDeletedReports,
        searchTerm,
        setSearchTerm,
        loadReports,
        loadDeletedReports,
        addNewReport,
        handleRestore,
        handlePermanentDelete
    }
}
