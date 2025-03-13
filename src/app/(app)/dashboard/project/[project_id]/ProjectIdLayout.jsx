import LoadingBox from "@/components/UI/loading/LoadingBox"
import NavBar from "./navbar"

export default function ProjectIdLayout({children, loading, projectName, countUserToProject, handleBackClick,toggleUserList,toggleDeletedTasks})
{
    return(
        <section id="project-view">
            <NavBar
                projectName={projectName}
                countUserToProject={countUserToProject}
                handleBackClick={handleBackClick}
                toggleUserList={toggleUserList}
                toggleDeletedTasks={toggleDeletedTasks}
            />
            {loading ? (
                <LoadingBox content={'Loading data ...'}/>
            ) : (children)}
        </section>
    )
}