export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  department: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
}

export type UserFormData = Omit<User, 'id' | 'lastLogin'>
