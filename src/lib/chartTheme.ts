import type { CSSProperties } from 'react'
import { useTheme } from '@/providers/ThemeProvider'

/**
 * Recharts draws with SVG attributes, which cannot read Tailwind classes or CSS
 * variables reliably, so chart colors are resolved per theme here. Keep these
 * values aligned with the tokens in src/index.css.
 */
export interface ChartTheme {
  grid: string
  axis: string
  primary: string
  warning: string
  series: string[]
  tooltipStyle: CSSProperties
  tooltipLabelStyle: CSSProperties
  tooltipItemStyle: CSSProperties
  cursor: { fill: string }
}

const light: ChartTheme = {
  grid: '#E2E8F0',
  axis: '#566579',
  primary: '#4F46E5',
  warning: '#D97706',
  series: ['#4F46E5', '#16A34A', '#D97706', '#DC2626', '#8B5CF6'],
  tooltipStyle: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    boxShadow: '0 12px 28px -6px rgba(15, 23, 42, 0.15)',
  },
  tooltipLabelStyle: { color: '#0F172A', fontWeight: 600 },
  tooltipItemStyle: { color: '#566579' },
  cursor: { fill: 'rgba(15, 23, 42, 0.04)' },
}

const dark: ChartTheme = {
  grid: '#232E45',
  axis: '#98A6BC',
  primary: '#818CF8',
  warning: '#FBBF24',
  series: ['#818CF8', '#34D399', '#FBBF24', '#F87171', '#A78BFA'],
  tooltipStyle: {
    backgroundColor: '#121A2C',
    border: '1px solid #2E3B57',
    borderRadius: '8px',
    boxShadow: '0 12px 28px -6px rgba(0, 0, 0, 0.6)',
  },
  tooltipLabelStyle: { color: '#EEF2F8', fontWeight: 600 },
  tooltipItemStyle: { color: '#98A6BC' },
  cursor: { fill: 'rgba(148, 163, 184, 0.10)' },
}

export function useChartTheme(): ChartTheme {
  const { actualTheme } = useTheme()
  return actualTheme === 'dark' ? dark : light
}
