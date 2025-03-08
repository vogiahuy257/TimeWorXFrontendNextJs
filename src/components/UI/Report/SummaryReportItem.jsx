import { memo, useState } from 'react';

const SummaryReportItem = memo(({ report, onView, onDownload, onDelete }) => {
    const [loadingId, setLoadingId] = useState(null);

    const handleAction = async (action, reportId) => {
        setLoadingId(reportId);
        await action(reportId);
        setLoadingId(null);
    };

    return (
        <div className="mb-3 flex items-center justify-between p-4 border bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
            {/* Thông tin báo cáo */}
            <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <ViewIcon />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">{report.name}</h3>
                    <p className="text-sm text-gray-500">📅 Ngày: {report.report_date}</p>
                </div>
            </div>

            {/* Hành động */}
            <div className="flex items-center gap-3">
                <ActionButton
                    onClick={() => handleAction(onView, report.summary_report_id)}
                    isLoading={loadingId === report.summary_report_id}
                    label="Xem"
                    icon={<ViewIcon />}
                    bgColor="bg-blue-500 hover:bg-blue-600"
                />
                <ActionButton
                    onClick={() => handleAction(onDownload, report.summary_report_id)}
                    isLoading={loadingId === report.summary_report_id}
                    label="Tải xuống"
                    icon={<DownloadIcon />}
                    bgColor="bg-green-500 hover:bg-green-600"
                />
                <ActionButton
                    onClick={() => handleAction(onDelete, report.summary_report_id)}
                    isLoading={loadingId === report.summary_report_id}
                    label="Xóa"
                    icon={<DeleteIcon />}
                    bgColor="bg-red-500 hover:bg-red-600"
                />
            </div>
        </div>
    );
}, (prevProps, nextProps) => prevProps.report.summary_report_id === nextProps.report.summary_report_id);

export default SummaryReportItem;

// Button component tối ưu
const ActionButton = ({ onClick, isLoading, label, icon, bgColor }) => (
    <button
        onClick={onClick}
        disabled={isLoading}
        className={`flex items-center gap-2 ${bgColor} text-white px-3 py-1.5 rounded-lg transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {isLoading ? <Spinner /> : icon}
        {label}
    </button>
);

// Icon components
const ViewIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
);
const DownloadIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);
const DeleteIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        <line x1="10" y1="11" x2="10" y2="17"/>
        <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
);

// Spinner component (nếu cần hiệu ứng loading)
const Spinner = () => (
    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
);
