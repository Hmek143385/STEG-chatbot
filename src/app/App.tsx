import { useState, useRef, useEffect } from 'react';
import { Send, Settings, MessageSquare, Sparkles, Wifi, WifiOff } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { QuickActions } from './components/QuickActions';
import { TypingIndicator } from './components/TypingIndicator';
import { InvoiceCard } from './components/InvoiceCard';
import { SatisfactionRating } from './components/SatisfactionRating';
import { StatsCard } from './components/StatsCard';
import { AdminPage } from './components/admin/AdminPage';
import { labessAI } from '../services/labessAI';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
  showInvoice?: boolean;
  showRating?: boolean;
  showStats?: boolean;
}

type View = 'chat' | 'admin';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Marahba bik!\n\nAna Assistant STEG el automatique, najem naawnek 24/24.\n\nKifeh najem naawnek lyoum?',
      isUser: false,
      timestamp: '10:30',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientName, setClientName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentView, setCurrentView] = useState<View>('chat');
  const [useAI, setUseAI] = useState(true);
  const [aiConnected, setAiConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check Hugging Face Labess AI connection on mount
  useEffect(() => {
    const checkAIConnection = async () => {
      const connected = await labessAI.checkConnection();
      setAiConnected(connected);
      if (!connected) {
        // Fallback mode - still works with local responses
        console.log('[v0] HuggingFace API not available, using fallback mode');
      }
    };
    checkAIConnection();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isUser,
      timestamp: getCurrentTime(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleDownloadPDF = () => {
    toast.success('El fatura t7ammlet behi!', {
      description: 'Fichier FAC-2024-002.pdf mwaffar.',
      duration: 3000,
    });
  };

  const handleRating = (rating: number, feedback?: string) => {
    toast.success(`Merci 3al ta9yim: ${rating}/5`, {
      description: feedback ? 'Commentaire mte3ek msakel.' : 'Ra2yek ya3tina.',
      duration: 3000,
    });
  };

  // Fallback responses (when AI is not connected)
  const getFallbackResponse = (userMessage: string): { response: string; showInvoice: boolean; showRating: boolean; showStats: boolean } => {
    let response = '';
    let showInvoice = false;
    let showRating = false;
    let showStats = false;

    // Authentification via numero STEG
    if (userMessage.toUpperCase().includes('STEG-')) {
      const match = userMessage.match(/STEG-\d+/);
      if (match) {
        setIsAuthenticated(true);
        setClientName('Ahmed Ben Ali');
        response = 'Ahla bik Ahmed Ben Ali!\n\nAbonnement mte3ek STEG-00001 actif.\n\nKifeh najem naawnek?';
      }
    }
    // Salutations
    else if (userMessage.toLowerCase().includes('salem') || userMessage.toLowerCase().includes('salam') || userMessage.toLowerCase().includes('sbah') || userMessage.toLowerCase().includes('ahla')) {
      response = 'Salem alik! Ahla wesahla bik!\n\nKifeh najem naawnek lyoum?\n\n- Fatura mte3i\n- Wel panne\n- Historique\n- Chekwa';
    }
    // Consultation facture
    else if (userMessage.toLowerCase().includes('fatura') || userMessage.toLowerCase().includes('facture') || userMessage.toLowerCase().includes('flous')) {
      if (isAuthenticated) {
        response = 'Heki details el fatura mte3ek:';
        showInvoice = true;
        showRating = true;
      } else {
        response = 'Lezem awel chay tekteb numero abonnement mte3ek (example: STEG-00001)';
      }
    }
    // Paiement
    else if (userMessage.toLowerCase().includes('kifeh') && (userMessage.toLowerCase().includes('ndfa3') || userMessage.toLowerCase().includes('nkhales') || userMessage.toLowerCase().includes('khlas'))) {
      response = 'Kifeh tejem tkhales el fatura:\n\n1. Fi agence STEG\n2. Fil bosta (La Poste)\n3. B e-dinar\n4. Fel distributeurs automatiques\n5. 3al internet (site STEG)\n\nAgence el plus proche: STEG Tunis Centre';
    }
    // Signalement panne
    else if (userMessage.toLowerCase().includes('panne') || userMessage.toLowerCase().includes('wel') || userMessage.toLowerCase().includes('kahrba') || userMessage.toLowerCase().includes('dhaw') || userMessage.toLowerCase().includes('gaz')) {
      response = 'Signalement el panne\n\nType: Kat3 el kahrba\nStatut: Chekwa msakla\nNumero: REC-2026-1547\n\nEquipe technique t3almou.\nBech yjiw fi odhour sghir (2 swe3at).\n\nBech yet3atlik SMS.';
      showRating = true;
      toast.info('SMS mab3outh!');
    }
    // Historique
    else if (userMessage.toLowerCase().includes('historique') || userMessage.toLowerCase().includes('history') || userMessage.toLowerCase().includes('kol')) {
      response = 'Historique el faturet:\n\nJanvier 2026: 185.450 TND - Makhlousa\nFevrier 2026: 192.300 TND - Makhlousa\nMars 2026: 210.750 TND - Mazelt\n\nTotal mazelt: 210.750 TND';
      showRating = true;
    }
    // Statistiques
    else if (userMessage.toLowerCase().includes('statistique') || userMessage.toLowerCase().includes('performance') || userMessage.toLowerCase().includes('kaddech')) {
      response = 'Heki statistiques mte3 el service:';
      showStats = true;
    }
    // Reclamation
    else if (userMessage.toLowerCase().includes('chekwa') || userMessage.toLowerCase().includes('reclamation') || userMessage.toLowerCase().includes('réclamation')) {
      response = 'Chekwyet mte3ek:\n\nREC-2026-1547 - Panne kahrba\nStatut: Mazelet\nDate: 21/04/2026\n\nREC-2026-1203 - Mochkel fatura\nStatut: T7alet\nDate: 15/03/2026';
    }
    // Aide
    else if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('aide') || userMessage.toLowerCase().includes('3awni')) {
      response = 'Najem naawnek fi:\n\n- "Fatura mte3i" - Bach tchouf el fatura\n- "Wel panne" - Signalement panne\n- "STEG-00001" - Bach tet3aref\n- "Kifeh nkhales?" - Torwa kifeh tkhales\n- "Historique" - Chekwyet el kol';
    }
    // Reponse par defaut
    else {
      response = 'Mafahamtech 3leh t7ebb.\n\nJrreb:\n- "Fatura mte3i"\n- "Wel panne"\n- "STEG-00001" (bach tet3aref)\n- "Kifeh nkhales?"\n- "Historique"';
    }

    return { response, showInvoice, showRating, showStats };
  };

  // Main response handler with AI integration
  const simulateBotResponse = async (userMessage: string) => {
    setIsTyping(true);

    // Check for special commands that need specific UI responses
    const lowerMessage = userMessage.toLowerCase();
    const needsSpecialUI = 
      lowerMessage.includes('fatura') || 
      lowerMessage.includes('facture') ||
      lowerMessage.includes('statistique') ||
      lowerMessage.includes('performance') ||
      userMessage.toUpperCase().includes('STEG-');

    // Try AI response if enabled and connected, and not needing special UI
    if (useAI && aiConnected && !needsSpecialUI) {
      try {
        setIsStreaming(true);
        setStreamingText('');
        
        // Use streaming for better UX
        const aiResponse = await labessAI.chatStream(userMessage, (chunk) => {
          setStreamingText(prev => prev + chunk);
        });

        setIsStreaming(false);
        setStreamingText('');
        setIsTyping(false);

        const newMessage: Message = {
          id: messages.length + 2,
          text: aiResponse,
          isUser: false,
          timestamp: getCurrentTime(),
        };
        setMessages((prev) => [...prev, newMessage]);
        return;
      } catch (error) {
        console.error('AI Error, falling back:', error);
        setIsStreaming(false);
        setStreamingText('');
        // Fall back to rule-based response
      }
    }

    // Rule-based fallback response
    setTimeout(() => {
      setIsTyping(false);
      const { response, showInvoice, showRating, showStats } = getFallbackResponse(userMessage);

      const newMessage: Message = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: getCurrentTime(),
        showInvoice,
        showRating,
        showStats,
      };
      setMessages((prev) => [...prev, newMessage]);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    addMessage(inputValue, true);
    simulateBotResponse(inputValue);
    setInputValue('');
  };

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'facture':
        message = 'Fatura mte3i';
        break;
      case 'panne':
        message = 'Wel panne';
        break;
      case 'historique':
        message = 'Historique';
        break;
      case 'reclamation':
        message = 'Chekwyet mte3i';
        break;
    }
    setInputValue(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Full-page Admin View
  if (currentView === 'admin') {
    return (
      <div className="size-full flex flex-col bg-background">
        <Toaster position="top-center" richColors />
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-steg-blue to-steg-blue-dark text-white p-3 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/steg-logo.png" alt="STEG" className="w-8 h-8 object-contain bg-white rounded-full p-1" />
            <div>
              <h1 className="font-bold text-lg">STEG Backend Administration</h1>
              <p className="text-xs text-white/70">Panneau de controle du chatbot intelligent</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/10 rounded-lg p-1 flex gap-1">
              <button
                onClick={() => setCurrentView('chat')}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                Chatbot
              </button>
              <button
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors bg-white text-steg-blue flex items-center gap-1.5"
              >
                <Settings className="w-4 h-4" />
                Admin
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <AdminPage />
        </div>
      </div>
    );
  }

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-steg-blue/5 to-steg-red/5">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-4xl h-full md:h-[92vh] bg-card md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border">
        {/* Header */}
        <div className="bg-gradient-to-r from-steg-blue to-steg-blue-dark text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-1.5">
                <img 
                  src="/steg-logo.png" 
                  alt="STEG Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-xl">STEG Assistant IA</h1>
                <p className="text-sm text-white/80">Chatbot Intelligent - Disponible 24h/24</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Navigation Tabs */}
              <div className="bg-white/10 rounded-lg p-1 flex gap-1">
                <button
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors bg-white text-steg-blue flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-1.5"
                >
                  <Settings className="w-4 h-4" />
                  Admin
                </button>
              </div>
            </div>
          </div>
          {isAuthenticated && (
            <div className="mt-3 bg-white/10 rounded-lg px-3 py-2">
              <p className="text-sm">Met3aref: <span className="font-semibold">{clientName}</span></p>
            </div>
          )}
        </div>

        {/* Info Banner with AI Status */}
        <div className="bg-steg-blue/5 border-b border-steg-blue/10 px-4 py-2 flex items-center justify-between">
          <p className="text-sm text-steg-blue">
            <span className="font-semibold">Astuce:</span> Ekteb numero abonnement mte3ek (mthel: STEG-00001)
          </p>
          <div className="flex items-center gap-3">
            {/* AI Toggle */}
            <button
              onClick={() => setUseAI(!useAI)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                useAI 
                  ? 'bg-steg-blue/10 text-steg-blue' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              {useAI ? 'IA Active' : 'IA Desactive'}
            </button>
            {/* Connection Status */}
            <div className={`flex items-center gap-1 text-xs ${
              aiConnected ? 'text-green-600' : 'text-steg-blue'
            }`}>
              {aiConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              <span>{aiConnected ? 'Labess IA' : 'Assistant Tounsi'}</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-secondary/30">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
              {message.showInvoice && !message.isUser && (
                <div className="ml-11">
                  <InvoiceCard
                    invoiceNumber="FAC-2024-002"
                    amount="210.750"
                    status="unpaid"
                    dueDate="30/04/2026"
                    onDownload={handleDownloadPDF}
                  />
                </div>
              )}
              {message.showStats && !message.isUser && (
                <div className="ml-11">
                  <StatsCard />
                </div>
              )}
              {message.showRating && !message.isUser && (
                <div className="ml-11">
                  <SatisfactionRating onRate={handleRating} />
                </div>
              )}
            </div>
          ))}
          {isTyping && !isStreaming && <TypingIndicator />}
          {isStreaming && streamingText && (
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-steg-blue flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="max-w-[80%] bg-card border border-border rounded-2xl rounded-tl-none px-4 py-3">
                <p className="text-foreground whitespace-pre-wrap">{streamingText}<span className="animate-pulse">|</span></p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <QuickActions onActionClick={handleQuickAction} />

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-card">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ekteb haja hne..."
              className="flex-1 px-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-steg-blue focus:border-transparent bg-input-background"
            />
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
              className="bg-steg-blue hover:bg-steg-blue-dark disabled:bg-muted disabled:text-muted-foreground text-white rounded-full p-3 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
