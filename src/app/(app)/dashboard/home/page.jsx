'use client'

import { useState, useEffect } from 'react'
import axios from '@/libs/axios'
import dynamic from 'next/dynamic'
import HomeContent from './HomeContent'
import MenuMeeting from '@/components/UI/Home/MenuMeeting'
import LoadingBox from '@/components/UI/loading/LoadingBox'
import MeetingList from '@/components/UI/Home/MeetingList'
import LoadingPage from '@/components/UI/loading/LoadingPage'
import HomeLayout from './HomeLayout'

const MeetingForm = dynamic(
    () => import('@/components/UI/Meeting/MeetingForm'),
    {
        ssr: true,
        loading: () => <LoadingPage/>,
    },
)

const HomeClient = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [meetings, setMeetings] = useState([])
    const [currentMeeting, setCurrentMeeting] = useState(null)
    const [meetingLoadingData, setMeetingLoadingData] = useState(true)

    const handleOpenFormCreateMeeting = () => {
        setCurrentMeeting(null)
        setIsFormOpen(!isFormOpen)
    }

    const handleEditMeeting = meeting => {
        setCurrentMeeting(meeting)
        setIsFormOpen(true)
    }

    const getData = () => {
        axios
            .get('/api/meetings')
            .then(response => {
                setMeetings(response.data)
            })
            .finally(() => setMeetingLoadingData(false))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <HomeLayout>
            <HomeContent/>
            <div className="box box-meeting">
                <MenuMeeting 
                    handleOpenFormCreateMeeting = {handleOpenFormCreateMeeting}
                />

                {meetingLoadingData ? (
                    <div className='w-full h-full relative top-0 left-0'>
                        <LoadingBox />
                    </div>
                ):
                (
                    <MeetingList
                        meetings={meetings}
                        handleEditMeeting={handleEditMeeting}
                    />
                )}  

            </div>
            
            {isFormOpen && (
                <MeetingForm
                    onClose={handleOpenFormCreateMeeting}
                    meeting={currentMeeting}
                    getData={getData}
                />
            )}
        </HomeLayout>
    )
}

export default HomeClient
