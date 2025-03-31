import { usePathname } from 'next/navigation'

import Navigation from './navication'
import Avatar from '@/components/Avatar'
import Notification from './notification'
import { useState } from "react"
const AuthenticatedLayout = ({ user,settings,children,logout }) => {

    const url = usePathname()

    
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Bạn có một cuộc họp vào lúc 10:00 AM", time: "5 phút trước", seen: true },
        { id: 2, message: "Dự án TimeWorX đã được cập nhật", time: "1 giờ trước", seen: false },
        { id: 3, message: "Bạn có một tin nhắn mới từ Trân", time: "2 giờ trước", seen: true },
        { id: 1, message: "Bạn có một cuộc họp vào lúc 10:00 AM", time: "5 phút trước", seen: false },
        { id: 2, message: "Dự án TimeWorX đã được cập nhật", time: "1 giờ trước", seen: false },
        { id: 3, message: "Bạn có một tin nhắn mới từ Trân", time: "2 giờ trước", seen: false },
        { id: 1, message: "Bạn có một cuộc họp vào lúc 10:00 AM", time: "5 phút trước", seen: false },
        { id: 2, message: "Dự án TimeWorX đã được cập nhật", time: "1 giờ trước", seen: false },
        { id: 3, message: "Bạn có một tin nhắn mới từ Trân", time: "2 giờ trước", seen: false },
    ]);

    return (
        <section id="dashboard" className={settings.color_system == 'dark-mode' ? "dark-mode dark": "light-mode"}>
            <div className={`block ${settings.screen_mode}`}>
                <div className="block-menu-top">
                    <Notification
                        notifications={notifications}
                        setNotifications={setNotifications}
                    />
                    <div className="flex items-center z-50">
                        <div className="avatar-user mx-5">
                            <Avatar
                                name={user?.name}
                                src={user?.profilePicture}
                                size={34}
                                className=""
                            />
                        </div>
                    </div>
                </div>

                <Navigation url={url} logout={logout}/>

                <section id="main">
                    <div className="content">
                        <main className="overflow-x-hidden">{children}</main>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default AuthenticatedLayout
