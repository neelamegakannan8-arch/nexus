import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider'
import { useTheme } from '../../providers/ThemeProvider'
import { 
  Search, 
  Bell, 
  Settings, 
  Sun, 
  Moon, 
  Monitor,
  LogOut,
  ChevronDown,
  Building2,
  Check
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, setTheme, actualTheme } = useTheme()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const themeMenuRef = useRef<HTMLDivElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  // Close either dropdown on outside click or Escape
  useEffect(() => {
    if (!showThemeMenu && !showProfileMenu) return

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (themeMenuRef.current && !themeMenuRef.current.contains(target)) setShowThemeMenu(false)
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) setShowProfileMenu(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowThemeMenu(false)
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showThemeMenu, showProfileMenu])

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between gap-3 px-6 max-sm:px-4 shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
          <input
            type="text"
            placeholder="Search... (Ctrl+K)"
            className="w-full pl-10 pr-4 sm:pr-16 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-shadow"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface border border-border rounded text-xs text-secondary max-sm:hidden">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 max-sm:gap-1">
        {/* Organization switcher */}
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-background rounded-lg transition-colors max-md:hidden">
          <Building2 className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-main">Acme Corp</span>
          <ChevronDown className="w-4 h-4 text-secondary" />
        </button>

        {/* Theme toggle */}
        <div className="relative" ref={themeMenuRef}>
          <button
            onClick={() => { setShowThemeMenu(!showThemeMenu); setShowProfileMenu(false) }}
            className="p-2 hover:bg-background rounded-lg transition-colors"
            aria-label="Change theme"
            aria-haspopup="menu"
            aria-expanded={showThemeMenu}
          >
            <span className="relative block w-5 h-5">
              <Sun
                className={cn(
                  'absolute inset-0 w-5 h-5 text-secondary transition-all duration-300',
                  actualTheme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
                )}
              />
              <Moon
                className={cn(
                  'absolute inset-0 w-5 h-5 text-secondary transition-all duration-300',
                  actualTheme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'
                )}
              />
            </span>
          </button>

          {showThemeMenu && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-40 bg-surface border border-border rounded-lg shadow-lg py-1 z-50 animate-menu-in origin-top-right"
            >
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  role="menuitemradio"
                  aria-checked={theme === value}
                  onClick={() => { setTheme(value); setShowThemeMenu(false) }}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm hover:bg-background flex items-center gap-2 transition-colors',
                    theme === value ? 'text-primary font-medium' : 'text-main'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {theme === value && <Check className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button 
         onClick={() => {
          navigate('/app/notifications')
          setShowProfileMenu(false)
          setShowThemeMenu(false)
        }} 
         className="p-2 hover:bg-background rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
        </button>

        {/* Profile */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowThemeMenu(false) }}
            className="flex items-center gap-3 px-3 py-2 hover:bg-background rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-main">{user?.name}</p>
              <p className="text-xs text-secondary">{user?.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-secondary hidden md:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg py-1 z-50 animate-menu-in origin-top-right">
              <button
                  onClick={() => {
                    navigate('/app/settings')
                    setShowProfileMenu(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-background flex items-center gap-2"
                >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <hr className="my-1 border-border" />
              <button
                onClick={logout}
                className="w-full px-4 py-2 text-left text-sm hover:bg-background text-error flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
