import Link from 'next/link'
import ApplicationLogo from '@/components/ApplicationLogo'
import '@/app/(auth)/css/login.css'

const Layout = ({ children }) => {
    
    return (
        <div className='relative'>
            <Link
                href="/"
                className="logo shadow-md flex justify-center items-center"
            >
                <ApplicationLogo className="" />
            </Link>
            {children}
        </div>
    )
}

export default Layout
