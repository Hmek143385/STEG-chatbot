/**
 * Service d'integration avec Labess-7B-Chat via Hugging Face Inference API
 * Modele IA open-source specialement entraine pour le dialecte tunisien (Derja)
 * Developpe par LINAGORA
 * 
 * GRATUIT - Pas besoin d'installation locale!
 * Utilise l'API Hugging Face Inference (gratuit avec limites)
 */

export interface LabessMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Configuration
const CONFIG = {
  // Hugging Face Inference API (gratuit)
  huggingFaceEndpoint: 'https://api-inference.huggingface.co/models/linagora/Labess-7b-chat',
  // Alternative: modeles multilingues gratuits
  alternativeModels: [
    'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
    'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta',
  ],
  temperature: 0.7,
  maxTokens: 512,
};

// System prompt optimise pour le contexte STEG en tunisien
const STEG_SYSTEM_PROMPT = `Inti assistant virtuel mte3 STEG (Societe Tunisienne de l'Electricite et du Gaz).
IMPORTANT: Jaweb DAYMEN bel tounsi (dialecte tunisien/derja tunisienne). Ista3mel kalemet kima: kifeh, 3leh, chnou, winou, 9addech, bech, mte3, etc.

Tes fonctions:
- Tchouf faturet el kahrba wel gaz
- Tsajjel pannet (coupures d'electricite, fuites de gaz)
- T3awen fel ma3loumet 3al abonnement
- Tcharah kifeyyet el khlass (paiement)
- Tsajjel chekwyet w reclamations

Exemples de reponses en tounsi:
- "Ahla bik! Kifeh najem n3awnek lyoum?"
- "Fatura mte3ek lel chhar hedha 150 dinar"
- "Chekwa mte3ek tsajlet, numero: REC-2026-XXX"
- "Bech yjiw techniciyin fi odhour sghir"

Kun aimable w professionnel. Ken ma taarefch haja, 9oul: "Samahni, ma 3andi ma3loumet 3la hedha. Jarreb tetsel b 1100."`;

class LabessAIService {
  private conversationHistory: LabessMessage[] = [];
  private apiKey: string | null = null;
  private useLocalFallback: boolean = true;

  constructor() {
    this.conversationHistory = [
      { role: 'system', content: STEG_SYSTEM_PROMPT }
    ];
  }

  /**
   * Configure API key (optionnel - fonctionne sans pour usage limite)
   */
  setApiKey(key: string): void {
    this.apiKey = key;
  }

