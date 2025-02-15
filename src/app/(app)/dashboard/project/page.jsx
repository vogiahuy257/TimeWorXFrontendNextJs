'use client'

import React, { useEffect, useState } from 'react'
import axios from '@/libs/axios'
import { toast } from 'react-toastify'
import Menu from './menu'
import dynamic from 'next/dynamic'
import LoadingBox from '@/components/UI/loading/LoadingBox'

// Dynamic import for components
const CardProject = dynamic(
    () => import('@/components/UI/Project/CardProject'),
    {
        ssr: true,
    },
)

const CreateProjectForm = dynamic(
    () => import('@/components/UI/Project/CreateProjectForm'),
    {
        ssr: true,
        loading: () => <p>Loading Create Project Form...</p>,
    },
)

const DeletedProjectsForm = dynamic(
    () => import('@/components/UI/Project/DeletedProjectsForm'),
    {
        ssr: true,
        loading: () => <p>Loading Deleted Projects Form...</p>,
    },
)

const ProjectAnalysis = dynamic(
    () => import('@/components/UI/Project/ProjectAnalysis'),
    {
        ssr: false,
        loading: () => <p>Loading Project Analysis...</p>,
    },
)

const ConfirmationForm = dynamic(
    () => import('@/components/ConfirmationForm'),
    {
        ssr: true,
    },
)

