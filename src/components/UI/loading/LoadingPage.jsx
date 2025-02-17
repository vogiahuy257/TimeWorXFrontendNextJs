import LoadingBox from "./LoadingBox"
const LoadingPage = ({ className, content }) => {
    return (
        <div className={`${className} fixed z-50 w-screen h-screen bg-gray-700 bg-opacity-60`}>
            <div className=" relative w-full h-full">
                <LoadingBox content={content}/>
            </div>
        </div>
    )
}

export default LoadingPage
