import { AlertTriangle } from 'lucide-react'

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
}

export default function DeleteConfirmDialog({ isOpen, onClose, onConfirm, userName }: DeleteConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-overlay/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 !mt-0 animate-fade-in">
      <div className="bg-surface rounded-xl border border-border shadow-xl animate-scale-in w-full max-w-md p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-main">Delete User</h2>
            <p className="text-sm text-secondary">This action cannot be undone</p>
          </div>
        </div>

        <p className="text-secondary mb-6">
          Are you sure you want to delete <span className="font-medium text-main">{userName}</span>? This will permanently remove their account and all associated data.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
