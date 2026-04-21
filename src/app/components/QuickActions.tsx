import { FileText, Zap, AlertCircle, Clock } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const actions = [
    { icon: FileText, label: 'Fatura mte3i', value: 'facture', color: 'bg-steg-blue/10 hover:bg-steg-blue/20 text-steg-blue border border-steg-blue/20' },
    { icon: Zap, label: 'Wel panne', value: 'panne', color: 'bg-steg-red/10 hover:bg-steg-red/20 text-steg-red border border-steg-red/20' },
    { icon: Clock, label: 'Historique', value: 'historique', color: 'bg-steg-blue-dark/10 hover:bg-steg-blue-dark/20 text-steg-blue-dark border border-steg-blue-dark/20' },
    { icon: AlertCircle, label: 'Chekwa', value: 'reclamation', color: 'bg-warning/10 hover:bg-warning/20 text-warning border border-warning/20' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 p-4 border-t border-border bg-card">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.value}
            onClick={() => onActionClick(action.value)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${action.color}`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
