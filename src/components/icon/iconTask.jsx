export default function iconTask({ classname }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={`${classname} lucide lucide-square-check-big-icon lucide-square-check-big`}
            strokeLinejoin="round"
        >
            <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5" />
            <path d="m9 11 3 3L22 4" />
        </svg>
    )
}
