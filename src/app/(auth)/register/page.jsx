'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import LoadingPage from '@/components/UI/loading/LoadingPage'
import { useState } from 'react'

const Page = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard/home',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [loading,setLoading] = useState(false)

    const submitForm = async event => {
        event.preventDefault()
        setLoading(true)
        try {
            await register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
                setErrors,
            })
        }
        finally {
            setLoading(false)
        }
    }

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const togglePasswordConfirmationVisibility = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation)
    }

    return (
        <section id="login" className="register">
            {loading && <LoadingPage />}
            <div className="block">
                <div className="block-text">
                    <h1>Register</h1>
                </div>
                <form onSubmit={submitForm}>
                    {/* Name */}
                    <div
                        className={`block-element ${name ? 'focused' : ''}`}
                        data-label="Username"
                    >
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="input"
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                            aria-describedby="name-error"
                        />

                        <InputError
                            messages={errors.name}
                            className="mt-2 text-xs text-start"
                            id="name-error"
                        />
                    </div>

                    {/* Email Address */}
                    <div
                        className={`block-element ${email ? 'focused' : ''}`}
                        data-label="Email"
                    >
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="input"
                            onChange={event => setEmail(event.target.value)}
                            aria-describedby="email-error"
                            required
                        />

                        <InputError
                            messages={errors.email}
                            className="mt-2 text-xs text-start"
                            id="email-error"
                        />
                    </div>

                    {/* Password */}
                    <div
                        className={`block-element ${password ? 'focused' : ''}`}
                        data-label="password"
                    >
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            className="input"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                            aria-describedby="password-error"
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
                            id="password-error"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div
                        className={`block-element ${
                            passwordConfirmation ? 'focused' : ''
                        }`}
                        data-label="password confirmation"
                    >
                        <Input
                            id="passwordConfirmation"
                            type={
                                showPasswordConfirmation ? 'text' : 'password'
                            }
                            name="password_confirmation"
                            value={passwordConfirmation}
                            className="input"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            aria-describedby="password-confirmation-error"
                            required
                        />

                        <span
                            className="toggle-password"
                            onClick={togglePasswordConfirmationVisibility}
                        >
                            {showPasswordConfirmation ? (
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
                            messages={errors.password_confirmation}
                            className="mt-2 text-xs text-start"
                            id="password-confirmation-error"
                        />
                    </div>

                    <div className="block-button">
                        <Button className="button mt-1">Register</Button>

                        <div className="block-button-text">
                            <p>
                                You already have an account?
                                <Link href="/login" className="m-2">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Page
