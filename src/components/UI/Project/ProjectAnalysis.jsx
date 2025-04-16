
import { useState } from 'react'
// import DashBoardProjectAnalysis from './analysis/DashBoardProjectAnalysis'
import '@/app/css/dashboard-project-analysis.css'
import MainProjectAnalysis from './MainProjectAnalysis'


export default function ProjectAnalysis({ onClose }) {

    
    const [loading, setLoading] = useState(true)
    
    return (
        <section id="project-analysis">
            <div className="main">
                <button className="btn-close" onClick={onClose}>
                    <svg
                        className="mx-auto"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <h1 className="text-xl custom-title">Project Progress</h1>

                <MainProjectAnalysis
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>
        </section>
    )
}
