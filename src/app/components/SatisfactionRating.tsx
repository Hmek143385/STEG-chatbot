import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';

interface SatisfactionRatingProps {
  onRate: (rating: number, feedback?: string) => void;
}

export function SatisfactionRating({ onRate }: SatisfactionRatingProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleQuickRating = (isPositive: boolean) => {
    const rating = isPositive ? 5 : 2;
    setSelectedRating(rating);
    setShowFeedback(true);
  };

  const handleStarRating = (rating: number) => {
    setSelectedRating(rating);
    setShowFeedback(true);
  };

  const handleSubmit = () => {
    if (selectedRating) {
      onRate(selectedRating, feedback);
      setShowFeedback(false);
      setFeedback('');
    }
  };

  if (showFeedback) {
    return (
      <div className="bg-gradient-to-r from-steg-blue/5 to-steg-red/5 border border-steg-blue/20 rounded-xl p-4 my-2">
        <p className="text-sm font-medium text-foreground mb-3">
          Merci! T7eb tzid commentaire? (optional)
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Ra2yek ya3tina fi el service..."
          className="w-full px-3 py-2 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-steg-blue bg-card"
          rows={3}
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-steg-blue hover:bg-steg-blue-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Ab3ath
          </button>
          <button
            onClick={() => {
              onRate(selectedRating!, '');
              setShowFeedback(false);
            }}
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-sm font-medium transition-colors"
          >
            Ma7ebtech
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-steg-blue/5 to-steg-red/5 border border-steg-blue/20 rounded-xl p-4 my-2">
      <p className="text-sm font-medium text-foreground mb-3 text-center">
        El jaweb hetha nafe3ek wala le?
      </p>

      {/* Quick rating */}
      <div className="flex gap-3 justify-center mb-4">
        <button
          onClick={() => handleQuickRating(true)}
          className="flex items-center gap-2 bg-success/10 hover:bg-success/20 text-success px-4 py-2 rounded-lg transition-colors"
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm font-medium">Ey</span>
        </button>
        <button
          onClick={() => handleQuickRating(false)}
          className="flex items-center gap-2 bg-steg-red/10 hover:bg-steg-red/20 text-steg-red px-4 py-2 rounded-lg transition-colors"
        >
          <ThumbsDown className="w-4 h-4" />
          <span className="text-sm font-medium">Le</span>
        </button>
      </div>

      {/* Star rating */}
      <div className="border-t border-border pt-3">
        <p className="text-xs text-muted-foreground text-center mb-2">Wala 3ayet men 1 lel 5 njoum:</p>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleStarRating(rating)}
              className="hover:scale-110 transition-transform"
            >
              <Star className="w-6 h-6 text-warning fill-warning" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
