import { useState } from 'react'
import { X } from 'lucide-react'
import { RoleFormData, Permissions } from '../types'

interface RoleModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: RoleFormData) => void
  initialData?: RoleFormData
  title: string
}

const defaultPermissions: Permissions = {
  dashboard: { view: true, create: false, edit: false, delete: false },
  analytics: { view: true, create: false, edit: false, delete: false },
  users: { view: true, create: false, edit: false, delete: false },
  reports: { view: true, create: false, edit: false, delete: false },
  roles: { view: true, create: false, edit: false, delete: false },
  organizations: { view: true, create: false, edit: false, delete: false },
  settings: { view: true, create: false, edit: false, delete: false },
}

export default function RoleModal({ isOpen, onClose, onSubmit, initialData, title }: RoleModalProps) {
  const [formData, setFormData] = useState<RoleFormData>(
    initialData || {
      name: '',
      description: '',
      permissions: defaultPermissions,
    }
  )

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const togglePermission = (module: keyof Permissions, action: keyof Permissions[keyof Permissions]) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [module]: {
          ...formData.permissions[module],
          [action]: !formData.permissions[module][action],
        },
      },
    })
  }

  return (
    <div className="fixed inset-0 bg-overlay/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 !mt-0 animate-fade-in">
      <div className="bg-surface rounded-xl border border-border shadow-xl animate-scale-in w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-surface">
          <h2 className="text-xl font-semibold text-main">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-background rounded-lg transition-colors">
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-main mb-2">Role Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-main mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-main mb-4">Permissions</h3>
            <div className="bg-background rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase">Module</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-secondary uppercase">View</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-secondary uppercase">Create</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-secondary uppercase">Edit</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-secondary uppercase">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(formData.permissions).map(([module, perms]) => (
                    <tr key={module} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium text-main capitalize">{module}</td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={perms.view}
                          onChange={() => togglePermission(module as keyof Permissions, 'view')}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={perms.create}
                          onChange={() => togglePermission(module as keyof Permissions, 'create')}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={perms.edit}
                          onChange={() => togglePermission(module as keyof Permissions, 'edit')}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={perms.delete}
                          onChange={() => togglePermission(module as keyof Permissions, 'delete')}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Save Role
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
