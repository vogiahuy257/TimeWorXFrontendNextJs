
const MenuMeeting = ({ handleOpenFormCreateMeeting }) => {
    return (
        <div className="flex justify-center meeting-header w-full items-center p-3">
                    <h1 className="text-meeting text-base font-base py-1 px-2 rounded-md">
                        Your Meeting
                    </h1>
                    <button
                        onClick={handleOpenFormCreateMeeting}
                        className="ml-auto rounded-full flex justify-center items-center btn-add-meeting p-1"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 6L12 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M18 12L6 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
    )
}

export default MenuMeeting
