import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/__layout')({
    component: AdminLayout,
})

function AdminLayout() {
    return <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange storageKey="vite-ui-theme">
        <Header />
        <main className="flex flex-col items-center justify-center gap-4 p-12">
            <Outlet />
        </main>
    </ThemeProvider>
}
