import { useState } from 'react';
import { Database, Table, RefreshCw, Download, Upload, Search, Play, CheckCircle, AlertCircle } from 'lucide-react';

interface TableInfo {
  name: string;
  rows: number;
  size: string;
  lastUpdated: string;
}

const mockTables: TableInfo[] = [
  { name: 'utilisateurs', rows: 15247, size: '12.5 MB', lastUpdated: '21/04/2026 10:30' },
  { name: 'factures', rows: 89432, size: '156.2 MB', lastUpdated: '21/04/2026 10:28' },
  { name: 'reclamations', rows: 4521, size: '8.7 MB', lastUpdated: '21/04/2026 10:15' },
  { name: 'conversations', rows: 234567, size: '1.2 GB', lastUpdated: '21/04/2026 10:30' },
  { name: 'paiements', rows: 67890, size: '45.3 MB', lastUpdated: '21/04/2026 09:45' },
  { name: 'abonnements', rows: 15247, size: '5.1 MB', lastUpdated: '20/04/2026 18:00' },
  { name: 'logs_chatbot', rows: 1567890, size: '3.4 GB', lastUpdated: '21/04/2026 10:30' },
  { name: 'parametres', rows: 125, size: '0.2 MB', lastUpdated: '15/04/2026 14:00' },
];

export function DatabasePanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM utilisateurs LIMIT 10;');
  const [queryResult, setQueryResult] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const filteredTables = mockTables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRows = mockTables.reduce((acc, table) => acc + table.rows, 0);
  const totalSize = '4.9 GB';

  const executeQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setQueryResult('Requete executee avec succes. 10 lignes retournees.');
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Stats */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Base de Donnees SQL Server</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-steg-blue/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-steg-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Tables</p>
                <p className="text-2xl font-bold text-steg-blue">{mockTables.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-success/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Table className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Total Lignes</p>
                <p className="text-2xl font-bold text-success">{totalRows.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-warning/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Download className="w-8 h-8 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Taille Totale</p>
                <p className="text-2xl font-bold text-warning">{totalSize}</p>
              </div>
            </div>
          </div>
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Statut</p>
                <p className="text-lg font-bold text-success">Connecte</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Tables List */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher une table..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steg-blue"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredTables.map((table) => (
              <button
                key={table.name}
                onClick={() => setSqlQuery(`SELECT * FROM ${table.name} LIMIT 100;`)}
                className="w-full p-3 border-b border-border text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Table className="w-4 h-4 text-steg-blue" />
                  <span className="font-medium text-foreground">{table.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{table.rows.toLocaleString()} lignes</span>
                  <span>{table.size}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-border space-y-2">
            <button className="w-full flex items-center justify-center gap-2 bg-steg-blue hover:bg-steg-blue-dark text-white py-2 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Importer CSV</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground py-2 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Exporter Backup</span>
            </button>
          </div>
        </div>

        {/* SQL Editor */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Editeur SQL</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={executeQuery}
                  disabled={isExecuting}
                  className="flex items-center gap-2 bg-steg-blue hover:bg-steg-blue-dark disabled:bg-muted text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {isExecuting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">Executer</span>
                </button>
              </div>
            </div>
            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full h-32 p-3 bg-slate-900 text-green-400 font-mono text-sm rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-steg-blue"
              placeholder="Entrez votre requete SQL ici..."
            />
          </div>

          {/* Results */}
          <div className="flex-1 p-4 overflow-auto">
            <h3 className="font-semibold text-foreground mb-3">Resultats</h3>
            {queryResult ? (
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{queryResult}</span>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-2 border-b border-border">id</th>
                        <th className="text-left p-2 border-b border-border">nom</th>
                        <th className="text-left p-2 border-b border-border">email</th>
                        <th className="text-left p-2 border-b border-border">abonnement</th>
                        <th className="text-left p-2 border-b border-border">statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, nom: 'Ahmed Ben Ali', email: 'ahmed@email.tn', abonnement: 'STEG-00001', statut: 'actif' },
                        { id: 2, nom: 'Fatma Trabelsi', email: 'fatma@email.tn', abonnement: 'STEG-00002', statut: 'actif' },
                        { id: 3, nom: 'Mohamed Sassi', email: 'mohamed@email.tn', abonnement: 'STEG-00003', statut: 'inactif' },
                      ].map((row) => (
                        <tr key={row.id} className="hover:bg-secondary/30">
                          <td className="p-2 border-b border-border">{row.id}</td>
                          <td className="p-2 border-b border-border">{row.nom}</td>
                          <td className="p-2 border-b border-border">{row.email}</td>
                          <td className="p-2 border-b border-border font-mono text-steg-blue">{row.abonnement}</td>
                          <td className="p-2 border-b border-border">
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              row.statut === 'actif' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                            }`}>
                              {row.statut}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                <div className="text-center">
                  <Database className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Executez une requete pour voir les resultats</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
