import LoadingBox from "./LoadingBox"
const LoadingPage = ({ className, content }) => {
    return (
        <div className={`${className} fixed z-50 w-full h-full flex justify-center items-center top-0 left-0 bg-gray-900 bg-opacity-5 rounded-2xl`}>
                <LoadingBox content={content}/>
        </div>
    )
}

export default LoadingPage
