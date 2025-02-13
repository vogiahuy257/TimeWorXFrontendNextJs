
import Link from 'next/link'
import AvatarDropdown from './AvatarDropdown'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import '@/app/css/dashboard.css'

const AuthenticatedLayout = ({ user , children}) => {

    const [darkMode, setDarkMode] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }
    
    const url = usePathname()

    return (
        <section id="dashboard" className={darkMode ? "dark-mode" : ""}>
            <div className="block">
                <div className="block-menu-top">
                    <div className="block-notification">
                        <a href="#">
                            <svg
                                width="22"
                                height="26"
                                viewBox="0 0 22 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.66667 23.1136C8.55126 23.8203 9.71941 24.25 11 24.25C12.2806 24.25 13.4487 23.8203 14.3333 23.1136M1.63454 19.4772C1.10753 19.4772 0.813175 18.6493 1.13197 18.1893C1.8717 17.1219 2.58569 15.5564 2.58569 13.6712L2.6162 10.9396C2.6162 5.86431 6.36976 1.75 11 1.75C15.6984 1.75 19.5073 5.92492 19.5073 11.0749L19.4768 13.6712C19.4768 15.5694 20.1661 17.1434 20.8758 18.2112C21.1823 18.6724 20.8872 19.4772 20.3667 19.4772H1.63454Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    </div>
                    <AvatarDropdown user={user}/>
                </div>

                <div className={"block-menu-left" + (expanded ? " expanded" : "")}>
                    <div className="menu-top">
                        <button
                            onClick={() => {
                                setExpanded(!expanded)
                            }}
                        >
                            <svg
                                width="35"
                                height="35"
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
                        </button>
                    </div>

                    <nav className="menu menu-mid">
                        <ul>
                            <li
                                className={
                                    url.startsWith('/dashboard/home') ? 'active' : ''
                                }
                            >
                                <Link href="/dashboard/home">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M23.75 3.75C25.1307 3.75 26.25 4.85395 26.25 6.21575L26.25 10.4249C26.25 11.7867 25.1307 12.8907 23.75 12.8907H20C18.6193 12.8907 17.5 11.7867 17.5 10.4249L17.5 6.21575C17.5 4.85395 18.6193 3.75 20 3.75L23.75 3.75Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6.25 3.75C4.86929 3.75 3.75 4.85395 3.75 6.21575L3.75001 10.4249C3.75001 11.7867 4.8693 12.8907 6.25001 12.8907H10C11.3807 12.8907 12.5 11.7867 12.5 10.4249L12.5 6.21575C12.5 4.85395 11.3807 3.75 10 3.75L6.25 3.75Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M23.75 17.1094C25.1307 17.1094 26.25 18.2133 26.25 19.5751V23.7842C26.25 25.146 25.1307 26.25 23.75 26.25H20C18.6193 26.25 17.5 25.146 17.5 23.7842L17.5 19.5751C17.5 18.2133 18.6193 17.1094 20 17.1094H23.75Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6.25001 17.1094C4.8693 17.1094 3.75001 18.2133 3.75001 19.5751L3.75001 23.7842C3.75001 25.146 4.8693 26.25 6.25001 26.25H10C11.3807 26.25 12.5 25.146 12.5 23.7842L12.5 19.5751C12.5 18.2133 11.3807 17.1094 10 17.1094H6.25001Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li
                                className={
                                    url.startsWith('/dashboard/project') ? 'active' : ''
                                }
                            >
                                <Link href="/dashboard/project">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.00129 10.5209L3.00116 22.9263C3.00115 24.0308 3.89659 24.9263 5.00116 24.9263L24.9996 24.9263C26.1041 24.9263 26.9995 24.0309 26.9996 22.9264L27 9.76556C27 9.21327 26.5523 8.76553 26 8.76553H15.1046L11.6483 5.07349H4.00038C3.44794 5.07349 3.00017 5.52073 3.00035 6.07316C3.00073 7.24866 3.0013 9.20589 3.00129 10.5209Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p>Project</p>
                                </Link>
                            </li>
                            <li
                                className={
                                    url.startsWith('/dashboard/task') ? 'active' : ''
                                }
                            >
                                <Link href="/dashboard/task">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 35 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.2505 10.5H22.7505M12.2505 15.75H22.7505M12.2505 21H17.5005M9.62513 3.5H25.3755C27.3085 3.5 28.8755 5.06704 28.8755 7.00007L28.8751 28.0001C28.875 29.933 27.308 31.5 25.375 31.5L9.62498 31.4999C7.69199 31.4999 6.12499 29.9329 6.125 27.9999L6.12514 6.99998C6.12515 5.06699 7.69215 3.5 9.62513 3.5Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p>Task</p>
                                </Link>
                            </li>

                            <li
                                className={
                                   url.startsWith('/dashboard/calendar') ? 'active' : ''
                                }
                            >
                                <Link href='/dashboard/calendar'>
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2.875 9.51423H29.125M6.26786 -1V1.74318M25.375 -1V1.74284M31 6.54285V26.2C31 28.851 28.7614 31 26 31H6C3.23858 31 1 28.851 1 26.2V6.54284C1 3.89188 3.23858 1.74284 6 1.74284H26C28.7614 1.74284 31 3.89188 31 6.54285Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p>Calendar</p>
                                </Link>
                            </li>

                            <li
                                className={
                                   url.startsWith('/dashboard/reports') ? 'active' : ''
                                }
                            >
                                <Link href = "/dashboard/reports">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.6998 21.6001H5.69979C4.37431 21.6001 3.2998 20.5256 3.2998 19.2001L3.2999 4.80013C3.29991 3.47466 4.37442 2.40015 5.6999 2.40015H16.5002C17.8256 2.40015 18.9002 3.47466 18.9002 4.80015V9.60015M7.50018 7.20015H14.7002M7.50018 10.8001H14.7002M14.7002 15.5541V18.4985C14.7002 19.9534 16.2516 21.2879 17.7065 21.2879C19.1615 21.2879 20.7002 19.9535 20.7002 18.4985V14.7793C20.7002 14.009 20.2574 13.2273 19.2723 13.2273C18.2186 13.2273 17.7065 14.009 17.7065 14.7793V18.3435M7.50018 14.4001H11.1002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

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
                                <li
                                    id="toggle-dark-mode"
                                    onClick={toggleDarkMode}
                                >
                                    <a>
                                        <svg></svg>
                                        <p>{darkMode ? 'Dark' : 'Light'}</p>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <svg
                                            width="35"
                                            height="35"
                                            viewBox="0 0 35 35"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20.5966 4.71762H19.5966V4.76749L19.6016 4.81712L20.5966 4.71762ZM20.5966 4.7176H21.5966V4.66772L21.5916 4.61809L20.5966 4.7176ZM20.653 5.28196L19.658 5.38146V5.38146L20.653 5.28196ZM23.9096 6.63086L24.5428 7.40482L24.5428 7.40482L23.9096 6.63086ZM24.3485 6.27174L23.7153 5.49779L23.7153 5.49779L24.3485 6.27174ZM27.0292 6.40544L26.3221 7.11255L26.3221 7.11255L27.0292 6.40544ZM28.5943 7.97054L29.3014 7.26343L29.3014 7.26343L28.5943 7.97054ZM28.5943 7.97055L29.3014 7.26345V7.26345L28.5943 7.97055ZM29.5259 9.26776L30.5246 9.21795L29.5259 9.26776ZM28.728 10.6512L29.502 11.2845V11.2845L28.728 10.6512ZM28.3688 11.0902L27.5949 10.457L27.5949 10.457L28.3688 11.0902ZM29.7178 14.3468L29.6182 15.3418H29.6182L29.7178 14.3468ZM30.2822 14.4032L30.3817 13.4082H30.3817L30.2822 14.4032ZM31.8246 14.8173L32.5661 14.1463L32.5661 14.1463L31.8246 14.8173ZM31.8246 20.1826L32.5661 20.8537L32.5661 20.8536L31.8246 20.1826ZM30.2822 20.5967V21.5967H30.3321L30.3817 21.5918L30.2822 20.5967ZM30.2822 20.5967V19.5967H30.2323L30.1827 19.6017L30.2822 20.5967ZM29.7183 20.6531L29.6188 19.6581H29.6188L29.7183 20.6531ZM28.3694 23.9097L29.1434 23.2764L28.3694 23.9097ZM28.7281 24.348L27.9541 24.9813H27.9541L28.7281 24.348ZM28.5944 27.0287L29.3015 27.7358H29.3015L28.5944 27.0287ZM27.0293 28.5938L26.3222 27.8867L26.3222 27.8867L27.0293 28.5938ZM25.7321 29.5254L25.7819 30.5242H25.7819L25.7321 29.5254ZM24.3486 28.7275L23.7153 29.5015L23.7153 29.5015L24.3486 28.7275ZM23.9097 28.3684L24.5429 27.5944H24.5429L23.9097 28.3684ZM21.4509 27.038L21.0683 26.1141L21.0683 26.1141L21.4509 27.038ZM20.6531 29.7173L19.6581 29.6178V29.6178L20.6531 29.7173ZM20.5966 30.2823L19.6016 30.1828L19.5966 30.2324V30.2823H20.5966ZM20.5966 30.2823L21.5916 30.3818L21.5966 30.3322V30.2823H20.5966ZM20.1825 31.8247L20.8535 32.5662L20.8535 32.5662L20.1825 31.8247ZM14.8172 31.8247L14.1461 32.5662L14.1461 32.5662L14.8172 31.8247ZM14.4031 30.2823L15.3981 30.1828L14.4031 30.2823ZM14.3466 29.7179L13.3516 29.8174V29.8174L14.3466 29.7179ZM11.0901 28.369L11.7233 29.1429V29.1429L11.0901 28.369ZM10.651 28.7282L11.2843 29.5021L10.651 28.7282ZM9.26757 29.5261L9.21775 30.5248H9.21776L9.26757 29.5261ZM7.97035 28.5945L7.26325 29.3016L7.26325 29.3016L7.97035 28.5945ZM6.40526 27.0294L7.11236 26.3223L7.11236 26.3223L6.40526 27.0294ZM6.27155 24.3487L7.04551 24.9819L7.04551 24.9819L6.27155 24.3487ZM6.63073 23.9097L5.85678 23.2765L5.85677 23.2765L6.63073 23.9097ZM5.28182 20.6532L5.38133 19.6581H5.38133L5.28182 20.6532ZM4.71749 20.5967L4.817 19.6017L4.76737 19.5967H4.71749V20.5967ZM4.71748 20.5967L4.61797 21.5918L4.6676 21.5967H4.71748V20.5967ZM3.17505 20.1826L3.9165 19.5116H3.9165L3.17505 20.1826ZM3.17505 14.8173L2.4336 14.1463L2.4336 14.1463L3.17505 14.8173ZM4.7175 14.4032L4.817 15.3982H4.817L4.7175 14.4032ZM5.28237 14.3467L5.18287 13.3517H5.18287L5.28237 14.3467ZM7.96166 13.5489L8.88554 13.9315V13.9315L7.96166 13.5489ZM6.63128 11.0902L7.40524 10.4569L6.63128 11.0902ZM6.27162 10.6506L5.49766 11.2838H5.49766L6.27162 10.6506ZM6.40532 7.96988L7.11243 8.67699L6.40532 7.96988ZM7.97042 6.40478L7.26331 5.69768H7.26331L7.97042 6.40478ZM9.26763 5.47321L9.31745 6.47197H9.31745L9.26763 5.47321ZM10.6511 6.27108L10.0179 7.04504H10.0179L10.6511 6.27108ZM11.0901 6.63029L11.7234 5.85633L11.7234 5.85633L11.0901 6.63029ZM14.3467 5.28138L13.3517 5.18188V5.18188L14.3467 5.28138ZM14.4031 4.71762L15.3981 4.81712V4.81712L14.4031 4.71762ZM14.8172 3.17517L14.1461 2.43372L14.1461 2.43372L14.8172 3.17517ZM20.1825 3.17517L19.5115 3.91663V3.91663L20.1825 3.17517ZM21.5966 4.71762V4.7176H19.5966V4.71762H21.5966ZM21.6481 5.18246L21.5916 4.61812L19.6016 4.81712L19.658 5.38146L21.6481 5.18246ZM21.8336 7.03737C22.0075 7.10939 21.9629 7.25101 21.8757 6.90434C21.7881 6.55625 21.7331 6.03303 21.6481 5.18245L19.658 5.38146C19.7363 6.16443 19.8038 6.86635 19.9361 7.39228C20.0688 7.91963 20.3415 8.58412 21.0682 8.88513L21.8336 7.03737ZM23.2763 5.85691C22.6148 6.39821 22.2059 6.7293 21.8978 6.91351C21.591 7.09697 21.6597 6.96534 21.8336 7.03737L21.0682 8.88513C21.7949 9.18614 22.4576 8.9091 22.9243 8.63002C23.3897 8.35169 23.9338 7.9031 24.5428 7.40482L23.2763 5.85691ZM23.7153 5.49779L23.2763 5.85691L24.5428 7.40482L24.9818 7.0457L23.7153 5.49779ZM25.7818 4.47511C25.307 4.45143 24.9226 4.62191 24.6165 4.81279C24.3346 4.98857 24.0275 5.24236 23.7153 5.49779L24.9817 7.0457C25.3353 6.75642 25.5275 6.60167 25.6747 6.50989C25.7977 6.43322 25.7721 6.47711 25.6822 6.47263L25.7818 4.47511ZM27.7363 5.69834C27.4511 5.41311 27.1707 5.13002 26.9077 4.92707C26.6221 4.70667 26.2566 4.49879 25.7818 4.47511L25.6822 6.47263C25.5922 6.46814 25.5712 6.42192 25.6859 6.51045C25.8232 6.61642 25.9991 6.78952 26.3221 7.11255L27.7363 5.69834ZM29.3014 7.26343L27.7363 5.69834L26.3221 7.11255L27.8872 8.67765L29.3014 7.26343ZM29.3014 7.26345L29.3014 7.26343L27.8872 8.67765L27.8872 8.67766L29.3014 7.26345ZM30.5246 9.21795C30.501 8.74319 30.2931 8.37762 30.0727 8.09202C29.8697 7.82901 29.5866 7.54867 29.3014 7.26345L27.8872 8.67766C28.2102 9.00069 28.3833 9.17653 28.4893 9.31386C28.5778 9.42858 28.5316 9.40749 28.5271 9.31757L30.5246 9.21795ZM29.502 11.2845C29.7574 10.9723 30.0112 10.6652 30.187 10.3833C30.3778 10.0771 30.5483 9.6927 30.5246 9.21795L28.5271 9.31757C28.5226 9.22765 28.5665 9.20207 28.4899 9.32504C28.3981 9.47223 28.2433 9.66442 27.954 10.018L29.502 11.2845ZM29.1428 11.7234L29.502 11.2845L27.954 10.018L27.5949 10.457L29.1428 11.7234ZM27.9623 13.1662C28.0344 13.3401 27.9027 13.4087 28.0862 13.1019C28.2704 12.7939 28.6015 12.385 29.1428 11.7234L27.5949 10.457C27.0966 11.066 26.648 11.61 26.3697 12.0755C26.0906 12.5422 25.8136 13.2049 26.1146 13.9316L27.9623 13.1662ZM29.8173 13.3517C28.9667 13.2667 28.4435 13.2117 28.0954 13.1241C27.7487 13.0369 27.8903 12.9923 27.9623 13.1662L26.1146 13.9316C26.4156 14.6583 27.0801 14.931 27.6074 15.0637C28.1334 15.196 28.8353 15.2635 29.6182 15.3418L29.8173 13.3517ZM30.3817 13.4082L29.8173 13.3517L29.6182 15.3418L30.1827 15.3982L30.3817 13.4082ZM32.5661 14.1463C32.2471 13.7938 31.8547 13.6425 31.5033 13.561C31.1797 13.486 30.783 13.4483 30.3817 13.4082L30.1827 15.3982C30.6372 15.4437 30.8826 15.4702 31.0515 15.5094C31.1927 15.5421 31.1436 15.555 31.0832 15.4883L32.5661 14.1463ZM33.0832 16.3933C33.0832 15.9899 33.0851 15.5915 33.0426 15.262C32.9965 14.9042 32.885 14.4987 32.5661 14.1463L31.0832 15.4883C31.0228 15.4215 31.0405 15.3739 31.0591 15.5177C31.0812 15.6897 31.0832 15.9364 31.0832 16.3933H33.0832ZM33.0832 18.6066V16.3933H31.0832V18.6066H33.0832ZM32.5661 20.8536C32.885 20.5012 32.9965 20.0957 33.0426 19.7379C33.0851 19.4084 33.0832 19.01 33.0832 18.6066H31.0832C31.0832 19.0635 31.0812 19.3102 31.0591 19.4823C31.0405 19.626 31.0228 19.5784 31.0832 19.5116L32.5661 20.8536ZM30.3817 21.5918C30.7831 21.5516 31.1797 21.5139 31.5033 21.4389C31.8547 21.3574 32.2471 21.2061 32.5661 20.8537L31.0832 19.5116C31.1436 19.4449 31.1927 19.4578 31.0515 19.4906C30.8826 19.5297 30.6373 19.5562 30.1827 19.6017L30.3817 21.5918ZM30.2822 21.5967H30.2822V19.5967H30.2822V21.5967ZM29.8178 21.6481L30.3817 21.5918L30.1827 19.6017L29.6188 19.6581L29.8178 21.6481ZM27.9629 21.8336C27.8909 22.0075 27.7493 21.963 28.0959 21.8758C28.444 21.7882 28.9672 21.7332 29.8178 21.6481L29.6188 19.6581C28.8358 19.7364 28.1339 19.8039 27.608 19.9362C27.0806 20.0689 26.4161 20.3416 26.1151 21.0683L27.9629 21.8336ZM29.1434 23.2764C28.602 22.6148 28.271 22.206 28.0867 21.8979C27.9033 21.5911 28.0349 21.6598 27.9629 21.8336L26.1151 21.0683C25.8141 21.795 26.0912 22.4577 26.3702 22.9244C26.6486 23.3898 27.0972 23.9339 27.5954 24.5429L29.1434 23.2764ZM29.502 23.7148L29.1434 23.2764L27.5954 24.5429L27.9541 24.9813L29.502 23.7148ZM30.5247 25.7813C30.5484 25.3066 30.3779 24.9221 30.187 24.616C30.0112 24.3341 29.7575 24.027 29.502 23.7148L27.9541 24.9813C28.2434 25.3349 28.3981 25.527 28.4899 25.6742C28.5666 25.7972 28.5227 25.7716 28.5272 25.6817L30.5247 25.7813ZM29.3015 27.7358C29.5867 27.4506 29.8698 27.1703 30.0727 26.9073C30.2931 26.6217 30.501 26.2561 30.5247 25.7813L28.5272 25.6817C28.5317 25.5918 28.5779 25.5707 28.4894 25.6854C28.3834 25.8227 28.2103 25.9986 27.8873 26.3216L29.3015 27.7358ZM27.7364 29.3009L29.3015 27.7358L27.8873 26.3216L26.3222 27.8867L27.7364 29.3009ZM25.7819 30.5242C26.2566 30.5005 26.6222 30.2926 26.9078 30.0722C27.1708 29.8692 27.4512 29.5862 27.7364 29.3009L26.3222 27.8867C25.9991 28.2098 25.8233 28.3829 25.686 28.4888C25.5712 28.5774 25.5923 28.5311 25.6822 28.5266L25.7819 30.5242ZM23.7153 29.5015C24.0275 29.7569 24.3347 30.0107 24.6165 30.1865C24.9227 30.3774 25.3071 30.5478 25.7819 30.5242L25.6822 28.5266C25.7722 28.5222 25.7977 28.5661 25.6748 28.4894C25.5276 28.3976 25.3354 28.2429 24.9818 27.9536L23.7153 29.5015ZM23.2764 29.1424L23.7153 29.5015L24.9818 27.9536L24.5429 27.5944L23.2764 29.1424ZM21.8336 27.9619C21.6597 28.0339 21.5911 27.9023 21.8979 28.0858C22.206 28.27 22.6148 28.6011 23.2764 29.1424L24.5429 27.5944C23.9339 27.0962 23.3898 26.6476 22.9244 26.3692C22.4577 26.0902 21.795 25.8131 21.0683 26.1141L21.8336 27.9619ZM21.6481 29.8168C21.7332 28.9662 21.7882 28.443 21.8758 28.0949C21.963 27.7483 22.0075 27.8899 21.8336 27.9619L21.0683 26.1141C20.3416 26.4152 20.0689 27.0796 19.9362 27.607C19.8039 28.1329 19.7364 28.8348 19.6581 29.6178L21.6481 29.8168ZM21.5916 30.3818L21.6481 29.8168L19.6581 29.6178L19.6016 30.1828L21.5916 30.3818ZM21.5966 30.2823V30.2823H19.5966V30.2823H21.5966ZM20.8535 32.5662C21.206 32.2472 21.3573 31.8549 21.4388 31.5034C21.5138 31.1798 21.5515 30.7832 21.5916 30.3818L19.6016 30.1828C19.5561 30.6374 19.5296 30.8827 19.4904 31.0517C19.4577 31.1928 19.4448 31.1437 19.5115 31.0833L20.8535 32.5662ZM18.6065 33.0833C19.0099 33.0833 19.4083 33.0852 19.7378 33.0428C20.0956 32.9967 20.5011 32.8852 20.8535 32.5662L19.5115 31.0833C19.5783 31.0229 19.6259 31.0407 19.4821 31.0592C19.3101 31.0813 19.0634 31.0833 18.6065 31.0833V33.0833ZM16.3931 33.0833H18.6065V31.0833H16.3931V33.0833ZM14.1461 32.5662C14.4986 32.8852 14.9041 32.9967 15.2619 33.0428C15.5914 33.0852 15.9898 33.0833 16.3931 33.0833V31.0833C15.9363 31.0833 15.6896 31.0813 15.5175 31.0592C15.3738 31.0407 15.4214 31.0229 15.4882 31.0833L14.1461 32.5662ZM13.408 30.3818C13.4482 30.7832 13.4859 31.1798 13.5609 31.5034C13.6424 31.8548 13.7937 32.2472 14.1461 32.5662L15.4882 31.0833C15.5549 31.1437 15.542 31.1928 15.5092 31.0517C15.47 30.8827 15.4436 30.6374 15.3981 30.1828L13.408 30.3818ZM13.3516 29.8174L13.408 30.3818L15.3981 30.1828L15.3417 29.6184L13.3516 29.8174ZM13.1661 27.9625C12.9922 27.8904 13.0368 27.7488 13.124 28.0955C13.2115 28.4436 13.2665 28.9668 13.3516 29.8174L15.3417 29.6184C15.2634 28.8354 15.1958 28.1335 15.0635 27.6076C14.9309 27.0802 14.6582 26.4157 13.9315 26.1147L13.1661 27.9625ZM11.7233 29.1429C12.3849 28.6016 12.7938 28.2705 13.1018 28.0863C13.4086 27.9029 13.34 28.0345 13.1661 27.9625L13.9315 26.1147C13.2048 25.8137 12.5421 26.0907 12.0754 26.3698C11.6099 26.6482 11.0658 27.0967 10.4568 27.595L11.7233 29.1429ZM11.2843 29.5021L11.7233 29.1429L10.4568 27.595L10.0178 27.9542L11.2843 29.5021ZM9.21776 30.5248C9.69251 30.5485 10.077 30.378 10.3831 30.1871C10.665 30.0114 10.9721 29.7576 11.2843 29.5021L10.0178 27.9542C9.66423 28.2435 9.47204 28.3983 9.32485 28.49C9.20188 28.5667 9.22746 28.5228 9.31738 28.5273L9.21776 30.5248ZM7.26325 29.3016C7.54847 29.5868 7.82882 29.8699 8.09182 30.0729C8.37743 30.2933 8.743 30.5011 9.21775 30.5248L9.31739 28.5273C9.40731 28.5318 9.42839 28.578 9.31366 28.4895C9.17634 28.3835 9.00049 28.2104 8.67746 27.8874L7.26325 29.3016ZM5.69815 27.7365L7.26325 29.3016L8.67746 27.8874L7.11236 26.3223L5.69815 27.7365ZM4.47492 25.782C4.4986 26.2567 4.70649 26.6223 4.92688 26.9079C5.12983 27.1709 5.41293 27.4513 5.69815 27.7365L7.11236 26.3223C6.78933 25.9993 6.61623 25.8234 6.51026 25.6861C6.42173 25.5714 6.46795 25.5924 6.47244 25.6824L4.47492 25.782ZM5.4976 23.7155C5.24217 24.0277 4.98838 24.3348 4.8126 24.6167C4.62172 24.9228 4.45124 25.3072 4.47492 25.782L6.47244 25.6824C6.47692 25.7723 6.43303 25.7979 6.5097 25.6749C6.60149 25.5277 6.75623 25.3355 7.04551 24.9819L5.4976 23.7155ZM5.85677 23.2765L5.4976 23.7155L7.04551 24.9819L7.40469 24.5429L5.85677 23.2765ZM7.03723 21.8337C6.96521 21.6598 7.09684 21.5912 6.91338 21.898C6.72917 22.206 6.39808 22.6149 5.85678 23.2765L7.40469 24.5429C7.90296 23.9339 8.35156 23.3899 8.62989 22.9244C8.90897 22.4577 9.186 21.795 8.88499 21.0683L7.03723 21.8337ZM5.18232 21.6482C6.03289 21.7333 6.55612 21.7882 6.9042 21.8758C7.25087 21.963 7.10926 22.0076 7.03723 21.8337L8.88499 21.0683C8.58398 20.3416 7.9195 20.0689 7.39215 19.9363C6.86622 19.8039 6.16429 19.7364 5.38133 19.6581L5.18232 21.6482ZM4.61799 21.5918L5.18232 21.6482L5.38133 19.6581L4.817 19.6017L4.61799 21.5918ZM4.71748 21.5967H4.71749V19.5967H4.71748V21.5967ZM2.4336 20.8536C2.75256 21.2061 3.14494 21.3574 3.49637 21.4389C3.81999 21.5139 4.21661 21.5516 4.61797 21.5918L4.81698 19.6017C4.36242 19.5562 4.1171 19.5297 3.94813 19.4906C3.80696 19.4578 3.85609 19.4449 3.9165 19.5116L2.4336 20.8536ZM1.9165 18.6066C1.9165 19.01 1.91456 19.4084 1.95703 19.7379C2.00314 20.0957 2.11464 20.5012 2.4336 20.8536L3.9165 19.5116C3.97692 19.5784 3.95914 19.626 3.94062 19.4823C3.91845 19.3102 3.9165 19.0635 3.9165 18.6066H1.9165ZM1.9165 16.3933V18.6066H3.9165V16.3933H1.9165ZM2.4336 14.1463C2.11464 14.4987 2.00314 14.9042 1.95703 15.262C1.91456 15.5915 1.9165 15.9899 1.9165 16.3933H3.9165C3.9165 15.9364 3.91845 15.6897 3.94062 15.5177C3.95914 15.3739 3.97692 15.4215 3.9165 15.4883L2.4336 14.1463ZM4.61799 13.4082C4.21663 13.4483 3.82 13.486 3.49638 13.561C3.14494 13.6425 2.75256 13.7938 2.4336 14.1463L3.9165 15.4883C3.85609 15.555 3.80696 15.5421 3.94813 15.5094C4.11711 15.4702 4.36243 15.4437 4.817 15.3982L4.61799 13.4082ZM5.18287 13.3517L4.61799 13.4082L4.817 15.3982L5.38188 15.3417L5.18287 13.3517ZM7.03778 13.1662C7.10981 12.9923 7.25142 13.0368 6.90475 13.124C6.55667 13.2116 6.03344 13.2666 5.18287 13.3517L5.38188 15.3417C6.16484 15.2634 6.86677 15.1959 7.3927 15.0636C7.92004 14.9309 8.58453 14.6582 8.88554 13.9315L7.03778 13.1662ZM5.85732 11.7234C6.39862 12.385 6.72971 12.7938 6.91393 13.1019C7.09739 13.4087 6.96575 13.3401 7.03778 13.1662L8.88554 13.9315C9.18655 13.2048 8.90951 12.5421 8.63043 12.0754C8.3521 11.61 7.90351 11.0659 7.40524 10.4569L5.85732 11.7234ZM5.49766 11.2838L5.85732 11.7234L7.40524 10.4569L7.04558 10.0173L5.49766 11.2838ZM4.47499 9.21728C4.45131 9.69204 4.62179 10.0765 4.81267 10.3826C4.98844 10.6645 5.24224 10.9716 5.49766 11.2838L7.04558 10.0173C6.75629 9.66376 6.60155 9.47157 6.50977 9.32437C6.43309 9.20141 6.47699 9.22699 6.4725 9.31691L4.47499 9.21728ZM5.69821 7.26277C5.41299 7.548 5.1299 7.82834 4.92694 8.09135C4.70655 8.37696 4.49867 8.74253 4.47499 9.21728L6.4725 9.31691C6.46802 9.40683 6.4218 9.42792 6.51033 9.31319C6.6163 9.17586 6.7894 9.00002 7.11243 8.67699L5.69821 7.26277ZM7.26331 5.69768L5.69821 7.26277L7.11243 8.67699L8.67752 7.11189L7.26331 5.69768ZM9.21782 4.47445C8.74306 4.49813 8.3775 4.70601 8.09189 4.92641C7.82888 5.12936 7.54853 5.41246 7.26331 5.69768L8.67752 7.11189C9.00056 6.78886 9.1764 6.61576 9.31373 6.50979C9.42846 6.42126 9.40737 6.46748 9.31745 6.47197L9.21782 4.47445ZM11.2843 5.49712C10.9722 5.2417 10.665 4.98791 10.3831 4.81213C10.077 4.62125 9.69258 4.45077 9.21782 4.47445L9.31745 6.47197C9.22753 6.47645 9.20194 6.43256 9.32491 6.50923C9.4721 6.60101 9.6643 6.75575 10.0179 7.04504L11.2843 5.49712ZM11.7234 5.85633L11.2843 5.49712L10.0179 7.04504L10.4569 7.40425L11.7234 5.85633ZM13.1662 7.03679C13.3401 6.96477 13.4087 7.0964 13.1019 6.91294C12.7938 6.72873 12.385 6.39764 11.7234 5.85633L10.4569 7.40425C11.0659 7.90252 11.61 8.35112 12.0754 8.62945C12.5421 8.90853 13.2048 9.18556 13.9315 8.88455L13.1662 7.03679ZM13.3517 5.18188C13.2666 6.03245 13.2116 6.55568 13.124 6.90376C13.0368 7.25043 12.9923 7.10882 13.1662 7.03679L13.9315 8.88455C14.6582 8.58354 14.9309 7.91906 15.0636 7.39171C15.1959 6.86578 15.2634 6.16385 15.3417 5.38089L13.3517 5.18188ZM13.408 4.61811L13.3517 5.18188L15.3417 5.38089L15.3981 4.81712L13.408 4.61811ZM14.1461 2.43372C13.7937 2.75268 13.6424 3.14507 13.5609 3.4965C13.4859 3.82012 13.4482 4.21675 13.408 4.61811L15.3981 4.81712C15.4436 4.36255 15.47 4.11723 15.5092 3.94825C15.542 3.80708 15.5549 3.85621 15.4882 3.91663L14.1461 2.43372ZM16.3931 1.91663C15.9898 1.91663 15.5914 1.91468 15.2619 1.95715C14.9041 2.00326 14.4986 2.11476 14.1461 2.43372L15.4882 3.91663C15.4214 3.97704 15.3738 3.95926 15.5175 3.94074C15.6896 3.91857 15.9363 3.91663 16.3931 3.91663V1.91663ZM18.6065 1.91663H16.3931V3.91663H18.6065V1.91663ZM20.8535 2.43372C20.5011 2.11476 20.0956 2.00326 19.7378 1.95715C19.4083 1.91468 19.0099 1.91663 18.6065 1.91663V3.91663C19.0634 3.91663 19.3101 3.91857 19.4821 3.94074C19.6259 3.95926 19.5783 3.97704 19.5115 3.91663L20.8535 2.43372ZM21.5916 4.61809C21.5515 4.21674 21.5138 3.82011 21.4388 3.49649C21.3573 3.14506 21.206 2.75268 20.8535 2.43372L19.5115 3.91663C19.4448 3.85621 19.4577 3.80709 19.4904 3.94825C19.5296 4.11723 19.5561 4.36254 19.6016 4.81711L21.5916 4.61809ZM22.3332 17.5C22.3332 20.1693 20.1692 22.3333 17.4998 22.3333V24.3333C21.2738 24.3333 24.3332 21.2739 24.3332 17.5H22.3332ZM17.4998 12.6666C20.1692 12.6666 22.3332 14.8306 22.3332 17.5H24.3332C24.3332 13.726 21.2738 10.6666 17.4998 10.6666V12.6666ZM12.6665 17.5C12.6665 14.8306 14.8305 12.6666 17.4998 12.6666V10.6666C13.7259 10.6666 10.6665 13.726 10.6665 17.5H12.6665ZM17.4998 22.3333C14.8305 22.3333 12.6665 20.1693 12.6665 17.5H10.6665C10.6665 21.2739 13.7259 24.3333 17.4998 24.3333V22.3333Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <p>Setting</p>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <section id="main">
                    <div className="content">
                        <main className='overflow-x-hidden'>
                            {children}
                        </main>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default AuthenticatedLayout