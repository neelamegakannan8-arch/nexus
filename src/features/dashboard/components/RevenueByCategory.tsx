import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useChartTheme } from '@/lib/chartTheme'

const data = [
  { category: 'Electronics', value: 420000 },
  { category: 'Clothing', value: 280000 },
  { category: 'Home', value: 195000 },
  { category: 'Books', value: 120000 },
  { category: 'Sports', value: 85000 },
  { category: 'Other', value: 145000 },
]

export default function RevenueByCategory() {
  const chart = useChartTheme()

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-main">Revenue by Category</h2>
        <p className="text-sm text-secondary">Breakdown by product category</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
          <XAxis 
            dataKey="category" 
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
            cursor={chart.cursor}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
          />
          <Bar dataKey="value" fill={chart.primary} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
