import { useState, useRef, useEffect } from "react"
import ProjectPriority from "./ProjectPriority"

export default function ProjectPriorityDropDown({ priority = "Low", setProjectPriority, className = null,direction = 'right' }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const priorityData = {
    Low: "Low",
    Medium: "Medium",
    High: "High",
  }

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="flex items-center gap-1 rounded-lg border shadow-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ProjectPriority priority={priority} classNameText={'text-sm'} className={'py-2 px-4'} sizeIcon={'20px'}/>
      </div>
      {isOpen && (
        <div className={`absolute ${direction == 'right' ? 'right-0' : 'left-0'} mt-2 bg-white-css border rounded-lg shadow-md p-2 z-10`}>
          {Object.entries(priorityData).map(([key, data]) => (
            <div
              key={key}
              onClick={() => {
                setProjectPriority(key)
                setIsOpen(false)
              }}
              className="cursor-pointer hover:bg-gray-300/50 p-1 rounded"
            >
              <ProjectPriority priority={data} classNameText={'text-sm'} className={'py-2 px-4'} sizeIcon={'20px'}/>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
