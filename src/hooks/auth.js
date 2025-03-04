import useSWR from 'swr'
import axios from '@/libs/axios'
import { useEffect} from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    //lấy thông tin user
    const {data: user, error, mutate,} = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    // lấy setting khi user được gọi
    const { data: settings, mutate: mutateSettings } = useSWR(
        user ? '/api/v1/settings' : null,
        () => axios.get('/api/v1/settings').then(res => res.data),
    )    

    // Hàm update settings
    const updateSettings = async (newSettings, optimistic = false) => {
        // Giữ giá trị cũ để rollback nếu lỗi
        const previousSettings = settings
    
        // Cập nhật UI ngay lập tức nếu là Optimistic UI
        if (optimistic) {
            mutateSettings({ ...settings, ...newSettings }, false)
        }
    
        try {
            const response = await axios.put('/api/v1/settings', newSettings)
            mutateSettings(response.data.data, false) // Cập nhật lại từ backend nếu thành công
        } catch (error) {
            console.error("Failed to update settings:", error)
    
            // Rollback UI nếu thất bại
            if (optimistic) {
                mutateSettings(previousSettings, false)
            }
        }
    }
    

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    // hàm link account
    const handleLinkGoogleAccount = async () => {
        await csrf()
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/redirect?mode=link`
    }
    
    // Hàm login với Google
    const loginWithGoogle = async () => {
        await csrf()
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/redirect?mode=login`
    }
    

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (!user) return // Nếu user chưa được load, không làm gì cả
    
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.replace(redirectIfAuthenticated) // Dùng replace để không làm kẹt trang trước đó
            return
        }
    
        if (middleware === 'auth') {
            if (!user.email_verified_at) {
                if (router.pathname !== '/verify-email') {
                    router.replace('/verify-email')
                }
            } else if (router.pathname === '/verify-email') {
                router.replace(redirectIfAuthenticated)
            }
        }
    
        if (middleware === 'auth' && error) logout()
    }, [user, error])    

    return {
        user,
        register,
        login,
        settings,
        updateSettings,
        loginWithGoogle, //login in với gg
        handleLinkGoogleAccount, //link account với gg
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}