import { useState } from "react";
import { Send, RotateCcw, Sparkles } from "lucide-react";
import { storyTemplates } from "@/data/story";

interface StoryInputProps {
  onSubmit: (input: string) => void;
  onReset: () => void;
  isLoading: boolean;
}

export function StoryInput({ onSubmit, onReset, isLoading }: StoryInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion + " ");
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute bottom-full left-0 right-0 mb-2 parchment-texture rounded-lg shadow-lg border border-gold/30 overflow-hidden z-30">
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2 font-display">Story starters:</p>
            <div className="space-y-1">
              {storyTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(template)}
                  className="w-full text-left px-3 py-2 text-sm text-card-foreground hover:bg-crimson/10 rounded transition-colors font-body"
                >
                  {template}...
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main input area */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What happens next in the adventure?"
            disabled={isLoading}
            className="w-full px-4 py-3 pr-24 bg-parchment border-2 border-gold/40 rounded-lg font-body text-card-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all disabled:opacity-50"
          />
          
          {/* Input actions */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="p-2 text-gold hover:text-gold-light transition-colors"
              title="Story suggestions"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-crimson text-secondary-foreground rounded-md hover:bg-crimson-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reset button */}
        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-wood/80 text-foreground rounded-lg hover:bg-wood transition-colors font-display text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Story
        </button>
      </form>
    </div>
  );
}
