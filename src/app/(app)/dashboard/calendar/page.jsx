'use client'

// External Libraries
// import { useAuthContext } from '@/hooks/context/AuthContext'
// Dynamically Imported Components
import dynamic from 'next/dynamic'

// Dynamically load FullCalendarComponent for better performance
const FullCalendarComponent = dynamic(
    () => import('@/components/UI/Calendar/FullCalendarComponent'),
    { ssr: false },
)

export default function Calendar() {
    return (
        <>
            <FullCalendarComponent />
        </>
    )
}
