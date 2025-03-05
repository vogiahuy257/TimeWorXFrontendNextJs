import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Dropdown = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = projectId => {
        onChange(projectId)
        setIsOpen(false)
    }

    return (
        <div className="relative w-full">
            <label className=" text-sm font-medium mb-1">
                {label}
            </label>

            {/* Button mở dropdown */}
            <button
                type="button"
                className="w-full flex items-center justify-between bg-white-css border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="truncate">
                    {options.find(opt => opt.project_id === value)?.project_name || 'Select a project'}
                </span>

                {/* Mũi tên SVG */}
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 11.5a.75.75 0 0 1-.53-.22l-4-4a.75.75 0 1 1 1.06-1.06L8 9.69l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-.53.22"
                    />
                </motion.svg>
            </button>

            {/* Dropdown menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute w-full mt-2 bg-white-css border border-gray-200 shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto"
                    >
                        {options.length > 0 ? (
                            options.map(project => (
                                <li
                                    key={project.project_id}
                                    className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-500 ${
                                        project.project_id === value ? 'bg-blue-500 font-medium' : ''
                                    }`}
                                    onClick={() => handleSelect(project.project_id)}
                                >
                                    {/* Status Indicator */}
                                    <span className={`w-2 h-2 rounded-full mr-2 ${project.project_status}`} />
                                    
                                    {/* Project Name */}
                                    <span className="truncate flex-1">{project.project_name}</span>

                                    {/* Completed Task Ratio */}
                                    <span className="text-xs ">{project.completed_tasks_ratio}</span>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-sm text-center">No projects available</li>
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Dropdown
