import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'

export default function AppLayout() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  return (
    <div className="flex h-screen bg-background text-main">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 max-sm:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
