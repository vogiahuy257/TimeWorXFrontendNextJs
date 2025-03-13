import LoadingBox from '@/components/UI/loading/LoadingBox'

export default function ReportLayout({ children, loading }) {
    return (
        <section id="report" className="rounded-lg overflow-auto scrollbar-hide">
            {loading ? <LoadingBox content={"Loading report..."} /> : children}
        </section>
    )
}
