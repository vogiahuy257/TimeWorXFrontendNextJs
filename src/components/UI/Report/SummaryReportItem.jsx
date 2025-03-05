export default function SummaryReportItem({key, report, onView, onDownload, onDelete }) {
    return (
        <div key={key} className="flex items-center justify-between p-4 border bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
            {/* Thông tin báo cáo */}
            <div className="flex items-center gap-4">
                {/* Biểu tượng báo cáo */}
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                </div>

                {/* Nội dung báo cáo */}
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">{report.name}</h3>
                    <p className="text-sm text-gray-500">📅 Ngày: {report.report_date}</p>
                </div>
            </div>

            {/* Hành động */}
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => onView(report.summary_report_id)} 
                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Xem
                </button>

                <button 
                    onClick={() => onDownload(report.summary_report_id)} 
                    className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition duration-200"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Tải xuống
                </button>

                <button 
                    onClick={() => onDelete(report.summary_report_id)} 
                    className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Xóa
                </button>
            </div>
        </div>
    );
}
