'use client'

import { useAuth } from '@/hooks/auth'
import AuthenticatedLayout from '@/app/(app)/AuthenticatedLayout'
import { AuthProvider } from '@/hooks/context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '@/app/css/dashboard-report.css'
import '@/app/css/dashboard-home.css'
import '@/app/css/dashboard-task-reportform.css'
import '@/app/css/dashboard-project-showReportToTask.css'
import '@/app/css/dashboard-calendar.css'
import '@/app/css/dashboard-project-view.css'
import '@/app/css/dashboard-project.css'

const AppLayout = ({ children }) => {
    const { user,updateSettings, settings } = useAuth({ middleware: 'auth' })
    if (!settings) {
        return (
            <div className="loading-screen">
                <p>Loading settings...</p>
            </div>
        )
    }
    return (
        <AuthProvider user={user}>
            <AuthenticatedLayout settings={settings} updateSettings={updateSettings} >
                <ToastContainer className="custom_toast" />
                {/* Bao bọc toàn bộ ứng dụng bằng AuthProvider */}
                {children}
            </AuthenticatedLayout>
        </AuthProvider>
    )
}

export default AppLayout
