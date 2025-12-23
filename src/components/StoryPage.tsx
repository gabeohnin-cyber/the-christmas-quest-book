import { Chapter } from "@/data/story";

interface StoryPageProps {
  chapter: Chapter;
  isAnimating: boolean;
}

export function StoryPage({ chapter, isAnimating }: StoryPageProps) {
  return (
    <div
      className={`h-full flex flex-col ${isAnimating ? "animate-fade-in" : ""}`}
    >
      {/* Chapter header */}
      <div className="mb-4 pb-3 border-b border-gold/30">
        <h2 className="font-display text-lg md:text-xl text-crimson font-semibold tracking-wide">
          {chapter.title}
        </h2>
        {chapter.userChoice && (
          <p className="mt-2 text-xs text-muted-foreground italic">
            Your choice: "{chapter.userChoice}"
          </p>
        )}
      </div>

      {/* Story content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="story-text text-sm md:text-base leading-relaxed">
          {chapter.content.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className={`mb-4 ${index === 0 ? "" : "first-letter:text-base first-letter:float-none"}`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Page number */}
      <div className="mt-4 pt-3 border-t border-gold/20 text-center">
        <span className="font-display text-sm text-muted-foreground">
          — {chapter.id} —
        </span>
      </div>
    </div>
  );
}
