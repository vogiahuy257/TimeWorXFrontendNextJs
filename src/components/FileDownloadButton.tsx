import axios from '@/libs/axios'
import { toast } from 'react-toastify'

type FileDownloadProps = {
    fileData: {
        file: File
        path: string
        isApiFile: boolean
    }
}

const FileDownloadButton: React.FC<FileDownloadProps> = ({ fileData }) => {
    const handleDownload = async () => {
        let blob: Blob

        if (fileData.isApiFile) {
            try {
                const response = await axios.get(
                    `/api/files/download?path=${fileData.path}`,
                    { responseType: 'blob' },
                )
                blob = new Blob([response.data], { type: fileData.file.type })
            } catch (error) {
                toast.error(`Download failed: ${error}`)
                return
            }
        } else {
            blob = fileData.file
        }

        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileData.file.name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    }

    return (
        <span
            onClick={handleDownload}
            className="text-blue-700 hover:underline cursor-pointer truncate max-w-xs inline-block"
            title={fileData.file.name}
        >
            {fileData.file.name}
        </span>
    )
}

export default FileDownloadButton
