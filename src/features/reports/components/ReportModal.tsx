import { useState } from 'react'
import { X } from 'lucide-react'
import { ReportFormData } from '../types'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ReportFormData) => void
  initialData?: ReportFormData
  title: string
}

export default function ReportModal({ isOpen, onClose, onSubmit, initialData, title }: ReportModalProps) {
  const [formData, setFormData] = useState<ReportFormData>(
    initialData || {
      name: '',
      category: 'Revenue',
      template: 'Revenue Summary',
      status: 'completed',
      schedule: '',
    }
  )

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-overlay/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 !mt-0 animate-fade-in">
      <div className="bg-surface rounded-xl border border-border shadow-xl animate-scale-in w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-main">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-background rounded-lg transition-colors">
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-main mb-2">Report Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-main mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Revenue">Revenue</option>
              <option value="Users">Users</option>
              <option value="Analytics">Analytics</option>
              <option value="Products">Products</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-main mb-2">Template</label>
            <select
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Revenue Summary">Revenue Summary</option>
              <option value="Activity Log">Activity Log</option>
              <option value="Growth Metrics">Growth Metrics</option>
              <option value="Product Analysis">Product Analysis</option>
              <option value="Traffic Overview">Traffic Overview</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-main mb-2">Schedule</label>
            <select
              value={formData.schedule || ''}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">No Schedule</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
