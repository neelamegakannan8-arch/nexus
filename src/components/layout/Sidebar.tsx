import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Shield, 
  FileText, 
  Bell, 
  Building2, 
  Settings,
  Menu,
  X,
  Search,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/app/dashboard' },
  { icon: BarChart3, label: 'Analytics', path: '/app/analytics' },
  { icon: Users, label: 'Users', path: '/app/users' },
  { icon: Shield, label: 'Roles', path: '/app/roles' },
  { icon: FileText, label: 'Reports', path: '/app/reports' },
  { icon: Bell, label: 'Notifications', path: '/app/notifications' },
  { icon: Building2, label: 'Organizations', path: '/app/organizations' },
  { icon: Settings, label: 'Settings', path: '/app/settings' },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-overlay/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 bg-surface border-r border-border transition-all duration-300',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="font-bold text-xl text-main">Nexus</span>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-background transition-colors hidden lg:block"
            >
              {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/app/dashboard' && location.pathname.startsWith(item.path))
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary text-white shadow-glow'
                      : 'text-secondary hover:bg-background hover:text-main'
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon className={cn('w-5 h-5 flex-shrink-0', isCollapsed && 'mx-auto')} />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center')}>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">AU</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-main truncate">Admin User</p>
                  <p className="text-xs text-secondary truncate">Super Admin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  )
}
