const TaskFilterMenu = ({ projects, setProjectId, toggleDeletedTasks }) => {
    return (
        <div className="block-project">
        <div className="block-element-left">
            <div className="block-project-name">
                <h1>Task</h1>
            </div>

            {/* Bộ lọc */}
            <div className="ml-4 filter-section flex items-center justify-center">
                {/* Bộ lọc theo trạng thái */}
                <select
                    className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black-400 appearance-none bg-white text-gray-700 transition duration-150 ease-in-out"
                    onChange={e => setProjectId(e.target.value)}
                >
                    <option value="">All</option>
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                    <option value="personalPlan">
                        Your Pesonal Plan
                    </option>
                </select>
            </div>
        </div>

        <div className="block-element-right">
            <button
                onClick={toggleDeletedTasks}
                className="btn btn-history"
            >
                <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 13.1429V17.7143C3 18.9767 4.00736 20 5.25 20H18.75C19.9926 20 21 18.9767 21 17.7143V13.1429M3 13.1429L5.82751 5.48315C6.15683 4.59102 6.99635 4 7.93425 4H16.0657C17.0037 4 17.8432 4.59102 18.1725 5.48315L21 13.1429M3 13.1429H7.5L9 14.7429H15L16.5 13.1429H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
    )
  }
  
  export default TaskFilterMenu
  