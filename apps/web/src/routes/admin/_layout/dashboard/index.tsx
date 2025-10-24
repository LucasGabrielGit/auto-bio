import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_layout/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-col">
    <h2 className='text-4xl font-bold'>Admin Dashboard</h2>
  </div>
}
