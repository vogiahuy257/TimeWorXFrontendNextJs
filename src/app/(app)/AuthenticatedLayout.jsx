import { usePathname } from 'next/navigation'

import Navigation from './navication'
import Avatar from '@/components/Avatar'
import Notification from './notification'
const AuthenticatedLayout = ({ user,settings,children,logout }) => {

    const url = usePathname()

    return (
        <section id="dashboard" className={settings?.color_system}>
            <div className={`block ${settings?.screen_mode}`}>
                <div className="block-menu-top">
                    <Notification user ={user}/>
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
