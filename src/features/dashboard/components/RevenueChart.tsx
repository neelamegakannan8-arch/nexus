import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useChartTheme } from '@/lib/chartTheme'

const data = [
  { month: 'Jan', revenue: 180000 },
  { month: 'Feb', revenue: 220000 },
  { month: 'Mar', revenue: 195000 },
  { month: 'Apr', revenue: 280000 },
  { month: 'May', revenue: 245000 },
  { month: 'Jun', revenue: 320000 },
  { month: 'Jul', revenue: 290000 },
  { month: 'Aug', revenue: 350000 },
  { month: 'Sep', revenue: 310000 },
  { month: 'Oct', revenue: 380000 },
  { month: 'Nov', revenue: 340000 },
  { month: 'Dec', revenue: 420000 },
]

export default function RevenueChart() {
  const chart = useChartTheme()

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-main">Revenue Overview</h2>
          <p className="text-sm text-secondary">Monthly revenue trend</p>
        </div>
        <select className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Last 12 months</option>
          <option>Last 6 months</option>
          <option>Last 30 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
          <XAxis 
            dataKey="month" 
            stroke={chart.axis}
            tick={{ fill: chart.axis }}
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke={chart.axis}
            tick={{ fill: chart.axis }}
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1000)}k`}
          />
          <Tooltip 
            contentStyle={chart.tooltipStyle}
            labelStyle={chart.tooltipLabelStyle}
            itemStyle={chart.tooltipItemStyle}
            cursor={{ stroke: chart.grid }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
          />
          <Legend wrapperStyle={{ color: chart.axis }} />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke={chart.primary} 
            strokeWidth={2}
            dot={{ fill: chart.primary, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
