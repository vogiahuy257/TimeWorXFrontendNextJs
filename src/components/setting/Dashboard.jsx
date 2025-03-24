import './css/Dashboard.css'

const Dashboard = ({theme,screen_mode ,className}) => {
    return (
        <div className={`${className} mt-8 h-[40vh] w-full relative sm:h-1/2`}>
            <div
                id="dashboardSetting"
                className={`${theme} ${screen_mode} rounded-xl shadow-lg grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] h-full w-full`}
            >
                {/* Menu top - Full width */}
                <div className="menu-top row-start-1 col-span-2 h-12 bg-gray-200 flex items-center justify-center rounded-t-xl">
                    
                    <div className='box-button p-1 rounded-md absolute top-3 left-4'>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 35 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17.4998 31.5L29.6242 24.5V10.5L17.4998 3.5L5.37549 10.5V24.5L17.4998 31.5ZM17.4998 31.5V18.375M17.4998 18.375L6.12484 11.375M17.4998 18.375L28.8748 11.375"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Menu trái */}
                <div className="menu-left row-start-2 col-start-1 w-16 rounded-bl-xl flex items-center justify-center"/>

                {/* Content */}
                <div className="content relative row-start-2 col-start-2 flex items-center justify-center">
                    <div className='box-after w-4 h-4 absolute top-0 left-0 rounded-tl-xl'/>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-content text-center">
                        Welcome to TimeWor
                        <span className="text-X">X</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
