'use client'

// External Libraries
import LoadingPage from '@/components/UI/loading/LoadingPage'
import useTasks from '@/hooks/useTasks'
import TaskBroad from '@/components/UI/Task/taskBroad.jsx'
import TaskLayout from './TaskLayout.jsx'
// Components (Lazy load for better performance)
import dynamic from 'next/dynamic'

// Dynamically imported components
const TaskForm = dynamic(() => import('@/components/UI/Project/TaskForm'), {
    ssr: false,
    loading: () => <LoadingPage/>,
})
const HistoryBox = dynamic(
    () => import('@/components/UI/Project/HistoryBox'),
    { ssr: false },
)
const TaskComments = dynamic(
    () => import('@/components/UI/Project/TaskComments'),
    { ssr: false, loading: () => <LoadingPage/> },
)
const ReportForm = dynamic(() => import('@/components/UI/Task/ReportForm'), {
    ssr: false,
    loading: () => <LoadingPage/>,
})

// UI Components

export default function Task() {
    const {
        tasks,
        projects,
        selectedTask,
        selectProjectId,
        taskStatus,
        showDeletedTasks,
        showComments,
        showReportForm,
        isFormOpen,
        isStaff,
        loadingDataTask,
        handleReportClick,
        toggleDeletedTasks,
        handleCommentClick,
        handleViewClick,
        handleDeleteTask,
        updateTaskStatus,
        fetchProjectData,
        handleAddTask,
        setProjectId,
        setTasks,
        setShowComments,
        setShowReportForm,
        toggleForm
    } = useTasks()

    return (
        <TaskLayout 
            loadingDataTask = {loadingDataTask}
            projects={projects}
            setProjectId={setProjectId}
            toggleDeletedTasks={toggleDeletedTasks}
        >
        
            {/* Main Project View */}
            <TaskBroad
                updateTaskStatus={updateTaskStatus}
                tasks={tasks}
                handleAddTask={handleAddTask}
                handleReportClick={handleReportClick}
                handleViewClick={handleViewClick}
                handleCommentClick={handleCommentClick}
                handleDeleteTask={handleDeleteTask}
                setTasks={setTasks}
            />

            {/* Hiển thị History */}
            {showDeletedTasks && (
                    <HistoryBox
                        resetPage={fetchProjectData}
                        project_id = {false}
                        isTaskProjectViews={false}
                    />
                )}

            {showComments && (
                <TaskComments
                    taskId={selectedTask.id}
                    onClose={() => setShowComments(false)}
                    isManagerComment={false}
                />
            )}

            {/* hiển thị ReportForm */}
            {showReportForm && (
                <ReportForm
                    task={selectedTask}
                    onClose={() => setShowReportForm(false)}
                />
            )}
            {/* Hiển thị TaskForm */}
            {isFormOpen && (
                <TaskForm
                    onClose={toggleForm}
                    projectId={selectProjectId}
                    refreshTasks={fetchProjectData}
                    task={selectedTask}
                    task_status={taskStatus}
                    is_staff={isStaff}
                />
            )}
        </TaskLayout>
    )
}
