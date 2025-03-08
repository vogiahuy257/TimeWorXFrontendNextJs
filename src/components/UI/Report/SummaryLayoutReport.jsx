export default function SummaryLayoutReport({handleOpenForm,searchTerm,children,setSearchTerm}) {
    return (
        <section className="custom-sumary-report h-[536px] flex flex-col relative p-3">
            {/* nút bấm mở formSummaryReport */}
            <div className="flex justify-end items-center gap-2 mb-3">

                <div className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                    <input
                        type="text"
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="outline-none bg-transparent text-sm"
                    />
                </div>

                <button
                    onClick={handleOpenForm}
                    className="bg-black text-white px-2 py-1 transition duration-200 ease-in-out hover:bg-gray-700 active:bg-blue-500 rounded-md flex justify-center items-center gap-1"
                >
                    <p>Create</p>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.2192 14.9993H15.0005M15.0005 14.9993H10.7817M15.0005 14.9993V19.218M15.0005 14.9993L15.0005 10.7806M26.25 7.96873L26.25 22.0313C26.25 24.3612 24.3612 26.25 22.0312 26.25H7.96875C5.6388 26.25 3.75 24.3612 3.75 22.0313V7.96873C3.75 5.63879 5.6388 3.75 7.96875 3.75H22.0313C24.3612 3.75 26.25 5.63879 26.25 7.96873Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>

            <div className="w-full h-auto bg-while overflow-y-auto  max-h-[480px] scrollbar-hide rounded-md">
                    {children}
            </div>
        </section>
    )
}