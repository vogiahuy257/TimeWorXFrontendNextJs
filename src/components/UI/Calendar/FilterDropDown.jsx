export default function FilterDropDown({
    selectedProjectId,
    setSelectedProjectId,
    projects,
}) {
    return (
        <div className="menu mb-4 flex gap-2 items-center">
            <h1 className="text-base font-semibold">Filter: </h1>
            <select
                className="project-dropdown rounded-md text-sm w-full"
                value={selectedProjectId || ''}
                onChange={e => setSelectedProjectId(e.target.value)}>
                <option value="allproject">All Project</option>
                {/* Kiểm tra nếu projects có dữ liệu mới render */}
                {projects?.length > 0 &&
                    [
                        ...new Map(
                            projects.map(p => [p.project_id, p]),
                        ).values(),
                    ].map(project => (
                        <option
                            key={project.project_id}
                            value={project.project_id}>
                            Task to {project.project_name}
                        </option>
                    ))}
            </select>
        </div>
    )
}
