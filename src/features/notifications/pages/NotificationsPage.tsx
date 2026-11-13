import { useState } from 'react'
import { Bell, Check, CheckCheck, Trash2, Filter, Settings as SettingsIcon } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  category: 'system' | 'user' | 'security' | 'alert'
  read: boolean
  timestamp: string
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'New user registered', message: 'John Smith has joined your organization', category: 'user', read: false, timestamp: '2 hours ago' },
  { id: '2', title: 'System update', message: 'Platform updated to version 2.5.0', category: 'system', read: false, timestamp: '5 hours ago' },
  { id: '3', title: 'Security alert', message: 'Unusual login attempt detected', category: 'security', read: false, timestamp: '1 day ago' },
  { id: '4', title: 'Report completed', message: 'Monthly revenue report is ready for download', category: 'alert', read: true, timestamp: '2 days ago' },
  { id: '5', title: 'User deactivated', message: 'Mike Wilson account has been deactivated', category: 'user', read: true, timestamp: '3 days ago' },
  { id: '6', title: 'Backup completed', message: 'Daily backup completed successfully', category: 'system', read: true, timestamp: '4 days ago' },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'system' | 'user' | 'security' | 'alert'>('all')

  const filteredNotifications = notifications.filter((n) => {
    const matchesReadStatus = filter === 'all' || (filter === 'unread' && !n.read) || (filter === 'read' && n.read)
    const matchesCategory = categoryFilter === 'all' || n.category === categoryFilter
    return matchesReadStatus && matchesCategory
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system':
        return '🔧'
      case 'user':
        return '👤'
      case 'security':
        return '🔒'
      case 'alert':
        return '🔔'
      default:
        return '📌'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'system':
        return 'bg-info/10 text-info'
      case 'user':
        return 'bg-success/10 text-success'
      case 'security':
        return 'bg-error/10 text-error'
      case 'alert':
        return 'bg-warning/10 text-warning'
      default:
        return 'bg-secondary/10 text-secondary'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-2 max-sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-main">Notifications</h1>
          <p className="text-secondary mt-1">View and manage notifications</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors">
            <SettingsIcon className="w-4 h-4" />
            Preferences
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-main">Status:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                filter === 'all' ? 'bg-primary text-white' : 'bg-background hover:bg-background/80'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                filter === 'unread' ? 'bg-primary text-white' : 'bg-background hover:bg-background/80'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                filter === 'read' ? 'bg-primary text-white' : 'bg-background hover:bg-background/80'
              }`}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm font-medium text-main">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="px-3 py-1 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              <option value="system">System</option>
              <option value="user">User</option>
              <option value="security">Security</option>
              <option value="alert">Alert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-surface rounded-xl border border-border p-12 text-center">
            <Bell className="w-16 h-16 text-secondary mx-auto mb-4" />
            <p className="text-secondary">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-surface rounded-xl border border-border p-6 transition-colors ${
                !notification.read ? 'bg-primary/5 border-primary/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{getCategoryIcon(notification.category)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${!notification.read ? 'text-main' : 'text-secondary'}`}>
                          {notification.title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${getCategoryColor(notification.category)}`}>
                          {notification.category}
                        </span>
                      </div>
                      <p className="text-secondary text-sm">{notification.message}</p>
                      <p className="text-secondary text-xs mt-2">{notification.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 hover:bg-background rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4 text-secondary" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-error" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
