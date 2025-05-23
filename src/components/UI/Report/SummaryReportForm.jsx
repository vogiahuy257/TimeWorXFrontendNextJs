
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import FileSelection from './ComponentsSummaryReportForm/FileSelection'
import Dropdown from './ComponentsSummaryReportForm/Dropdown'
import axios from '@/libs/axios'
import './css/SummaryReportForm.css'
import { summaryReportService } from '@/services/summaryReportService'
export default function SummaryReportForm({ addNewReport,handleOpenForm, projectIdChange,projects }) {
    // State cho form
    const [formData, setFormData] = useState({
        name: '', 
        project_id: '', 
        report_date: '',
        summary: '',
        completed_tasks: '', 
        upcoming_tasks: '', 
        project_issues: '', 
        selectedFiles: [], 
    })    
    
    const [files, setFiles] = useState([])
    const [loadingFile, setLoadingFile] = useState(false)
    const [isAtBottom, setIsAtBottom] = useState(true)
    const selectedFileCount = useMemo(() => formData.selectedFiles.length, [formData.selectedFiles])

    const formRef = useRef(null)

    // Tạo một object để lưu function cập nhật state nhằm tránh render lại không cần thiết
    const handleInputChange = useCallback(e => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }, [])

    // Fetch danh sách file của project
    const fetchFiles = useCallback(async () => {
        if (!formData.project_id) return
        setLoadingFile(true)
        // Giữ lại dữ liệu cũ, chỉ reset selectedFiles
        setFormData((prev) => ({
            ...prev,
            selectedFiles: [] // Xóa danh sách file đã chọn
        }))
        try {
            // sửa lỗi truy vấn backend
            const response = await axios.get(`/api/v1/projects/${formData.project_id}/files`)
            setFiles(response.data)
        } catch (err) {
            console.error(err.response?.data?.message || "Có lỗi xảy ra!")
        } finally {
            setLoadingFile(false)
        }
    }, [formData.project_id])

    // Gọi API khi `project_id` thay đổi
    useEffect(() => {
        if (formData.project_id) {
            fetchFiles()
        }
    }, [formData.project_id, fetchFiles])

    // Cập nhật `project_id` khi `projectIdChange` thay đổi
    useEffect(() => {
        setFormData(prev => ({ ...prev, project_id: projectIdChange }))
    }, [projectIdChange])

    // Xử lý scroll
    const handleScroll = useCallback(() => {
        if (!formRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = formRef.current
        setIsAtBottom(Math.abs(scrollTop + clientHeight - scrollHeight) < 5)
    }, [])

    useEffect(() => {
        const currentForm = formRef.current
        if (currentForm) {
            currentForm.addEventListener('scroll', handleScroll)
        }
        return () => currentForm?.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    // Scroll xuống cuối form
    const scrollToBottom = useCallback(() => {
        formRef.current?.scrollTo({ top: formRef.current.scrollHeight, behavior: 'smooth' })
    }, [])

    // Xử lý submit form
    const handleSubmit = useCallback(async () => {
        if (!formRef.current) return
        try {
            const data = {
                project_id: formData.project_id || null,
                name: formData.name,
                report_date: formData.report_date,
                summary: formData.summary,
                completed_tasks: formData.completed_tasks,
                upcoming_tasks: formData.upcoming_tasks,
                project_issues: formData.project_issues,
                report_files: formData.selectedFiles.map(file => ({
                    file_id: file.file_id,
                    path: file.path,
                    file_name: file.name
                }))
            }
            const newReport = await summaryReportService.createSummaryReport(data)
            addNewReport(newReport)
            handleOpenForm()
        } catch (err) {
            console.error("❌ Error creating summary report:", err.response?.data?.message || err.message)
        }
    }, [formData])
       
          

    return (
        <section
            id="SummaryReportForm"
            className="fixed top-0 left-0 w-full h-full z-50"
        >
            <div className="custom-form rounded-lg shadow-xl w-full max-w-2xl">
                <div className="relative p-4">
                    <h2 className="text-2xl font-semibold">Summary Report</h2>
                    <p className=" mb-2 text-sm font-light">
                        Create a new summary report for your project
                    </p>

                    <button
                        onClick={handleOpenForm}
                        className="absolute right-4 top-4 btn-close"
                        aria-label="Close"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
                        </svg>
                    </button>

                    <form
                        ref={formRef}
                        className="custom-form-main rounded-md max-h-[70vh] p-4 pt-2 overflow-y-auto scrollbar-hide w-full"
                    >
                        {/* Report Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="text-sm font-medium mb-1"
                            >
                                Report Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter report name"
                            />
                        </div>

                        {/* Project Select */}
                        <Dropdown
                            label="Select a Project"
                            options={projects}
                            value={formData.project_id}
                            onChange={setFormData}
                        />

                        {/* Report Date */}
                        <div>
                            <label
                                htmlFor="report_date"
                                className="text-sm font-medium mb-1"
                            >
                                Report Date
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="date"
                                    id="report_date"
                                    name="report_date"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white-css"
                                    value={formData.report_date}
                                    onChange={handleInputChange}
                                />

                                {/* Icon lịch tùy chỉnh */}
                                <svg className="absolute bg-white-css right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                                    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
                                </svg>
                            </div>

                        </div>

                        {/* Summary */}
                        <div>
                            <label
                                htmlFor="summary"
                                className="text-sm font-medium mb-1"
                            >
                                Summary
                            </label>
                            <textarea
                                id="summary"
                                name="summary"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.summary}
                                onChange={handleInputChange}
                                placeholder="Provide a brief summary of the report"
                            />
                        </div>

                        {/* Completed Tasks */}
                        <div>
                            <label
                                htmlFor="completed_tasks"
                                className="text-sm font-medium  mb-1"
                            >
                                Completed Tasks
                            </label>
                            <textarea
                                id="completed_tasks"
                                name="completed_tasks"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.completed_tasks}
                                onChange={handleInputChange}
                                placeholder="List completed tasks"
                            />
                        </div>

                        {/* Upcoming Tasks */}
                        <div>
                            <label
                                htmlFor="upcoming_tasks"
                                className="text-sm font-medium mb-1"
                            >
                                Upcoming Tasks
                            </label>
                            <textarea
                                id="upcoming_tasks"
                                name="upcoming_tasks"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.upcoming_tasks}
                                onChange={handleInputChange}
                                placeholder="List upcoming tasks"
                            />
                        </div>

                        {/* Project Issues */}
                        <div>
                            <label
                                htmlFor="project_issues"
                                className="text-sm font-medium mb-1"
                            >
                                Project Issues
                            </label>
                            <textarea
                                id="project_issues"
                                name="project_issues"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.project_issues}
                                onChange={handleInputChange}
                                placeholder="Describe any project issues"
                            />
                        </div>
                        {/* File Selection */}
                        <FileSelection
                            loadingFile={loadingFile}
                            files={files}
                            selectedFiles={formData.selectedFiles}
                            onChange={setFormData}
                        />

                        {/* Nút cuộn xuống */}
                        {!isAtBottom && (
                            <button
                                type="button"
                                onClick={scrollToBottom}
                                className="absolute btn-scroll bottom-20 right-[50%] translate-x-1/2 p-2 rounded-full shadow-xl"
                                aria-label="Scroll to bottom"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </button>
                        )}
                    </form>

                    <div className="relative pt-3">
                        <span className="custom-selectedFiles text-center flex justify-end items-end text-sm absolute right-0 -top-[35px]">
                            <p className="text-center flex justify-center items-center rounded-md">
                                {selectedFileCount} files selected
                            </p>
                        </span>
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="w-full text-sm btn-submit py-2 px-4 rounded-md"
                        >
                            Create Report Summary
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
