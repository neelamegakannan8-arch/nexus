import { useState } from 'react'
import { Plus, Edit, Trash2, Users as UsersIcon } from 'lucide-react'
import { Role, RoleFormData } from '../types'
import RoleModal from '../components/RoleModal'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    userCount: 3,
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false },
      analytics: { view: true, create: true, edit: true, delete: true },
      users: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, create: true, edit: true, delete: true },
      roles: { view: true, create: true, edit: true, delete: true },
      organizations: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, create: false, edit: true, delete: false },
    },
  },
  {
    id: '2',
    name: 'Organization Admin',
    description: 'Organization-level access',
    userCount: 5,
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false },
      analytics: { view: true, create: true, edit: true, delete: false },
      users: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, create: true, edit: true, delete: true },
      roles: { view: true, create: false, edit: false, delete: false },
      organizations: { view: true, create: false, edit: true, delete: false },
      settings: { view: true, create: false, edit: true, delete: false },
    },
  },
  {
    id: '3',
    name: 'Manager',
    description: 'Department management access',
    userCount: 12,
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false },
      analytics: { view: true, create: false, edit: false, delete: false },
      users: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, create: true, edit: true, delete: false },
      roles: { view: false, create: false, edit: false, delete: false },
      organizations: { view: true, create: false, edit: false, delete: false },
      settings: { view: true, create: false, edit: false, delete: false },
    },
  },
  {
    id: '4',
    name: 'Analyst',
    description: 'Analytics and reports access',
    userCount: 8,
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false },
      analytics: { view: true, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
      reports: { view: true, create: true, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false },
      organizations: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    },
  },
  {
    id: '5',
    name: 'Viewer',
    description: 'Read-only access',
    userCount: 25,
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false },
      analytics: { view: true, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
      reports: { view: true, create: false, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false },
      organizations: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    },
  },
]

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [deletingRole, setDeletingRole] = useState<Role | null>(null)

  const handleAddRole = (data: RoleFormData) => {
    const newRole: Role = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      userCount: 0,
    }
    setRoles([...roles, newRole])
  }

  const handleEditRole = (data: RoleFormData) => {
    if (editingRole) {
      setRoles(roles.map((r) => (r.id === editingRole.id ? { ...r, ...data } : r)))
    }
  }

  const handleDeleteRole = () => {
    if (deletingRole) {
      setRoles(roles.filter((r) => r.id !== deletingRole.id))
      setIsDeleteModalOpen(false)
      setDeletingRole(null)
    }
  }

  const openEditModal = (role: Role) => {
    setEditingRole(role)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (role: Role) => {
    setDeletingRole(role)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-2 max-sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-main">Roles & Permissions</h1>
          <p className="text-secondary mt-1">Manage roles and access control</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Role
        </button>
      </div>

      {/* Roles Table */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Users</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Permissions</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-background transition-colors">
                <td className="px-6 py-4">
                  <span className="font-medium text-main">{role.name}</span>
                </td>
                <td className="px-6 py-4 text-secondary">{role.description}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-secondary" />
                    <span className="text-main">{role.userCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(role.permissions).map(([module, perms]) => (
                      perms.view && (
                        <span
                          key={module}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md capitalize"
                        >
                          {module}
                        </span>
                      )
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(role)}
                      className="p-2 hover:bg-background rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-secondary" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(role)}
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

      {/* Modals */}
      <RoleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddRole}
        title="Add New Role"
      />
      <RoleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditRole}
        initialData={editingRole || undefined}
        title="Edit Role"
      />
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteRole}
        userName={deletingRole?.name || ''}
      />
    </div>
  )
}
