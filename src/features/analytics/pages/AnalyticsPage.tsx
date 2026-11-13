import { useState } from 'react'
import { BarChart3, Download, Calendar, Filter, Table as TableIcon } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { useChartTheme } from '@/lib/chartTheme'

const revenueData = [
  { month: 'Jan', revenue: 180000, target: 200000 },
  { month: 'Feb', revenue: 220000, target: 200000 },
  { month: 'Mar', revenue: 195000, target: 220000 },
  { month: 'Apr', revenue: 280000, target: 250000 },
  { month: 'May', revenue: 245000, target: 250000 },
  { month: 'Jun', revenue: 320000, target: 300000 },
]

const customerData = [
  { name: 'New Customers', value: 450 },
  { name: 'Returning', value: 320 },
  { name: 'Churned', value: 80 },
]

const trafficData = [
  { source: 'Direct', visitors: 45000, conversion: 3.2 },
  { source: 'Organic Search', visitors: 32000, conversion: 2.8 },
  { source: 'Social Media', visitors: 28000, conversion: 1.5 },
  { source: 'Referral', visitors: 15000, conversion: 4.1 },
  { source: 'Email', visitors: 12000, conversion: 5.2 },
]

const productData = [
  { product: 'Product A', sales: 1250, revenue: 125000, growth: 12 },
  { product: 'Product B', sales: 980, revenue: 98000, growth: 8 },
  { product: 'Product C', sales: 750, revenue: 75000, growth: -5 },
  { product: 'Product D', sales: 620, revenue: 62000, growth: 15 },
  { product: 'Product E', sales: 450, revenue: 45000, growth: 3 },
]

