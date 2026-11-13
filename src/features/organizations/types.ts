export interface Organization {
  id: string
  name: string
  domain: string
  status: 'active' | 'inactive'
  userCount: number
  departmentCount: number
  createdAt: string
}

export interface Department {
  id: string
  name: string
  head: string
  userCount: number
}

export type OrganizationFormData = Omit<Organization, 'id' | 'userCount' | 'departmentCount' | 'createdAt'>
