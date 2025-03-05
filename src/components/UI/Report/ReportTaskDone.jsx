import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { toast } from 'react-toastify'
import LoadingSmall from '../loading/LoadingSmall'
import LoadingBox from '../loading/LoadingBox'
import axios from '@/libs/axios'

const ReportTaskDone = ({ project_id, onOpenReportTaskForm }) => {
    const [taskData, setTaskData] = useState([])
    const [endDate, setEndDate] = useState('all')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/api/tasks/${project_id}/done`)
                const sortedData = data.sort((a, b) => (a.status_key === 'verify' ? -1 : 1))
                setTaskData(sortedData)
            } catch {
                toast.error('Failed to fetch project tasks.')
            } finally {
                setLoading(false)
            }
        }
        fetchChartData()
    }, [project_id])

    const dateOptions = useMemo(() => {
        const uniqueDates = new Set(taskData.map(task => new Date(task.updated_at).toISOString().split('T')[0]))
        return Array.from(uniqueDates)
    }, [taskData])

    const formatDateToDMY = useCallback((dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB').replace(/\//g, '-')
    }, [])

    const filteredTasks = useMemo(() => {
        if (endDate === 'all') return taskData
        return taskData.filter(task => new Date(task.updated_at).toISOString().split('T')[0] === endDate)
    }, [taskData, endDate])

    if (loading) {
        
        return (
            <section className="custom-task-done w-full h-full mx-auto shadow-md rounded-md p-2 py-4 relative">
                <LoadingSmall />
            </section>
        )
    }

    return (
        <section className="custom-task-done w-full h-full mx-auto shadow-md rounded-md p-2 py-4">
            <div className="select-task-done">
                <select id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="p-1">
                    <option value="all">All</option>
                    {dateOptions.map((date, index) => (
                        <option key={index} value={date}>{formatDateToDMY(date)}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-wrap gap-4 p-2 mx-auto mt-4 w-auto rounded max-h-[290px] overflow-y-auto scrollbar-hide">
                {filteredTasks.length > 0 ? filteredTasks.map((task, index) => (
                    <button key={`${task.id}${index}`} onClick={() => onOpenReportTaskForm(task)} className="btn-report py-2 rounded-md flex flex-col items-center">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="icon-path1" opacity="0.4" d="M16.74 3.65H8.26C5.79 3.65 3.79 5.66 3.79 8.12V17.53C3.79 19.99 5.8 22 8.26 22H16.73C19.2 22 21.2 19.99 21.2 17.53V8.12C21.21 5.65 19.2 3.65 16.74 3.65Z" fill="currentColor"/>
                            <path className="icon-path2" d="M14.85 2H10.15C9.11 2 8.26 2.84 8.26 3.88V4.82C8.26 5.86 9.1 6.7 10.14 6.7H14.85C15.89 6.7 16.73 5.86 16.73 4.82V3.88C16.74 2.84 15.89 2 14.85 2Z" fill="currentColor"/>
                            <path d="M15.5 12.95H8.5C8.09 12.95 7.75 12.61 7.75 12.2C7.75 11.79 8.09 11.45 8.5 11.45H15.5C15.91 11.45 16.25 11.79 16.25 12.2C16.25 12.61 15.91 12.95 15.5 12.95Z" fill="currentColor"/>
                            <path d="M12.88 16.95H8.5C8.09 16.95 7.75 16.61 7.75 16.2C7.75 15.79 8.09 15.45 8.5 15.45H12.88C13.29 15.45 13.63 15.79 13.63 16.2C13.63 16.61 13.29 16.95 12.88 16.95Z" fill="currentColor"/>
                        </svg>
                        <h3 className="w-5/6 truncate">{task.task_name}</h3>
                    </button>
                )) : <p className="text-gray-600 text-center">No completed tasks found for this project.</p>}
            </div>
        </section>
    )
}

export default ReportTaskDone
