
import IconDelete from '@/components/icon/iconDelete'
import IconDoneAll from '@/components/icon/iconDoneAll'
import IconNotification from '@/components/icon/iconNotification'
import IconX from '@/components/icon/iconX'
import NoData from '@/components/NoData'
// custom hooks
import useNotifications from '@/hooks/useNotifications'

export default function Notification({user}) {
    // Sử dụng custom hook useNotifications để lấy thông báo
    const {
        notifications,
        openNotification,
        setOpenNotification,
        notificationRef,
        unreadCount,
        handleMarkAsRead,
        handleMarkAllAsRead,
        handleDeleteNotification,
        handleMarkAsReadOnClick,
        handleDeleteAllNotifications,
    } = useNotifications({user})

    const onClickOpenNotification = () => {
        setOpenNotification(!openNotification)
        if (openNotification) {
            handleMarkAsRead()
        }
    }
    return (
        <div
            className={`box-notification p-2 rounded-t-lg ${openNotification && 'active'} relative inline-block`}
            ref={notificationRef}>
            <button
                className={`flex rounded-md p-1 items-center justify-center relative m-auto`}
                onClick={onClickOpenNotification}>
                <IconNotification />
            </button>
            {unreadCount > 0 && (
                <div className="top-0 right-0 absolute text-center w-4 h-4 rounded-full text-white bg-blue-600 text-xs">
                    <p>{unreadCount}</p>
                </div>
            )}

            {openNotification && (
                <div className="content-notification absolute z-40 top-full right-0 rounded-b-lg rounded-tl-lg pb-4 w-96">
                    <div className="p-4 flex items-center">
                        <h3 className="font-semibold">Thông báo</h3>
                        <div className="ml-auto flex gap-2">
                            <button
                                className="btn-done-all flex gap-1 text-xs p-1 rounded-md w-6 h-6 transition-all duration-200 ease-in-out hover:w-[138px] active:bg-black/[.8]"
                                onClick={handleMarkAllAsRead}
                            >
                                <IconDoneAll size="18" />
                                <span>done all notification</span>
                            </button>
                            <button
                                className="btn-clear flex gap-1 text-xs p-1 rounded-md w-6 h-6 transition-all duration-200 ease-in-out hover:w-[138px] active:bg-black/[.8]"
                                onClick={handleDeleteAllNotifications}
                            >
                                <IconDelete size="18" />
                                <span>clear all notification</span>
                            </button>
                        </div>
                    </div>
                    {notifications.length > 0 ? (
                        <ul className="list-notification custom-scrollbar p-4 mx-2 mb-2 flex flex-col gap-2 max-h-60 overflow-y-auto">
                            {notifications.map((notif, index) => (
                                <li
                                    key={index}
                                    className={`item-notification flex items-center group ${notif.notification_type && notif.notification_type} cursor-pointer relative rounded-md transition ${notif.read_status ? '' : 'seen'}`}>
                                    <button 
                                        className='btn-item-notification p-4  flex flex-col items-start gap-2'
                                        onClick={() => handleMarkAsReadOnClick(notif.id)}
                                    >
                                        <p className="text-sm text-gray-black-css text-start">
                                            {notif.message}
                                        </p>
                                        <span className="text-xs text-gray-css">
                                            {new Date(
                                                notif.notification_date,
                                            ).toLocaleString()}{' '}
                                            {/* Định dạng thời gian */}
                                        </span>
                                    </button>
                                    <button
                                        className="btn-delete-notification ml-auto mr-2 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all duration-200 ease-in-out"
                                        onClick={() => handleDeleteNotification(notif.id)}
                                    >
                                        <IconX size="24" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='p-2 h-auto w-full flex justify-center items-center'>
                            <NoData
                                className={''}
                                message='No new notifications.'
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
