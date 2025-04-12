import { useState, useEffect } from 'react'
import axios from '@/libs/axios'
import { toast } from 'react-toastify'
import useEcho from '@/hooks/echo'

export default function useTasks() {
    const [project_id, setProjectId] = useState()
    const [selectProjectId, setSelectedProjectId] = useState()
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [projects, setProjects] = useState([])
    const [selectedTask, setSelectedTask] = useState(null)
    const [taskStatus, setTaskStatus] = useState(null)
    const [showDeletedTasks, setShowDeletedTasks] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [showReportForm, setShowReportForm] = useState(false)
    const [isStaff, setIsStaff] = useState(false)
    const [loadingDataTask, setLoadingDataTask] = useState(true)
    const echo = useEcho()

    const handleReportClick = task => {
        setShowReportForm(!showReportForm)
        setSelectedTask(task)
    }

    const toggleDeletedTasks = () => {
        setShowDeletedTasks(!showDeletedTasks)
    }

    const toggleComment = () => {
        setShowComments(!showComments)
    }

    const handleCommentClick = task => {
        setSelectedTask(task)
        toggleComment()
    }

    const handleAddTask = status => {
        setIsStaff(false)
        setSelectedProjectId(null)
        setSelectedTask(null)
        setTaskStatus(status)
        toggleForm()
    }

    const handleViewClick = (task, project_id) => {
        setSelectedTask(task)
        setTaskStatus(task.status)
        setSelectedProjectId(project_id)
        if (task.type == 'task') {
            setIsStaff(true)
        } else {
            setIsStaff(false)
        }
        toggleForm()
    }

    const handleDeleteTask = async task => {
        try {
            await axios.delete(`/api/personal-plans/${task.id}`)
            await fetchProjectData(project_id)
            toast.success('Task has been completed !')
        } catch (error) {
            toast.error('Error updating task status: ' + error.message)
        }
    }

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen)
    }

    const [tasks, setTasks] = useState({
        'to-do': [],
        'in-progress': [],
        'done': [],
    })

    const updateTaskStatus = async (id, newStatus, isPersonalPlan = false) => {
        try {
            const endpoint = isPersonalPlan
                ? `/api/personal-plans/${id}/status`
                : `/api/v1/tasks/${id}`
            const data = isPersonalPlan
                ? { plan_status: newStatus }
                : { status_key: newStatus }
            await axios.put(endpoint, data)
        } catch (error) {
            toast.error('Error updating task status: ' + error.message)
        }
    }

    const fetchProjectData = async (project_id) => {
        try {
            const response = await axios.get(`api/v1/tasks`, {
                params: { project_id },
            })
            const projectData = response.data
            setProjects(response.data.projects)
            // Cập nhật các kế hoạch cá nhân với thuộc tính 'type'
            const updatedPersonalPlans = {
                'to-do':
                    projectData.personalPlans['to-do']?.map(task => ({
                        ...task,
                        type: 'personalPlan',
                    })) || [],
                'in-progress':
                    projectData.personalPlans['in-progress']?.map(task => ({
                        ...task,
                        type: 'personalPlan',
                    })) || [],
                done: [
                    ...(projectData.personalPlans['verify']?.map(task => ({
                        ...task,
                        type: 'personalPlan',
                    })) || []),
                    ...(projectData.personalPlans['done']?.map(task => ({
                        ...task,
                        type: 'personalPlan',
                    })) || []),
                ],
            }

            // Cập nhật các tác vụ với thuộc tính 'type'
            const updatedTasks = {
                'to-do':
                    projectData.tasks['to-do']?.map(task => ({
                        ...task,
                        type: 'task',
                    })) || [],
                'in-progress':
                    projectData.tasks['in-progress']?.map(task => ({
                        ...task,
                        type: 'task',
                    })) || [],
                done: [
                    ...(projectData.tasks['verify']?.map(task => ({
                        ...task,
                        type: 'task',
                    })) || []),
                ],
                // đã đổi done thành verify vì nhân viên sẽ không nhìn thầy cột done
            }

            const mergedTasks = {
                'to-do': [
                    ...updatedTasks['to-do'],
                    ...updatedPersonalPlans['to-do'],
                ],
                'in-progress': [
                    ...updatedTasks['in-progress'],
                    ...updatedPersonalPlans['in-progress'],
                ],
                done: [
                    ...updatedTasks['done'],
                    ...updatedPersonalPlans['done'],
                ],
            }
            console.log('mergedTasks', response.data)
            // Thiết lập trạng thái
            setTasks(mergedTasks)
        } catch (error) {
            toast.error(`Error fetching project details or tasks ${error}`)
        }
        finally{
            setLoadingDataTask(false)
        }
    }

    useEffect(() => {
        fetchProjectData( project_id)
    }, [project_id])

    useEffect(() => {
        if (!echo) return
    
        const channel = echo.private(`task`)
    
        channel.listen('.TaskStatusUpdated', (e) => {
            setTasks(prevTasks => {
              const newStatus = e.status_key === "verify" ? "done"
                               : e.status_key === "done"  ? "deleted_task"
                               : e.status_key
          
              let movedTask = null
          
              const cleanedTasks = Object.fromEntries(
                Object.entries(prevTasks).map(([status, list]) => [
                  status,
                  list.filter(task => {
                    if (task.id === e.task_id) {
                      movedTask = task
                      return false
                    }
                    return true
                  })
                ])
              )

              // ✅ Nếu task cần chuyển sang verify nhưng không có trong danh sách hiện tại → gọi API
              if (!movedTask) {
                fetchProjectData?.(project_id)
                return prevTasks
            }
          
              // Nếu không tìm thấy task, hoặc không cần cập nhật → return nguyên
              if (movedTask.status === newStatus) return prevTasks
          
              // Nếu là xóa → return danh sách sau khi xóa
              if (newStatus === "deleted_task") return cleanedTasks
          
              // Bước 2: Cập nhật status và thêm vào cột mới
              const updatedTask = { ...movedTask, status: newStatus }
              return {
                ...cleanedTasks,
                [newStatus]: [updatedTask, ...(cleanedTasks[newStatus] || [])]
              }
            })
          })
          
    
        return () => {
            echo.leave(`task`)
        }
    }, [echo])

    return {
        tasks,
        projects,
        selectedTask,
        isFormOpen,
        project_id,
        selectProjectId,
        taskStatus,
        showDeletedTasks,
        showComments,
        showReportForm,
        isStaff,
        loadingDataTask,
        handleReportClick,
        toggleDeletedTasks,
        toggleComment,
        handleCommentClick,
        handleViewClick,
        handleDeleteTask,
        updateTaskStatus,
        fetchProjectData,
        setTaskStatus,
        setSelectedTask,
        handleAddTask,
        setProjectId,
        setSelectedProjectId,
        setIsFormOpen,
        setTasks,
        setShowComments,
        setShowReportForm,
        toggleForm
    }
}
