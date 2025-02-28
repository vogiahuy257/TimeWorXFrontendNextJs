'use client'

import { useAuthContext, AuthProvider } from '@/hooks/context/AuthContext'
import AuthenticatedLayout from '@/app/(app)/AuthenticatedLayout'
import { ToastContainer } from 'react-toastify'
import LoadingBox from '@/components/UI/loading/LoadingBox'
import 'react-toastify/dist/ReactToastify.css'

import '@/app/css/dashboard-report.css'
import '@/app/css/dashboard-home.css'
import '@/app/css/dashboard-task-reportform.css'
import '@/app/css/dashboard-project-showReportToTask.css'
import '@/app/css/dashboard-calendar.css'
import '@/app/css/dashboard-project-view.css'
import '@/app/css/dashboard-project.css'

const AppLayout = ({ children }) => {
    return (
        <AuthProvider>
            <DashboardContent>{children}</DashboardContent>
        </AuthProvider>
    )
}

const DashboardContent = ({ children }) => {
    const { settings, logout } = useAuthContext()

    if (!settings) {
        return <LoadingBox />
    }

    return (
        <AuthenticatedLayout settings={settings} logout={logout}>
            <ToastContainer className="custom_toast" />
            {children}
        </AuthenticatedLayout>
    )
}

export default AppLayout
