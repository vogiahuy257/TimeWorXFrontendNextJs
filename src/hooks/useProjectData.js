import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import axios from "@/libs/axios"
import { toast } from "react-toastify"

const useProjectData = (project_id) => {
  const [project, setProject] = useState(null)
  const [countUserToProject, setCountUserToProject] = useState(0)
  const [projectDeadLine, setProjectDeadLine] = useState(null)
  const [tasks, setTasks] = useState({
    "to-do": [],
    "in-progress": [],
    verify: [],
    done: [],
  })
  const [allTasks, setAllTasks] = useState([])
  const [loadingDaTaTask, setLoadingDaTaTask] = useState(true)

  const hasFetched = useRef(false)

  const fetchProjectData = useCallback(async () => {
    if (hasFetched.current) return

    try {
      setLoadingDaTaTask(true)
      const response = await axios.get(`/api/project-view/${project_id}`)
      const projectData = response.data

      setProject(projectData.project)
      setCountUserToProject(projectData.project.user_count)
      setProjectDeadLine(projectData.project.deadline)

      const updatedTasks = {
        "to-do": projectData.tasks["to-do"] || [],
        "in-progress": projectData.tasks["in-progress"] || [],
        verify: projectData.tasks["verify"] || [],
        done: projectData.tasks["done"] || [],
      }

      setTasks(updatedTasks)

      setAllTasks(
        Object.entries(updatedTasks).flatMap(([status, tasks]) =>
          tasks.map(task => ({ ...task, status_key: status }))
        )
      )

      hasFetched.current = true
    } catch (error) {
      toast.error(`Error fetching project details: ${error}`)
    } finally {
      setLoadingDaTaTask(false)
    }
  }, [project_id])

  useEffect(() => {
    if (!project_id) return
    fetchProjectData()
  }, [project_id, fetchProjectData])

  // ✅ Xóa task và cập nhật lại state, không gọi lại API
  const handleDeleteTask = useCallback(async (task) => {
    try {
      await axios.delete(`/api/project-view/${task.id}`)
      toast.success(`${task.content} task deleted!`)

      setTasks(prevTasks => {
        const updatedTasks = { ...prevTasks }
        updatedTasks[task.status_key] = updatedTasks[task.status_key].filter(t => t.id !== task.id)
        return updatedTasks
      })

      setAllTasks(prevAllTasks => prevAllTasks.filter(t => t.id !== task.id))

    } catch (error) {
      toast.error(`Error deleting task: ${error}`)
    }
  }, [])

  // ✅ Cập nhật trạng thái task mà không gọi lại API toàn bộ
  const updateTaskStatus = useCallback(async (taskId, newStatus) => {
    try {
      await axios.put(`/api/project-view/${taskId}`, { status: newStatus })

      setTasks(prevTasks => {
        let updatedTask = null

        const updatedTasks = Object.keys(prevTasks).reduce((acc, key) => {
          acc[key] = prevTasks[key].filter(task => {
            if (task.id === taskId) {
              updatedTask = { ...task, status_key: newStatus }
              return false
            }
            return true
          })
          return acc
        }, {})

        if (updatedTask) {
          updatedTasks[newStatus] = [...(updatedTasks[newStatus] || []), updatedTask]
        }

        return updatedTasks
      })

      setAllTasks(prevAllTasks =>
        prevAllTasks.map(task => (task.id === taskId ? { ...task, status_key: newStatus } : task))
      )

    } catch (error) {
      toast.error(`Error updating task status: ${error.message}`)
    }
  }, [])

  return useMemo(() => ({
    project,
    countUserToProject,
    projectDeadLine,
    tasks,
    allTasks,
    loadingDaTaTask,
    setTasks,
    fetchProjectData,
    handleDeleteTask,
    updateTaskStatus,
    setCountUserToProject,
  }), [project, countUserToProject, projectDeadLine, tasks, allTasks, loadingDaTaTask, handleDeleteTask, updateTaskStatus])
}

export default useProjectData
