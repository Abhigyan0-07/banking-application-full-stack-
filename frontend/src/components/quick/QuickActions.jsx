export function QuickActions({ onSend, onAdd, onWithdraw, onStatements }) {
  const actions = [
    { label: 'Add Money', onClick: onAdd },
    { label: 'Send', onClick: onSend },
    { label: 'Withdraw', onClick: onWithdraw },
    { label: 'Statements', onClick: onStatements },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow border border-gray-100 dark:border-gray-800">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Quick Actions</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className="group relative overflow-hidden rounded-xl px-3 py-3 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
          >
            <span className="relative z-10">{a.label}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </button>
        ))}
      </div>
    </div>
  );
}