type AnalyticsTab = 'revenue' | 'customer' | 'traffic' | 'product'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('revenue')
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart')
  const chart = useChartTheme()

  const renderRevenueTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-xl border border-border p-6">
          <p className="text-sm text-secondary mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-main">{formatCurrency(1440000)}</p>
          <p className="text-sm text-success mt-2">+12.5% vs last period</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6">
          <p className="text-sm text-secondary mb-1">Average Order Value</p>
          <p className="text-3xl font-bold text-main">{formatCurrency(285)}</p>
          <p className="text-sm text-success mt-2">+5.2% vs last period</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6">
          <p className="text-sm text-secondary mb-1">Revenue Target</p>
          <p className="text-3xl font-bold text-main">92%</p>
          <p className="text-sm text-warning mt-2">8% below target</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-main">Revenue Trend</h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-background transition-colors">
              <Calendar className="w-4 h-4" />
              Last 6 months
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-background transition-colors">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
            <XAxis dataKey="month" stroke={chart.axis} tick={{ fill: chart.axis }} fontSize={12} />
            <YAxis stroke={chart.axis} tick={{ fill: chart.axis }} fontSize={12} tickFormatter={(value) => `$${(value / 1000)}k`} />
            <Tooltip contentStyle={chart.tooltipStyle} labelStyle={chart.tooltipLabelStyle} itemStyle={chart.tooltipItemStyle} cursor={chart.cursor} />
            <Line type="monotone" dataKey="revenue" stroke={chart.primary} strokeWidth={2} />
            <Line type="monotone" dataKey="target" stroke={chart.warning} strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )

  const renderCustomerTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-xl border border-border p-6">
          <p className="text-sm text-secondary mb-1">Total Customers</p>
          <p className="text-3xl font-bold text-main">{formatNumber(850)}</p>
          <p className="text-sm text-success mt-2">+18% vs last period</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6">
          <p className="text-sm text-secondary mb-1">New Customers</p>
          <p className="text-3xl font-bold text-main">{formatNumber(450)}</p>
          <p className="text-sm text-success mt-2">+22% vs last period</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6">
          <p className="text-sm text-secondary mb-1">Churn Rate</p>
          <p className="text-3xl font-bold text-main">9.4%</p>
          <p className="text-sm text-success mt-2">-2.1% vs last period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-main mb-6">Customer Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={customerData} cx="50%" cy="50%" outerRadius={100} label>
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chart.series[index % chart.series.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={chart.tooltipStyle} labelStyle={chart.tooltipLabelStyle} itemStyle={chart.tooltipItemStyle} cursor={chart.cursor} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {customerData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chart.series[index % chart.series.length] }} />
                <span className="text-sm text-secondary">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-main mb-6">Customer Acquisition</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="name" stroke={chart.axis} tick={{ fill: chart.axis }} fontSize={12} />
              <YAxis stroke={chart.axis} tick={{ fill: chart.axis }} fontSize={12} />
              <Tooltip contentStyle={chart.tooltipStyle} labelStyle={chart.tooltipLabelStyle} itemStyle={chart.tooltipItemStyle} cursor={chart.cursor} />
              <Bar dataKey="value" fill={chart.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )

  const renderTrafficTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface rounded-xl border border-border p-6">
          <p className="text-sm text-secondary mb-1">Total Visitors</p>
          <p className="text-3xl font-bold text-main">{formatNumber(132000)}</p>
          <p className="text-sm text-success mt-2">+15% vs last period</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6">
          <p className="text-sm text-secondary mb-1">Page Views</p>
          <p className="text-3xl font-bold text-main">{formatNumber(485000)}</p>
          <p className="text-sm text-success mt-2">+22% vs last period</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6">
          <p className="text-sm text-secondary mb-1">Bounce Rate</p>
          <p className="text-3xl font-bold text-main">42.3%</p>
          <p className="text-sm text-error mt-2">+3.2% vs last period</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6">
          <p className="text-sm text-secondary mb-1">Avg Session</p>
          <p className="text-3xl font-bold text-main">4m 32s</p>
          <p className="text-sm text-success mt-2">+12% vs last period</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-main">Traffic by Source</h2>
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-background transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trafficData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
            <XAxis type="number" stroke={chart.axis} tick={{ fill: chart.axis }} fontSize={12} />
            <YAxis dataKey="source" type="category" stroke={chart.axis} tick={{ fill: chart.axis }} fontSize={12} width={100} />
            <Tooltip contentStyle={chart.tooltipStyle} labelStyle={chart.tooltipLabelStyle} itemStyle={chart.tooltipItemStyle} cursor={chart.cursor} />
            <Bar dataKey="visitors" fill={chart.primary} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )

  const renderProductTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('chart')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'chart' ? 'bg-primary text-white' : 'border border-border hover:bg-background'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Chart
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'table' ? 'bg-primary text-white' : 'border border-border hover:bg-background'
            }`}
          >
            <TableIcon className="w-4 h-4" />
            Table
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {viewMode === 'chart' ? (
        <div className="bg-surface rounded-xl border border-border p-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="product" stroke={chart.axis} tick={{ fill: chart.axis }} fontSize={12} />
              <YAxis stroke={chart.axis} tick={{ fill: chart.axis }} fontSize={12} />
              <Tooltip contentStyle={chart.tooltipStyle} labelStyle={chart.tooltipLabelStyle} itemStyle={chart.tooltipItemStyle} cursor={chart.cursor} />
              <Bar dataKey="sales" fill={chart.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {productData.map((item) => (
                <tr key={item.product} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4 font-medium text-main">{item.product}</td>
                  <td className="px-6 py-4 text-secondary">{formatNumber(item.sales)}</td>
                  <td className="px-6 py-4 text-secondary">{formatCurrency(item.revenue)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${item.growth >= 0 ? 'text-success' : 'text-error'}`}>
                      {item.growth >= 0 ? '+' : ''}{item.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-2 max-sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-main">Analytics</h1>
          <p className="text-secondary mt-1">Detailed analytics and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors">
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border max-sm:flex-col">
        {(['revenue', 'customer', 'traffic', 'product'] as AnalyticsTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-secondary hover:text-main'
            }`}
          >
            {tab} Analytics
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'revenue' && renderRevenueTab()}
      {activeTab === 'customer' && renderCustomerTab()}
      {activeTab === 'traffic' && renderTrafficTab()}
      {activeTab === 'product' && renderProductTab()}
    </div>
  )
}
