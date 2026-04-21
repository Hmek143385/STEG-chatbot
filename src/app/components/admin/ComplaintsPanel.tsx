import { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, Clock, XCircle, MapPin, Zap, FileText, Wrench } from 'lucide-react';

interface Complaint {
  id: string;
  type: 'panne' | 'facture' | 'compteur' | 'autre';
  user: string;
  phone: string;
  description: string;
  location: string;
  status: 'new' | 'in_progress' | 'resolved' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  assignedTo?: string;
}

const mockComplaints: Complaint[] = [
  { id: 'REC-2026-001', type: 'panne', user: 'Ahmed Ben Ali', phone: '+216 98 765 432', description: 'Coupure electricite depuis 2 heures', location: 'Tunis, La Marsa', status: 'in_progress', priority: 'high', createdAt: '21/04/2026 10:30', assignedTo: 'Equipe A' },
  { id: 'REC-2026-002', type: 'facture', user: 'Fatma Trabelsi', phone: '+216 97 654 321', description: 'Erreur montant facture Mars', location: 'Sfax, Centre', status: 'new', priority: 'medium', createdAt: '21/04/2026 09:45' },
  { id: 'REC-2026-003', type: 'compteur', user: 'Mohamed Sassi', phone: '+216 96 543 210', description: 'Compteur defectueux', location: 'Sousse, Khezama', status: 'resolved', priority: 'low', createdAt: '20/04/2026 14:20', assignedTo: 'Technicien B' },
  { id: 'REC-2026-004', type: 'panne', user: 'Salma Bouazizi', phone: '+216 95 432 109', description: 'Fluctuation de tension', location: 'Bizerte, Corniche', status: 'in_progress', priority: 'high', createdAt: '21/04/2026 08:15', assignedTo: 'Equipe C' },
  { id: 'REC-2026-005', type: 'autre', user: 'Karim Hamdi', phone: '+216 94 321 098', description: 'Demande de releve compteur', location: 'Gabes, Jara', status: 'new', priority: 'low', createdAt: '21/04/2026 11:00' },
];

export function ComplaintsPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = complaint.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesType = typeFilter === 'all' || complaint.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'panne': return <Zap className="w-4 h-4" />;
      case 'facture': return <FileText className="w-4 h-4" />;
      case 'compteur': return <Wrench className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="flex items-center gap-1 text-xs bg-steg-blue/10 text-steg-blue px-2 py-1 rounded-full"><AlertTriangle className="w-3 h-3" /> Nouveau</span>;
      case 'in_progress':
        return <span className="flex items-center gap-1 text-xs bg-warning/10 text-warning px-2 py-1 rounded-full"><Clock className="w-3 h-3" /> En cours</span>;
      case 'resolved':
        return <span className="flex items-center gap-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full"><CheckCircle className="w-3 h-3" /> Resolu</span>;
      case 'cancelled':
        return <span className="flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"><XCircle className="w-3 h-3" /> Annule</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="text-xs bg-steg-red/10 text-steg-red px-2 py-1 rounded">Urgent</span>;
      case 'medium':
        return <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded">Moyen</span>;
      case 'low':
        return <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Bas</span>;
      default:
        return null;
    }
  };

  const stats = {
    total: mockComplaints.length,
    new: mockComplaints.filter(c => c.status === 'new').length,
    inProgress: mockComplaints.filter(c => c.status === 'in_progress').length,
    resolved: mockComplaints.filter(c => c.status === 'resolved').length,
  };

  return (
    <div className="h-full flex flex-col">
      {/* Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="bg-steg-blue/10 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-steg-blue">{stats.new}</p>
            <p className="text-xs text-steg-blue">Nouveaux</p>
          </div>
          <div className="bg-warning/10 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-warning">{stats.inProgress}</p>
            <p className="text-xs text-warning">En cours</p>
          </div>
          <div className="bg-success/10 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-success">{stats.resolved}</p>
            <p className="text-xs text-success">Resolus</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steg-blue"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steg-blue"
          >
            <option value="all">Tous les statuts</option>
            <option value="new">Nouveau</option>
            <option value="in_progress">En cours</option>
            <option value="resolved">Resolu</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steg-blue"
          >
            <option value="all">Tous les types</option>
            <option value="panne">Panne</option>
            <option value="facture">Facture</option>
            <option value="compteur">Compteur</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      {/* Complaints List */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {filteredComplaints.map((complaint) => (
            <div key={complaint.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    complaint.type === 'panne' ? 'bg-steg-red/10 text-steg-red' :
                    complaint.type === 'facture' ? 'bg-steg-blue/10 text-steg-blue' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {getTypeIcon(complaint.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-muted-foreground">{complaint.id}</span>
                      {getPriorityBadge(complaint.priority)}
                    </div>
                    <h4 className="font-medium text-foreground">{complaint.description}</h4>
                  </div>
                </div>
                {getStatusBadge(complaint.status)}
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <div className="w-5 h-5 bg-steg-blue/10 rounded-full flex items-center justify-center text-steg-blue text-xs">
                    {complaint.user.charAt(0)}
                  </div>
                  {complaint.user}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {complaint.location}
                </span>
                <span>{complaint.createdAt}</span>
                {complaint.assignedTo && (
                  <span className="bg-secondary px-2 py-0.5 rounded text-xs">
                    Assigne: {complaint.assignedTo}
                  </span>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button className="px-3 py-1.5 bg-steg-blue hover:bg-steg-blue-dark text-white rounded-lg text-sm font-medium transition-colors">
                  Traiter
                </button>
                <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-sm font-medium transition-colors">
                  Details
                </button>
                {complaint.status === 'in_progress' && (
                  <button className="px-3 py-1.5 bg-success/10 hover:bg-success/20 text-success rounded-lg text-sm font-medium transition-colors">
                    Marquer Resolu
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
