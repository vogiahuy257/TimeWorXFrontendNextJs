import { createContext, useContext } from 'react'

// Tạo Context
const AuthContext = createContext(null);

// Provider để bao bọc toàn bộ app
export const AuthProvider = ({ user, children }) => {
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

// Hook tiện dụng để truy cập user
export const useAuthContext = () => useContext(AuthContext)
