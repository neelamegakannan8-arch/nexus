import { useState } from 'react'
import { Plus, Download, FileText, Eye, Trash2, MoreHorizontal } from 'lucide-react'
import { Report, ReportFormData } from '../types'
import ReportModal from '../components/ReportModal'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'

const mockReports: Report[] = [
  { id: '1', name: 'Monthly Revenue Report', category: 'Revenue', template: 'Revenue Summary', status: 'completed', createdAt: '2024-11-01', lastRun: '2024-11-10', schedule: 'Monthly' },
  { id: '2', name: 'User Activity Report', category: 'Users', template: 'Activity Log', status: 'completed', createdAt: '2024-11-05', lastRun: '2024-11-10', schedule: 'Weekly' },
  { id: '3', name: 'Customer Growth Report', category: 'Analytics', template: 'Growth Metrics', status: 'scheduled', createdAt: '2024-11-08', lastRun: '2024-11-09', schedule: 'Daily' },
  { id: '4', name: 'Product Performance', category: 'Products', template: 'Product Analysis', status: 'completed', createdAt: '2024-11-02', lastRun: '2024-11-08', schedule: 'Monthly' },
  { id: '5', name: 'Traffic Analysis', category: 'Analytics', template: 'Traffic Overview', status: 'failed', createdAt: '2024-11-09', lastRun: '2024-11-09', schedule: 'Weekly' },
]

const templates = [
  { id: '1', name: 'Revenue Summary', category: 'Revenue', description: 'Monthly revenue breakdown' },
  { id: '2', name: 'Activity Log', category: 'Users', description: 'User activity tracking' },
  { id: '3', name: 'Growth Metrics', category: 'Analytics', description: 'Customer growth analysis' },
  { id: '4', name: 'Product Analysis', category: 'Products', description: 'Product performance metrics' },
  { id: '5', name: 'Traffic Overview', category: 'Analytics', description: 'Website traffic report' },
]

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<Report | null>(null)
  const [deletingReport, setDeletingReport] = useState<Report | null>(null)
  const [activeTab, setActiveTab] = useState<'reports' | 'templates'>('reports')

  const handleAddReport = (data: ReportFormData) => {
    const newReport: Report = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0],
      lastRun: 'Never',
      schedule: data.schedule || undefined,
    }
    setReports([...reports, newReport])
  }

  const handleEditReport = (data: ReportFormData) => {
    if (editingReport) {
      setReports(reports.map((r) => (r.id === editingReport.id ? { ...r, ...data } : r)))
    }
  }

  const handleDeleteReport = () => {
    if (deletingReport) {
      setReports(reports.filter((r) => r.id !== deletingReport.id))
      setIsDeleteModalOpen(false)
      setDeletingReport(null)
    }
  }

  const handleExport = (reportId: string, format: 'csv' | 'pdf' | 'xlsx') => {
    console.log(`Exporting report ${reportId} as ${format}`)
  }

  const openEditModal = (report: Report) => {
    setEditingReport(report)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (report: Report) => {
    setDeletingReport(report)
    setIsDeleteModalOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success'
      case 'scheduled':
        return 'bg-warning/10 text-warning'
      case 'failed':
        return 'bg-error/10 text-error'
      default:
        return 'bg-secondary/10 text-secondary'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-2 max-sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-main">Reports</h1>
          <p className="text-secondary mt-1">Generate and manage reports</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Report
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'reports'
              ? 'text-primary border-b-2 border-primary'
              : 'text-secondary hover:text-main'
          }`}
        >
          Reports
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'templates'
              ? 'text-primary border-b-2 border-primary'
              : 'text-secondary hover:text-main'
          }`}
        >
          Templates
        </button>
      </div>

      {activeTab === 'reports' ? (
        /* Reports Table */
        <div className="bg-surface rounded-xl border border-border overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Last Run</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-main">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary">{report.category}</td>
                  <td className="px-6 py-4 text-secondary">{report.template}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{report.schedule || '-'}</td>
                  <td className="px-6 py-4 text-secondary">{report.lastRun}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExport(report.id, 'csv')}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                        title="Export CSV"
                      >
                        <Download className="w-4 h-4 text-secondary" />
                      </button>
                      <button
                        onClick={() => openEditModal(report)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Eye className="w-4 h-4 text-secondary" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(report)}
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
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-surface rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <button className="p-2 hover:bg-background rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-secondary" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-main mb-2">{template.name}</h3>
              <p className="text-sm text-secondary mb-4">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-secondary bg-background px-2 py-1 rounded">{template.category}</span>
                <button className="text-sm text-primary hover:underline font-medium">Use Template</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <ReportModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddReport}
        title="Create New Report"
      />
      <ReportModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditReport}
        initialData={editingReport || undefined}
        title="Edit Report"
      />
      <DeleteConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteReport}
        userName={deletingReport?.name || ''}
      />
    </div>
  )
}
