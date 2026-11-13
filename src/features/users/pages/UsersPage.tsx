import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Power } from 'lucide-react'
import { User, UserFormData } from '../types'
import UserModal from '../components/UserModal'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import { cn } from '@/lib/utils'

const mockUsers: User[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@example.com', department: 'Engineering', role: 'Super Admin', status: 'active', lastLogin: '10 Nov 2026' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@example.com', department: 'Marketing', role: 'Manager', status: 'active', lastLogin: '09 Nov 2026' },
  { id: '3', name: 'Mike Wilson', email: 'mike.w@example.com', department: 'Sales', role: 'Analyst', status: 'inactive', lastLogin: '05 Nov 2026' },
  { id: '4', name: 'Emily Brown', email: 'emily.b@example.com', department: 'Engineering', role: 'Organization Admin', status: 'active', lastLogin: '10 Nov 2026' },
  { id: '5', name: 'David Lee', email: 'david.l@example.com', department: 'HR', role: 'Viewer', status: 'active', lastLogin: '08 Nov 2026' },
  { id: '6', name: 'Lisa Chen', email: 'lisa.c@example.com', department: 'Finance', role: 'Analyst', status: 'active', lastLogin: '10 Nov 2026' },
  { id: '7', name: 'Tom Garcia', email: 'tom.g@example.com', department: 'Operations', role: 'Manager', status: 'inactive', lastLogin: '01 Nov 2026' },
  { id: '8', name: 'Amy White', email: 'amy.w@example.com', department: 'Marketing', role: 'Viewer', status: 'active', lastLogin: '09 Nov 2026' },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter
    return matchesSearch && matchesStatus && matchesRole && matchesDepartment
  })

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddUser = (data: UserFormData) => {
    const newUser: User = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      lastLogin: 'Never',
    }
    setUsers([...users, newUser])
  }

  const handleEditUser = (data: UserFormData) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u)))
    }
  }

  const handleDeleteUser = () => {
    if (deletingUser) {
      setUsers(users.filter((u) => u.id !== deletingUser.id))
      setIsDeleteModalOpen(false)
      setDeletingUser(null)
    }
  }

  const handleToggleStatus = (user: User) => {
    setUsers(users.map((u) => 
      u.id === user.id 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ))
  }

  const handleSelectAll = () => {
    if (selectedUsers.size === paginatedUsers.length) {
      setSelectedUsers(new Set())
    } else {
      setSelectedUsers(new Set(paginatedUsers.map((u) => u.id)))
    }
  }

  const handleSelectUser = (id: string) => {
    const newSelected = new Set(selectedUsers)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedUsers(newSelected)
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (user: User) => {
    setDeletingUser(user)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-2 max-sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-main">Users</h1>
          <p className="text-secondary mt-1">Manage users and their access</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Organization Admin">Organization Admin</option>
            <option value="Analyst">Analyst</option>
            <option value="Manager">Manager</option>
            <option value="Viewer">Viewer</option>
          </select>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-main">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary">{user.email}</td>
                  <td className="px-6 py-4 text-main">{user.department}</td>
                  <td className="px-6 py-4 text-main">{user.role}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      user.status === 'active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-secondary/10 text-secondary'
                    )}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                        title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        <Power className={cn(
                          'w-4 h-4',
                          user.status === 'active' ? 'text-success' : 'text-secondary'
                        )} />
                      </button>
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-secondary" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-secondary">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-border rounded-lg hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'px-3 py-2 rounded-lg transition-colors',
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'border border-border hover:bg-background'
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-border rounded-lg hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
        title="Add New User"
      />
      <UserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditUser}
        initialData={editingUser || undefined}
        title="Edit User"
      />
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        userName={deletingUser?.name || ''}
      />
    </div>
  )
}
