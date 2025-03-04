'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams} from 'next/navigation'
import LoadingPage from '@/components/UI/loading/LoadingPage'
import Image from 'next/image'
import LoadingBox from '@/components/UI/loading/LoadingBox'
import { Suspense } from "react"

export default function LoginPage() {
    return (
        <Suspense fallback={<LoadingBox />}>
            <LoginComponent />
        </Suspense>
    )
}

const LoginComponent = () => {
    const router = useRouter()
    const { login,loginWithGoogle } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard/home',
    })
    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const searchParams = useSearchParams()
    const error = searchParams.get("error")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isloading, setIsLoading] = useState(false)

    useEffect(() => {
        if (router.query?.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
        // Xử lý thông báo lỗi khi user đã có tài khoản
        if (error === 'email-exists') {
            setErrorMessage('This email is already registered. Please log in instead.')
        }
    }, [router.query?.reset,error])

    const submitForm = async (event) => {
        event.preventDefault()
        setIsLoading(true)
    
        try {
            await login({
                email,
                password,
                remember: shouldRemember,
                setErrors,
                setStatus,
            })
        }finally {
            setIsLoading(false) // Tắt trạng thái loading dù thành công hay thất bại
        }
    }
    

    return (
        <section id="login">
            <div className="block">
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm font-base mb-4">
                        {errorMessage}
                    </div>
                )}

                {status && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-sm font-base mb-4">
                        {status}
                    </div>
                )}
                {/* text */}
                <div className="block-text">
                    <h1>Sign in</h1>
                </div>

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div
                        className={`block-element ${email ? 'focused' : ''}`}
                        data-label="Email"
                    >
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            className="input"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />
                        <InputError
                            messages={errors.email}
                            className="mt-2 text-xs text-start"
                        />
                    </div>

                    {/* Password */}
                    <div
                        className={`block-element ${password ? 'focused' : ''}`}
                        data-label="Password"
                    >
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            className="input"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <span
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16px"
                                    viewBox="0 -960 960 960"
                                    width="16px"
                                    fill="#5f6368"
                                >
                                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16px"
                                    viewBox="0 -960 960 960"
                                    width="16px"
                                    fill="#5f6368"
                                >
                                    <path d="M607-627q29 29 42.5 66t9.5 76q0 15-11 25.5T622-449q-15 0-25.5-10.5T586-485q5-26-3-50t-25-41q-17-17-41-26t-51-4q-15 0-25.5-11T430-643q0-15 10.5-25.5T466-679q38-4 75 9.5t66 42.5Zm-127-93q-19 0-37 1.5t-36 5.5q-17 3-30.5-5T358-742q-5-16 3.5-31t24.5-18q23-5 46.5-7t47.5-2q137 0 250.5 72T904-534q4 8 6 16.5t2 17.5q0 9-1.5 17.5T905-466q-18 40-44.5 75T802-327q-12 11-28 9t-26-16q-10-14-8.5-30.5T753-392q24-23 44-50t35-58q-50-101-144.5-160.5T480-720Zm0 520q-134 0-245-72.5T60-463q-5-8-7.5-17.5T50-500q0-10 2-19t7-18q20-40 46.5-76.5T166-680l-83-84q-11-12-10.5-28.5T84-820q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L624-222q-35 11-71 16.5t-73 5.5ZM222-624q-29 26-53 57t-41 67q50 101 144.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                                </svg>
                            )}
                        </span>
                        <InputError
                            messages={errors.password}
                            className="mt-2 text-xs text-start"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="block-remember-me">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="remember-me check-box"
                            checked={shouldRemember}
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />
                        <p>Remember me</p>
                    </div>

                    <div className="block-button">
                        <Button className="button" type='submit'>Log in</Button>

                        <h1>or</h1>

                        <Button
                            type='button'
                            className="button google-button"
                            onClick={loginWithGoogle}
                        >
                            <Image
                                src="/image/Googlelogo.png"
                                alt="Google Logo"
                                width={24}
                                height={24}
                                className="Google-logo"
                            />
                            Log in with Google
                        </Button>
                    </div>

                    <div className="block-button-text">
                        <Link
                            href="/forgot-password"
                            className="forgot-password-link"
                        >
                            Forgot your password?
                        </Link>
                        <p>
                            Don&#39;t have an account?{' '}
                            <Link href="/register" className="signup-link">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            {isloading && <LoadingPage />}
        </section>
    )
}
