import LoadingBox from "@/components/UI/loading/LoadingBox"
import Menu from "./menu"

export default function ProjectLayout({children ,loading, searchQuery, handleCreate, handleDeletedFormToggle, handleProjectAnalysis, handleSearch})
{
    return (
        <section id="project">
            <Menu
                searchQuery={searchQuery}
                handleCreate={handleCreate}
                handleDeletedFormToggle={handleDeletedFormToggle}
                handleProjectAnalysis={handleProjectAnalysis}
                handleSearch={handleSearch}
            />
            {loading ? (
                <LoadingBox content={'Loading project ...'}/>
            ) : (children)}
        </section>
    )
}