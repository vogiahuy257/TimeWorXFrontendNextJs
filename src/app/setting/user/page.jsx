'use client'
import { useAuthContext } from '@/hooks/context/AuthContext'
import { useState, useEffect } from 'react'
import Avatar from '@/components/Avatar'
import ConfirmationForm from '@/components/ConfirmationForm'
import EditableEmail from './EditableEmail'
import Loading from '../loading'
import UpdatePasswordForm from './UpdatePasswordForm'
import Image from 'next/image'
import axios from '@/libs/axios'
import EditableName from './EditableName'

const PageUserSetting = () => {
    const { user } = useAuthContext()
    const [name, setName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [email, setEmail] = useState("")
    const [googleId, setGoogleId] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showConfirm, setShowConfirm] = useState(null)

    // sửa form delete accout cần phải tạo form cho người dùng nhập pass gửi request tới frontend

    useEffect(() => {
        if (user) {
            setName(user.name || "")
            setProfilePicture(user.profile_picture || "")
            setEmail(user.email || "")
            setIsLoading(false)
            setGoogleId(user.google_id || false)
        }
    }, [user])

    const handleLinkAccount = () => {
        // TODO: Gọi API để liên kết tài khoản Google
        console.log("Gọi API liên kết tài khoản Google")
        setGoogleId(true) // Giả lập liên kết thành công
    }

    const savePassword = async (currentPassword, newPassword) => {
        console.log(currentPassword)
        console.log(newPassword)
        // try {
        //     const response = await axios.post("/api/change-password", {
        //       currentPassword,
        //       newPassword,
        //     });
        
        //     return response.data; 
        //   } catch (error) {
        //     // Lấy thông báo lỗi từ backend
        //     throw new Error(error.response?.data?.message || "Failed to update password");
        //   }
      };

    const onNameChange = async (newName) => {
        // TODO: Gọi API để cập nhật tên
        console.log("Gọi API cập nhật tên")
        console.log(newName)
    }
    const onSaveEmail = async (newEmail) => {
        // TODO: Gọi API để lưu email
        console.log('update new email')
        console.log(newEmail)
    }

    const handleDeleteAccount = async () => {
        console.log('delete submit!!!')
        // try {
        //     const response = await axios.delete('/api/delete-account', {
        //         data: { userId: user.id }
        //     });

        //     if (response.status === 200) {
        //         alert('Your account has been deleted successfully.');
        //         // TODO: Xử lý đăng xuất hoặc chuyển hướng trang sau khi xóa tài khoản
        //     } else {
        //         alert('Failed to delete account.');
        //     }
        // } catch (error) {
        //     console.error('Error deleting account:', error);
        //     alert('An error occurred while deleting the account.');
        // }
    }

    const handleClose = async (isConfirmed) => {
        setShowConfirm(false); // Đóng modal trước
    
        if (isConfirmed) {
            await handleDeleteAccount(); // Chỉ xóa tài khoản nếu người dùng chọn Yes
        }
    };

    // chưa truyền đúng biến có confirm
    const handleDeleteClick = async () => {
        setShowConfirm(true)
    }    

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setProfilePicture(imageUrl)
            // TODO: Upload file lên server nếu cần
        }
    }

    if (isLoading) {
        return (
            <Loading content={'loading setting system...'}/>
        )
    }

    return (
        <div className="animate-fade-in py-32 scrollbar-hide w-full max-w-[540px] m-auto flex flex-col justify-center items-center">
            
            <div className="box-setting shadow-xl rounded-md w-full h-72 relative sm:h-44">
                <Avatar
                    name={name}
                    src={profilePicture}
                    size={120}
                    className="box-avatar relative -top-[80px] rounded-full flex justify-center"
                    onImageUpload={handleImageUpload}
                >
                    <EditableName name={name} onNameChange={onNameChange}/>
                </Avatar>
                <EditableEmail
                    email={email}
                    onSaveEmail={onSaveEmail}
                />
            </div>

            <div className='box-setting shadow-xl p-4 rounded-md w-full h-auto mt-12 relative flex flex-col justify-center items-start'>
                <h1 className='box-header rounded-t-md'>Update password</h1>
                <p className='text-xs'>Ensure your password is strong and secure to protect your account.</p>
                <UpdatePasswordForm
                    savePassword={savePassword}
                />
            </div>

            <div className='box-setting shadow-xl p-4 rounded-md w-full h-auto mt-12 relative flex flex-col justify-center items-start'>
                <h1 className='box-header rounded-t-md'>Linked account</h1>
                <p className="text-sm font-medium mb-2">Linked Google:</p>
                <div className="flex items-center h-full gap-3">
                    <button
                        className={`flex items-center gap-3 px-5 py-2 border rounded-lg shadow-md transition
                                    ${googleId ? 'bg-gray-800 text-white cursor-not-allowed' 
                                            : 'bg-black text-white hover:bg-gray-800 active:scale-95'}`}
                        onClick={handleLinkAccount}
                        disabled={googleId} // Disable button when already linked
                    >
                        <Image src="/image/Googlelogo.png" width={20} height={20} alt="Google Logo" />
                        <span className="font-medium text-xs">Link with Google</span>
                    </button>

                    {googleId && (
                        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                            <span className='text-xs'>You are linked to Google</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor">
                                <path d="m438-454.63-56.33-55.57q-11.71-11.71-29.05-11.71t-29.82 12.48q-11.71 11.71-11.71 29.43t11.71 29.43l83.13 83.14q13.68 13.67 32.07 13.67t32.07-13.67L637.2-534.57q12.47-12.47 12.09-29.43-.38-16.96-12.09-29.43-12.48-12.48-29.82-12.86-17.34-.38-29.81 12.09L438-454.63ZM320.26-84.02l-57.28-97.05-108.81-23.76q-16.91-3.47-27.22-17.65-10.32-14.17-8.32-31.32l11-111.57-74.04-85.04Q44.15-463.09 44.15-480t11.44-29.59l74.04-85.04-11-111.57q-2-17.15 8.32-31.32 10.31-14.18 27.22-17.65l108.81-23.76 57.28-97.05q8.96-14.67 24.99-19.89 16.03-5.22 31.95 1.5L480-850.85l102.8-43.52q15.92-6.72 31.95-1.5t24.99 19.89l57.28 97.05 108.81 23.76q16.91 3.47 27.22 17.65 10.32 14.17 8.32 31.32l-11 111.57 74.04 85.04q11.44 12.68 11.44 29.59t-11.44 29.59l-74.04 85.04 11 111.57q2 17.15-8.32 31.32-10.31 14.18-27.22 17.65l-108.81 23.76-57.28 97.05q-8.96 14.67-24.99 19.89-16.03 5.22-31.95-1.5L480-109.15 377.2-65.63q-15.92 6.72-31.95 1.5t-24.99-19.89Zm58.94-81.57L480-209.35l102.8 43.76 55.29-95.04 108.56-25.52-9.52-111.05 72.8-82.8-72.8-84.8 9.52-111.05-108.56-23.52-57.29-95.04L480-750.65l-102.8-43.76-55.29 95.04-108.56 23.52 9.52 111.05-72.8 84.8 72.8 82.8-9.52 113.05 108.56 23.52 57.29 95.04ZM480-480Z"/>
                            </svg>
                        </div>
                    )}
                </div>
            </div>

            <div className='box-setting shadow-xl p-4 rounded-md w-full h-auto mt-12 relative flex flex-col justify-center items-start'>
                <h1 className='box-header rounded-t-md'>Delete account</h1>
                <p className="text-sm text-gray-600 mb-3">This action is permanent and cannot be undone.</p>
                <button 
                    className="px-5 py-2 text-white bg-red-600 border gap-2 border-red-700 flex justify-center items-center rounded-lg shadow-md 
                            hover:bg-red-700 transition active:scale-95 focus:ring-2 focus:ring-red-400"
                    onClick={handleDeleteClick} // Gọi hàm xác nhận xóa tài khoản
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="M277.37-111.87q-37.78 0-64.39-26.61t-26.61-64.39v-514.5q-19.15 0-32.33-13.17-13.17-13.18-13.17-32.33t13.17-32.33q13.18-13.17 32.33-13.17H354.5q0-19.15 13.17-32.33 13.18-13.17 32.33-13.17h159.52q19.15 0 32.33 13.17 13.17 13.18 13.17 32.33h168.61q19.15 0 32.33 13.17 13.17 13.18 13.17 32.33t-13.17 32.33q-13.18 13.17-32.33 13.17v514.5q0 37.78-26.61 64.39t-64.39 26.61H277.37Zm405.26-605.5H277.37v514.5h405.26v-514.5ZM398.57-280.24q17.95 0 30.29-12.34 12.34-12.33 12.34-30.29v-274.74q0-17.96-12.34-30.29-12.34-12.34-30.29-12.34-17.96 0-30.42 12.34-12.45 12.33-12.45 30.29v274.74q0 17.96 12.45 30.29 12.46 12.34 30.42 12.34Zm163.1 0q17.96 0 30.3-12.34 12.33-12.33 12.33-30.29v-274.74q0-17.96-12.33-30.29-12.34-12.34-30.3-12.34-17.95 0-30.41 12.34-12.46 12.33-12.46 30.29v274.74q0 17.96 12.46 30.29 12.46 12.34 30.41 12.34Zm-284.3-437.13v514.5-514.5Z"/></svg>
                    <span className="font-medium text-xs">Delete Account</span>
                </button>
            </div>
            {showConfirm && (
                <ConfirmationForm
                        type="help"
                        styleToBox="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                        styleToChildren="text-md"
                        handleConfirm={handleClose}
                    >
                        Are you sure you want to delete your account? <p className='text-sm'>This action is permanent and cannot be undone.</p>
                </ConfirmationForm>
            )}
        </div>
    )
}

export default PageUserSetting
