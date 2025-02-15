'use client'

import { useState, useEffect } from 'react'
import axios from '@/libs/axios'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import MenuMeeting from '@/components/UI/Home/MenuMeeting'
import LoadingBox from '@/components/UI/loading/LoadingBox'
import MeetingList from '@/components/UI/Home/MeetingList'

const MeetingForm = dynamic(
    () => import('@/components/UI/Meeting/MeetingForm'),
    {
        ssr: true,
        loading: () => <p className="m-auto w-100">Loading form...</p>,
    },
)

const HomeClient = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [meetings, setMeetings] = useState([])
    const [currentMeeting, setCurrentMeeting] = useState(null)
    const [meetingLoadingData, setMeetingLoadingData] = useState(true);

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
        <section id="home" className="">
            {/* Meeting Header */}
            <div className="box box-header" />

            <div className="box box-meeting">
                <MenuMeeting 
                    handleOpenFormCreateMeeting = {handleOpenFormCreateMeeting}
                />

                {meetingLoadingData ? (
                    <div className='w-full h-full relative'>
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

            <div className="box box-content flex justify-center items-center flex-col relative">
                <h1 className="header font-baloo text-4xl">
                    Welcome To DashBoard
                </h1>
                <p className="pt-1 text-gray-500">
                    To start your project you need to click this button
                </p>
                <Link
                    href="/dashboard/project"
                    className="btn-home mt-4 px-4 py-2 rounded-xl text-white bg-blue-700 text-center"
                >
                    Go Project
                </Link>

                <Image
                    src="/image/cheese-hi.svg"
                    alt="cheese"
                    width={1000} // Điều chỉnh kích thước phù hợp
                    height={250}
                    className="absolute -bottom-3 right-28 be-cheese"
                />
            </div>
            
            {isFormOpen && (
                <MeetingForm
                    onClose={handleOpenFormCreateMeeting}
                    meeting={currentMeeting}
                    getData={getData}
                />
            )}
        </section>
    )
}

export default HomeClient