  /**
   * Envoyer un message via Hugging Face Inference API
   */
  async chat(userMessage: string): Promise<string> {
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    try {
      // Construire le prompt avec l'historique
      const prompt = this.buildPrompt();
      
      const response = await fetch(CONFIG.huggingFaceEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: CONFIG.maxTokens,
            temperature: CONFIG.temperature,
            return_full_text: false,
            do_sample: true,
          }
        }),
      });

      if (response.status === 503) {
        // Model is loading
        const data = await response.json();
        if (data.estimated_time) {
          throw new Error(`MODEL_LOADING:${data.estimated_time}`);
        }
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      let assistantMessage = '';

      if (Array.isArray(data) && data[0]?.generated_text) {
        assistantMessage = data[0].generated_text;
      } else if (data.generated_text) {
        assistantMessage = data.generated_text;
      } else {
        throw new Error('Invalid response format');
      }

      // Clean up the response
      assistantMessage = this.cleanResponse(assistantMessage);

      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      return assistantMessage;
    } catch (error) {
      console.error('Labess AI Error:', error);
      
      // Use intelligent fallback
      if (this.useLocalFallback) {
        return this.getIntelligentFallback(userMessage);
      }
      
      throw error;
    }
  }

  /**
   * Chat with streaming simulation (HF API doesn't support true streaming on free tier)
   */
  async chatStream(
    userMessage: string,
    onChunk: (chunk: string) => void
  ): Promise<string> {
    try {
      const fullResponse = await this.chat(userMessage);
      
      // Simulate streaming for better UX
      const words = fullResponse.split(' ');
      let accumulated = '';
      
      for (let i = 0; i < words.length; i++) {
        accumulated += (i === 0 ? '' : ' ') + words[i];
        onChunk(words[i] + (i < words.length - 1 ? ' ' : ''));
        await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 20));
      }
      
      return fullResponse;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      
      // Handle model loading
      if (errorMsg.startsWith('MODEL_LOADING:')) {
        const time = errorMsg.split(':')[1];
        const loadingMsg = `Model yadkhol... Stanna ${time} thaweni...`;
        onChunk(loadingMsg);
        return loadingMsg;
      }
      
      // Fallback response
      const fallback = this.getIntelligentFallback(userMessage);
      const words = fallback.split(' ');
      for (const word of words) {
        onChunk(word + ' ');
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      return fallback;
    }
  }

  /**
   * Build conversation prompt
   */
  private buildPrompt(): string {
    let prompt = '';
    
    for (const msg of this.conversationHistory) {
      if (msg.role === 'system') {
        prompt += `<|system|>\n${msg.content}\n`;
      } else if (msg.role === 'user') {
        prompt += `<|user|>\n${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        prompt += `<|assistant|>\n${msg.content}\n`;
      }
    }
    
    prompt += '<|assistant|>\n';
    return prompt;
  }

  /**
   * Clean up response
   */
  private cleanResponse(text: string): string {
    // Remove any remaining tags
    let cleaned = text
      .replace(/<\|[^|]+\|>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    // Limit length
    if (cleaned.length > 1000) {
      cleaned = cleaned.substring(0, 1000) + '...';
    }
    
    return cleaned;
  }

  /**
   * Intelligent fallback responses in Tunisian dialect
   */
  private getIntelligentFallback(userMessage: string): string {
    const lower = userMessage.toLowerCase();
    
    // Greetings
    if (lower.match(/salem|salam|sbah|msa|ahla|bonsoir|bonjour|hello|hi/)) {
      const greetings = [
        'Ahla bik! Kifeh najem n3awnek lyoum?',
        'Salem! Marhba bik fel STEG. Chnou t7eb?',
        'Ahla wesahla! Ana assistant STEG, 3awedli chnou t7eb.',
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Invoice/Bill queries
    if (lower.match(/fatura|facture|flous|dinar|khlass|paiement|ndfa3/)) {
      return 'Bech nchouflek el fatura, a3tini numero abonnement mte3ek (STEG-XXXXX).\n\nKen t7eb tkhallas, fama barcha tor9:\n- Agence STEG\n- La Poste\n- E-dinar\n- Site web STEG';
    }
    
    // Power outage
    if (lower.match(/panne|kahrba|dhaw|coupur|kat3|matfiya/)) {
      return 'Samahni 3al mochkla!\n\nBech nsajjelek panne, 9ouli:\n- Adresse mte3ek\n- Wa9tech bdew el mochkla?\n\nWella appelli 1100 directement.';
    }
    
    // Gas issues
    if (lower.match(/gaz|fuite|ri7a/)) {
      return 'ATTENTION! Ken fama ri7et gaz:\n\n1. Matwallich el dhaw\n2. O5rej mel dar\n3. Appelli 197 wella 1100 TAWA\n\nEl securite awel haja!';
    }
    
    // Complaints
    if (lower.match(/chekwa|reclamation|mochkl|probleme/)) {
      return 'Bech nsajjelek chekwa. 9ouli:\n- Numero abonnement\n- Type el mochkla\n- Details o5rin\n\nWella rouh l site: www.steg.com.tn';
    }
    
    // Subscription info
    if (lower.match(/abonnement|contrat|compteur/)) {
      return 'Lel ma3loumet 3al abonnement mte3ek:\n\n- A3tini numero STEG-XXXXX\n- Wella rouh l agence STEG el 9riba\n- Wella site web: www.steg.com.tn';
    }
    
    // Thanks
    if (lower.match(/merci|shukr|3aychek|yaatik/)) {
      return 'El 3afou! Ken 3andek ay so2el o5er, ana hne.\n\nYom s3id! 🌟';
    }
    
    // Help
    if (lower.match(/help|aide|3awni|kifeh/)) {
      return 'Najem n3awnek fi:\n\n📄 Fatura - tchouf w tkhallas\n⚡ Panne - tsajjel coupure\n🔧 Chekwa - reclamation\n📋 Abonnement - ma3loumet\n\nChnou t7eb?';
    }
    
    // Default
    return 'Mafahamtech mli7. Jarreb 9ouli:\n\n- "Fatura mte3i" - bech tchouf\n- "3andi panne" - bech tsajjel\n- "N7eb ncheki" - reclamation\n- "Kifeh nkhallas?" - tor9 el khlass\n\nWella appelli 1100 🏠';
  }

  /**
   * Check if API is available
   */
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(CONFIG.huggingFaceEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: 'test',
          parameters: { max_new_tokens: 1 }
        }),
      });
      
      // 503 means model is loading but API is available
      return response.ok || response.status === 503;
    } catch {
      return false;
    }
  }

  /**
   * Check model availability
   */
  async checkModel(): Promise<boolean> {
    return this.checkConnection();
  }

  /**
   * Reset conversation
   */
  resetConversation(): void {
    this.conversationHistory = [
      { role: 'system', content: STEG_SYSTEM_PROMPT }
    ];
  }

  /**
   * Enable/disable local fallback
   */
  setUseFallback(use: boolean): void {
    this.useLocalFallback = use;
  }
}

// Singleton instance
export const labessAI = new LabessAIService();
export { LabessAIService };
