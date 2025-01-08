'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'

const LoginLinks = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <nav className="fixed w-full bg-white bg-opacity-90 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out" style={{ boxShadow: `0 0 ${scrollY / 5}px rgba(101, 172, 240,0.5)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-black"><svg className='text-logo'></svg></Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link
                  href="/dashboard/home"
                  className="btn px-4 py-2 rounded-full "
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href='/login'
                    className="btn px-4 py-2 rounded-full "
                  >
                    Log in
                  </Link>
                  <Link
                    href='/register'
                    className="btn btn-contact px-4 py-2 rounded-full"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
}

export default LoginLinks
