import axios from '@/libs/axios'

export interface SummaryReport {
    summary_report_id: string  // Khóa chính
    project_id: string
    name: string
    reported_by_user_id: string
    report_date: string  // Date dạng string (ISO format)
    summary: string
    completed_tasks: string
    upcoming_tasks: string
    project_issues: string
    zip_name: string
    zip_file_path: string
    created_at?: string // Laravel tự động thêm timestamps
    updated_at?: string
    deleted_at?: string | null // Nếu có soft delete
}

export const summaryReportService = {
    // 📝 Tạo báo cáo tổng hợp mới
    createSummaryReport: async (data: Partial<SummaryReport>): Promise<SummaryReport> => {
        const res = await axios.post('/api/summary-reports', data)
        return res.data
    },

    // 📜 Lấy danh sách báo cáo tổng hợp (có thể kèm bộ lọc)
    getSummaryReports: async (params?: any): Promise<SummaryReport[]> => {
        const res = await axios.get('/api/summary-reports', { params })
        return res.data.data ?? res.data 
    },

    // 🔍 Lấy chi tiết một báo cáo tổng hợp theo ID
    getSummaryReportById: async (id: string): Promise<SummaryReport> => {
        const res = await axios.get(`/api/summary-reports/${id}`)
        return res.data
    },

    // 📦 Tải file ZIP của báo cáo tổng hợp
    downloadSummaryReportZip: async (id: string): Promise<Blob> => {
        const res = await axios.get(`/api/summary-reports/${id}/download`, { responseType: 'blob' })
        return res.data
    },

    // 🗑 Xóa mềm báo cáo tổng hợp (có thể khôi phục)
    softDeleteSummaryReport: async (id: string): Promise<{ success: boolean }> => {
        const res = await axios.delete(`/api/summary-reports/${id}`)
        return res.data
    },

    // ❌ Xóa vĩnh viễn báo cáo tổng hợp (không thể khôi phục)
    permanentlyDeleteSummaryReport: async (id: string): Promise<{ success: boolean }> => {
        const res = await axios.delete(`/api/summary-reports/${id}/permanent`)
        return res.data
    },

    // 🗃 Lấy danh sách báo cáo đã bị xóa mềm
    getDeletedSummaryReports: async (): Promise<SummaryReport[]> => {
        const res = await axios.get('/api/summary-reports/deleted')
        return res.data
    },

    // ♻️ Khôi phục báo cáo đã bị xóa mềm
    restoreSummaryReport: async (id: string): Promise<{ success: boolean }> => {
        const res = await axios.post(`/api/summary-reports/${id}/restore`)
        return res.data
    },
}