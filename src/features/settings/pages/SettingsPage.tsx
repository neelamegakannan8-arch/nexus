import { useState } from 'react'
import { User, Palette, Shield, Bell, Key, Save, X, Camera } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'

type SettingsTab = 'general' | 'profile' | 'appearance' | 'security' | 'notifications' | 'account'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general')
  const { theme, setTheme } = useTheme()
  const [hasChanges, setHasChanges] = useState(false)
  const [formData, setFormData] = useState({
    // Profile
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 234 567 8900',
    bio: 'Software Engineer',
    
    // Appearance
    theme: theme,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    
    // Security
    twoFactorEnabled: false,
  })

  const tabs = [
    { id: 'general' as SettingsTab, label: 'General', icon: User },
    { id: 'profile' as SettingsTab, label: 'Profile', icon: User },
    { id: 'appearance' as SettingsTab, label: 'Appearance', icon: Palette },
    { id: 'security' as SettingsTab, label: 'Security', icon: Shield },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell },
    { id: 'account' as SettingsTab, label: 'Account', icon: Key },
  ]

  const handleSave = () => {
    setHasChanges(false)
    console.log('Settings saved:', formData)
  }

  const handleCancel = () => {
    setHasChanges(false)
    // Reset to original values
  }

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-main mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-main mb-2">Language</label>
            <select className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-main mb-2">Timezone</label>
            <select className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+1 (Central European)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-main mb-2">Date Format</label>
            <select className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-main mb-4">Profile Information</h3>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center relative">
            <span className="text-3xl font-semibold text-primary">JS</span>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-hover">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-sm text-secondary mb-2">Profile picture</p>
            <button className="text-sm text-primary hover:underline">Change photo</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-main mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }); setHasChanges(true) }}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-main mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }); setHasChanges(true) }}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-main mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setHasChanges(true) }}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-main mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setHasChanges(true) }}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-main mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => { setFormData({ ...formData, bio: e.target.value }); setHasChanges(true) }}
              rows={3}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-main mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-main mb-2">Theme</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => { setTheme('light'); setFormData({ ...formData, theme: 'light' }); setHasChanges(true) }}
                className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="w-8 h-8 bg-[#F6F8FB] border-2 border-[#CBD5E1] rounded"></div>
                <span className="text-sm">Light</span>
              </button>
              <button
                onClick={() => { setTheme('dark'); setFormData({ ...formData, theme: 'dark' }); setHasChanges(true) }}
                className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="w-8 h-8 bg-[#0B1020] border-2 border-[#2E3B57] rounded"></div>
                <span className="text-sm">Dark</span>
              </button>
              <button
                onClick={() => { setTheme('system'); setFormData({ ...formData, theme: 'system' }); setHasChanges(true) }}
                className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#F6F8FB] from-50% to-[#0B1020] to-50% border-2 border-[#CBD5E1] rounded"></div>
                <span className="text-sm">System</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-main mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <p className="font-medium text-main">Two-Factor Authentication</p>
              <p className="text-sm text-secondary">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
              {formData.twoFactorEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-main mb-2">Change Password</label>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current password"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-main mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <p className="font-medium text-main">Email Notifications</p>
              <p className="text-sm text-secondary">Receive notifications via email</p>
            </div>
            <button
              onClick={() => { setFormData({ ...formData, emailNotifications: !formData.emailNotifications }); setHasChanges(true) }}
              className={`w-12 h-6 rounded-full transition-colors ${
                formData.emailNotifications ? 'bg-primary' : 'bg-border'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                formData.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <p className="font-medium text-main">Push Notifications</p>
              <p className="text-sm text-secondary">Receive push notifications in browser</p>
            </div>
            <button
              onClick={() => { setFormData({ ...formData, pushNotifications: !formData.pushNotifications }); setHasChanges(true) }}
              className={`w-12 h-6 rounded-full transition-colors ${
                formData.pushNotifications ? 'bg-primary' : 'bg-border'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                formData.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <p className="font-medium text-main">Weekly Digest</p>
              <p className="text-sm text-secondary">Receive weekly summary of activities</p>
            </div>
            <button
              onClick={() => { setFormData({ ...formData, weeklyDigest: !formData.weeklyDigest }); setHasChanges(true) }}
              className={`w-12 h-6 rounded-full transition-colors ${
                formData.weeklyDigest ? 'bg-primary' : 'bg-border'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                formData.weeklyDigest ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAccountTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-main mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="font-medium text-main mb-1">Delete Account</p>
            <p className="text-sm text-secondary mb-4">Permanently delete your account and all associated data</p>
            <button className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-main">Settings</h1>
        <p className="text-secondary mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6 max-sm:flex-col">
        {/* Sidebar Navigation */}
        <div className="w-64 max-sm:w-full flex-shrink-0">
          <nav className="bg-surface rounded-xl border border-border p-4 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-secondary hover:bg-background hover:text-main'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-surface rounded-xl border border-border p-6">
            {activeTab === 'general' && renderGeneralTab()}
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'appearance' && renderAppearanceTab()}
            {activeTab === 'security' && renderSecurityTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'account' && renderAccountTab()}

            {/* Save/Cancel Buttons */}
            {hasChanges && (
              <div className="flex gap-3 pt-6 border-t border-border mt-6">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
