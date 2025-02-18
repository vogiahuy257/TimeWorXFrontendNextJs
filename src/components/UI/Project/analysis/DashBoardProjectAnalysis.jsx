function DashBoardProjectAnalysis({ project_id, onClose }) {
    return (
        <section id="dashboard-analysis" className="p-4">
            <h1>{project_id?.name}</h1>
            <button onClick={onClose}>Close</button>
            <div className="dashboard-item rounded-lg">
                <h1 className="text-lg font-semibold">This is dashboard 0</h1>
            </div>

            <div className="dashboard-item rounded-lg">
                <h1 className="text-lg font-semibold">This is dashboard 1</h1>
            </div>

            <div className="dashboard-item rounded-lg">
                <h1 className="text-lg font-semibold">This is dashboard 2</h1>
            </div>
        </section>
    )
}

export default DashBoardProjectAnalysis
