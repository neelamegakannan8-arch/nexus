import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react'

const transactions = [
  { id: 1, customer: 'John Smith', amount: 1250, status: 'completed', date: '2 min ago' },
  { id: 2, customer: 'Sarah Johnson', amount: 890, status: 'completed', date: '15 min ago' },
  { id: 3, customer: 'Mike Wilson', amount: 2100, status: 'pending', date: '1 hour ago' },
  { id: 4, customer: 'Emily Brown', amount: 560, status: 'completed', date: '2 hours ago' },
  { id: 5, customer: 'David Lee', amount: 1450, status: 'failed', date: '3 hours ago' },
]

export default function RecentTransactions() {
  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-main">Recent Transactions</h2>
          <p className="text-sm text-secondary">Latest customer orders</p>
        </div>
        <button className="text-primary text-sm font-medium hover:underline">View all</button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-background rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {transaction.customer.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-main text-sm">{transaction.customer}</p>
                <p className="text-xs text-secondary">{transaction.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-main text-sm">${transaction.amount.toLocaleString()}</p>
                <span className={`text-xs font-medium ${
                  transaction.status === 'completed' ? 'text-success' :
                  transaction.status === 'pending' ? 'text-warning' :
                  'text-error'
                }`}>
                  {transaction.status}
                </span>
              </div>
              <button className="p-1 hover:bg-background rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4 text-secondary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
