
'use client'

import FullCalendarComponent from '@/components/UI/Calendar/FullCalendarComponent'
import { useAuthContext } from '@/hooks/context/AuthContext'

export default function Calendar() {
    const user = useAuthContext()
    return (
        <>
            <FullCalendarComponent user={user}/>
        </>
    );
}
