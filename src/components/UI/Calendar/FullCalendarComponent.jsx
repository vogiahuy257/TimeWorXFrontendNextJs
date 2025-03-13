import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import LoadingBox from '../loading/LoadingBox'
import renderEventContent from './renderEventContent'
// Custom Styles
import './css/customCalendar.css'

export default function FullCalendarComponent({
    loading,
    events,
    calendarRef,
    handleEventDrop,
    currentView,
    handleEventResize,
    handleDateSelect,
}) {
    return (
        <div className="relative top-0 left-0 w-full h-[calc(100vh-180px)]">
            {loading ? (
                <LoadingBox />
            ) : (
                <FullCalendar
                    ref={calendarRef}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                    ]}
                    initialView={currentView} // State quản lý view
                    headerToolbar={false}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    events={events}
                    eventContent={renderEventContent}
                    eventDrop={handleEventDrop}
                    eventResize={handleEventResize}
                    select={handleDateSelect}
                    eventClassNames={() => {
                        return ['bg-transparent rounded-md border-none text-sm']
                    }}
                    height="100%"
                />
            )}
        </div>
    )
}
