'use client'
import Menu from "@/components/setting/Menu"
import { usePathname, useRouter } from "next/navigation"
import { AuthProvider, useAuthContext } from "@/hooks/context/AuthContext"
import './css/setting.css'
import { useEffect } from "react"

const LayoutComponent = ({ children }) => {
    const { user,settings } = useAuthContext()
    const pathname = usePathname()
    const router = useRouter()

    // Kiểm tra nếu chưa đăng nhập, chuyển hướng đến trang login
    useEffect(() => {
        if (user === null) {
            router.push('/login')
        }
    }, [user])

    const handleGoBack = () => {
        router.back()
      }

    return (
        <section id="setting" className={`${settings?.color_system} scrollbar-hide overflow-auto w-full h-screen`}>
                <Menu pathname={pathname} handleGoBack={handleGoBack} />
                {children}
        </section>
    )
}

// Dùng AuthProvider để cung cấp `user`, `settings`, `updateSettings` cho toàn bộ app
const Layout = ({ children }) => (
    <AuthProvider>
        <LayoutComponent>{children}</LayoutComponent>
    </AuthProvider>
)

export default Layout
