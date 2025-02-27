'use client'

import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { useState,useEffect } from 'react'
import LoadingBox from '@/components/UI/loading/LoadingBox'

const Page = () => {
    const { user,logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard/home',
    })

    const [status, setStatus] = useState(null)
    const [isChecking, setIsChecking] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false) // Vô hiệu hóa button
    const [countdown, setCountdown] = useState(0) // Bộ đếm thời gian

    useEffect(() => {
        if (user !== undefined) {
            setIsChecking(false) // Khi user đã được xác định, dừng loading
        }
    }, [user])

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setIsDisabled(false) // Hết thời gian chờ thì bật lại nút
        }
    }, [countdown])

    const handleResendEmail = () => {
        resendEmailVerification({ setStatus })
        setIsDisabled(true) // Vô hiệu hóa nút
        setCountdown(60) // Bắt đầu đếm ngược
    }

    if (isChecking || !user) {
        return <LoadingBox /> // Hiển thị loading trước khi xác định trạng thái user
    }

    if (user.email_verified_at) {
        return null // Nếu user đã xác thực email, không hiển thị form này
    }

    return (
        <section id="login">
            <div className="block">
                <div className="mb-2 text-sm text-left text-gray-800">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </div>

                {status === 'verification-link-sent' ? (
                    <div className="font-medium text-sm text-green-600">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                ) : (
                    isDisabled && (
                        <div className="font-medium text-sm text-gray-700">
                            {`We are sending the email... Please wait ${countdown}s...`}
                        </div>
                    )
                )}

                <div className="block-button mt-2">
                    <Button
                        className={'button mb-2'}
                        onClick={handleResendEmail}
                        disabled={isDisabled}
                    >
                        Resend Verification Email
                    </Button>

                    <button
                        type="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Page
