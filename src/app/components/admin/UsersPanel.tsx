import { useState } from 'react';
import { Search, UserPlus, Edit, Trash2, MoreVertical, Mail, Phone, MapPin } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  subscription: string;
  status: 'active' | 'inactive';
  lastActivity: string;
  totalInvoices: number;
  balance: string;
}

const mockUsers: User[] = [
  { id: 'USR-001', name: 'Ahmed Ben Ali', email: 'ahmed.benali@email.tn', phone: '+216 98 765 432', address: 'Tunis, La Marsa', subscription: 'STEG-00001', status: 'active', lastActivity: '21/04/2026', totalInvoices: 24, balance: '210.750 TND' },
  { id: 'USR-002', name: 'Fatma Trabelsi', email: 'fatma.trabelsi@email.tn', phone: '+216 97 654 321', address: 'Sfax, Centre', subscription: 'STEG-00002', status: 'active', lastActivity: '21/04/2026', totalInvoices: 18, balance: '0 TND' },
  { id: 'USR-003', name: 'Mohamed Sassi', email: 'mohamed.sassi@email.tn', phone: '+216 96 543 210', address: 'Sousse, Khezama', subscription: 'STEG-00003', status: 'inactive', lastActivity: '15/04/2026', totalInvoices: 36, balance: '450.200 TND' },
  { id: 'USR-004', name: 'Salma Bouazizi', email: 'salma.bouazizi@email.tn', phone: '+216 95 432 109', address: 'Bizerte, Corniche', subscription: 'STEG-00004', status: 'active', lastActivity: '20/04/2026', totalInvoices: 12, balance: '125.500 TND' },
  { id: 'USR-005', name: 'Karim Hamdi', email: 'karim.hamdi@email.tn', phone: '+216 94 321 098', address: 'Gabes, Jara', subscription: 'STEG-00005', status: 'active', lastActivity: '21/04/2026', totalInvoices: 48, balance: '0 TND' },
];

export function UsersPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.subscription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Gestion des Utilisateurs</h2>
          <button className="flex items-center gap-2 bg-steg-blue hover:bg-steg-blue-dark text-white px-4 py-2 rounded-lg transition-colors">
            <UserPlus className="w-4 h-4" />
            <span className="text-sm font-medium">Ajouter</span>
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou numero d'abonnement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steg-blue"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-secondary/50 sticky top-0">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Utilisateur</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Abonnement</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Contact</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Statut</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Solde</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-secondary/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-steg-blue rounded-full flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-steg-blue/10 text-steg-blue px-2 py-1 rounded text-sm font-mono">
                    {user.subscription}
                  </span>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-foreground flex items-center gap-1">
                      <Mail className="w-3 h-3 text-muted-foreground" /> {user.email}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {user.phone}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active'
                      ? 'bg-success/10 text-success'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {user.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`font-medium ${
                    parseFloat(user.balance) > 0 ? 'text-steg-red' : 'text-success'
                  }`}>
                    {user.balance}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-steg-red/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-steg-red" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-lg m-4">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Details Utilisateur</h3>
              <button 
                onClick={() => setSelectedUser(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                x
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-steg-blue rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{selectedUser.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedUser.subscription}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm text-foreground flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {selectedUser.email}
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Telephone</p>
                  <p className="text-sm text-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {selectedUser.phone}
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Adresse</p>
                  <p className="text-sm text-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {selectedUser.address}
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Total Factures</p>
                  <p className="text-lg font-bold text-steg-blue">{selectedUser.totalInvoices}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Solde</p>
                  <p className={`text-lg font-bold ${parseFloat(selectedUser.balance) > 0 ? 'text-steg-red' : 'text-success'}`}>
                    {selectedUser.balance}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button className="flex-1 bg-steg-blue hover:bg-steg-blue-dark text-white py-2 rounded-lg font-medium transition-colors">
                  Modifier
                </button>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground py-2 rounded-lg font-medium transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
