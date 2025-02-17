import { useState, useEffect } from 'react'
import axios from '@/libs/axios'
import PrimaryButton from '@/components/Button'
import { toast } from 'react-toastify'
import styles from './css/HistoryBox.module.css'
import LoadingBox from '../loading/LoadingBox'

const  HistoryBox = ({ resetPage,project_id }) => {
    const [deletedTasks, setDeletedTasks] = useState([])
    const [loadingHistory, setLoadingHistory] = useState(true)

    const fetchDeletedTasks = async () => {
        let response
        try {
            if(project_id)
            {
                response = await axios.get(`/api/v1/projects/history`)
            }
            else
            {
                //danh cho trường hợp ở trang task
                response = await axios.get(`/api/v1/personal-plans/trashed`) // Lấy các kế hoạch cá nhân đã xóa   
            }
            setDeletedTasks(response.data)
        } catch {
            toast.error('Lỗi khi tải lich sử')
        }
        finally{
            setLoadingHistory(false)
        }
    }

    useEffect(() => {
        fetchDeletedTasks()
    }, [])

    const handleRestore = async taskId => {
        try {
            if(project_id)
            {
                await axios.get(`/api/projects/restore/${taskId}`)
                .then(response => {
                    setDeletedTasks(prev =>
                        prev.filter(p => p.project_id !== taskId),
                    )
                    resetPage()
                    toast.success(response.data.message)
                })
                .catch(error => {
                    toast.error(
                        `Error restoring project: ${error.response ? error.response.data : error.message}`,
                    )
                })
                resetPage()
            }
            else
            {
                await axios.post(`/api/personal-plans/${taskId}/restore`) // Khôi phục kế hoạch cá nhân
                resetPage(project_id)
                toast.success('Restore task successfully')
            }
            fetchDeletedTasks()
        } catch {
            toast.error('Error restoring task')
        }
    }

    const handlePermanentDelete = async taskId => {
        try {
            if(project_id)
            {
                await axios.delete(`/api/projects/permanently-delete/${taskId}`)
                .then(response => {
                    setDeletedTasks(prev =>
                        prev.filter(p => p.project_id !== taskId),
                    )
                    toast.success(response.data.message)
                })
                .catch(error => {
                    toast.error(
                        `Error permanently deleting project: ${error.response ? error.response.data : error.message}`,
                    )
                })
            }
            else
            {   
                await axios.delete(`/api/personal-plans/${taskId}/force-delete`) // Xóa vĩnh viễn kế hoạch cá nhân
                fetchDeletedTasks()
                toast.success('Task has been permanently deleted')
            }
        } catch {
            toast.error('Error when permanently deleting task')
        }
    }

    return (
        <div className={`${styles.deleted_tasks} rounded-lg shadow-md p-2`}>
            <h2 className={`${styles.deleted_task_text} py-1 rounded-md`}>History</h2>
            <ul className={`${styles.deleted_tasks_ul} mt-2 p-2 rounded-md`}>
                {loadingHistory ? (
                    <LoadingBox/>
                ):
                (
                    deletedTasks.map(task => (
                        <li key={project_id ? task.project_id : task.plan_id} className={`${styles.deleted_tasks_li} p-2 rounded-md`}> {/* Dùng plan_id cho các kế hoạch cá nhân */}
                            <p>{project_id ? task.project_name : task.plan_name}</p> {/* Hiển thị tên kế hoạch cá nhân */}
                            <div className={`${styles.deleted_task_btn}`}>
                                <PrimaryButton
                                    className={`${styles.btn_restore}`}
                                    onClick={() => handleRestore(project_id ? task.project_id : task.plan_id)} // Khôi phục kế hoạch cá nhân
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14.4 13.8L11.9457 16.2426M11.9457 16.2426L9.59999 13.9105M11.9457 16.2426V10.2426M2.40093 17.541L2.40102 8.41673C2.40102 7.50281 2.40068 6.20108 2.40039 5.25853C2.40019 4.59561 2.93752 4.05884 3.60044 4.05884H9.31865L12.0837 7.01247H20.4C21.0627 7.01247 21.6 7.54976 21.6 8.21251L21.5997 17.5412C21.5996 18.8666 20.5251 19.9411 19.1997 19.9411L4.80092 19.9411C3.47543 19.9411 2.40091 18.8665 2.40093 17.541Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </PrimaryButton>

                                <PrimaryButton
                                    className={`${styles.btn_delete}`}
                                    onClick={() => handlePermanentDelete(project_id ? task.project_id : task.plan_id)} // Xóa vĩnh viễn kế hoạch cá nhân
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3 6H5H21"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </PrimaryButton>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default HistoryBox
