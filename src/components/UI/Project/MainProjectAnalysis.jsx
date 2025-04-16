
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from '@/libs/axios'
import LoadingBox from '../loading/LoadingBox'
import {useRouter} from 'next/navigation'
import CardProjectAnalysis from './analysis/CardProjectAnalysis'

export default function MainProjectAnalysis({loading,setLoading}){
    const [projects, setProjects] = useState([])
    const router = useRouter()

    const fetchProjectStatistics = async () => {
        try {
            const response = await axios.get(
                `/api/v1/projects/statistics`,
            )
            setProjects(response.data) // axios trả dữ liệu trong `response.data`
        } catch{
            toast.error('Error loading project statistics')
            onClose()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProjectStatistics()
    }, [])

    const onClickProjectAnalysis = (project_id) =>{
        setLoading(true)
        router.push(`/dashboard/project/${project_id}/dashboard`)
    }

    return(
        <section className="mt-8 space-y-4 max-h-[626px] overflow-y-auto overflow-x-hidden scrollbar-hide">
                    {loading ? (
                        <LoadingBox/>
                    ) :
                    (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-10">
                            {projects.length > 0 ? (
                                projects.map(project => (
                                    <button
                                        key={project.project_id}
                                        className="btn-card-analysis rounded-lg"

                                        onClick={()=>onClickProjectAnalysis(project.project_id)}
                                    >
                                        <div className="custom-card-analysis rounded-lg h-full flex flex-col">
                                            <CardProjectAnalysis
                                                projectName={
                                                    project.project_name
                                                }
                                                labels={[
                                                    'To-Do',
                                                    'In-Progress',
                                                    'Verify',
                                                    'Done',
                                                ]}
                                                dataValues={[
                                                    project.statistics['to-do'],
                                                    project.statistics[
                                                        'in-progress'
                                                    ],
                                                    project.statistics[
                                                        'verify'
                                                    ],
                                                    project.statistics['done'],
                                                ]}
                                                colors={[
                                                    '#117add',
                                                    '#f1c21b',
                                                    '#da1e28',
                                                    '#25a249',
                                                ]}
                                            />
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    No projects found.
                                </p>
                            )}
                        </div>
                    )}
                </section>
    )
}