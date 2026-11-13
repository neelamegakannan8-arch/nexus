export interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: Permissions
}

export interface Permissions {
  dashboard: { view: boolean; create: boolean; edit: boolean; delete: boolean }
  analytics: { view: boolean; create: boolean; edit: boolean; delete: boolean }
  users: { view: boolean; create: boolean; edit: boolean; delete: boolean }
  reports: { view: boolean; create: boolean; edit: boolean; delete: boolean }
  roles: { view: boolean; create: boolean; edit: boolean; delete: boolean }
  organizations: { view: boolean; create: boolean; edit: boolean; delete: boolean }
  settings: { view: boolean; create: boolean; edit: boolean; delete: boolean }
}

export type RoleFormData = Omit<Role, 'id' | 'userCount'>
