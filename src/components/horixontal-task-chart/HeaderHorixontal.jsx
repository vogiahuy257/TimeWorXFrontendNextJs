import { motion, AnimatePresence } from 'framer-motion'

import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"

export default function HeaderHorixontal({
    setShowSortOptions,
    showSortOptions,
    setSortOrder,
    sortOrder,
}) {
    return (
        <div className="flex rounded-lg justify-between items-center p-3">
            <h2 className="text-xl font-bold text-gray-black-css">
                Task Distribution
            </h2>

            <div className="relative">
                <button
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors"
                    onClick={() => setShowSortOptions(!showSortOptions)}>
                    <span>Sort</span>
                    <ArrowUpDown size={14} />
                </button>

                <AnimatePresence>
                    {showSortOptions && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-full mt-1 bg-white-css shadow-lg rounded-md overflow-hidden z-20 w-40 ring-gray-css">
                            <button
                                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-100 transition-colors ${
                                    sortOrder === 'asc'
                                        ? 'bg-gray-700/80 font-medium'
                                        : ''
                                }`}
                                onClick={() => {
                                    setSortOrder('asc')
                                    setShowSortOptions(false)
                                }}>
                                <span>Ascending</span>
                                <ChevronUp
                                    size={14}
                                    className={
                                        sortOrder === 'asc'
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }
                                />
                            </button>
                            <button
                                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-700/80 transition-colors ${
                                    sortOrder === 'desc'
                                        ? 'bg-gray-700/80 font-medium'
                                        : ''
                                }`}
                                onClick={() => {
                                    setSortOrder('desc')
                                    setShowSortOptions(false)
                                }}>
                                <span>Descending</span>
                                <ChevronDown
                                    size={14}
                                    className={
                                        sortOrder === 'desc'
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }
                                />
                            </button>
                            <button
                                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-700/80 transition-colors ${
                                    sortOrder === null
                                        ? 'bg-gray-700/80 font-medium'
                                        : ''
                                }`}
                                onClick={() => {
                                    setSortOrder(null)
                                    setShowSortOptions(false)
                                }}>
                                <span>Default</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
