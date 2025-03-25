import { useState, useEffect, useMemo } from "react"
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

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(`/api/project-view/${project_id}`)
      const projectData = response.data
      setProject(projectData.project)
      setCountUserToProject(projectData.project.user_count)
      setProjectDeadLine(projectData.project.deadline)
      setTasks({
        "to-do": projectData.tasks["to-do"] || [],
        "in-progress": projectData.tasks["in-progress"] || [],
        verify: projectData.tasks["verify"] || [],
        done: projectData.tasks["done"] || [],
      })
      setAllTasks([
        ...(projectData.tasks["to-do"] || []),
        ...(projectData.tasks["in-progress"] || []),
        ...(projectData.tasks["verify"] || []),
        ...(projectData.tasks["done"] || []),
      ])
    } catch (error) {
      toast.error(`Error fetching project details or tasks ${error}`)
    } finally {
      setLoadingDaTaTask(false)
    }
  }

  useEffect(() => {
    fetchProjectData()
  }, [project_id])

  const handleDeleteTask = async (task) => {
    try {
      const response = await axios.delete(`/api/project-view/${task.id}`)
      if (response) {
        fetchProjectData()
        toast.success(`${task.content} task completed!`)
      } else {
        toast.error("Error deleting task.")
      }
    } catch (error) {
      toast.error(`An error occurred while deleting the task: ${error}`)
    }
  }

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`/api/project-view/${taskId}`, { status: newStatus })
    } catch (error) {
      toast.error("Error updating task status: " + error.message)
    } finally {
      fetchProjectData()
    }
  }

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
  }), [project, countUserToProject, projectDeadLine, tasks, loadingDaTaTask])
}

export default useProjectData
