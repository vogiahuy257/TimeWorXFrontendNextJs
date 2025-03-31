
import { useState, useRef } from "react"
import { useClickAway } from "react-use"
import Link from "next/link"
import IconDelete from '@/components/icon/iconDelete'
import IconDoneAll from '@/components/icon/iconDoneAll'
import IconNotification from '@/components/icon/iconNotification'

export default function Notification({notifications,setNotifications}) {
    const [openNotification, setOpenNotification] = useState(false)
    const notificationRef = useRef('')
    
    const unreadCount = notifications.filter(n => !n.seen).length
    // Đánh dấu tất cả thông báo là đã xem
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, seen: false })))
    }

    // Xóa toàn bộ thông báo
    const clearNotifications = () => {
        setNotifications([])
    }
    useClickAway(notificationRef, () => { if(openNotification) setOpenNotification(false)})

    return (
        <div
            className={`box-notification p-2 rounded-t-lg ${openNotification && 'active'} relative inline-block`}
            ref={notificationRef}>
            <button
                className={`flex rounded-md p-1 items-center justify-center relative m-auto`}
                onClick={() => setOpenNotification(!openNotification)}>
                <IconNotification />
            </button>
            {unreadCount > 0 && (
                <div className="top-0 right-0 absolute text-center w-4 h-4 rounded-full text-white bg-blue-600 text-xs">
                    <p>{unreadCount}</p>
                </div>
            )}

            {openNotification && (
                <div className="content-notification absolute z-40 top-full right-0 rounded-b-lg rounded-tl-lg pb-4 w-72">
                    <div className="p-4 flex items-center">
                        <h3 className="font-semibold">Thông báo</h3>
                        <div className="ml-auto flex gap-2">
                            <button
                                className="btn-done-all flex gap-1 text-xs p-1 rounded-md"
                                onClick={markAllAsRead}>
                                <IconDoneAll size="18" />
                                <span>done all notification</span>
                            </button>
                            <button
                                className="btn-clear flex gap-1 text-xs p-1 rounded-md"
                                onClick={clearNotifications}>
                                <IconDelete size="18" />
                                <span>clear all notification</span>
                            </button>
                        </div>
                    </div>
                    {notifications.length > 0 ? (
                        <ul className="list-notification custom-scrollbar p-2 mb-2 mx-2 flex flex-col gap-2 max-h-60 overflow-y-auto">
                            {notifications.map((notif, index) => (
                                <li
                                    key={index}
                                    className={`item-notification p-2 cursor-pointer relative rounded-md transition ${notif.seen ? '' : 'seen'}`}
                                >
                                    <Link href={'#'}>
                                    <p className="text-sm text-gray-black-css">
                                        {notif.message}
                                    </p>
                                    <span className="text-xs text-gray-css">
                                        {notif.time}
                                    </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">
                            Không có thông báo mới.
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
