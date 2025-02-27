'use client'
import { useState,useEffect } from 'react'
import { useAuthContext } from '@/hooks/context/AuthContext'
import Dashboard from '@/components/setting/Dashboard'

const pageSystemSetting = () => {
    const { updateSettings, settings } = useAuthContext()
    const [theme, setTheme] = useState(settings?.color_system || 'light-mode')
    const [language, setLanguage] = useState(settings?.language || 'vi')

    useEffect(() => {
        if (settings?.color_system && settings.color_system !== theme) {
            setTheme(settings.color_system)
        }
        if (settings?.language && settings.language !== language) {
            setLanguage(settings.language)
        }
    }, [settings])

    const toggleDarkMode = (newMode) => {
        setTheme(newMode)
        // Gọi API với optimistic UI (rollback nếu thất bại)
        updateSettings({ color_system: newMode }, true)
    }
    
    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value
        setLanguage(newLanguage)
        // Gọi API với optimistic UI (rollback nếu thất bại)
        updateSettings({ language: newLanguage }, true)
    }

    return (
        <div className='animate-fade-in scrollbar-hide w-full max-w-[700px] m-auto h-full flex flex-col justify-center items-center'>
            <Dashboard
                theme={theme}
            />
            <div className='mt-2 w-[90%] h-1/2 md:w-full'>
                {/* Toggle Dark Mode */}
                <div className="box-setting rounded-b-md rounded-tr-md relative px-2 py-4 shadow-md mt-10 flex items-center space-x-3">
                    <h1 className='box-header rounded-t-md'>Interface Settings</h1>
                    <span className="text-base">Theme:</span>
                    <select
                        value={theme}
                        onChange={(e) => toggleDarkMode(e.target.value)}
                        className="text-sm w-auto rounded-md h-auto cursor-pointer"
                    >
                        <option value="light-mode">Light Mode</option>
                        <option value="dark-mode">Dark Mode</option>
                    </select>
                </div>


                <div className="box-setting rounded-b-md rounded-tr-md relative px-2 py-4 shadow-md mt-12 flex items-center space-x-3">
                    <h1 className='box-header rounded-t-md'>Text Settings</h1>
                    <label className="text-base">Language:</label>
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="text-sm w-auto rounded-md h-auto cursor-pointer"
                    >
                        <option value="vi">Vietnamese</option>
                        <option value="en">English</option>
                        <option value="ja">Japanese</option>
                        <option value="zh">Chinese</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default pageSystemSetting
