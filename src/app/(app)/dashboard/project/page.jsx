'use client'

import axios from '@/libs/axios'
import { useEffect, useState } from 'react'
import CardProject from '@/components/UI/Project/CardProject'
import CreateProjectForm from '@/components/UI/Project/CreateProjectForm' 
import {  toast } from 'react-toastify'
import DeletedProjectsForm from '@/components/UI/Project/DeletedProjectsForm' 
import ProjectAnalysis from '@/components/UI/Project/ProjectAnalysis'
import ConfirmationForm from '@/components/ConfirmationForm'
import Menu from './menu'
import { useAuthContext } from '@/hooks/context/AuthContext'


export default function Folder() {
     const user = useAuthContext()
    const [projects, setProjects] = useState([])
    const [filteredProjects, setFilteredProjects] = useState([])
    const [isDeletedFormOpen, setIsDeletedFormOpen] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isOpenProjectAnalysis, setIsOpenProjectAnalysis] = useState(false)
    const [editProject, setEditProject] = useState([]) 
    const [searchQuery, setSearchQuery] = useState('')
    const [onChangeDeteleProject, setOnChangeDeteleProject] = useState(null)
    
    const statusOrder = {
        "verify": 1,
        "in-progress": 2,
        "to-do": 3,
        "done": 4
    }

    const sortProjectsByStatus = (projects) => {
        return projects.sort((a, b) => {
            return statusOrder[a.project_status] - statusOrder[b.project_status]
        })
    }

    //hàm gọi api lấy data
    const fetchProjectData = async () => {
        try {
            const response = await axios.get(`/api/projects/${user.id}`)
            
            if (response?.data) {
                const sortedProjects = sortProjectsByStatus(response.data)
    
                // Cập nhật state
                setProjects(sortedProjects)
                setFilteredProjects(sortedProjects)
            } else {
                setProjects([])
                setFilteredProjects([])
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Unexpected error occurred."
            toast.error(`Error fetching projects: ${errorMessage}`)
        }
    }
    //hàm tìm kiếm theo mỗi lần nhấn cho project
    const handleSearch = (e) => {
        const query = e.target.value
        setSearchQuery(query)
        const filtered = projects.filter(project =>
            project.project_name.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredProjects(filtered)
    }
    
    useEffect(() => {
        fetchProjectData()
    }, [])

    useEffect(() => {
        setFilteredProjects(sortProjectsByStatus(filteredProjects))
    }, [searchQuery])

    const handleDeletedFormToggle = () =>{
        setIsDeletedFormOpen(!isDeletedFormOpen)
    }
    //hàm đổi lại format lại ngày tháng năm
    const formatDateRange = (startDate, endDate) => {
        const optionsWithYear = { day: '2-digit', month: 'short', year: 'numeric' }
        const optionsWithoutYear = { day: '2-digit', month: 'short' }
        
        const start = new Date(startDate)
        const end = new Date(endDate)
        
        if (start.getFullYear() === end.getFullYear()) {
            const formattedStart = start.toLocaleDateString('en-GB', optionsWithoutYear)
            const formattedEnd = end.toLocaleDateString('en-GB', optionsWithYear) 
            return `${formattedStart} - ${formattedEnd}`
        } else {
            const formattedStart = start.toLocaleDateString('en-GB', optionsWithYear)
            const formattedEnd = end.toLocaleDateString('en-GB', optionsWithYear)
            return `${formattedStart} - ${formattedEnd}`
        }
    }

    const isDeteleProject = (project) => {
        setOnChangeDeteleProject(project)
    }
    //hàm hiện thông báo khi xóa chọn yes hoặc no
    const handleConfirmDeleteProject = (isConfirmed) => {
        if (isConfirmed && onChangeDeteleProject) {
            confirmDelete(onChangeDeteleProject.project_id)
        }
        setOnChangeDeteleProject(null) 
    }
    //hàm cho sự kiện khi nhấn vào nút xóa
    const confirmDelete = (projectId) => {
        axios.delete(`/api/projects/${projectId}`)
            .then(() => {
                setProjects(projects.filter(project => project.project_id !== projectId))
                toast.dismiss() 
                fetchProjectData()
                handleDeletedFormToggle()
                toast.success('Project deleted successfully!')
            })
            .catch(error => {
                toast.error(`Error deleting project: ${error.response ? error.response.data : error.message}`)
            })
    }
    
    const handleProjectAnalysis = () => 
    {
        setIsOpenProjectAnalysis(!isOpenProjectAnalysis)
    }
    
    //hàm mở form tạo dự án
    const handleCreate = () => {
        setIsFormOpen(true) 
        setEditProject(null)  
    }

    // hàm mở form chỉnh sửa dự án
    const handleEdit = (project) => {
        setIsFormOpen(true)  
        setEditProject(project) 
    }

    // submit cho cả 2 form chỉnh sửa và tạo dự án
    const handleSubmitForm = (projectData) => {
        if (editProject)
        {
            // Update project
            axios.put(`/api/projects/${editProject.project_id}`, projectData)
                .then(response => {
                    setProjects(projects.map(p => p.project_id === response.data.project_id ? response.data : p))
                    setIsFormOpen(false) 
                    fetchProjectData()
                    toast.success('Project update successfully!')
                })
                .catch(error => {
                    toast.error(`Error updating project: ${error.message}`)
                })
        }
        else
        {
            // Create new project
            axios.post('/api/projects', projectData)
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
        
        <section id='project' >
            {/* menu top */}
            <Menu
                searchQuery = {searchQuery}
                handleCreate = {handleCreate}
                handleDeletedFormToggle = {handleDeletedFormToggle}
                handleProjectAnalysis = {handleProjectAnalysis}
                handleSearch = {handleSearch}
            />
            {/* main */}
            <section id='container'>
                <div className='mainContainer w-full'>

                    <div className='block-project'>

                      {/* title is class name done, to-do, in-progress, verify */}

                      {filteredProjects.map(project => (
                            <CardProject
                                key={project.project_id}
                                project={project}
                                formatDateRange={formatDateRange}
                                handleDelete={isDeteleProject}
                                handleEdit={handleEdit}
                            />
                        ))}

                    </div>
                </div>
                
                {isDeletedFormOpen && (
                    <DeletedProjectsForm
                        user={user}
                        resetPage={fetchProjectData}
                        onClose={handleDeletedFormToggle}
                    />
                )}
            </section>

            {isOpenProjectAnalysis && (
                    <ProjectAnalysis 
                        userId={user.id} 
                        onClose={handleProjectAnalysis}
                    />
            )}
            {/* from model */}
            {isFormOpen && (
                <CreateProjectForm
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleSubmitForm}
                    title={editProject ? 'Edit Project' : 'Create Project'}
                    project={editProject}
                    user_id={user.id}
                />
            )}

                {onChangeDeteleProject && (
                    <ConfirmationForm
                        type={'help'}
                        styleToBox = {"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[530px]"}
                        styleToChildren={``}
                        children={
                            <>
                                Do you want to archive the project{' '}
                                <span className="font-semibold text-indigo-700">
                                    '{onChangeDeteleProject.project_name}'
                                </span>
                                {' '}?<br /> <span className='text-sm font-light text-gray-50'>It will be moved to history and can be restored later.</span>
                            </>
                          }                          
                        handleConfirm={handleConfirmDeleteProject}
                    />
                )}
        </section>
    )
}
