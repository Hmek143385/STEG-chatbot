import { TrendingUp, Clock, CheckCircle } from 'lucide-react';

export function StatsCard() {
  const stats = [
    {
      icon: Clock,
      label: 'Wa9t el jaweb',
      value: '< 2 sec',
      color: 'text-steg-blue bg-steg-blue/10',
    },
    {
      icon: CheckCircle,
      label: '7allina mchekl',
      value: '94%',
      color: 'text-success bg-success/10',
    },
    {
      icon: TrendingUp,
      label: 'Rda el client',
      value: '4.8/5',
      color: 'text-steg-red bg-steg-red/10',
    },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 my-2">
      <h3 className="font-semibold text-foreground mb-3 text-sm">Performance mte3 el service</h3>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.color} rounded-lg p-3 text-center`}>
              <Icon className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs font-medium mb-1">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
