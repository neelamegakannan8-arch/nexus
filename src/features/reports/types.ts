export interface Report {
  id: string
  name: string
  category: string
  template: string
  status: 'completed' | 'scheduled' | 'failed'
  createdAt: string
  lastRun: string
  schedule?: string | undefined
}

export type ReportFormData = Omit<Report, 'id' | 'createdAt' | 'lastRun'>
