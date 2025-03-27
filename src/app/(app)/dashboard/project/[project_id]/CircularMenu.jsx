import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, BarChart, Activity } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function CircularMenu({pathname,isBroad, isTimeline}) {
    
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const toggleView = () => {
        if (pathname.includes("/broad")) {
            router.push(pathname.replace("/broad", "/timeline"))
        } else {
            router.push(pathname.replace("/timeline", "/broad"))
        }
    }
    return (
        <div className='fixed p-5 bottom-0 right-0 flex items-center'>
            <div className=" relative flex">
                {/* Main Button */}
                <motion.button
                    className="w-12 h-12 rounded-full bg-black border-2 border-gray-600 flex items-center justify-center text-white shadow-lg hover:bg-gray-800 transition"
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.9 }}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>

                {/* Circular Options */}
                <motion.div
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                        x: isOpen ? -10 : 40,
                        y: isOpen ? -60 : 30,
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    className="absolute bottom-4 right-4 rounded-full flex items-center justify-center text-white">
                    <button 
                        className={`${isBroad ? "bg-blue-600/100 hover:bg-blue-600/90" : "bg-black hover:bg-gray-800"} w-auto px-4 py-2 rounded-full shadow-md flex items-center justify-center transition`}
                        onClick={toggleView}
                    >
                        <BarChart size={20} className="mr-2" /> Broad
                    </button>
                </motion.div>

                <motion.div
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                        x: isOpen ? -60 : 40,
                        y: isOpen ? -0 : 20,
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
                        onClick={toggleView}
                    >
                        <Activity size={20} className="mr-2" /> Timeline
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
