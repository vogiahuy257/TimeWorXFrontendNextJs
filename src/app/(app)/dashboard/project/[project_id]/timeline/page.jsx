'use client'

import {  useState } from 'react'
import {  useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import LoadingPage from '@/components/UI/loading/LoadingPage'
import ProjectIdLayout from '../ProjectIdLayout'
import useProjectData from '@/hooks/useProjectData'
import TaskGanttChart from '@/components/task-gantt-chart/index'
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

const DashboardProjectView = () => {
    const { project_id } = useParams()
    const {
        project,
        countUserToProject,
        allTasks,
        loadingDaTaTask,
        fetchProjectData,
        setCountUserToProject
    } = useProjectData(project_id)
    
    const [showDeletedTasks, setShowDeletedTasks] = useState(false)
    const [showUserList, setShowUserList] = useState(false)
    const toggleDeletedTasks = () => {
        setShowDeletedTasks(!showDeletedTasks)
    }

    const toggleUserList = () => {
        setShowUserList(!showUserList)
    }


    return (
        <ProjectIdLayout
            loading={loadingDaTaTask}
            projectName={project?.name}
            countUserToProject={countUserToProject}
            toggleUserList={toggleUserList}
            toggleDeletedTasks={toggleDeletedTasks}
        >
                <TaskGanttChart
                    tasks={allTasks}
                />
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

export default DashboardProjectView
