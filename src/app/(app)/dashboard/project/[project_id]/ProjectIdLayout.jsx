import LoadingBox from "@/components/UI/loading/LoadingBox"
import NavBar from "./navbar"
import CircularMenu from "./CircularMenu"

export default function ProjectIdLayout({children, viewBoard,setViewBoard,loading, projectName, countUserToProject, toggleUserList,toggleDeletedTasks})
{
    return(
        <section id="project-view">
            <NavBar
                projectName={projectName}
                countUserToProject={countUserToProject}
                toggleUserList={toggleUserList}
                toggleDeletedTasks={toggleDeletedTasks}
            />
            {loading ? (
                <LoadingBox content={'Loading data ...'}/>
            ) : (children)}
            <CircularMenu
                viewBoard = {viewBoard}
                setViewBoard = {setViewBoard}
            />
        </section>
    )
}