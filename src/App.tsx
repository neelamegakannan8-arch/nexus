import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './providers/ThemeProvider'
import { AuthProvider } from './providers/AuthProvider'
import AppLayout from './layouts/AppLayout'
import LoginPage from './features/auth/pages/LoginPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import AnalyticsPage from './features/analytics/pages/AnalyticsPage'
import UsersPage from './features/users/pages/UsersPage'
import RolesPage from './features/roles/pages/RolesPage'
import ReportsPage from './features/reports/pages/ReportsPage'
import NotificationsPage from './features/notifications/pages/NotificationsPage'
import OrganizationsPage from './features/organizations/pages/OrganizationsPage'
import SettingsPage from './features/settings/pages/SettingsPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="roles" element={<RolesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="organizations" element={<OrganizationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
