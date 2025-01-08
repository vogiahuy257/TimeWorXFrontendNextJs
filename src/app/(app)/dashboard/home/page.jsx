'use client'

import React, { Suspense, useState, useEffect } from 'react'
import axios from '@/libs/axios'
import Link from 'next/link'
import MeetingForm from '@/components/UI/Meeting/MeetingForm'
import { useAuthContext } from '@/hooks/context/AuthContext'

// Lazy load for meeting list
const MeetingList = React.lazy(() => import('@/components/UI/Home/MeetingList'));

const HomeClient = () => {
    const user = useAuthContext()
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [meetings, setMeetings] = useState([])
    const [currentMeeting, setCurrentMeeting] = useState(null)

    const handleOpenFormCreateMeeting = () => {
        setCurrentMeeting(null)
        setIsFormOpen(!isFormOpen)
    }

    const handleEditMeeting = (meeting) => {
        setCurrentMeeting(meeting)
        setIsFormOpen(true)
    }

    const getData = () => {
        axios
            .get('/api/meetings')
            .then((response) => {
                setMeetings(response.data)
            })
            .catch((error) => {
                console.error('Error fetching meetings:', error)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <section id="home" className="overflow-auto scrollbar-hide">
            {/* Meeting Header */}
            <div className="box box-header">
            </div>

            <div className="box box-meeting">
                <div className="flex justify-center meeting-header w-full items-center p-3">
                    <h1 className="text-meeting text-base font-base py-1 px-2 rounded-md">Your Meeting</h1>
                    <button onClick={handleOpenFormCreateMeeting} className="ml-auto rounded-full flex justify-center items-center btn-add-meeting p-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M18 12L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <Suspense fallback={<p className='m-auto w-100'>Loading meetings...</p>}>
                    <MeetingList meetings={meetings} handleOpenFormCreateMeeting={handleOpenFormCreateMeeting} handleEditMeeting={handleEditMeeting} />
                </Suspense>
            </div>

            <div className='box box-content flex justify-center items-center flex-col relative'>
                <h1 className='header font-baloo text-4xl'>Welcome To DashBoard</h1>
                <p className='pt-1 text-gray-500'>To start your project you need to click this button</p>
                <Link href="/dashboard/project" className="btn-home mt-4 px-4 py-2 rounded-xl text-white bg-blue-700 text-center">Go Project</Link>


                <img src="/image/cheese-hi.svg" alt="cheese" className='absolute -bottom-3 right-28 be-cheese' />
            </div>
            {isFormOpen && (
                <MeetingForm user={user} onClose={handleOpenFormCreateMeeting} meeting={currentMeeting} getData = {getData}/>
            )}
        </section>
    )
}

export default HomeClient
