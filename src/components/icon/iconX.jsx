export default function IconX({
    size = 24,
    color = 'currentColor',
    className = ''
})
{
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            className={className}
            viewBox="0 -960 960 960"
            width={size}
            fill={color}
        >
            <path d="M480-429 316-265q-11 11-25 10.5T266-266q-11-11-11-25.5t11-25.5l163-163-164-164q-11-11-10.5-25.5T266-695q11-11 25.5-11t25.5 11l163 164 164-164q11-11 25.5-11t25.5 11q11 11 11 25.5T695-644L531-480l164 164q11 11 11 25t-11 25q-11 11-25.5 11T644-266L480-429Z" />
        </svg>
    )
}
