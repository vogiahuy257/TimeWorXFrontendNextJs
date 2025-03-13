import LoadingBox from '@/components/UI/loading/LoadingBox'
import TaskFilterMenu from './TaskFilterMenu.jsx'
export default function TaskLayout({children,loadingDataTask ,projects,setProjectId,toggleDeletedTasks})
{
    return(
        <section id="project-view">
            <TaskFilterMenu
                projects={projects}
                setProjectId={setProjectId}
                toggleDeletedTasks={toggleDeletedTasks}
            />
            {loadingDataTask ? (
                <LoadingBox content={'Loading task...'}/>
            ) : (children)}
        </section>
    )
}