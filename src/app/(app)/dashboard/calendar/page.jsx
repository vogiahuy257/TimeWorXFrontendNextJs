'use client'

// External Libraries
import { useState, useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import axios from '@/libs/axios'
import LoadingPage from '@/components/UI/loading/LoadingPage'
import SimpleCalendar from '@/components/UI/Calendar/SimpleCalendar'
import FullCalendarComponent from '@/components/UI/Calendar/FullCalendarComponent'
import MenuFullCalendar from '@/components/UI/Calendar/MenuFullCalendar'
import FilterDropDown from '@/components/UI/Calendar/FilterDropDown'
import ToDayEvents from '@/components/UI/Calendar/ToDayEvents'
import MeetingListCalendar from '@/components/UI/Calendar/MeetingListCalendar'
import CalendarLayout from './CalendarLayout'

// Dynamically Imported Components
import dynamic from 'next/dynamic'

const MeetingForm = dynamic(
    () => import('@/components/UI/Meeting/MeetingForm'),
    { ssr: false, loading: () => <LoadingPage /> },
)

export default function Calendar() {
    const [date, setDate] = useState(new Date())
    const [events, setEvents] = useState([])
    const [projects, setProjects] = useState([])
    const [selectedProjectId, setSelectedProjectId] = useState('allproject')
    const [currentView, setCurrentView] = useState('dayGridMonth')
    const calendarRef = useRef(null)

    const [meetings, setMeetings] = useState([])
    const [currentMeeting, setCurrentMeeting] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [loadingDataProjects, setLoadingDataProjects] = useState(true)
    const [loadingDataMeeting, setLoadingDataMeeting] = useState(false)
    const [loadingDataEvents, setLoadingDataEvents] = useState(true)

    const handleOpenFormCreateMeeting = () => {
        setCurrentMeeting(null)
        setIsFormOpen(!isFormOpen)
    }

    const handleEditMeeting = meeting => {
        setCurrentMeeting(meeting)
        setIsFormOpen(true)
    }

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`/api/v1/projects/getall`)
            const projectData = response.data
            const mappedEvents = projectData.map(task => ({
                id: task.project_id,
                title: task.project_name,
                start: task.start_date,
                end: task.end_date,
                tasksCount: task.tasks_count,
                userCount: task.user_count,
                description: task.project_description,
                extendedProps: {
                    status: task.project_status,
                    isProject: true,
                },
            }))
            setEvents(mappedEvents)
            setProjects(projectData)
        } catch (error) {
            console.warn('Error fetching projects:', error)
        } finally {
            setLoadingDataProjects(false)
        }
    }

    const getDataMeeting = () => {
        setLoadingDataMeeting(true)
        axios
            .get('/api/meetings')
            .then(response => {
                const meetingsData = response.data

                const mappedEvents = meetingsData.map(task => ({
                    id: task.meeting_id,
                    title: task.meeting_name,
                    start: new Date(task.updated_at).toISOString(), // Chuyển đổi thành ISO 8601
                    end: new Date(task.meeting_date).toISOString(),
                    meeting_time: task.meeting_time,
                    description: task.meeting_description,
                    created_by: task.creator.name,
                    type: 'meeting',
                }))
                setEvents(mappedEvents)
                setMeetings(response.data)
            })
            .catch(error => {
                console.warn('Error fetching meetings:', error)
            })
            .finally(()=>{setLoadingDataMeeting(false)})
    }

    useEffect(() => {
        getDataMeeting()
    }, [])

    useEffect(() => {
        fetchEvents(selectedProjectId)
    }, [selectedProjectId])

    const fetchEvents = async projectId => {
        if (projectId === 'allproject') {
            return fetchProjects()
        }
        if (projectId) {
            try {
                setLoadingDataEvents(true)
                const response = await axios.get(
                    `/api/project-view/${projectId}`,
                )
                const taskData = response.data.tasks
                const mappedEvents = Object.values(taskData)
                    .flat()
                    .map(task => {
                        const [day, month, yearTime] = task.deadline.split('-')
                        const [year, time] = yearTime.split(' ')
                        const [hour, minute] = time.split(':')
                        const formattedDeadline = new Date(
                            `${year}-${month}-${day}T${hour}:${minute}:00Z`,
                        ).toISOString()

                        return {
                            id: task.id,
                            title: task.content,
                            start: task.created_at,
                            end: formattedDeadline,
                            description: task.description,
                            extendedProps: {
                                status: task.status,
                                isLate: task.is_late,
                                isNearDeadline: task.is_near_deadline,
                                userCount: task.user_count,
                                isProject: false,
                            },
                        }
                    })
                // Clear previous events before adding new ones
                setEvents(mappedEvents)
            } catch (error) {
                console.warn('Error fetching events:', error)
            } finally {
                setLoadingDataEvents(false)
            }
        }
    }

    const handleEventDrop = useCallback(async info => {
        const { event } = info

        // Kiểm tra loại sự kiện
        if (event.type_event === 'meeting') return

        const isProject = event.extendedProps?.isProject ?? false

        try {
            const response = await axios.post(
                `/api/calendar/update-event/${event.id}`,
                {
                    start: event.start || null,
                    end: event.end || null,
                    isProject,
                },
            )

            if (response.data.success) {
                setEvents(prevEvents =>
                    prevEvents.map(e =>
                        e.id === event.id
                            ? { ...e, start: event.start, end: event.end }
                            : e,
                    ),
                )
            }
        } catch (error) {
            toast.error('Failed to update event: ' + error)
        }
    }, [])

    const handleEventResize = useCallback(async info => {
        const { event } = info

        // Kiểm tra loại sự kiện
        if (event.type_event === 'meeting') return

        const isProject = event.extendedProps?.isProject ?? false

        try {
            const response = await axios.post(
                `/api/calendar/update-event/${event.id}`,
                {
                    start: event.start || null,
                    end: event.end || null,
                    isProject,
                },
            )

            if (response.data.success) {
                setEvents(prevEvents =>
                    prevEvents.map(e =>
                        e.id === event.id
                            ? { ...e, start: event.start, end: event.end }
                            : e,
                    ),
                )
            }
        } catch (error) {
            toast.error('Failed to update event: ' + error)
        }
    }, [])

    const now = new Date()
    const todayStart = new Date(now.setHours(0, 0, 0, 0))
    const todayEnd = new Date(now.setHours(23, 59, 59, 999))

    const todayEvents = events
        .map(event => {
            const eventStart = new Date(event.start)
            const eventEnd = new Date(event.end)

            return {
                ...event,
                eventStart,
                eventEnd,
                isAllDay: eventStart <= todayStart && eventEnd >= todayEnd,
            }
        })
        .filter(
            ({ isAllDay, eventStart, eventEnd, type }) =>
                (isAllDay ||
                    (eventStart >= todayStart && eventStart <= todayEnd) ||
                    (eventEnd >= todayStart && eventEnd <= todayEnd) ||
                    (eventStart <= todayStart && eventEnd >= todayEnd)) &&
                type !== 'meeting',
        )

    const handleDateSelect = selectInfo => {
        setDate(selectInfo.start)
    }

    const handleDateChange = newDate => {
        setDate(newDate)
        if (calendarRef.current && calendarRef.current.getApi) {
            const calendarApi = calendarRef.current.getApi()
            calendarApi.gotoDate(newDate)
        }
    }

    const handleViewChange = newView => {
        setCurrentView(newView)
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi()
            calendarApi.changeView(newView)
        }
    }

    return (
        <CalendarLayout>
            {/* Sidebar */}
            <div className="w-1/4 overflow-auto border-r p-2 pr-4 flex flex-col scrollbar-hide">
                <SimpleCalendar
                    selectedDate={date}
                    onChange={handleDateChange}
                />
                <FilterDropDown
                    selectedProjectId={selectedProjectId}
                    setSelectedProjectId={setSelectedProjectId}
                    projects={projects}
                />

                {todayEvents.length > 0 &&
                    selectedProjectId !== 'allproject' && (
                        <ToDayEvents
                            loadingDataEvents={loadingDataEvents}
                            todayEvents={todayEvents}
                        />
                    )}

                <MeetingListCalendar
                    loadingDataMeeting={loadingDataMeeting}
                    meetings={meetings}
                    handleEditMeeting={handleEditMeeting}
                />
            </div>

            {/* Main Content */}
            <div className="w-3/4 h-full pt-1 pl-4 flex-grow ">
                <MenuFullCalendar
                    date={date}
                    handleOpenFormCreateMeeting={handleOpenFormCreateMeeting}
                    handleViewChange={handleViewChange}
                    currentView={currentView}
                />
                <FullCalendarComponent
                    loading={loadingDataProjects}
                    events={events}
                    calendarRef={calendarRef}
                    handleEventDrop={handleEventDrop}
                    currentView={currentView}
                    handleEventResize={handleEventResize}
                    handleDateSelect={handleDateSelect}
                />
            </div>
            {isFormOpen && (
                <MeetingForm
                    styles={'z-50'}
                    onClose={handleOpenFormCreateMeeting}
                    meeting={currentMeeting}
                    getData={getDataMeeting}
                />
            )}
        </CalendarLayout>
    )
}