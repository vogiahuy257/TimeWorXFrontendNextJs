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
    setModelHistorySummaryReport
}) {
    return (
        <div className="w-full report-content report-summary p-2 rounded-md shadow-md  relative">
            <h2 className="text-header">Summary Report</h2>
            <section className="custom-sumary-report h-[680px] flex flex-col relative p-3">
                {/* nút bấm mở formSummaryReport */}
                <div className="flex justify-start px-4 items-center gap-2 mt-4 mb-2">
                    <div className="flex items-center gap-2 relative">
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
                            className="outline-none rounded-full w-auto md:text-sm text-xs py-1 bg-white-css"
                        />
                    </div>

                    <button
                        onClick={handleOpenForm}
                        className="ml-auto bg-black text-white md:px-3 md:py-1 p-2 transition duration-100 ease-in-out hover:bg-gray-700 active:bg-gray-500 rounded-md flex justify-center items-center gap-1">
                        <p className='md:block hidden'>Create</p>
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
                    
                    <button
                        onClick={() => {setModelHistorySummaryReport(true)}}
                        className="md:px-3 md:py-1 p-2 bg-black text-white transition duration-100 ease-in-out hover:bg-gray-700 active:bg-gray-500 rounded-md flex justify-center items-center gap-1">
                        <p className='md:block hidden'>History</p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M480-144q-140 0-238-98t-98-238h72q0 109 77.5 186.5T480-216q109 0 186.5-77.5T744-480q0-109-77.5-186.5T480-744q-62 0-114.55 25.6Q312.91-692.8 277-648h107v72H144v-240h72v130q46-60 114.5-95T480-816q70 0 131.13 26.6 61.14 26.6 106.4 71.87 45.27 45.26 71.87 106.4Q816-550 816-480t-26.6 131.13q-26.6 61.14-71.87 106.4-45.26 45.27-106.4 71.87Q550-144 480-144Zm100-200L444-480v-192h72v162l115 115-51 51Z"/></svg>
                    </button>
                </div>

                <div className="w-full h-auto bg-while p-4 overflow-y-auto  max-h-[580px] scrollbar-hide rounded-md">
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
