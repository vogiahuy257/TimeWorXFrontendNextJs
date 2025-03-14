import { IconFileSelection } from '@/components/IconFileSelection'
import LoadingSmall from '@/components/UI/loading/LoadingSmall'
import NoData from '@/components/NoData'

const FileSelection = ({ loadingFile,files, selectedFiles, onChange }) => {
    const handleDivClick = (file) => {
        onChange((prev) => {
            const isSelected = prev.selectedFiles.some((f) => f.file_id === file.file_id) // Kiểm tra đúng
    
            return {
                ...prev,
                selectedFiles: isSelected
                    ? prev.selectedFiles.filter((f) => f.file_id !== file.file_id) // Bỏ chọn
                    : [...prev.selectedFiles, file ] // Thêm vào danh sách (đối tượng file)
            }
        })
    }    

    

    return (
        <div className="w-full max-w-3xl mx-auto mb-8">
            <h1 className="text-sm font-medium mb-2">
                Select Files to Include in ZIP
            </h1>
            {loadingFile ? (
                <div className='space-y-2 p-4 relative z-50'>
                    <LoadingSmall content={"Loading data files..."}/>
                </div>
            ) : (
                <ul className="space-y-2">
                    {files.length > 0 ? files.map(file => (
                        <li
                            key={file.file_id}
                            className={`flex custom-selected-checkbox items-center rounded-lg p-4 cursor-pointer  duration-200 ease-in-out ${
                                selectedFiles.some((f) => f.file_id === file.file_id)
                                    ? ' border border-blue-500'
                                    : ' border border-gray-200 hover:border-blue-300'
                            }`}
                            onClick={() => handleDivClick(file)}
                        >
                            <input
                                type="checkbox"
                                id={file.file_id}
                                name="selectedFiles"
                                value={file.file_id}
                                checked={selectedFiles.some((f) => f.file_id === file.file_id)} 
                                className={`h-4 w-4 mr-2 custom-checkbox cursor-pointer focus:ring-blue-500 border-gray-300 rounded`}
                                readOnly
                            />
                            <IconFileSelection filetype={file.type} />
                            <label className=" ml-1 text-sm font-light cursor-pointer">
                                {file.name}
                            </label>
                        </li>
                    )) : 
                    (
                        <NoData message="No available files."/>
                    )}
                </ul>
            )}
        </div>
    )
}

export default FileSelection
