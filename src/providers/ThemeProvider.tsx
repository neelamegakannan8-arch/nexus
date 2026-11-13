import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: ResolvedTheme
  toggleTheme: () => void
}

const STORAGE_KEY = 'theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'
// Keep in sync with --background in src/index.css
const META_COLORS: Record<ResolvedTheme, string> = { light: '#F6F8FB', dark: '#0B1020' }

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function readStoredTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : null
  } catch {
    return null
  }
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(resolved)
  root.style.colorScheme = resolved

  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'theme-color'
    document.head.appendChild(meta)
  }
  meta.content = META_COLORS[resolved]
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // No saved preference -> follow the operating system.
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme() ?? 'system')
  const [actualTheme, setActualTheme] = useState<ResolvedTheme>(() => resolveTheme(theme))

  const isFirstRender = useRef(true)
  const transitionTimer = useRef<number>()

  // Apply the theme to <html>. Animate only after the first paint.
  useEffect(() => {
    const resolved = resolveTheme(theme)
    const root = document.documentElement

    if (!isFirstRender.current) {
      root.classList.add('theme-transition')
      window.clearTimeout(transitionTimer.current)
      transitionTimer.current = window.setTimeout(() => root.classList.remove('theme-transition'), 300)
    }
    isFirstRender.current = false

    setActualTheme(resolved)
    applyTheme(resolved)
  }, [theme])

  // Follow OS changes while the user is on "system".
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia(DARK_QUERY)
    const handleChange = () => {
      const resolved = getSystemTheme()
      setActualTheme(resolved)
      applyTheme(resolved)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Keep multiple tabs in sync.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      setThemeState(readStoredTheme() ?? 'system')
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => () => window.clearTimeout(transitionTimer.current), [])

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, newTheme)
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this session.
    }
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark')
  }, [actualTheme, setTheme])

  const value = useMemo(
    () => ({ theme, setTheme, actualTheme, toggleTheme }),
    [theme, setTheme, actualTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
