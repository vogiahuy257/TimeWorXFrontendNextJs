"use client"
import {  useState,useEffect } from 'react'
import {  useParams } from 'next/navigation'
import useProjectData from '@/hooks/useProjectData'
import HorizontalTaskChart from "@/components/HorizontalTaskChart"
import axios from '@/libs/axios'
import ProjectIdLayout from "../ProjectIdLayout"
import { sortTaskData, calculateScaleMax, generateScaleTicks } from "@/services/HorizontalTaskChartService"

export default function page() {
  const [taskData, setTaskData] = useState([])
  const { project_id } = useParams()
  const {
    project,
    countUserToProject,
  } = useProjectData(project_id)

  const [loadingHoRiXonTal,setLoadingHoRiXonTal] = useState(false)
  const [showDeletedTasks, setShowDeletedTasks] = useState(false)
  const [showUserList, setShowUserList] = useState(false)
  const [sortOrder, setSortOrder] = useState(null)
  const [sortedData, setSortedData] = useState(taskData)

  useEffect(() => {
    if (!project_id) return
  
    const fetchTaskData = async () => {
      setLoadingHoRiXonTal(true)
      try {
        const res = await axios.put(`/api/v1/project-view/${project_id}/HorizontalTaskChart`)
        setTaskData(res.data)
        setSortedData(res.data)
      } catch {
        console.error("Failed to fetch HorizontalTaskChart data")
      }
      finally
      {
        setLoadingHoRiXonTal(false)
      }
    }
  
    fetchTaskData()
  }, [project_id])
  
  useEffect(() => {
    setSortedData(sortTaskData(taskData, sortOrder))
  }, [sortOrder])

  const scaleMax = calculateScaleMax(sortedData)
  const ticks = generateScaleTicks(scaleMax)

  const toggleDeletedTasks = () => setShowDeletedTasks(!showDeletedTasks)
  const toggleUserList = () => setShowUserList(!showUserList)


  return (
    <ProjectIdLayout
      loading={loadingHoRiXonTal}
      projectName={project?.name}
      countUserToProject={countUserToProject}
      toggleUserList={toggleUserList}
      toggleDeletedTasks={toggleDeletedTasks}
    >
      <div className='p-4'>

      </div>
      <div className="px-4 pb-6">
        
        <HorizontalTaskChart 
          data={sortedData} 
          scaleMax={scaleMax} 
          ticks={ticks} 
          sortOrder={sortOrder} 
          setSortOrder={setSortOrder}
        />
      </div>
    </ProjectIdLayout>
  )
}
