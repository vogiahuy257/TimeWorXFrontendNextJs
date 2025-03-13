import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from '@/libs/axios'
import ReportPieChart from './ReportPieChart'

const ReportProjectDetail = ({ project }) => {
    const [pieChartDataValues, setPieChartDataValues] = useState([0, 0, 0, 0]) // Khởi tạo dữ liệu biểu đồ
    const pieChartLabels = ['To Do', 'In-Progress', 'Verify']
    const pieChartColors = ['#117add', '#f1c21b', '#da1e28']
    const statusColors = {
        "to-do": { bg: "bg-blue-600"}, // #f1c21b
        "in-progress": { bg: "bg-yellow-500" }, // #117add
        "verify": { bg: "bg-red-600" }, // #da1e28
    }
    const { bg } = statusColors[project.project_status] || { bg: "bg-gray-400" } // Mặc định màu xám nếu không khớp

    const fetchChartData = async () => {
        try {
            const response = await axios.post(
                `/api/projects/${project.project_id}/statistics`,
            )
            const data = response.data.statistics
            setPieChartDataValues([
                data['to-do'] || 0,
                data['in-progress'] || 0,
                data['verify'] || 0,
            ])
        } catch {
            toast.error('Failed to fetch project statistics.')
        }
    }

    useEffect(() => {
        fetchChartData()
    }, [project.project_id])

    const formatDateRange = (startDate, endDate) => {
        const optionsWithYear = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }
        const optionsWithoutYear = { day: '2-digit', month: 'short' }

        const start = new Date(startDate)
        const end = new Date(endDate)

        if (start.getFullYear() === end.getFullYear()) {
            const formattedStart = start.toLocaleDateString(
                'en-GB',
                optionsWithoutYear,
            )
            const formattedEnd = end.toLocaleDateString(
                'en-GB',
                optionsWithYear,
            )
            return `${formattedStart} - ${formattedEnd}`
        } else {
            const formattedStart = start.toLocaleDateString(
                'en-GB',
                optionsWithYear,
            )
            const formattedEnd = end.toLocaleDateString(
                'en-GB',
                optionsWithYear,
            )
            return `${formattedStart} - ${formattedEnd}`
        }
    }

    const formatDate = dateString => {
        const date = new Date(dateString)
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour12: true,
        }
        let formattedDate = date.toLocaleString('en-GB', options)
        formattedDate = formattedDate
            .replace(',', '')
            .replace('/', '-')
            .replace('/', '-')
        return formattedDate
    }

    return (
        <div className="project-detail">
            <h3 className="project-name shadow-md px-2 py-3 text-center font-semibold break-words whitespace-normal">
                {project.project_name}
            </h3>
            <h3 className="project-date rounded-lg py-1 text-center break-words whitespace-normal">
                {formatDateRange(project.start_date, project.end_date)}
            </h3>
            <div className="detail-content p-4 rounded-lg shadow-md flex">
                <div className="w-1/2 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
                    <div className="flex flex-col items-start gap-2">
                        <h3 className="text-sm font-medium ">Description:</h3>
                        <p className="text-sm break-words whitespace-normal overflow-hidden">
                            {project.project_description}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium ">Status:</h3>
                        <p className="text-sm font-medium flex items-center">
                            <span className={`inline-block w-2.5 h-2.5 rounded-full ${bg} mr-2`}></span>
                            {project.project_status}
                        </p>
                    </div>

                    {/* 3️⃣ Thời gian tạo */}
                    <div className='flex items-center gap-2'>
                        <h3 className="text-sm font-medium ">Created at:</h3>
                        <p className="text-sm break-words whitespace-normal overflow-hidden">
                            {formatDate(project.created_at)}
                        </p>
                    </div>

                    {/* 4️⃣ Thông tin công việc quan trọng */}
                    <div className="flex justify-between">
                        {/* 🔴 Công việc bị trễ */}
                        <div className="flex-1 text-center bg-red-50 px-4 py-3 rounded-lg shadow-sm">
                            <svg className='mx-auto mb-1' xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#EA3323"><path d="M432-96q-120 0-204-84t-84-204q0-93 54.5-191T350-753q27-23 54.5-12.5T432-723v26q0 30 20.86 51t51.05 21q15.09 0 28.09-5t21-15q10-12 25.5-14t26.5 8q53 46 84 118t31 149q0 120-84 204T432-96ZM216-384q0 45.19 18.5 85.59Q253-258 290-223q-1-6-1.5-11t-.5-8.92q0-25.08 9.45-49.18 9.44-24.1 27.55-43.9l107-120 107 120q18.11 19.8 27.55 43.9Q576-268 576-243q0 5-.5 10t-1.5 11q35-29 54.5-71.65Q648-336.3 648-384q0-53-17.5-102T580-576q-17 11-36.37 17-19.38 6-39.63 6-52 0-91.5-32T363-668q-72 67-109.5 139.17Q216-456.66 216-384Zm216 36-53 60q-9 11-14 23.05-5 12.04-5 24.95 0 29.54 21.21 50.77 21.21 21.23 51 21.23T483-189.23q21-21.23 21-50.77 0-13-4.5-25T485-288l-53-60Zm396.21-156q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Zm0-120q-15.21 0-25.71-10.35T792-660v-120q0-15.3 10.29-25.65Q812.58-816 827.79-816t25.71 10.35Q864-795.3 864-780v120q0 15.3-10.29 25.65Q843.42-624 828.21-624Z"/></svg>
                            <h3 className="text-xs font-semibold text-red-500 uppercase tracking-wide">Late Tasks</h3>
                            <p className="text-lg font-bold text-red-600">{project.late_tasks_count}</p>
                        </div>

                        {/* 🟡 Công việc gần đến hạn */}
                        <div className="flex-1 text-center bg-yellow-50 px-4 py-3 rounded-lg shadow-sm mx-2">
                            <svg className='mx-auto mb-1' xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#F19E39"><path d="M479.79-288q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm0-144q15.21 0 25.71-10.35T516-468v-168q0-15.3-10.29-25.65Q495.42-672 480.21-672t-25.71 10.35Q444-651.3 444-636v168q0 15.3 10.29 25.65Q464.58-432 479.79-432ZM216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h171q8-31 33.5-51.5T480-888q34 0 59.5 20.5T573-816h171q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Zm264-552q10.4 0 17.2-6.8 6.8-6.8 6.8-17.2 0-10.4-6.8-17.2-6.8-6.8-17.2-6.8-10.4 0-17.2 6.8-6.8 6.8-6.8 17.2 0 10.4 6.8 17.2 6.8 6.8 17.2 6.8ZM216-216v-528 528Z"/></svg>
                            <h3 className="text-xs font-semibold text-yellow-500 uppercase tracking-wide">Near Deadline</h3>
                            <p className="text-lg font-bold text-yellow-600">{project.near_deadline_tasks_count}</p>
                        </div>

                        {/* 🟢 Tỉ lệ hoàn thành */}
                        <div className="flex-1 text-center bg-green-50 px-4 py-3 rounded-lg shadow-sm">
                            <svg className='mx-auto mb-1' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#22c55e"><path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            <h3 className="text-xs font-semibold text-green-500 uppercase tracking-wide">Completed</h3>
                            <p className="text-lg font-bold text-green-600">{project.completed_tasks_ratio}</p>
                        </div>
                    </div>
                </div>



                <div className="w-1/2 overflow-hidden flex items-center justify-center">
                    {project.project_status == 'done' ? (
                        <div className="flex flex-col justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="64px"
                                width="64px"
                                viewBox="0 -960 960 960"
                                fill="#25a249"
                            >
                                <path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                            </svg>
                            <h3 className="text-green-600">Done</h3>
                        </div>
                    ) : (
                        <ReportPieChart
                            labels={pieChartLabels}
                            dataValues={pieChartDataValues}
                            colors={pieChartColors}
                            title="Task Completion Status"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReportProjectDetail
