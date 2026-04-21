import { FileText, Download, CreditCard } from 'lucide-react';

interface InvoiceCardProps {
  invoiceNumber: string;
  amount: string;
  status: 'paid' | 'unpaid';
  dueDate: string;
  onDownload: () => void;
}

export function InvoiceCard({ invoiceNumber, amount, status, dueDate, onDownload }: InvoiceCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm my-2">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-steg-blue" />
          <span className="font-semibold text-foreground">{invoiceNumber}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'paid'
            ? 'bg-success/10 text-success'
            : 'bg-steg-red/10 text-steg-red'
        }`}>
          {status === 'paid' ? 'Makhlousa' : 'Mazelt'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">El montant:</span>
          <span className="font-bold text-lg text-foreground">{amount} TND</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Date el a5ra:</span>
          <span className="text-sm font-medium text-foreground">{dueDate}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-steg-blue/10 hover:bg-steg-blue/20 text-steg-blue px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Telecharger PDF</span>
        </button>
        {status === 'unpaid' && (
          <button className="flex-1 flex items-center justify-center gap-2 bg-steg-blue hover:bg-steg-blue-dark text-white px-4 py-2 rounded-lg transition-colors">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm font-medium">Khales</span>
          </button>
        )}
      </div>
    </div>
  );
}
