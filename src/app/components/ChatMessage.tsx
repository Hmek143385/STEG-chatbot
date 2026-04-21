import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-steg-red' : 'bg-steg-blue'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isUser
            ? 'bg-steg-red text-white'
            : 'bg-card text-card-foreground border border-border'
        }`}>
          <p className="whitespace-pre-wrap">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">{timestamp}</span>
      </div>
    </div>
  );
}
