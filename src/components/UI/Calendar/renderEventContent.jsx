export default function renderEventContent(eventInfo)
{
    const calendarColors = {
        'to-do': 'bg-blue-400 border-blue-500 shadow-blue-300',
        'in-progress': 'bg-yellow-400 border-yellow-500 shadow-yellow-300',
        verify: 'bg-red-400 border-red-500 shadow-red-300',
        done: 'bg-green-400 border-green-500 shadow-green-300',
    }

    const backgroundColor =
        calendarColors[eventInfo?.event.extendedProps.status] ||
        'bg-gray-600 border-gray-700 shadow-gray-300'

    return (
        <div
            className={`${backgroundColor} w-full h-full mb-1 rounded-md border text-white shadow-md`}>
            <div className="flex gap-1">
                <p className="text-sm font-medium">
                    {eventInfo.event.title}
                </p>
                {eventInfo.event.description && (
                    <p className="text-xs truncate">
                        {eventInfo.event.description}
                    </p>
                )}
                {eventInfo.event.extendedProps.isLate && (
                    <span className="ml-2 px-1 py-0.5 bg-red-700 rounded text-xs">
                        Quá hạn
                    </span>
                )}
                {eventInfo.event.extendedProps.isNearDeadline &&
                    !eventInfo.event.extendedProps.isLate && (
                        <span className="ml-2 px-1 py-0.5 bg-yellow-700 rounded text-xs">
                            Gần hạn
                        </span>
                    )}
                <div className="flex ml-auto gap-1 justify-start items-center">
                    <span className="text-xs italic">
                        {eventInfo.event.start
                            ? eventInfo.event.start.toLocaleDateString()
                            : ''}
                    </span>
                    <span>-</span>
                    <span className="text-xs italic">
                        {eventInfo.event.end
                            ? eventInfo.event.end.toLocaleDateString()
                            : ''}
                    </span>
                </div>
            </div>
        </div>
    )
}