import { useQuery } from '@tanstack/react-query'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download
} from 'lucide-react'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import StatCard from '../components/StatCard'
import RevenueChart from '../components/RevenueChart'
import RevenueByCategory from '../components/RevenueByCategory'
import RecentTransactions from '../components/RecentTransactions'
import ActivityFeed from '../components/ActivityFeed'

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Mock data - replace with real API call
      return {
        totalRevenue: 2845000,
        totalUsers: 12450,
        activeCustomers: 8932,
        conversionRate: 3.2,
        monthlyGrowth: 12.5,
      }
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const kpiData = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Total Users',
      value: formatNumber(stats?.totalUsers || 0),
      change: 8.2,
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Active Customers',
      value: formatNumber(stats?.activeCustomers || 0),
      change: -2.4,
      trend: 'down',
      icon: ShoppingCart,
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      change: 0.8,
      trend: 'up',
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-2">
        <div>
          <h1 className="text-3xl font-bold text-main">Dashboard</h1>
          <p className="text-secondary mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <StatCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <RevenueByCategory />
      </div>

      {/* Tables and Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <ActivityFeed />
      </div>
    </div>
  )
}
