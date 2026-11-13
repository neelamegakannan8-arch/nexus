import { UserPlus, ShoppingCart, AlertCircle, CheckCircle, Clock } from 'lucide-react'

const activities = [
  { id: 1, type: 'user', message: 'New user registered', user: 'Alice Cooper', time: '5 min ago', icon: UserPlus, color: 'text-primary' },
  { id: 2, type: 'order', message: 'New order placed', user: 'Bob Martin', time: '12 min ago', icon: ShoppingCart, color: 'text-success' },
  { id: 3, type: 'alert', message: 'Payment failed', user: 'Charlie Davis', time: '25 min ago', icon: AlertCircle, color: 'text-error' },
  { id: 4, type: 'success', message: 'Order completed', user: 'Diana Prince', time: '1 hour ago', icon: CheckCircle, color: 'text-success' },
  { id: 5, type: 'pending', message: 'Order pending', user: 'Eve Adams', time: '2 hours ago', icon: Clock, color: 'text-warning' },
]

export default function ActivityFeed() {
  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-main">Recent Activity</h2>
          <p className="text-sm text-secondary">Latest system events</p>
        </div>
        <button className="text-primary text-sm font-medium hover:underline">View all</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-background rounded-lg transition-colors">
            <div className={`p-2 rounded-lg bg-background ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-main">
                <span className="font-medium">{activity.user}</span> - {activity.message}
              </p>
              <p className="text-xs text-secondary mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
