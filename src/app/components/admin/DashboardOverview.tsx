import { MessageSquare, Users, AlertTriangle, TrendingUp, Clock, CheckCircle, Zap, FileText } from 'lucide-react';

export function DashboardOverview() {
  const recentActivity = [
    { type: 'conversation', user: 'Ahmed Ben Ali', action: 'Nouvelle conversation', time: '2 min', icon: MessageSquare },
    { type: 'complaint', user: 'Fatma Trabelsi', action: 'Reclamation panne', time: '5 min', icon: AlertTriangle },
    { type: 'resolved', user: 'Mohamed Sassi', action: 'Facture consultee', time: '8 min', icon: CheckCircle },
    { type: 'payment', user: 'Salma Bouazizi', action: 'Paiement confirme', time: '12 min', icon: FileText },
    { type: 'conversation', user: 'Karim Hamdi', action: 'Historique demande', time: '15 min', icon: MessageSquare },
  ];

  const quickStats = [
    { label: 'Messages Aujourd\'hui', value: '1,247', change: '+12%', icon: MessageSquare, color: 'bg-steg-blue/10 text-steg-blue' },
    { label: 'Utilisateurs Actifs', value: '348', change: '+8%', icon: Users, color: 'bg-success/10 text-success' },
    { label: 'Reclamations', value: '23', change: '-5%', icon: AlertTriangle, color: 'bg-steg-red/10 text-steg-red' },
    { label: 'Temps Reponse', value: '1.2s', change: '-0.2s', icon: Clock, color: 'bg-warning/10 text-warning' },
  ];

  const topIssues = [
    { topic: 'Consultation Facture', count: 456, percent: 35 },
    { topic: 'Signalement Panne', count: 298, percent: 23 },
    { topic: 'Mode Paiement', count: 234, percent: 18 },
    { topic: 'Historique', count: 187, percent: 14 },
    { topic: 'Reclamations', count: 132, percent: 10 },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Bienvenue sur le Dashboard STEG</h2>
          <p className="text-muted-foreground">Vue d&apos;ensemble du chatbot intelligent</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <span className={`text-xs font-medium ${
                        stat.change.startsWith('+') ? 'text-success' : 'text-steg-red'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Activite Recente</h3>
              <button className="text-sm text-steg-blue hover:underline">Voir tout</button>
            </div>
            <div className="divide-y divide-border">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'complaint' ? 'bg-steg-red/10 text-steg-red' :
                        activity.type === 'resolved' ? 'bg-success/10 text-success' :
                        activity.type === 'payment' ? 'bg-warning/10 text-warning' :
                        'bg-steg-blue/10 text-steg-blue'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{activity.user}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">Il y a {activity.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Issues */}
          <div className="bg-card border border-border rounded-xl">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Sujets Populaires</h3>
            </div>
            <div className="p-4 space-y-4">
              {topIssues.map((issue, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{issue.topic}</span>
                    <span className="text-muted-foreground">{issue.count}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-steg-blue rounded-full transition-all" 
                      style={{ width: `${issue.percent}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-steg-blue to-steg-blue-dark text-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 opacity-80" />
              <span className="text-sm bg-white/20 px-2 py-1 rounded">Live</span>
            </div>
            <p className="text-3xl font-bold mb-1">94.2%</p>
            <p className="text-white/80">Taux de Resolution</p>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+2.1% cette semaine</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-success to-emerald-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 opacity-80" />
              <span className="text-sm bg-white/20 px-2 py-1 rounded">Excellent</span>
            </div>
            <p className="text-3xl font-bold mb-1">4.8/5</p>
            <p className="text-white/80">Satisfaction Client</p>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+0.3 ce mois</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-steg-red to-rose-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 opacity-80" />
              <span className="text-sm bg-white/20 px-2 py-1 rounded">Rapide</span>
            </div>
            <p className="text-3xl font-bold mb-1">1.8s</p>
            <p className="text-white/80">Temps Moyen Reponse</p>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">-0.4s amelioration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
