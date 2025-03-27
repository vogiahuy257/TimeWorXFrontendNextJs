'use client'

import {  useState } from 'react'
import {  useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import LoadingPage from '@/components/UI/loading/LoadingPage'
import ProjectIdLayout from '../ProjectIdLayout'
import useProjectData from '@/hooks/useProjectData'
import ProjectBroad from '@/components/UI/Project/projectView/ProjectBroad'

// Dynamic import for components
const TaskForm = dynamic(() => import('@/components/UI/Project/TaskForm'), {
    ssr: false,
    loading: () => <LoadingPage content={'Loading task form ...'}/>,
})

const HistoryBox = dynamic(
    () => import('@/components/UI/Project/HistoryBox'),
    {
        ssr: true,
    },
)

const TaskUsers = dynamic(
    () => import('@/components/UI/Project/TaskUsersForm'),
    {
        ssr: true,
        loading: () => <LoadingPage />,
    },
)

const TaskComments = dynamic(
    () => import('@/components/UI/Project/TaskComments'),
    {
        ssr: false,
        loading: () => <LoadingPage/>,
    },
)

const ShowReportToTask = dynamic(
    () => import('@/components/UI/Project/ShowReportToTask'),
    {
        ssr: false,
        loading: () => <LoadingPage/>,
    },
)

const DashboardProjectView = () => {
    const { project_id } = useParams()
    const {
        project,
        countUserToProject,
        projectDeadLine,
        tasks,
        loadingDaTaTask,
        handleDeleteTask,
        updateTaskStatus,
        setTasks,
        fetchProjectData,
        setCountUserToProject
    } = useProjectData(project_id)
    
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [taskStatus, setTaskStatus] = useState(null)
    const [showDeletedTasks, setShowDeletedTasks] = useState(false)
    const [showUserList, setShowUserList] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [showFormReportToTask, setShowFormReportToTask] = useState(false)

    const toggleComment = () => {
        setShowComments(!showComments)
    }

    const toggleDeletedTasks = () => {
        setShowDeletedTasks(!showDeletedTasks)
        console.log(project)
    }

    const toggleUserList = () => {
        setShowUserList(!showUserList)
    }

    const toggleFormReportToTak = () => {
        setShowFormReportToTask(!showFormReportToTask)
    }

    const handleShowReportClick = task => {
        setSelectedTask(task)
        toggleFormReportToTak()
    }

    const handleCommentClick = task => {
        setSelectedTask(task)
        toggleComment()
    }

    const handleAddTask = status => {
        setSelectedTask(null)
        setTaskStatus(status)
        setIsFormOpen(!isFormOpen)
    }

    const handleViewClick = task => {
        setSelectedTask(task)
        setTaskStatus(task.status)
        setIsFormOpen(!isFormOpen)
    }

    return (
        <ProjectIdLayout
            loading={loadingDaTaTask}
            projectName={project?.name}
            countUserToProject={countUserToProject}
            toggleUserList={toggleUserList}
            toggleDeletedTasks={toggleDeletedTasks}
        >
            <ProjectBroad
                updateTaskStatus={updateTaskStatus}
                tasks={tasks}
                handleAddTask={handleAddTask}
                handleShowReportClick={handleShowReportClick}
                handleViewClick={handleViewClick}
                handleDeleteTask={handleDeleteTask}
                handleCommentClick={handleCommentClick}
                setTasks={setTasks}
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

            {/* hiển thị report to task form */}
            {showFormReportToTask && (
                <ShowReportToTask
                    task={selectedTask}
                    onClose={toggleFormReportToTak}
                    updateTaskStatus={updateTaskStatus}
                />
            )}

            {/* Hiển thị bình luận */}
            {showComments && (
                <TaskComments
                    taskId={selectedTask.id}
                    onClose={() => setShowComments(false)}
                    isManagerComment={true}
                />
            )}

            {/* Hiển thị TaskForm */}
            {isFormOpen && (
                <TaskForm
                    onClose={()=>{setIsFormOpen(!isFormOpen)}}
                    projectId={project_id}
                    refreshTasks={fetchProjectData}
                    task={selectedTask}
                    task_status={taskStatus}
                    project_deadline={projectDeadLine}
                />
            )}
        </ProjectIdLayout>
    )
}

export default DashboardProjectView
