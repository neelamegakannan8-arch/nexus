import { useState } from 'react'
import { Plus, Edit, Trash2, Users as UsersIcon, Building2, Layers } from 'lucide-react'
import { Organization, OrganizationFormData, Department } from '../types'
import OrganizationModal from '../components/OrganizationModal'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'

const mockOrganizations: Organization[] = [
  { id: '1', name: 'Acme Corporation', domain: 'acme.com', status: 'active', userCount: 150, departmentCount: 8, createdAt: '2024-01-15' },
  { id: '2', name: 'Tech Solutions Inc', domain: 'techsolutions.io', status: 'active', userCount: 85, departmentCount: 5, createdAt: '2024-02-20' },
  { id: '3', name: 'Global Industries', domain: 'globalind.com', status: 'inactive', userCount: 200, departmentCount: 12, createdAt: '2024-03-10' },
  { id: '4', name: 'Startup Labs', domain: 'startuplabs.co', status: 'active', userCount: 45, departmentCount: 4, createdAt: '2024-04-05' },
]

const mockDepartments: Department[] = [
  { id: '1', name: 'Engineering', head: 'John Smith', userCount: 50 },
  { id: '2', name: 'Marketing', head: 'Sarah Johnson', userCount: 25 },
  { id: '3', name: 'Sales', head: 'Mike Wilson', userCount: 30 },
  { id: '4', name: 'HR', head: 'Emily Brown', userCount: 10 },
  { id: '5', name: 'Finance', head: 'David Lee', userCount: 15 },
]

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations)
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null)
  const [deletingOrg, setDeletingOrg] = useState<Organization | null>(null)
  const [activeTab, setActiveTab] = useState<'organizations' | 'departments'>('organizations')

  const handleAddOrg = (data: OrganizationFormData) => {
    const newOrg: Organization = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      userCount: 0,
      departmentCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setOrganizations([...organizations, newOrg])
  }

  const handleEditOrg = (data: OrganizationFormData) => {
    if (editingOrg) {
      setOrganizations(organizations.map((o) => (o.id === editingOrg.id ? { ...o, ...data } : o)))
    }
  }

  const handleDeleteOrg = () => {
    if (deletingOrg) {
      setOrganizations(organizations.filter((o) => o.id !== deletingOrg.id))
      setIsDeleteModalOpen(false)
      setDeletingOrg(null)
    }
  }

  const openEditModal = (org: Organization) => {
    setEditingOrg(org)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (org: Organization) => {
    setDeletingOrg(org)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-2 max-sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-main">Organizations</h1>
          <p className="text-secondary mt-1">Manage organizations and teams</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Organization
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab('organizations')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'organizations'
              ? 'text-primary border-b-2 border-primary'
              : 'text-secondary hover:text-main'
          }`}
        >
          Organizations
        </button>
        <button
          onClick={() => setActiveTab('departments')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'departments'
              ? 'text-primary border-b-2 border-primary'
              : 'text-secondary hover:text-main'
          }`}
        >
          Departments
        </button>
      </div>

      {activeTab === 'organizations' ? (
        /* Organizations Table */
        <div className="bg-surface rounded-xl border border-border overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Domain</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Departments</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {organizations.map((org) => (
                <tr key={org.id} className="hover:bg-background transition-colors cursor-pointer" onClick={() => setSelectedOrg(org)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-main">{org.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary">{org.domain}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 text-secondary" />
                      <span className="text-main">{org.userCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-secondary" />
                      <span className="text-main">{org.departmentCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      org.status === 'active' ? 'bg-success/10 text-success' : 'bg-secondary/10 text-secondary'
                    }`}>
                      {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{org.createdAt}</td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(org)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-secondary" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(org)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-error" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Departments Table */
        <div className="bg-surface rounded-xl border border-border overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Department Head</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Users</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4 font-medium text-main">{dept.name}</td>
                  <td className="px-6 py-4 text-secondary">{dept.head}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 text-secondary" />
                      <span className="text-main">{dept.userCount}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <OrganizationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddOrg}
        title="Add New Organization"
      />
      <OrganizationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditOrg}
        initialData={editingOrg || undefined}
        title="Edit Organization"
      />
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteOrg}
        userName={deletingOrg?.name || ''}
      />
    </div>
  )
}
