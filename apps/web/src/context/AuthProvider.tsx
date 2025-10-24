import { useHttpClient } from '@/lib/useHttpClient'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { toast } from 'sonner'

export interface User {
    id: string
    username: string
    name: string
    role: 'admin' | 'manager' | 'employee'
}

export interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
    refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const { apiPrivate } = useHttpClient()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    // useEffect(() => {
    //     const token = localStorage.getItem("auth_token")
    //     if (!token) {
    //         if (location.pathname !== "/auth/login") {
    //             navigate({ to: "/" })
    //         }
    //         setIsLoading(false)
    //         return
    //     }

    //     const check = async () => {
    //         try {
    //             await verifyToken(token)
    //         } catch (err) {
    //             console.error("⚠️ Erro na verificação de token:", err)
    //             localStorage.removeItem("auth_token")
    //             if (location.pathname !== "/auth/login") {
    //                 navigate({ to: "/login" })
    //             }
    //         } finally {
    //             setIsLoading(false)
    //         }
    //     }

    //     check()
    // }, [])


    const verifyToken = async (token: string) => {
        try {
            const response = await apiPrivate.get("/auth/verify", {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!response.data?.valid) {
                throw new Error("Token inválido")
            }
            setUser(response.data.user)
            if (location.pathname === "/auth/login") {
                navigate({ to: "/admin/dashboard" })
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                localStorage.removeItem("auth_token")
                setUser(null)
                navigate({ to: "/" })
            }
            throw error
        }
    }


    const login = async (username: string, password: string) => {
        try {
            setIsLoading(true)
            const response = await apiPrivate.post('/auth/login', { username, password })
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token)
                console.log(response.data)
                setUser({
                    id: response.data.user.id,
                    username: response.data.user.username,
                    name: response.data.user.name,
                    role: response.data.user.role,
                })
                toast.success('Login realizado com sucesso!')

                setTimeout(() => {
                    navigate({ to: '/admin/dashboard' })
                }, 200)
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message || error.response?.data?.error || "Usuário ou senha inválidos"
                toast.error(msg)
            } else {
                console.error('Erro não-axios:', error)
                toast.error('Erro interno do sistema')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('auth_token')
        setUser(null)
        navigate({ to: '/login' })
    }

    const refreshToken = async () => {
        try {
            const token = localStorage.getItem('auth_token')
            if (!token) {
                throw new Error('Nenhum token encontrado')
            }

            const response = await apiPrivate.post('/auth/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            const data = response.data
            localStorage.setItem('auth_token', data.token)
            setUser(data.user)
        } catch (error) {
            console.error('Erro ao renovar token:', error)
            logout()
            throw error
        }
    }

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshToken,

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }

    return context
}

export const useRequireAuth = () => {
    const { isAuthenticated, isLoading } = useAuth()

    return { isAuthenticated, isLoading }
}

export const useAuthToken = () => {
    const getToken = () => localStorage.getItem('auth_token')

    const getAuthHeaders = () => {
        const token = getToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    return { getToken, getAuthHeaders }
}

