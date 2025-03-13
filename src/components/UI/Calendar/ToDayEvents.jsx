import LoadingBox from "../loading/LoadingBox"
import { format } from 'date-fns'
export default function ToDayEvents({loadingDataEvents,todayEvents}) {
    return(
        <div className="p-4 space-y-2 flex-grow rounded-lg border shadow-lg">
        <h2 className="font-base text-base">Today Task</h2>
        {loadingDataEvents ? (
            <div className=" relative w-full h-36 top-0 left-0">
                <LoadingBox />
            </div>
        ) : (
            <ul className="space-y-3 max-h-[150px] overflow-auto scrollbar-hide">
                {todayEvents.map(event => (
                    <li
                        key={event.id}
                        className="flex items-center p-3 rounded-md text-sm shadow-md border border-gray-300">
                        {event.isAllDay ? (
                            <span className="font-medium">All Day</span>
                        ) : (
                            <>
                                <span className="font-medium">
                                    {format(new Date(event.start), 'HH:mm')}
                                </span>{' '}
                                -
                                <span className="font-medium">
                                    {format(new Date(event.end), 'HH:mm')}
                                </span>
                            </>
                        )}
                        <span className="ml-auto">{event.title}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
    )
}
