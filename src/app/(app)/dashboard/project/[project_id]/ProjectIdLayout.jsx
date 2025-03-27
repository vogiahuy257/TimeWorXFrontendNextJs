import LoadingBox from "@/components/UI/loading/LoadingBox"
import NavBar from "./navbar"
import CircularMenu from "./CircularMenu"

import { usePathname } from "next/navigation"


export default function ProjectIdLayout({children,loading, projectName, countUserToProject, toggleUserList,toggleDeletedTasks})
{
    const pathname = usePathname()
    const isBroad = pathname.includes("/broad")
    const isTimeline = pathname.includes("/timeline")
    return(
        <section id="project-view">
            <NavBar
                isBroad = {isBroad}
                isTimeline = {isTimeline}
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
                isBroad = {isBroad}
                isTimeline = {isTimeline}
            />
        </section>
    )
}