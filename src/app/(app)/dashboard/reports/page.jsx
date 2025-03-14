'use client'

// External Libraries
import { useEffect, useState, useMemo, useCallback } from 'react'
import axios from '@/libs/axios'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import LoadingPage from '@/components/UI/loading/LoadingPage'
import ReportProjectDetail from '@/components/UI/Report/ReportProjectDetail'
import ReportTaskDone from '@/components/UI/Report/ReportTaskDone'
import SummaryReport from '@/components/UI/Report/SummaryReport'
import ReportProjects from '@/components/UI/Report/ReportProjects'
import ReportLayout from './ReportLayout'
// Dynamically Imported Components
const ReportTaskForm = dynamic(
    () => import('@/components/UI/Report/ReportTaskForm'),
    { ssr: false, loading: () => <LoadingPage/>},
)
export default function Report() {
    const [projects, setProjects] = useState([])
    const [selectProject, setSelectProject] = useState(null)
    const [taskData, setTaskData] = useState([])
    const [isOpenShowReportToTask, setIsOpenShowReportToTask] = useState(false)
    const [selectTask, setSelectTask] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingTasks, setLoadingTasks] = useState(false)
    
    const selectedProjectId = useMemo(() => selectProject?.project_id ?? null, [selectProject])
    const memoizedProjects = useMemo(() => projects, [projects])
    const memoizedTask = useMemo(() => taskData, [taskData])

    const handleOpenReportTaskForm = (task = null) => {
        setSelectTask(task)
        setIsOpenShowReportToTask((prev) => !prev)
    }

    const fetchProjectData = useCallback(async () => {
        if (projects.length > 0) return
        setLoading(true)
        try {
            const response = await axios.get(`/api/v1/projects/getall`)
            const projectList = response.data || []
            setProjects(projectList)
            setSelectProject(projectList[0] || null)
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching projects.")
        } finally {
            setLoading(false)
        }
    }, [projects.length])

    useEffect(() => {
        fetchProjectData()
    }, [fetchProjectData])

    // Fetch danh sách task của project đã chọn
    useEffect(() => {
        if (!selectedProjectId) {
            setTaskData([]) // Reset nếu không có project
            return
        }
        const fetchTaskData = async () => {
            setLoadingTasks(true)
            try {
                const { data } = await axios.get(`/api/tasks/${selectedProjectId}/done`)
                const sortedData = data.sort((a, b) => (a.status_key === 'verify' ? -1 : 1))
                setTaskData(sortedData.length ? sortedData : []) // Nếu không có task, set mảng rỗng
            } catch {
                toast.error('Failed to fetch project tasks.')
                setTaskData([])
            }
            finally {
                setLoadingTasks(false)
            }
        }
        fetchTaskData()
    }, [selectedProjectId])
    
    return (
        <ReportLayout loading={loading}>
            <div className="main w-full flex justify-center items-center relative">
                <div className="m-4 w-full h-full flex flex-col gap-4">
                        {/* Danh sách Project */}
                    <div className="gap-4 w-full h-full flex flex-col-reverse">
                        <div className="gap-4 flex flex-col md:flex-row">
                            <ReportProjects
                                projects={memoizedProjects}
                                handleProjectClick ={setSelectProject}
                                selectProject={selectProject}
                            />

                            {/* Hiển thị task của project đã chọn */}
                            <ReportTaskDone
                                loadingTasks = {loadingTasks}
                                tasks = {memoizedTask}
                                onOpenReportTaskForm = {handleOpenReportTaskForm}
                            />
                        </div>
                        {/* xem chi tiết project */}
                        <div className={`h-64 report-content detail-box rounded-md relative`}>
                            <ReportProjectDetail
                                project={selectProject}
                            />
                        </div>
                    </div>

                        {/* Task Done của Project */}
                    <div className="w-full h-full flex flex-row">
                        <SummaryReport
                            selectedProjectId={selectedProjectId}
                            memoizedProjects={memoizedProjects}
                        />
                    </div>
                </div>
            </div>
            {isOpenShowReportToTask && (
                <ReportTaskForm
                    onClose={handleOpenReportTaskForm}
                    task={selectTask}
                />
            )}
        </ReportLayout>
    )
}
