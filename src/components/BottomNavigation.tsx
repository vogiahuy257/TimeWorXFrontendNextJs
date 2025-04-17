import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, FolderKanban, CheckSquare, BarChart3, Settings } from "lucide-react"
import colorStyles from "@/components/bottom-navigation/css/colors.module.css"
import Link from "next/link" // Import Link from Next.js
interface BottomNavigationProps {
  pathname: string
}

export default function BottomNavigation({ pathname }: BottomNavigationProps) {
  const [activeItem, setActiveItem] = useState("Home") // Default active item

  const menuItems = [
    { name: "Home", icon: <Home className="w-5 h-5" />, path: "/dashboard/home" },
    { name: "Project", icon: <FolderKanban className="w-5 h-5" />, path: "/dashboard/project" },
    { name: "Task", icon: <CheckSquare className="w-5 h-5" />, path: "/dashboard/task" },
    { name: "Reports", icon: <BarChart3 className="w-5 h-5" />, path: "/dashboard/reports" },
    { name: "Setting", icon: <Settings className="w-5 h-5" />, path: "/setting/system" },
  ]

  // Effect để cập nhật activeItem khi URL thay đổi
  useEffect(() => {
    const activeMenuItem = menuItems.find(item => pathname.startsWith(item.path))
    if (activeMenuItem) {
      setActiveItem(activeMenuItem.name)
    }
  }, [pathname])

  return (
    <motion.nav
    id="NavigationBottom"
      className={`md:hidden border-t shadow-lg z-50 ${colorStyles.menuBackground}`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-between items-center px-2">
        {menuItems.map((item) => {
          const isActive = activeItem === item.name

          return (
            <motion.div
              key={item.name}
              className={`${colorStyles.menuItem}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link className="flex flex-col items-center py-3 px-4 relative" href={item.path} passHref>
                <motion.div
                  animate={{
                    y: isActive ? -2 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className={isActive ? colorStyles.activeItem : ""}
                  onClick={() => setActiveItem(item.name)} // Đổi active item khi click
                >
                  {item.icon}
                </motion.div>

                <motion.span
                  className={`text-xs mt-1 font-medium ${isActive ? colorStyles.activeItem : ""}`}
                  animate={{
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {item.name}
                </motion.span>

                {/* Modern active indicator with animation */}
                <motion.div
                  className={`absolute -bottom-3 rounded-t-md ${colorStyles.activeIndicator}`}
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  animate={{
                    width: isActive ? 24 : 0,
                    height: isActive ? 3 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />

                {/* Subtle background effect for active item */}
                <motion.div
                  className={`absolute inset-0 rounded-md z-[-1] ${colorStyles.activeBackground}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isActive ? 0.5 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.nav>
  )
}
