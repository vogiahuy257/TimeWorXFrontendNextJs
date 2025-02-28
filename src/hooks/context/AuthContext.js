'use client'
import { createContext, useContext , useMemo} from 'react'
import { useAuth } from '@/hooks/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const { user, settings, updateSettings,logout } = useAuth({ middleware: 'auth' })
    
    const authValue = useMemo(() => ({
        user,
        settings,
        updateSettings,
        logout
    }), [user, settings])
    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
