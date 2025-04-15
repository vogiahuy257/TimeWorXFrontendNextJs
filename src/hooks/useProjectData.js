import { useState, useEffect, useMemo, useCallback } from "react"
import axios from "@/libs/axios"
import { toast } from "react-toastify"
import useEcho from "./echo"

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
  const echo = useEcho()

  const fetchProjectData = useCallback(async () => {

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
        Object.entries(updatedTasks).flatMap(([status_key, tasks]) =>
          tasks.map(task => ({ ...task, status_key: status_key }))
        )
      )
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

  useEffect(() => {
    if (!echo || !project_id) return
  
    const channel = echo.private(`project.${project_id}`)
    channel.listen('.TaskOnProjectStatusUpdated', (e) => {
      // Cập nhật task trong tasks state
      setTasks(prevTasks => {
        let movedTask = null
      
        const updated = Object.fromEntries(
          Object.entries(prevTasks).map(([status, list]) => [
            status,
            list.filter(task => {
              const isTarget = task.id === e.task_id
              if (isTarget) movedTask = task
              return !isTarget
            })
          ])
        )
      
        if (!movedTask || movedTask.status_key === e.status_key) return prevTasks
      
        const updatedTask = { ...movedTask, status_key: e.status_key }
        return {
          ...updated,
          [e.status_key]: [updatedTask, ...(updated[e.status_key] || [])]
        }
      })
      
      
      // Cập nhật task trong allTasks
      setAllTasks(prevAllTasks => 
        prevAllTasks.map(task => 
          task.id === e.task_id && task.status_key !== e.status_key 
            ? { ...task, status_key: e.status_key }
            : task
        )
      )
    })
  
    return () => {
      echo.leave(`project.${project_id}`)
    }
  }, [echo, project_id])


  // ✅ Xóa task và cập nhật lại state, không gọi lại API
  const handleDeleteTask = useCallback(async (task) => {
    try {
      await axios.delete(`/api/project-view/${task.id}`)
      toast.success(`${task.content} task deleted!`)

      fetchProjectData()

    } catch (error) {
      toast.error(`Error deleting task: ${error}`)
    }
  }, [fetchProjectData])

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
  }, [fetchProjectData])

  const sampleProject = useMemo(() => {
    if (!project) return null
  
    return {
      project_name: project.name || "",
      project_description: project.description || "",
      start_date: project.start_date ? new Date(project.start_date).toISOString().split("T")[0] : "",
      end_date: project.deadline ? new Date(project.deadline).toISOString().split("T")[0] : "",
      project_priority: project.project_priority || "",
      taskCount: project.taskCount || 0,
      inProgress: project.inProgress || 0,
      done: project.done || 0,
    }
  }, [project])

  const taskCircularData = useMemo(() => {
    if (!project) return null
  
    return {
      todo: parseInt(project.todo) || 0,
      "in-progress": parseInt(project.inProgress) || 0,
      verify: parseInt(project.verify) || 0,
      done: parseInt(project.done) || 0,
    }
  }, [project])
  
  const deadlineData = useMemo(() => {
    if (!project) return null
  
    return {
      nearDeadline: parseInt(project.taskNearDeadline) || 0,
      lateDeadline: parseInt(project.taskLateDeadline) || 0,
    }
  }, [project])
  

  return useMemo(() => ({
    project,
    taskCircularData,
    deadlineData,
    sampleProject,
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
