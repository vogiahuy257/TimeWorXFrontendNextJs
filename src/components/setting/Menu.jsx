import Link from "next/link"

const Menu = ({pathname, handleGoBack}) => {
  return (
    <nav className="fixed z-50 bottom-8 right-8 flex flex-col gap-2">
        <button
            onClick={handleGoBack}
            className="btn-menu-home fixed top-8 right-8 group flex items-center justify-start w-[58px] h-[58px] rounded-xl 
            bg-black text-white shadow-md transition-all duration-300 hover:w-[142px] active:scale-95 active:bg-gray-700"
            aria-label="Dashboard"
        >
            <svg 
                className="absolute left-1/2 -translate-x-1/2 transition-transform duration-300 group-hover:-translate-x-0 group-hover:left-4 "
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="28px"
                fill="currentColor"
            >
                <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z"/>
            </svg>

            {/* Chữ trượt từ từ hiện ra bên phải */}
            <span className="ml-12 opacity-0 transition-all duration-300 ease-in-out transform translate-x-2 group-hover:translate-x-0 group-hover:opacity-100">
                Dashboard
            </span>
        </button>

      <Link
        href="/setting/system"
        className={`btn-setting group relative flex flex-col items-center justify-center w-[58px] h-[58px] rounded-xl shadow-md transition-colors 
          ${pathname === "/setting/system" ? "active" : ""} 
          `}
        aria-label="System Settings"
      >
        <svg
          className="transition-transform group-hover:-translate-y-1"
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          fill="currentColor"
        >
          <path d="M240-160q-33 0-56.5-23.5T160-240q0-33 23.5-56.5T240-320q33 0 56.5 23.5T320-240q0 33-23.5 56.5T240-160Zm0-240q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm0-240q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Zm240 0q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm240 0q-33 0-56.5-23.5T640-720q0-33 23.5-56.5T720-800q33 0 56.5 23.5T800-720q0 33-23.5 56.5T720-640ZM480-400q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm40 200v-66q0-8 3-15.5t9-13.5l209-208q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L655-172q-6 6-13.5 9t-15.5 3h-66q-17 0-28.5-11.5T520-200Zm300-223-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/>
        </svg>
        <p className="absolute bottom-2 opacity-0 text-xs font-semibold transition-opacity group-hover:opacity-100">
          System
        </p>
      </Link>

      <Link
        href="/setting/user"
        className={`btn-setting group relative flex flex-col items-center justify-center w-[58px] h-[58px] rounded-xl shadow-md transition-colors 
          ${pathname === "/setting/user" ? "active" : ""} 
        `}
        aria-label="User Settings"
      >
        <svg
          className={`transition-transform group-hover:-translate-y-1`}
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          fill="currentColor"
        >
          <path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-240v-32q0-33 17-62t47-44q58-29 120-45.5T391-440q17 0 28.5 12t11.5 29q0 17-11.5 28.5T391-359q-56 0-108.5 14T180-306q-10 5-15 14t-5 20v32h231q17 0 28.5 11.5T431-200q0 17-11.5 28.5T391-160H160q-33 0-56.5-23.5T80-240Zm554 88-6-28q-12-5-22.5-10.5T584-204l-29 9q-13 4-25.5-1T510-212l-8-14q-7-12-5-26t13-23l22-19q-2-14-2-26t2-26l-22-19q-11-9-13-22.5t5-25.5l9-15q7-11 19-16t25-1l29 9q11-8 21.5-13.5T628-460l6-29q3-14 13.5-22.5T672-520h16q14 0 24.5 9t13.5 23l6 28q12 5 22.5 11t21.5 15l27-9q14-5 27 0t20 17l8 14q7 12 5 26t-13 23l-22 19q2 12 2 25t-2 25l22 19q11 9 13 22.5t-5 25.5l-9 15q-7 11-19 16t-25 1l-29-9q-11 8-21.5 13.5T732-180l-6 29q-3 14-13.5 22.5T688-120h-16q-14 0-24.5-9T634-152Zm46-88q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z"/>
        </svg>
        <p className={`opacity-0 absolute bottom-2 text-xs font-semibold transition-opacity group-hover:opacity-100`}>
          User
        </p>
      </Link>
    </nav>
  )
}

export default Menu
