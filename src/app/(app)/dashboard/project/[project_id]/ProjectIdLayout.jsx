import LoadingBox from "@/components/UI/loading/LoadingBox"
import NavBar from "./navbar"
import CircularMenu from "./CircularMenu"

import { usePathname } from "next/navigation"


export default function ProjectIdLayout({children,loading, projectName, countUserToProject, toggleUserList,toggleDeletedTasks})
{
    const pathname = usePathname()
    const pathParts = pathname.split('/')
    const isBroad = pathParts[pathParts.length - 1] === "broad"
    const isTimeline = pathParts[pathParts.length - 1] === "timeline"
    const isDashboard = pathParts[pathParts.length - 1] === "dashboard"
    return(
        <section id="project-view">
            <NavBar
                isBroad = {isBroad}
                isTimeline = {isTimeline}
                isDashboard = {isDashboard}
                projectName={projectName}
                countUserToProject={countUserToProject}
                toggleUserList={toggleUserList}
                toggleDeletedTasks={toggleDeletedTasks}
            />
            {loading ? (
                <LoadingBox content={'Loading data ...'}/>
            ) : (children)}
            <CircularMenu
                pathname={pathname}
                isDashboard = {isDashboard}
                isBroad = {isBroad}
                isTimeline = {isTimeline}
            />
        </section>
    )
}