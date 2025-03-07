import axios from '@/libs/axios'

export interface SummaryReport {
    summary_report_id: string  
    project_id?: string | null
    project_name?: string | null 
    project_description?: string | null 
    name: string
    reported_by_user_id: string
    report_date: string  
    summary: string
    completed_tasks?: string
    upcoming_tasks?: string
    project_issues?: string
    zip_name?: string | null
    zip_file_path?: string | null
    created_at?: string 
    updated_at?: string
    deleted_at?: string | null 
}

export interface CreateSummaryReportRequest {
    project_id?: string | null
    name: string
    report_date: string
    summary: string
    completed_tasks?: string
    upcoming_tasks?: string
    project_issues?: string
    report_files?: string[]
}

export interface PaginatedResponse<T> {
    data: T[]
    meta?: {
        total: number
        per_page: number
        current_page: number
    }
}

// Dịch vụ gọi API cho báo cáo tổng kết
export const summaryReportService = {
    // Gửi yêu cầu tạo một báo cáo tổng kết mới
    createSummaryReport: async (data: CreateSummaryReportRequest): Promise<SummaryReport> => {
        const res = await axios.post('/api/summary-reports', data)
        return res.data // Trả về dữ liệu báo cáo vừa tạo
    },

    // Lấy danh sách báo cáo tổng kết, có hỗ trợ phân trang nếu dữ liệu lớn
    getSummaryReports: async (params?: any): Promise<PaginatedResponse<SummaryReport>> => {
        const res = await axios.get('/api/summary-reports', { params })
        return res.data // Trả về danh sách báo cáo và thông tin phân trang (nếu có)
    },

    // Lấy chi tiết một báo cáo tổng kết theo ID
    getSummaryReportById: async (id: string): Promise<SummaryReport> => {
        const res = await axios.get(`/api/summary-reports/${id}`)
        return res.data // Trả về thông tin chi tiết của báo cáo
    },

    // Tải xuống tệp ZIP của báo cáo tổng kết (nếu có)
    downloadSummaryReportZip: async (id: string): Promise<{ blob: Blob, filename: string }> => {
        const res = await axios.get(`/api/summary-reports/${id}/download`, { responseType: 'blob' })
        const filename = res.headers['content-disposition']?.split('filename=')[1] ?? `summary_report_${id}.zip`
        return { blob: res.data, filename } // Trả về tệp ZIP dưới dạng blob cùng với tên file
    },

    // Xóa mềm một báo cáo tổng kết (chỉ ẩn đi, có thể khôi phục)
    softDeleteSummaryReport: async (id: string): Promise<boolean> => {
        const res = await axios.delete(`/api/summary-reports/${id}`)
        return res.status === 200 // Trả về true nếu xóa thành công
    },

    // Xóa vĩnh viễn một báo cáo tổng kết, không thể khôi phục
    permanentlyDeleteSummaryReport: async (id: string): Promise<boolean> => {
        const res = await axios.delete(`/api/summary-reports/${id}/permanent`)
        return res.status === 200 // Trả về true nếu xóa thành công
    },

    // Lấy danh sách báo cáo đã bị xóa mềm
    getDeletedSummaryReports: async (): Promise<SummaryReport[]> => {
        const res = await axios.get('/api/summary-reports/deleted')
        return res.data // Trả về danh sách báo cáo đã bị xóa mềm
    },

    // Khôi phục một báo cáo tổng kết đã bị xóa mềm
    restoreSummaryReport: async (id: string): Promise<boolean> => {
        const res = await axios.post(`/api/summary-reports/${id}/restore`)
        return res.status === 200 // Trả về true nếu khôi phục thành công
    }
}