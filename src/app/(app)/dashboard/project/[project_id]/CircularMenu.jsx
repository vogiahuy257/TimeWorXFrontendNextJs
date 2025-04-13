import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, BarChart, Activity, LayoutDashboard } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function CircularMenu({ pathname, isBroad, isTimeline, isDashboard }) {
    
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const switchView = (view) => {
        const basePath = pathname.split('/').slice(0, 4).join('/'); // Lấy phần cơ bản như "/dashboard/project/2"
        const newPath = `${basePath}/${view}`; // Thêm view mới vào sau base path
        router.push(newPath);
    }
    

    return (
        <div className='fixed p-5 bottom-0 right-0 flex items-center'>
            <div className="relative flex">
                {/* Main Button */}
                <motion.button
                    className="w-12 h-12 rounded-full bg-black border-2 border-gray-600 flex items-center justify-center text-white shadow-lg hover:bg-gray-800 transition"
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.9 }}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>

                {/* Broad Button */}
                <motion.div
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                        x: isOpen ? 15 : 50,
                        y: isOpen ? -152 : 0,
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    className="absolute bottom-4 right-4 rounded-full flex items-center justify-center text-white">
                    <button 
                        className={`${isBroad ? "bg-blue-600/100 hover:bg-blue-600/90" : "bg-black hover:bg-gray-800"} w-auto px-4 py-2 rounded-full shadow-md flex items-center justify-center transition`}
                        onClick={() => switchView("broad")}
                    >
                        <BarChart size={20} className="mr-2" /> Broad
                    </button>
                </motion.div>

                {/* Timeline Button */}
                <motion.div
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                        x: isOpen ? 15 : 50,
                        y: isOpen ? -98 : 0,
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 150,
                        damping: 15,
                        delay: 0.1,
                    }}
                    className="absolute bottom-4 right-4 rounded-full flex items-center justify-center text-white">
                    <button 
                        className={`${isTimeline ? "bg-blue-600/100 hover:bg-blue-600/90" : "bg-black hover:bg-gray-800"} w-auto px-4 py-2 rounded-full shadow-md flex items-center justify-center transition`}
                        onClick={() => switchView("timeline")}

                    >
                        <Activity size={20} className="mr-2" /> Timeline
                    </button>
                </motion.div>

                {/* Dashboard Button */}
                <motion.div
                    initial={{ x: 15, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                        x: isOpen ? 15 : 50,
                        y: isOpen ? -44 : 0,
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 150,
                        damping: 15,
                        delay: 0.2,
                    }}
                    className="absolute bottom-4 right-4 rounded-full flex items-center justify-center text-white">
                    <button 
                        className={`${isDashboard ? "bg-blue-600/100 hover:bg-blue-600/90" : "bg-black hover:bg-gray-800"} w-auto px-4 py-2 rounded-full shadow-md flex items-center justify-center transition`}
                        onClick={() => switchView("dashboard")}
                    >
                        <LayoutDashboard size={20} className="mr-2" /> Dashboard
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
