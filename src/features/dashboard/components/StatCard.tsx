import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: LucideIcon
}

export default function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  const isPositive = trend === 'up' && change > 0 || trend === 'down' && change < 0

  return (
    <div className="bg-surface rounded-xl border border-border p-6 hover:shadow-lg transition-shadow relative">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary mb-3 break-all pr-9">{title}</p>
          <p className="text-3xl font-bold text-main break-all">{value}</p>
        </div>
        <div className={cn(
          'p-2 rounded-lg absolute right-6',
          isPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
        )}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex items-center gap-1 mt-4">
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 text-success" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-error" />
        )}
        <span className={cn(
          'text-sm font-medium',
          isPositive ? 'text-success' : 'text-error'
        )}>
          {Math.abs(change)}%
        </span>
        <span className="text-sm text-secondary ml-1">vs last month</span>
      </div>
    </div>
  )
}
