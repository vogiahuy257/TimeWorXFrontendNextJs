'use client'
import { useState,useEffect } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import Dashboard from '@/components/setting/Dashboard'
import Loading from '../loading'

const pageSystemSetting = () => {
    const { updateSettings, settings } = useAuthContext()
    const [isLoading, setIsLoading] = useState(true)
    const [theme, setTheme] = useState(settings?.color_system || 'light-mode')
    const [language, setLanguage] = useState(settings?.language || 'vi')
    const [screen_mode, setScreenMode] = useState(settings?.screen_mode || 'full')

    useEffect(() => {
        if (settings) {
            setTheme(settings.color_system || 'light-mode')
            setLanguage(settings.language || 'vi')
            setScreenMode(settings.screen_mode || 'full')
            setIsLoading(false)
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

    const handleScreenMode = (e) => {
        const mode = e.target.value
        setScreenMode(mode)
    
        // Gửi yêu cầu cập nhật lên server nếu cần
        updateSettings({ screen_mode: mode },true)
    }
    

    if (isLoading) {
        return (
            <Loading content={"loading setting system..."}/>
        )
    }

    return (
        <div className='animate-fade-in scrollbar-hide w-full max-w-[700px] m-auto h-full flex flex-col justify-center items-center'>
            <Dashboard
                theme={theme}
                screen_mode={screen_mode}
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
                        <option value="pink-mode">Pink Mode</option>
                        <option value="blue-mode">Blue Mode</option>
                        <option value="sunset-mode">Sunset Mode</option>
                        <option value="cyber-mode">Cyber Mode</option> 
                    </select>

                    {/* Chọn Screen Mode */}
                    <span className="text-base">Screen Mode:</span>
                    <select
                        value={screen_mode}
                        onChange={handleScreenMode}
                        className="text-sm w-auto rounded-md h-auto cursor-pointer"
                    >
                        <option value="default">Default</option>
                        <option value="full">Full Screen</option>
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
                        <option value="jp">Japanese</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default pageSystemSetting
