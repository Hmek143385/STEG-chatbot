import { useState } from 'react';
import { Save, RefreshCw, Bot, Database, Bell, Shield, Globe, Palette } from 'lucide-react';
import { toast } from 'sonner';

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    chatbotEnabled: true,
    maintenanceMode: false,
    smsNotifications: true,
    emailNotifications: true,
    autoResponse: true,
    responseDelay: 1500,
    maxConversations: 100,
    language: 'tounsi',
    theme: 'light',
    ollamaModel: 'wghezaiel/labess-7b-chat',
    ollamaEndpoint: 'http://localhost:11434',
    sqlServer: 'localhost\\SQLEXPRESS',
    sqlDatabase: 'STEG_Chatbot',
  });

  const handleSave = () => {
    toast.success('Parametres sauvegardes avec succes!');
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Parametres</h2>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-steg-blue hover:bg-steg-blue-dark text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="font-medium">Sauvegarder</span>
          </button>
        </div>

        {/* Chatbot Settings */}
        <div className="bg-card border border-border rounded-xl mb-6">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <Bot className="w-5 h-5 text-steg-blue" />
            <h3 className="font-semibold text-foreground">Configuration Chatbot</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Chatbot Active</p>
                <p className="text-sm text-muted-foreground">Activer ou desactiver le chatbot</p>
              </div>
              <button
                onClick={() => handleToggle('chatbotEnabled')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.chatbotEnabled ? 'bg-steg-blue' : 'bg-switch-background'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.chatbotEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Mode Maintenance</p>
                <p className="text-sm text-muted-foreground">Afficher un message de maintenance</p>
              </div>
              <button
                onClick={() => handleToggle('maintenanceMode')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.maintenanceMode ? 'bg-steg-red' : 'bg-switch-background'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Reponse Automatique</p>
                <p className="text-sm text-muted-foreground">Activer les reponses IA automatiques</p>
              </div>
              <button
                onClick={() => handleToggle('autoResponse')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.autoResponse ? 'bg-steg-blue' : 'bg-switch-background'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.autoResponse ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div>
              <label className="block font-medium text-foreground mb-2">Delai de reponse (ms)</label>
              <input
                type="number"
                value={settings.responseDelay}
                onChange={(e) => setSettings(prev => ({ ...prev, responseDelay: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-steg-blue"
              />
            </div>

            <div>
              <label className="block font-medium text-foreground mb-2">Conversations simultanees max</label>
              <input
                type="number"
                value={settings.maxConversations}
                onChange={(e) => setSettings(prev => ({ ...prev, maxConversations: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-steg-blue"
              />
            </div>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-card border border-border rounded-xl mb-6">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <Bell className="w-5 h-5 text-warning" />
            <h3 className="font-semibold text-foreground">Notifications</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Notifications SMS</p>
                <p className="text-sm text-muted-foreground">Envoyer des SMS aux clients</p>
              </div>
              <button
                onClick={() => handleToggle('smsNotifications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.smsNotifications ? 'bg-steg-blue' : 'bg-switch-background'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.smsNotifications ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Notifications Email</p>
                <p className="text-sm text-muted-foreground">Envoyer des emails aux clients</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-steg-blue' : 'bg-switch-background'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="bg-card border border-border rounded-xl mb-6">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <Database className="w-5 h-5 text-steg-blue" />
            <h3 className="font-semibold text-foreground">Base de Donnees</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block font-medium text-foreground mb-2">SQL Server</label>
              <input
                type="text"
                value={settings.sqlServer}
                onChange={(e) => setSettings(prev => ({ ...prev, sqlServer: e.target.value }))}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-steg-blue font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-foreground mb-2">Database Name</label>
              <input
                type="text"
                value={settings.sqlDatabase}
                onChange={(e) => setSettings(prev => ({ ...prev, sqlDatabase: e.target.value }))}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-steg-blue font-mono"
              />
            </div>
            <button className="flex items-center gap-2 text-steg-blue hover:text-steg-blue-dark transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm font-medium">Tester la connexion</span>
            </button>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-card border border-border rounded-xl mb-6">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <Shield className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-foreground">Configuration IA (Ollama)</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block font-medium text-foreground mb-2">Modele Ollama</label>
              <select
                value={settings.ollamaModel}
                onChange={(e) => setSettings(prev => ({ ...prev, ollamaModel: e.target.value }))}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-steg-blue"
              >
                <option value="wghezaiel/labess-7b-chat">Labess 7B Chat - Tounsi (Recommande)</option>
                <option value="linagora/labess-7b-chat-gguf">Labess 7B GGUF - Tounsi</option>
                <option value="llama3.2">Llama 3.2</option>
                <option value="mistral">Mistral</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Labess-7B-Chat: Modele IA open-source entraine pour le dialecte tunisien (Derja) par LINAGORA
              </p>
            </div>
            <div>
              <label className="block font-medium text-foreground mb-2">Endpoint Ollama</label>
              <input
                type="text"
                value={settings.ollamaEndpoint}
                onChange={(e) => setSettings(prev => ({ ...prev, ollamaEndpoint: e.target.value }))}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-steg-blue font-mono"
              />
            </div>
          </div>
        </div>

        {/* Language & Theme */}
        <div className="bg-card border border-border rounded-xl">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <Globe className="w-5 h-5 text-steg-red" />
            <h3 className="font-semibold text-foreground">Langue et Apparence</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block font-medium text-foreground mb-2">Langue du Chatbot</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-steg-blue"
              >
                <option value="tounsi">Tounsi (Dialecte Tunisien)</option>
                <option value="french">Francais</option>
                <option value="arabic">Arabe Standard</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-foreground mb-2">Theme</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                  className={`flex-1 py-2 rounded-lg border transition-colors ${
                    settings.theme === 'light' 
                      ? 'bg-steg-blue text-white border-steg-blue' 
                      : 'bg-card border-border hover:bg-secondary'
                  }`}
                >
                  Clair
                </button>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                  className={`flex-1 py-2 rounded-lg border transition-colors ${
                    settings.theme === 'dark' 
                      ? 'bg-steg-blue text-white border-steg-blue' 
                      : 'bg-card border-border hover:bg-secondary'
                  }`}
                >
                  Sombre
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
