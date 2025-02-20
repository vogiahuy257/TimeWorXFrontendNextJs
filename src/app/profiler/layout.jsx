import { useAuth } from '@/hooks/auth'

const Layout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    
    return (
        <section>
                {children}
        </section>
    )
}

export default Layout
