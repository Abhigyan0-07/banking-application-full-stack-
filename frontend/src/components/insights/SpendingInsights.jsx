const data = [
  { label: 'Bills', value: 45 },
  { label: 'Food', value: 25 },
  { label: 'Shopping', value: 18 },
  { label: 'Travel', value: 12 },
];

export function SpendingInsights() {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow border border-gray-100 dark:border-gray-800">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Spending Insights</div>
      <div className="space-y-3">
        {data.map(d => (
          <div key={d.label}>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>{d.label}</span>
              <span>{d.value}%</span>
            </div>
            <div className="h-2 mt-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


