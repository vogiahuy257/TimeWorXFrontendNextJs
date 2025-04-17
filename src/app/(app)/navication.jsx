import { useState } from 'react'
import IconHome from '@/components/icon/iconHome'
import IconBox3D from '@/components/icon/iconBox3D'
import IconProject from '@/components/icon/iconProject'
import IconTask from '@/components/icon/iconTask'
import IconCalendar from '@/components/icon/iconCalendar'
import IconReport from '@/components/icon/iconReport'
import IconSetting from '@/components/icon/iconSetting'
import Link from 'next/link'
export default function Navigation({ url }) {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className={'block-menu-left' + (expanded ? ' expanded' : '')}>
            <div className="menu-top">
                <button
                    onClick={() => {
                        setExpanded(!expanded)
                    }}>
                    <IconBox3D />
                </button>
            </div>

            <nav className="menu menu-mid">
                <ul>
                    <li
                        className={
                            url.startsWith('/dashboard/home') ? 'active' : ''
                        }>
                        <Link href="/dashboard/home">
                            <IconHome />
                            <p>Home</p>
                        </Link>
                    </li>
                    <li
                        className={
                            url.startsWith('/dashboard/project') ? 'active' : ''
                        }>
                        <Link href="/dashboard/project">
                            <IconProject />
                            <p>Project</p>
                        </Link>
                    </li>
                    <li
                        className={
                            url.startsWith('/dashboard/task') ? 'active' : ''
                        }>
                        <Link href="/dashboard/task">
                            <IconTask />
                            <p>Task</p>
                        </Link>
                    </li>

                    <li
                        className={
                            url.startsWith('/dashboard/calendar')
                                ? 'active'
                                : ''
                        }>
                        <Link href="/dashboard/calendar">
                            <IconCalendar />
                            <p>Calendar</p>
                        </Link>
                    </li>

                    <li
                        className={
                            url.startsWith('/dashboard/reports') ? 'active' : ''
                        }>
                        <Link href="/dashboard/reports">
                            <IconReport />

                            <p>Reports</p>
                        </Link>
                    </li>
                    {/* <li
                                className={
                                    url.startsWith('/dashboard/chat') ? 'active' : ''
                                }
                            >
                                <Link to = "/dashboard/chat">
                                    <svg
                                        width="35"
                                        height="35"
                                        viewBox="0 0 35 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M27.7083 15.3125V8.75004C27.7083 7.13921 26.4025 5.83337 24.7917 5.83337H7.29167C5.68084 5.83337 4.375 7.13921 4.375 8.75004V20.1631C4.375 21.7739 5.68084 23.0798 7.29167 23.0798H9.57428V29.1667L15.6612 23.0798H16.0417M23.5711 26.8207L27.3755 30.625V26.8207H27.7083C29.3192 26.8207 30.625 25.5149 30.625 23.904V18.9584C30.625 17.3475 29.3192 16.0417 27.7083 16.0417H18.9583C17.3475 16.0417 16.0417 17.3475 16.0417 18.9584V23.904C16.0417 25.5149 17.3475 26.8207 18.9583 26.8207H23.5711Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p>Chat</p>
                                </Link>
                            </li> */}
                    <div className="box-active" />
                </ul>
            </nav>

            <div className="menu menu-bot">
                <nav>
                    <ul>
                        {/* <li
                                    id="toggle-dark-mode"
                                    onClick={toggleDarkMode}
                                >
                                    <a>
                                        <svg />
                                        <p>{theme}</p>
                                    </a>
                                </li> */}
                        <li>
                            <Link href={'/setting/system'}>
                                <IconSetting />
                                <p>Setting</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
