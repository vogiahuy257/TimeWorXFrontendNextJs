import { useState, useEffect } from 'react'
import axios from '@/libs/axios'
import { toast } from 'react-toastify'
import ReportComment from './ReportComment'
import ReportDetails from './ReportDetails'
import LoadingSmall from '../loading/LoadingSmall'
import IconX from '@/components/icon/iconX'

const ShowReportToTask = ({ task, onClose, updateTaskStatus }) => {
    const [reportData, setReportData] = useState(null)
    const [loadingReportData, setLoadingReportData] = useState(true)

    useEffect(() => {
        // Function to fetch report data
        const fetchReportData = async () => {
            try {
                const response = await axios.get(`/api/reports/${task.id}`, {
                    params: { project_id: task.project_id, task_id: task.id },
                })

                let report = response.data

                if (report.files && !report.isLink && report.files.length > 0) {
                    const formattedFiles = await Promise.all(
                        report.files.map(async file => {
                            try {
                                const fileBlob = await axios.get(
                                    `/api/files/download?path=${file.path}`,
                                    {
                                        responseType: 'blob',
                                    },
                                )

                                return {
                                    file: new File([fileBlob.data], file.name, {
                                        type: file.type,
                                    }),
                                    path: file.path,
                                    type: file.type,
                                    isApiFile: true,
                                }
                            } catch {
                                toast.error(`Error loading file: ${file.name}`)
                                return null
                            }
                        }),
                    )

                    // Lọc bỏ file null (trường hợp lỗi tải file)
                    report.files = formattedFiles.filter(file => file !== null)
                }

                setReportData(report)
            } catch {
                toast.error('Failed to load report data')
            }
            finally{
                setLoadingReportData(false)
            }
        }

        fetchReportData()
    }, [task])

    const handDoneReport = taskId => {
        updateTaskStatus(taskId, 'done')
        onClose()
    }

    return (
        <section
            id="report-to-task"
            className="flex justify-center items-center fixed top-0 left-0 z-[999] w-full h-full"
        >
            <div className="bg-black bg-opacity-40 h-auto m-auto scrollbar-hide relative w-full max-h-full  max-w-[880px] p-4 overflow-y-auto rounded-lg shadow-lg lg:max-w-[80%]">
                <button
                    className=" absolute flex justify-center items-center btn-close z-50 top-4 right-4 p-1.5 rounded-xl"
                    onClick={onClose}
                >
                    <IconX/>
                </button>
                
                <div className="flex flex-col scrollbar-hide items-center w-full gap-4 overflow-y-auto lg:flex-row">
                     <div className="report-content-task-form h-full w-[80%] p-8 pb-4 mt-10 rounded-lg shadow lg:w-1/2">
                            {loadingReportData ? (
                                <div className='relative w-full h-[500px] top-0 left-0'>
                                    <LoadingSmall/>   
                                </div>
                            ) : (reportData && reportData.user ? (
                                <ReportDetails task={task} reportData={reportData} handDoneReport={handDoneReport}/>
                            ) : (
                                <div className="flex flex-col justify-center h-[500px]">
                                    <p className="text-center bg-gray-300 rounded-md p-8 text-gray-800">
                                        This task has not been reported yet
                                    </p>
                                </div>
                            ))}
                        </div>
                   
                        

                    <div className="w-[80%] mb-10 h-full report-content-task-form bg-gray-100  rounded-lg shadow-md lg:w-1/2">
                        <ReportComment
                            taskId={task.id}
                            is_project_manager={true}
                        />
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default ShowReportToTask
