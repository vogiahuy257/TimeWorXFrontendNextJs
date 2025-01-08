'use client';

import React from 'react'
import { useAuth } from '@/hooks/auth'
import AuthenticatedLayout from '@/app/(app)/AuthenticatedLayout'
import { AuthProvider } from '@/hooks/context/AuthContext'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@/app/(app)/Loading'
import '@/app/css/dashboard-report.css'
import '@/app/css/dashboard-home.css'
import '@/app/css/dashboard-task-reportform.css'
import '@/app/css/dashboard-project-showReportToTask.css'
import '@/app/css/dashboard-calendar.css'
import '@/app/css/dashboard-project-view.css'
import '@/app/css/dashboard-project.css'


const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
            <AuthenticatedLayout user={user}>
                <ToastContainer className="custom_toast"/>
                {/* Bao bọc toàn bộ ứng dụng bằng AuthProvider */}
                <AuthProvider user={user}>{children}</AuthProvider>
            </AuthenticatedLayout>
    )
}

export default AppLayout
