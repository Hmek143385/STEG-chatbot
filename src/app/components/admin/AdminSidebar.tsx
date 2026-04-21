import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  FileText, 
  AlertTriangle,
  Settings,
  BarChart3,
  Database,
  Bell,
  LogOut
} from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de Bord' },
    { id: 'conversations', icon: MessageSquare, label: 'Conversations' },
    { id: 'users', icon: Users, label: 'Utilisateurs' },
    { id: 'invoices', icon: FileText, label: 'Factures' },
    { id: 'complaints', icon: AlertTriangle, label: 'Reclamations' },
    { id: 'analytics', icon: BarChart3, label: 'Analytiques' },
    { id: 'database', icon: Database, label: 'Base de Donnees' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Parametres' },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src="/steg-logo.png" alt="STEG" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="font-bold text-foreground">STEG Admin</h1>
            <p className="text-xs text-muted-foreground">Panneau de Controle</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                isActive
                  ? 'bg-steg-blue text-white'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-steg-blue rounded-full flex items-center justify-center text-white font-medium">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin STEG</p>
            <p className="text-xs text-muted-foreground truncate">admin@steg.tn</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-steg-red hover:bg-steg-red/10 transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Deconnexion</span>
        </button>
      </div>
    </div>
  );
}
