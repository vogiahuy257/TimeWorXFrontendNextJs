import { useState, useEffect } from 'react'
import {
    format,
    addDays,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
} from 'date-fns'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function SimpleCalendar({ selectedDate, onChange }) {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate))

    useEffect(() => {
        setCurrentMonth(new Date(selectedDate))
    }, [selectedDate])

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    })

    const handlePrevMonth = () => {
        setCurrentMonth(prevMonth => addDays(prevMonth, -30))
    }

    const handleNextMonth = () => {
        setCurrentMonth(prevMonth => addDays(prevMonth, 30))
    }

    return (
        <div className="mb-4">
            <div className="p-4 w-full h-auto border rounded-md shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePrevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span>{format(currentMonth, 'MMMM yyyy')}</span>
                    <button onClick={handleNextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center font-semibold">
                            {day}
                        </div>
                    ))}
                    {daysInMonth.map(date => (
                        <button
                            key={date.toString()}
                            onClick={() => onChange(date)}
                            className={`p-1 text-center rounded-xl ${
                                format(date, 'yyyy-MM-dd') ===
                                format(selectedDate, 'yyyy-MM-dd')
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-200'
                            }`}>
                            {format(date, 'd')}
                        </button>
                    ))}
                </div>

                <div className="flex items-center mt-2">
                    <button
                        className="btn-today px-2 py-[0.1rem] rounded"
                        onClick={() => onChange(new Date())}>
                        Today
                    </button>
                </div>
            </div>
        </div>
    )
}
