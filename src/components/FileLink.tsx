import axios from '@/libs/axios';

interface File {
    created_at: string;
    filer_id: number;
    project_id: number;
    type: string;
    name: string;
    path: string;
    updated_at: string;
    updated_by: number;
}

const downloadFile = async (file: File) => {
    try {
        const response = await axios.get(`/api/download-file`, {
            params: { path: file.path }, // Gửi đường dẫn file qua query string
            responseType: 'blob', // Đảm bảo file được trả về dưới dạng blob
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name); // Tên file khi tải về
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url); // Giải phóng bộ nhớ
    } catch (error) {
        console.error('Failed to download file:', error);
    }
};

interface FileLinkProps {
    file: File;
}

const FileLink: React.FC<FileLinkProps> = ({ file }) => (
    <button
        onClick={() => downloadFile(file)}
        className="flex items-center transition-colors duration-300 text-blue-600 hover:text-blue-800 hover:underline"
    >
        {file.name}
    </button>
);

export default FileLink;
