"use client"
import {  useState,useEffect } from 'react'
import {  useParams } from 'next/navigation'
import useProjectData from '@/hooks/useProjectData'
import HorizontalTaskChart from "@/components/HorizontalTaskChart"
import axios from '@/libs/axios'
import ProjectIdLayout from "../ProjectIdLayout"
import { sortTaskData, calculateScaleMax, generateScaleTicks } from "@/services/HorizontalTaskChartService"
import CircularProgressChart from '@/components/CircularProgressChart'
import ProjectDetail from '@/components/ProjectDetail'
import dynamic from 'next/dynamic'
import LoadingPage from '@/components/UI/loading/LoadingPage'
const HistoryBox = dynamic(
  () => import('@/components/UI/Project/HistoryBox'),
  {
      ssr: true,
  },
)

const TaskUsers = dynamic(
  () => import('@/components/UI/Project/TaskUsersForm'),
  {
      ssr: false,
      loading: () => <LoadingPage />,
  },
)

export default function page() {
  const [taskData, setTaskData] = useState([])
  const { project_id } = useParams()
  const {
    project,
    countUserToProject,
    sampleProject,
    taskCircularData,
    deadlineData,
        fetchProjectData,
        setCountUserToProject
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

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const handleToggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded)
  }

  return (
    <ProjectIdLayout
      loading={loadingHoRiXonTal}
      projectName={project?.name}
      countUserToProject={countUserToProject}
      toggleUserList={toggleUserList}
      toggleDeletedTasks={toggleDeletedTasks}
    >
      <div className='px-8 pt-6 flex flex-col gap-4 md:flex-row'>
        <div className=' w-full flex justify-center items-center min-h-96 bg-while-css md:w-2/3'>
          <ProjectDetail 
            project={sampleProject}
            isDescriptionExpanded={isDescriptionExpanded}
            onToggleDescription={handleToggleDescription}
          />
        </div>
        <div className='w-full rounded-lg flex justify-center items-center bg-gradient-to-b from-slate-50 via-white to-slate-50 md:w-1/3'>
          <CircularProgressChart data={[taskCircularData, deadlineData]} />
        </div>
      </div>
      <div className="p-8">    
        <HorizontalTaskChart 
          data={sortedData} 
          scaleMax={scaleMax} 
          ticks={ticks} 
          sortOrder={sortOrder} 
          setSortOrder={setSortOrder}
        />
      </div>
      {/* Hiển thị History */}
      {showDeletedTasks && (
                <HistoryBox
                    resetPage={fetchProjectData}
                    project_id={project.id}
                    isTaskProjectViews={true}
                />
            )}

            {/* Show the user list */}
            {showUserList && (
                <TaskUsers
                    projectId={project.id}
                    onClose={toggleUserList}
                    setCountUserToProject={setCountUserToProject}
                />
            )}
    </ProjectIdLayout>
  )
}
