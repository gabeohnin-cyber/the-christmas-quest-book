import { useState, useCallback } from "react";
import { Chapter, initialChapter, generateNextChapter } from "@/data/story";
import { BookSpine } from "./BookSpine";
import { StoryPage } from "./StoryPage";
import { IllustrationPlaceholder } from "./IllustrationPlaceholder";
import { StoryInput } from "./StoryInput";

export function Storybook() {
  const [chapters, setChapters] = useState<Chapter[]>([initialChapter]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentChapter = chapters[currentChapterIndex];

  const handleSubmit = useCallback(
    async (userInput: string) => {
      setIsLoading(true);
      setIsAnimating(true);

      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newChapter = generateNextChapter(userInput, chapters.length + 1);
      setChapters((prev) => [...prev, newChapter]);
      setCurrentChapterIndex(chapters.length);

      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [chapters.length]
  );

  const handleReset = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setChapters([initialChapter]);
      setCurrentChapterIndex(0);
      setIsAnimating(false);
    }, 300);
  }, []);

  const handlePrevious = () => {
    if (currentChapterIndex > 0) {
      setIsAnimating(true);
      setCurrentChapterIndex((prev) => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleNext = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setIsAnimating(true);
      setCurrentChapterIndex((prev) => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Book container */}
      <div className="book-container relative bg-wood rounded-lg overflow-hidden">
        {/* Wood grain decoration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-transparent" />
        </div>

        {/* Book pages container */}
        <div className="relative p-3 md:p-6">
          <div className="relative flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
            {/* Left page - Story */}
            <div className="flex-1 parchment-texture page-shadow rounded-l-sm md:rounded-l-lg p-4 md:p-8 relative order-1">
              <StoryPage chapter={currentChapter} isAnimating={isAnimating} />
            </div>

            {/* Book spine */}
            <BookSpine />

            {/* Right page - Illustration */}
            <div className="flex-1 parchment-texture page-shadow rounded-r-sm md:rounded-r-lg relative order-2 mt-4 md:mt-0">
              <IllustrationPlaceholder chapterNumber={currentChapter.id} />
            </div>
          </div>

          {/* Page navigation */}
          {chapters.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gold/20">
              <button
                onClick={handlePrevious}
                disabled={currentChapterIndex === 0}
                className="px-4 py-2 font-display text-sm text-foreground bg-wood-dark/50 rounded hover:bg-wood-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <span className="font-display text-sm text-foreground/70">
                {currentChapterIndex + 1} of {chapters.length}
              </span>
              <button
                onClick={handleNext}
                disabled={currentChapterIndex === chapters.length - 1}
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
          onSubmit={handleSubmit}
          onReset={handleReset}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
