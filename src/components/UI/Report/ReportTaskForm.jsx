
import { useState, useEffect } from 'react'
import axios from '@/libs/axios'
import ReportComment from '../Project/ReportComment'
import LoadingBox from '../loading/LoadingBox'

const ReportTaskForm = ({ task, onClose }) => {
    const [reportData, setReportData] = useState(null)
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        // Function to fetch report data
        const fetchReportData = () => {
            axios
                .get(`/api/reports/${task.task_id}`, {
                    params: { project_id: task.project_id, task_id: task.task_id },
                })
                .then(response => {
                    setReportData(response.data)
                })
                .catch(() => {
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        fetchReportData()
    }, [task])

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
        <section id="report-to-task" className="flex justify-center items-center fixed top-0 left-0 z-[999] w-full h-full">
            <div className="bg-black bg-opacity-40 h-full m-auto relative w-full max-w-[880px] p-4 rounded-lg lg:max-w-[80%]">
                <button
                    className=" absolute flex justify-center items-center btn-close z-50 top-4 right-4 p-1.5 rounded-xl"
                    onClick={onClose}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                {loading ? (
                        <LoadingBox content={'loading data report ...'}/>
                ) : (
                    <div className="flex flex-col-reverse items-center w-full h-full gap-4 overflow-y-auto scrollbar-hide lg:flex-row">
                    <div className="report-content-task-form report-task-form w-[88%] p-6 my-2 rounded-lg w lg:w-1/2">
                        {reportData && reportData.user ? (
                            <div>
                                <div className="text mb-4 border-b border-gray-300 pb-3">
                                    <h2 className="text-xl">
                                        <strong>Report for Task:</strong>{' '}
                                        {task.task_name
                                            ? task.task_name
                                            : task.content}
                                    </h2>
                                    <p className="text-xs mt-1">
                                        <strong>Create By:</strong>{' '}
                                        {reportData.user.name}
                                    </p>
                                    <p className="text-xs mt-1">
                                        <strong>Create Date:</strong>{' '}
                                        {reportData.updated_at
                                            ? formatDate(reportData.updated_at)
                                            : formatDate(reportData.created_at)}
                                    </p>
                                </div>

                                <div className=" h-full max-h-[500px] py-2 overflow-y-scroll scrollbar-hide grid grid-cols-1 gap-6">
                                    <div className="box-input p-4 border border-gray-200 rounded-md bg-transparent">
                                        <h3 className="text-sm font-semibold mb-1">
                                            Goals to be complete:
                                        </h3>
                                        <p className="text-sm">
                                            {reportData.completion_goal}
                                        </p>
                                    </div>

                                    <div className="box-input p-4 border border-gray-200 rounded-md bg-transparent">
                                        <h3 className="text-sm font-semibold mb-1">
                                            Today's work:
                                        </h3>
                                        <p
                                            className="text-sm"
                                            dangerouslySetInnerHTML={{
                                                __html: reportData.today_work,
                                            }}
                                        />
                                    </div>

                                    <div className="box-input p-4 border border-gray-200 rounded-md bg-transparent">
                                        <h3 className="text-sm font-semibold mb-1">
                                            Things to do next:
                                        </h3>
                                        <p className="text-sm">
                                            {reportData.next_steps}
                                        </p>
                                    </div>

                                    <div className="box-input p-4 border border-gray-200 rounded-md bg-transparent">
                                        <h3 className="text-sm font-semibold mb-1">
                                            {reportData.isLink
                                                ? 'Link:'
                                                : 'Document:'}
                                        </h3>
                                        {reportData.isLink ? (
                                            <a
                                                href={reportData.files[0]?.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm hover:underline"
                                            >
                                                {reportData.files[0]?.path}
                                            </a>
                                        ) : (
                                            reportData.files.map(
                                                (file, index) =>
                                                    file.type !== 'link' ? (
                                                        <p
                                                            key={index}
                                                            className="text-sm flex items-center group"
                                                        >
                                                            <a
                                                                href={`/storage/${file.path}`}
                                                                download={
                                                                    file.name
                                                                }
                                                                className="flex items-center transition-colors duration-300 text-blue-600 hover:text-blue-800 hover:underline"
                                                            >
                                                                {file.name}
                                                            </a>
                                                        </p>
                                                    ) : (
                                                        <p
                                                            key={index}
                                                            className=" text-yellow-500"
                                                        >
                                                            No documents have
                                                            been created for the
                                                            report
                                                        </p>
                                                    ),
                                            )
                                        )}
                                    </div>
                                    <div className="p-4 border border-gray-200 rounded-md bg-transparent">
                                        <h3 className="text-sm font-semibold mb-1">
                                            Problems encountered/difficulties:
                                        </h3>
                                        <p className="text-sm">
                                            {reportData.issues}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='h-[300px] flex items-center justify-center'>
                                <p className="text-center w-full bg-gray-300 rounded-md p-8 text-gray-800">
                                    This task has not been reported yet
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="w-[80%] mt-10 report-content-task-form h-auto bg-gray-100 py-4 px-2 rounded-lg lg:w-1/2 lg:mt-0">
                        <ReportComment
                            taskId={task.task_id}
                            is_project_manager={true}
                        />
                    </div>
                </div>
                )}
                    
            </div>
        </section>
    )
}

export default ReportTaskForm
