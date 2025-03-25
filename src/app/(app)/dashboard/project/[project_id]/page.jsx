'use client'

import {  useState } from 'react'
import {  useParams } from 'next/navigation'
import ProjectBroad from '@/components/UI/Project/projectView/ProjectBroad'
import dynamic from 'next/dynamic'
import LoadingPage from '@/components/UI/loading/LoadingPage'
import ProjectIdLayout from './ProjectIdLayout'
import useProjectData from '@/hooks/useProjectData'

const TaskGanttChart = dynamic(() => import('@/components/task-gantt-chart/index'), {
    ssr: true,
    loading: () => <LoadingPage content={'Loading task form ...'}/>,
})
// Dynamic import for components
const TaskForm = dynamic(() => import('@/components/UI/Project/TaskForm'), {
    ssr: false,
    loading: () => <LoadingPage content={'Loading task form ...'}/>,
})

const HistoryBox = dynamic(
    () => import('@/components/UI/Project/HistoryBox'),
    {
        ssr: false,
    },
)

const TaskUsers = dynamic(
    () => import('@/components/UI/Project/TaskUsersForm'),
    {
        ssr: false,
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
        allTasks,
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
    const [viewBoard,setViewBoard] = useState(true);

    const toggleComment = () => {
        setShowComments(!showComments)
    }

    const toggleDeletedTasks = () => {
        setShowDeletedTasks(!showDeletedTasks)
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
            setViewBoard = {setViewBoard}
            viewBoard = {viewBoard}
            countUserToProject={countUserToProject}
            toggleUserList={toggleUserList}
            toggleDeletedTasks={toggleDeletedTasks}
        >

            {/* Main Project View */}
            {viewBoard ? (
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
            ):(
                <TaskGanttChart
                    tasks={allTasks}
                />
            )}
            
            

            {/* Hiển thị History */}
            {showDeletedTasks && (
                <HistoryBox
                    resetPage={fetchProjectData}
                    projectId={project.id}
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
