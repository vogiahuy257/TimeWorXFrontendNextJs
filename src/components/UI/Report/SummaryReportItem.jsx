import { memo } from 'react';
import { useRouter } from 'next/navigation';

const SummaryReportItem = memo(({ report }) => {
    const router = useRouter();

    const onView = () => {
        router.push(`/dashboard/reports/summaryReport/${report.summary_report_id}`)
    }
    return (
        <button 
            className="mb-3 w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 
                       active:scale-95"
            onClick={onView}
        >
            {/* Thông tin báo cáo */}
            <div className="flex items-center gap-4">
                <h3 className="font-semibold text-lg">{report.name}</h3>
                <p className="text-sm opacity-70">Ngày: {report.report_date}</p>
            </div>
        </button>
    );
}, (prevProps, nextProps) => prevProps.report.summary_report_id === nextProps.report.summary_report_id);

export default SummaryReportItem;
