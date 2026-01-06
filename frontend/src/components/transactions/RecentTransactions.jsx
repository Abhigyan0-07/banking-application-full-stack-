const mock = [
  { id: 't1', name: 'Ananya Sharma', type: 'Debit', amount: -1200, time: 'Today, 10:12 AM' },
  { id: 't2', name: 'Rahul Verma', type: 'Credit', amount: 5000, time: 'Yesterday, 6:45 PM' },
  { id: 't3', name: 'Electricity Bill', type: 'Debit', amount: -850, time: 'Mon, 2:10 PM' },
];

function Amount({ value }) {
  const positive = value >= 0;
  return (
    <span className={positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
      {positive ? '+ ' : '- '}₹{Math.abs(value).toLocaleString()}
    </span>
  );
}

export function RecentTransactions() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow border border-gray-100 dark:border-gray-800">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Recent Transactions</div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {mock.map((t) => (
          <div key={t.id} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{t.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t.time}</div>
              </div>
            </div>
            <div className="text-sm font-semibold"><Amount value={t.amount} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}


