import { TrendingUp, TrendingDown, Users, MessageSquare, Clock, ThumbsUp, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const dailyData = [
  { name: 'Lun', conversations: 320, resolved: 298, satisfaction: 4.6 },
  { name: 'Mar', conversations: 280, resolved: 265, satisfaction: 4.7 },
  { name: 'Mer', conversations: 410, resolved: 389, satisfaction: 4.5 },
  { name: 'Jeu', conversations: 350, resolved: 332, satisfaction: 4.8 },
  { name: 'Ven', conversations: 290, resolved: 275, satisfaction: 4.6 },
  { name: 'Sam', conversations: 180, resolved: 172, satisfaction: 4.9 },
  { name: 'Dim', conversations: 120, resolved: 118, satisfaction: 4.7 },
];

const hourlyData = [
  { hour: '06h', count: 45 },
  { hour: '08h', count: 120 },
  { hour: '10h', count: 280 },
  { hour: '12h', count: 190 },
  { hour: '14h', count: 320 },
  { hour: '16h', count: 250 },
  { hour: '18h', count: 180 },
  { hour: '20h', count: 90 },
  { hour: '22h', count: 40 },
];

const topicsData = [
  { name: 'Factures', value: 35, color: '#2E6AB3' },
  { name: 'Pannes', value: 28, color: '#E63946' },
  { name: 'Paiements', value: 18, color: '#4A8AD4' },
  { name: 'Historique', value: 12, color: '#1E4A7D' },
  { name: 'Autres', value: 7, color: '#94a3b8' },
];

const monthlyTrend = [
  { month: 'Jan', users: 2400, conversations: 8400 },
  { month: 'Fev', users: 2800, conversations: 9200 },
  { month: 'Mar', users: 3200, conversations: 11000 },
  { month: 'Avr', users: 3800, conversations: 13500 },
];

export function AnalyticsPanel() {
  const stats = [
    { 
      label: 'Conversations', 
      value: '13,547', 
      change: '+12.5%', 
      trend: 'up',
      icon: MessageSquare,
      color: 'text-steg-blue bg-steg-blue/10'
    },
    { 
      label: 'Utilisateurs Actifs', 
      value: '3,892', 
      change: '+8.2%', 
      trend: 'up',
      icon: Users,
      color: 'text-success bg-success/10'
    },
    { 
      label: 'Temps Moyen', 
      value: '1.8s', 
      change: '-0.3s', 
      trend: 'up',
      icon: Clock,
      color: 'text-warning bg-warning/10'
    },
    { 
      label: 'Satisfaction', 
      value: '4.7/5', 
      change: '+0.2', 
      trend: 'up',
      icon: ThumbsUp,
      color: 'text-steg-red bg-steg-red/10'
    },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Tableau de Bord Analytique</h2>
            <p className="text-muted-foreground">Performances du chatbot STEG</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steg-blue">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
              <option>3 derniers mois</option>
              <option>Cette annee</option>
            </select>
            <button className="flex items-center gap-2 bg-steg-blue hover:bg-steg-blue-dark text-white px-4 py-2 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Exporter</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-success' : 'text-steg-red'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Conversations */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-4">Conversations Hebdomadaires</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="conversations" fill="#2E6AB3" radius={[4, 4, 0, 0]} name="Total" />
                <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} name="Resolus" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Distribution */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-4">Distribution par Heure</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="hour" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#2E6AB3" 
                  fill="#2E6AB3" 
                  fillOpacity={0.2}
                  name="Conversations"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Topics Distribution */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-4">Sujets les Plus Demandes</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={topicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {topicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {topicsData.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-card border border-border rounded-xl p-4 lg:col-span-2">
            <h3 className="font-semibold text-foreground mb-4">Tendance Mensuelle</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#2E6AB3" 
                  strokeWidth={2}
                  dot={{ fill: '#2E6AB3', strokeWidth: 2 }}
                  name="Utilisateurs"
                />
                <Line 
                  type="monotone" 
                  dataKey="conversations" 
                  stroke="#E63946" 
                  strokeWidth={2}
                  dot={{ fill: '#E63946', strokeWidth: 2 }}
                  name="Conversations"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-4">Metriques de Performance IA</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-steg-blue">94.2%</p>
              <p className="text-sm text-muted-foreground">Taux de Resolution</p>
              <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-steg-blue rounded-full" style={{ width: '94.2%' }} />
              </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-success">87.5%</p>
              <p className="text-sm text-muted-foreground">Precision IA</p>
              <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: '87.5%' }} />
              </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-warning">1.8s</p>
              <p className="text-sm text-muted-foreground">Temps Reponse Moyen</p>
              <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-warning rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-steg-red">12.3%</p>
              <p className="text-sm text-muted-foreground">Escalade Agent</p>
              <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-steg-red rounded-full" style={{ width: '12.3%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
