import dynamic from 'next/dynamic'
import LoadingPage from '@/components/UI/loading/LoadingPage'
const SummaryReportForm = dynamic(
    () => import('@/components/UI/Report/SummaryReportForm'),
    { ssr: true, loading: () => <LoadingPage /> },
)
export default function SummaryLayoutReport({
    addNewReport,
    memoizedProjects,
    selectedProjectId,
    handleOpenForm,
    searchTerm,
    children,
    setSearchTerm,
    isOpenFormSummary,
}) {
    return (
        <div className="w-full report-content report-summary p-2 rounded-md shadow-md  relative">
            <h2 className="text-header">Summary Report</h2>
            <section className="custom-sumary-report h-[536px] flex flex-col relative p-3">
                {/* nút bấm mở formSummaryReport */}
                <div className="flex justify-end px-4 items-center gap-2 mt-4 mb-2 md:mt-0">
                    <div className="flex items-center mr-auto gap-2 relative">
                        <svg
                            className=" absolute right-2 top-1/2 -translate-y-1/2"
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="currentColor">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search reports..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="outline-none rounded-full w-auto text-sm py-1 bg-white-css"
                        />
                    </div>

                    <button
                        onClick={handleOpenForm}
                        className="bg-black text-white px-3 py-1 transition duration-100 ease-in-out hover:bg-gray-700 active:bg-blue-500 rounded-md flex justify-center items-center gap-1">
                        <p>Create</p>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.2192 14.9993H15.0005M15.0005 14.9993H10.7817M15.0005 14.9993V19.218M15.0005 14.9993L15.0005 10.7806M26.25 7.96873L26.25 22.0313C26.25 24.3612 24.3612 26.25 22.0312 26.25H7.96875C5.6388 26.25 3.75 24.3612 3.75 22.0313V7.96873C3.75 5.63879 5.6388 3.75 7.96875 3.75H22.0313C24.3612 3.75 26.25 5.63879 26.25 7.96873Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className="w-full h-auto bg-while p-4 overflow-y-auto  max-h-[480px] scrollbar-hide rounded-md">
                    {children}
                </div>
            </section>
            {isOpenFormSummary && (
                <SummaryReportForm
                    addNewReport={addNewReport}
                    projects={memoizedProjects}
                    projectIdChange={selectedProjectId}
                    handleOpenForm={handleOpenForm}
                />
            )}
        </div>
    )
}
