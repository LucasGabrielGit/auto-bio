import type { AxiosInstance } from "axios"
import axios from "axios"

export const useHttpClient = () => {
    const apiPrivate: AxiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
        },
    })


    apiPrivate.interceptors.request.use((config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })


    return {
        apiPrivate,
    }
}