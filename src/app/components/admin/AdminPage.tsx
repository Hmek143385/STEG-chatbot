import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { DashboardOverview } from './DashboardOverview';
import { ConversationsPanel } from './ConversationsPanel';
import { UsersPanel } from './UsersPanel';
import { ComplaintsPanel } from './ComplaintsPanel';
import { AnalyticsPanel } from './AnalyticsPanel';
import { DatabasePanel } from './DatabasePanel';
import { SettingsPanel } from './SettingsPanel';
import { FileText, Bell } from 'lucide-react';

export function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'conversations':
        return <ConversationsPanel />;
      case 'users':
        return <UsersPanel />;
      case 'invoices':
        return <InvoicesPanel />;
      case 'complaints':
        return <ComplaintsPanel />;
      case 'analytics':
        return <AnalyticsPanel />;
      case 'database':
        return <DatabasePanel />;
      case 'notifications':
        return <NotificationsPanel />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="h-full flex bg-secondary/30">
      <AdminSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}

// Simple Invoices Panel
function InvoicesPanel() {
  const invoices = [
    { id: 'FAC-2026-001', user: 'Ahmed Ben Ali', amount: '210.750', status: 'pending', date: '21/04/2026' },
    { id: 'FAC-2026-002', user: 'Fatma Trabelsi', amount: '185.450', status: 'paid', date: '20/04/2026' },
    { id: 'FAC-2026-003', user: 'Mohamed Sassi', amount: '450.200', status: 'overdue', date: '15/04/2026' },
    { id: 'FAC-2026-004', user: 'Salma Bouazizi', amount: '125.500', status: 'pending', date: '21/04/2026' },
    { id: 'FAC-2026-005', user: 'Karim Hamdi', amount: '298.750', status: 'paid', date: '19/04/2026' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs">Payee</span>;
      case 'pending':
        return <span className="bg-warning/10 text-warning px-2 py-1 rounded-full text-xs">En attente</span>;
      case 'overdue':
        return <span className="bg-steg-red/10 text-steg-red px-2 py-1 rounded-full text-xs">En retard</span>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Gestion des Factures</h2>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Numero</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Client</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Montant</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Statut</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-steg-blue" />
                      <span className="font-mono text-sm">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{invoice.user}</td>
                  <td className="p-4 font-semibold text-foreground">{invoice.amount} TND</td>
                  <td className="p-4">{getStatusBadge(invoice.status)}</td>
                  <td className="p-4 text-muted-foreground text-sm">{invoice.date}</td>
                  <td className="p-4 text-right">
                    <button className="text-steg-blue hover:underline text-sm">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Simple Notifications Panel
function NotificationsPanel() {
  const notifications = [
    { id: 1, type: 'alert', title: 'Nouvelle reclamation urgente', message: 'Panne electricite signalée - Zone La Marsa', time: '5 min', read: false },
    { id: 2, type: 'info', title: 'Pic de trafic detecte', message: '250 conversations simultanees', time: '15 min', read: false },
    { id: 3, type: 'success', title: 'Paiement recu', message: 'Ahmed Ben Ali - 210.750 TND', time: '30 min', read: true },
    { id: 4, type: 'warning', title: 'Temps de reponse eleve', message: 'Moyenne: 3.2s (objectif: 2s)', time: '1h', read: true },
    { id: 5, type: 'info', title: 'Mise a jour systeme', message: 'Maintenance prevue ce soir 22h', time: '2h', read: true },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        <button className="text-sm text-steg-blue hover:underline">Tout marquer comme lu</button>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-border">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 flex items-start gap-4 hover:bg-secondary/50 transition-colors ${
                !notif.read ? 'bg-steg-blue/5' : ''
              }`}
            >
              <div className={`p-2 rounded-lg ${
                notif.type === 'alert' ? 'bg-steg-red/10 text-steg-red' :
                notif.type === 'success' ? 'bg-success/10 text-success' :
                notif.type === 'warning' ? 'bg-warning/10 text-warning' :
                'bg-steg-blue/10 text-steg-blue'
              }`}>
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground">{notif.title}</h4>
                  <span className="text-xs text-muted-foreground">Il y a {notif.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 bg-steg-blue rounded-full mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
