import IconFire from "@/components/icon/iconFire"

export default function ProjectPriority({ classNameText,priority,className,sizeIcon }) {
  // Visual data for each priority level
  const priorityData = {
    LOW: {
      colors: "bg-green-100 text-green-800 border-green-300",
      iconColor: "text-green-600",
      fireCount: 1,
    },
    MEDIUM: {
      colors: "bg-yellow-100 text-yellow-800 border-yellow-300",
      iconColor: "text-amber-600",
      fireCount: 2,
    },
    HIGH: {
      colors: "bg-red-100 text-red-800 border-red-300",
      iconColor: "text-rose-600",
      fireCount: 3,
    },
  }

  // Default styling for unknown priority levels
  const defaultStyle = {
    colors: "bg-gray-100 text-gray-800 border-gray-300",
    iconColor: "text-gray-500",
    fireCount: 0,
  }

  // Get the style data for the current priority
  const style = priorityData[priority.toUpperCase()] || defaultStyle

  // Generate fire icons based on priority level
  const renderFireIcons = () => {
    const icons = []
    for (let i = 0; i < style.fireCount; i++) {
      icons.push(
        <div key={i} className={`${style.iconColor} transform ${i % 2 === 0 ? "rotate-[-5deg]" : "rotate-[5deg]"}`}>
          <IconFire size={sizeIcon}/>
        </div>,
      )
    }
    return icons
  }

  return (
    <div className={`flex items-center rounded-md ${style.colors} border shadow-sm  ${className}`}>
      {/* Priority text */}
      <span className={`font-medium ${classNameText ? classNameText : ' text-xs'}`}>{priority}</span>

      {/* Fire icons */}
      <div className="flex -space-x-1">{renderFireIcons()}</div>
    </div>
  )
}

