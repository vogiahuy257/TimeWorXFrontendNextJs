import {format} from 'date-fns'
export default function MenuFullCalendar({date,currentView,handleViewChange,handleOpenFormCreateMeeting}) {
    return (
        <div className="menu flex mb-4">
            <div className="w-full flex items-center">
                <h1 className="text-2xl font-semibold">
                    {format(date, 'dd MMMM yyyy')}
                </h1>
                <select
                    className="rounded-md ml-2 text-base w-auto"
                    value={currentView}
                    onChange={e => handleViewChange(e.target.value)}>
                    <option value="dayGridMonth">Month</option>
                    <option value="timeGridWeek">Week</option>
                    <option value="timeGridDay">Day</option>
                    <option value="listWeek">List</option>
                </select>
                <button
                    onClick={handleOpenFormCreateMeeting}
                    className="btn-meeting flex justify-center items-center px-2 py-2 rounded-md">
                    Create meeting
                </button>
            </div>
        </div>
    )
}
