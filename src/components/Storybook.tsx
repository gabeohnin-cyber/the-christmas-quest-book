import { useStoryGeneration } from "@/hooks/useStoryGeneration";
import { BookSpine } from "./BookSpine";
import { StoryPage } from "./StoryPage";
import { IllustrationPlaceholder } from "./IllustrationPlaceholder";
import { StoryInput } from "./StoryInput";
import { cn } from "@/lib/utils";

export function Storybook() {
  const {
    chapters,
    currentChapter,
    currentChapterIndex,
    isLoading,
    isAnimating,
    flipDirection,
    generateNextChapter,
    resetStory,
    goToPreviousChapter,
    goToNextChapter,
  } = useStoryGeneration();

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Book container */}
      <div className="book-container relative bg-wood rounded-lg overflow-hidden">
        {/* Wood grain decoration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-transparent" />
        </div>

        {/* Book pages container with perspective */}
        <div className="relative p-3 md:p-6" style={{ perspective: "2000px" }}>
          <div className="relative flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
            {/* Left page - Story */}
            <div 
              className={cn(
                "flex-1 parchment-texture page-shadow rounded-l-sm md:rounded-l-lg p-4 md:p-8 relative order-1",
                "transition-all duration-500 ease-in-out",
                isAnimating && flipDirection === "forward" && "page-flip-out-forward",
                isAnimating && flipDirection === "backward" && "page-flip-out-backward",
                !isAnimating && flipDirection === null && "page-flip-reset"
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              <StoryPage chapter={currentChapter} isAnimating={isAnimating} />
            </div>

            {/* Book spine */}
            <BookSpine />

            {/* Right page - Illustration */}
            <div 
              className={cn(
                "flex-1 parchment-texture page-shadow rounded-r-sm md:rounded-r-lg relative order-2 mt-4 md:mt-0",
                "transition-all duration-500 ease-in-out",
                isAnimating && flipDirection === "forward" && "page-flip-in-forward",
                isAnimating && flipDirection === "backward" && "page-flip-in-backward",
                !isAnimating && flipDirection === null && "page-flip-reset"
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              <IllustrationPlaceholder chapterNumber={currentChapter.id} />
            </div>
          </div>

          {/* Page navigation */}
          {chapters.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gold/20">
              <button
                onClick={goToPreviousChapter}
                disabled={currentChapterIndex === 0 || isAnimating}
                className="px-4 py-2 font-display text-sm text-foreground bg-wood-dark/50 rounded hover:bg-wood-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <span className="font-display text-sm text-foreground/70">
                {currentChapterIndex + 1} of {chapters.length}
              </span>
              <button
                onClick={goToNextChapter}
                disabled={currentChapterIndex === chapters.length - 1 || isAnimating}
                className="px-4 py-2 font-display text-sm text-foreground bg-wood-dark/50 rounded hover:bg-wood-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Story input */}
      <div className="mt-6 parchment-texture rounded-lg p-4 md:p-6 shadow-lg border border-gold/30">
        <StoryInput
          onSubmit={generateNextChapter}
          onReset={resetStory}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
