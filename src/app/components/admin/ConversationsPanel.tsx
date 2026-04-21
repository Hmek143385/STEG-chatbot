import { useState } from 'react';
import { Search, Filter, MoreVertical, CheckCircle, Clock, XCircle, Eye, MessageSquare } from 'lucide-react';

interface Conversation {
  id: string;
  user: string;
  phone: string;
  lastMessage: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'pending';
  messageCount: number;
}

const mockConversations: Conversation[] = [
  { id: 'CONV-001', user: 'Ahmed Ben Ali', phone: '+216 98 765 432', lastMessage: 'Fatura mte3i', timestamp: '10:30', status: 'resolved', messageCount: 8 },
  { id: 'CONV-002', user: 'Fatma Trabelsi', phone: '+216 97 654 321', lastMessage: 'Wel panne fi houtna', timestamp: '10:25', status: 'pending', messageCount: 5 },
  { id: 'CONV-003', user: 'Mohamed Sassi', phone: '+216 96 543 210', lastMessage: 'Kifeh nkhales?', timestamp: '10:20', status: 'resolved', messageCount: 12 },
  { id: 'CONV-004', user: 'Salma Bouazizi', phone: '+216 95 432 109', lastMessage: 'Chekwa 3al fatura', timestamp: '10:15', status: 'active', messageCount: 3 },
  { id: 'CONV-005', user: 'Karim Hamdi', phone: '+216 94 321 098', lastMessage: 'Historique mte3i', timestamp: '10:10', status: 'resolved', messageCount: 6 },
  { id: 'CONV-006', user: 'Amira Chaabane', phone: '+216 93 210 987', lastMessage: 'Mochkel fil compteur', timestamp: '10:05', status: 'pending', messageCount: 4 },
];

export function ConversationsPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="flex items-center gap-1 text-xs bg-steg-blue/10 text-steg-blue px-2 py-1 rounded-full"><Clock className="w-3 h-3" /> Actif</span>;
      case 'resolved':
        return <span className="flex items-center gap-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full"><CheckCircle className="w-3 h-3" /> Resolu</span>;
      case 'pending':
        return <span className="flex items-center gap-1 text-xs bg-warning/10 text-warning px-2 py-1 rounded-full"><XCircle className="w-3 h-3" /> En attente</span>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex">
      {/* Conversations List */}
      <div className="w-96 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Conversations</h2>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steg-blue"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {['all', 'active', 'pending', 'resolved'].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === filter
                    ? 'bg-steg-blue text-white'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {filter === 'all' ? 'Tous' : filter === 'active' ? 'Actifs' : filter === 'pending' ? 'En attente' : 'Resolus'}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full p-4 border-b border-border text-left hover:bg-secondary/50 transition-colors ${
                selectedConversation?.id === conv.id ? 'bg-steg-blue/5 border-l-2 border-l-steg-blue' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-steg-blue rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {conv.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{conv.user}</p>
                    <p className="text-xs text-muted-foreground">{conv.phone}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate mb-2">{conv.lastMessage}</p>
              <div className="flex items-center justify-between">
                {getStatusBadge(conv.status)}
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> {conv.messageCount}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Detail */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Detail Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-steg-blue rounded-full flex items-center justify-center text-white font-medium text-lg">
                  {selectedConversation.user.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedConversation.user}</h3>
                  <p className="text-sm text-muted-foreground">{selectedConversation.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedConversation.status)}
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-secondary/30">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-steg-blue rounded-full flex items-center justify-center text-white text-sm">
                    {selectedConversation.user.charAt(0)}
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-none px-4 py-2 max-w-md">
                    <p className="text-sm">{selectedConversation.lastMessage}</p>
                    <span className="text-xs text-muted-foreground">{selectedConversation.timestamp}</span>
                  </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 bg-steg-red rounded-full flex items-center justify-center text-white text-sm">
                    B
                  </div>
                  <div className="bg-steg-blue text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-md">
                    <p className="text-sm">Marahba bik! Ana Assistant STEG. Kifeh najem naawnek?</p>
                    <span className="text-xs text-white/70">{selectedConversation.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border flex gap-2">
              <button className="flex-1 bg-steg-blue hover:bg-steg-blue-dark text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                Voir Historique Complet
              </button>
              <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium transition-colors">
                Fermer
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Selectionnez une conversation pour voir les details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
