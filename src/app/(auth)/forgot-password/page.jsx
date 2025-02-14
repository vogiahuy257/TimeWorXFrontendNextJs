'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useState } from 'react'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import '@/app/(auth)/css/forgotpassword.css'

const Page = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard/home',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <section id="login" className="forgot-password">
            <div className="block relative">
                <Link
                    className="btn-back absolute -top-[46px] left-0 shadow"
                    href="/login"
                >
                    back
                </Link>
                <div className="block-text">
                    <p>
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </p>
                </div>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

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

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    <div className="block-button">
                        <Button className={'button'}>
                            Email Password Reset Link
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Page