export default function Folder() {
    const [projects, setProjects] = useState([])
    const [filteredProjects, setFilteredProjects] = useState([])
    const [isDeletedFormOpen, setIsDeletedFormOpen] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isOpenProjectAnalysis, setIsOpenProjectAnalysis] = useState(false)
    const [editProject, setEditProject] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [onChangeDeteleProject, setOnChangeDeteleProject] = useState(null)
    const [loadingData, setLoadingData] = useState(true)

    const statusOrder = {
        verify: 1,
        'in-progress': 2,
        'to-do': 3,
        done: 4,
    }

    const sortProjectsByStatus = projects => {
        return projects.sort((a, b) => {
            return statusOrder[a.project_status] - statusOrder[b.project_status]
        })
    }

    const fetchProjectData = async () => {
        try {
            setLoadingData(true) // Đảm bảo đặt loading true trước khi fetch
            const response = await axios.get(`/api/v1/projects/getall`)

            if (response?.data && Array.isArray(response.data)) {
                const sortedProjects = sortProjectsByStatus(response.data)
                setProjects(sortedProjects)
                setFilteredProjects(sortedProjects)
            } else {
                setProjects([])
                setFilteredProjects([])
                console.warn('API returned unexpected data format:', response.data)
            }
        } catch (error) {
            console.warn('Error fetching project data:', error)
            setProjects([])
            setFilteredProjects([])
        } finally {
            setLoadingData(false) // Chắc chắn cập nhật trạng thái loading
        }
    }
    //hàm tìm kiếm theo mỗi lần nhấn cho project
    //old
    const handleSearch = e => {
        const query = e.target.value
        setSearchQuery(query)
        const filtered = projects.filter(project =>
            project.project_name.toLowerCase().includes(query.toLowerCase()),
        )
        setFilteredProjects(filtered)
    }

    useEffect(() => {
        fetchProjectData()
    }, [])

    // new
    useEffect(() => {
        setFilteredProjects(sortProjectsByStatus(projects))
    }, [projects])

    const handleDeletedFormToggle = () => {
        setIsDeletedFormOpen(!isDeletedFormOpen)
    }
    //hàm đổi lại format lại ngày tháng năm
    const formatDateRange = (startDate, endDate) => {
        const optionsWithYear = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }
        const optionsWithoutYear = { day: '2-digit', month: 'short' }

        const start = new Date(startDate)
        const end = new Date(endDate)

        if (start.getFullYear() === end.getFullYear()) {
            const formattedStart = start.toLocaleDateString(
                'en-GB',
                optionsWithoutYear,
            )
            const formattedEnd = end.toLocaleDateString(
                'en-GB',
                optionsWithYear,
            )
            return `${formattedStart} - ${formattedEnd}`
        } else {
            const formattedStart = start.toLocaleDateString(
                'en-GB',
                optionsWithYear,
            )
            const formattedEnd = end.toLocaleDateString(
                'en-GB',
                optionsWithYear,
            )
            return `${formattedStart} - ${formattedEnd}`
        }
    }

    const isDeteleProject = project => {
        setOnChangeDeteleProject(project)
    }
    //hàm hiện thông báo khi xóa chọn yes hoặc no
    const handleConfirmDeleteProject = isConfirmed => {
        if (isConfirmed && onChangeDeteleProject) {
            confirmDelete(onChangeDeteleProject.project_id)
        }
        setOnChangeDeteleProject(null)
    }
    //hàm cho sự kiện khi nhấn vào nút xóa
    const confirmDelete = projectId => {
        axios
            .delete(`/api/projects/${projectId}`)
            .then(() => {
                setProjects(
                    projects.filter(
                        project => project.project_id !== projectId,
                    ),
                )
                toast.dismiss()
                fetchProjectData()
                handleDeletedFormToggle()
                toast.success('Project deleted successfully!')
            })
            .catch(error => {
                toast.error(
                    `Error deleting project: ${error.response ? error.response.data : error.message}`,
                )
            })
    }

    const handleProjectAnalysis = () => {
        setIsOpenProjectAnalysis(!isOpenProjectAnalysis)
    }

    //hàm mở form tạo dự án
    const handleCreate = () => {
        setIsFormOpen(true)
        setEditProject(null)
    }

    // hàm mở form chỉnh sửa dự án
    const handleEdit = project => {
        setIsFormOpen(true)
        setEditProject(project)
    }

    // submit cho cả 2 form chỉnh sửa và tạo dự án
    const handleSubmitForm = projectData => {
        if (editProject) {
            // Update project
            axios
                .put(`/api/projects/${editProject.project_id}`, projectData)
                .then(response => {
                    setProjects(
                        projects.map(p =>
                            p.project_id === response.data.project_id
                                ? response.data
                                : p,
                        ),
                    )
                    setIsFormOpen(false)
                    fetchProjectData()
                    toast.success('Project update successfully!')
                })
                .catch(error => {
                    toast.error(`Error updating project: ${error.message}`)
                })
        } else {
            // Create new project
            axios
                .post('/api/projects', projectData)
                .then(response => {
                    setProjects([...projects, response.data])
                    setIsFormOpen(false)
                    fetchProjectData()
                    toast.success('Project create successfully!')
                })
                .catch(error => {
                    toast.error(`Error creating project: ${error.message}`)
                })
        }
    }

    return (
        <section id="project">
            {/* menu top */}
            <Menu
                searchQuery={searchQuery}
                handleCreate={handleCreate}
                handleDeletedFormToggle={handleDeletedFormToggle}
                handleProjectAnalysis={handleProjectAnalysis}
                handleSearch={handleSearch}
            />
            {/* main */}
            <section id="container">
                <div className="mainContainer w-full">
                    <div className="block-project">
                        {/* title is class name done, to-do, in-progress, verify */}
                        {loadingData ? (
                            <LoadingBox/>
                        ) : (
                            filteredProjects.map(project => (
                                <CardProject
                                    key={project.project_id}
                                    project={project}
                                    formatDateRange={formatDateRange}
                                    handleDelete={isDeteleProject}
                                    handleEdit={handleEdit}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {isDeletedFormOpen && (
                <DeletedProjectsForm
                    resetPage={fetchProjectData}
                    onClose={handleDeletedFormToggle}
                />
            )}

            {isOpenProjectAnalysis && (
                <ProjectAnalysis
                    onClose={handleProjectAnalysis}
                />
            )}

            {isFormOpen && (
                <CreateProjectForm
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleSubmitForm}
                    title={editProject ? 'Edit Project' : 'Create Project'}
                    project={editProject}
                />
            )}

            {/* from history */}
            {onChangeDeteleProject && (
                <ConfirmationForm
                    type={'help'}
                    styleToBox={
                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[530px]'
                    }
                    styleToChildren={``}
                    handleConfirm={handleConfirmDeleteProject}
                >
                    Do you want to archive the project{' '}
                    <span className="font-semibold text-indigo-700">
                        '{onChangeDeteleProject.project_name}'
                    </span>{' '}
                    ?<br />{' '}
                    <span className="text-sm font-light text-gray-50">
                        It will be moved to history and can be restored later.
                    </span>
                </ConfirmationForm>
            )}
        </section>
    )
}
