import { useState } from "react";
import { Send, RotateCcw, Sparkles, Loader2 } from "lucide-react";
import { storyPrompts } from "@/data/story";

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
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      {/* Suggestions dropdown */}
      {showSuggestions && !isLoading && (
        <div className="absolute bottom-full left-0 right-0 mb-2 parchment-texture rounded-lg shadow-lg border border-gold/30 overflow-hidden z-30">
          <div className="p-3">
            <p className="text-xs text-muted-foreground mb-2 font-display flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-gold" />
              Story ideas to inspire you:
            </p>
            <div className="space-y-1">
              {storyPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(prompt)}
                  className="w-full text-left px-3 py-2 text-sm text-card-foreground hover:bg-crimson/10 rounded transition-colors font-body"
                >
                  {prompt}
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
            {!isLoading && (
              <button
                type="button"
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="p-2 text-gold hover:text-gold-light transition-colors"
                title="Story suggestions"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-crimson text-secondary-foreground rounded-md hover:bg-crimson-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Loading message */}
        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-body italic">
            <Loader2 className="w-4 h-4 animate-spin text-gold" />
            The quill is writing your next chapter...
          </div>
        )}

        {/* Reset button */}
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-wood/80 text-foreground rounded-lg hover:bg-wood transition-colors font-display text-sm disabled:opacity-50"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Story
        </button>
      </form>
    </div>
  );
}
