import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Chapter, initialChapter, getChapterTitle } from "@/data/story";

export type FlipDirection = "forward" | "backward" | null;

export function useStoryGeneration() {
  const [chapters, setChapters] = useState<Chapter[]>([initialChapter]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flipDirection, setFlipDirection] = useState<FlipDirection>(null);

  const currentChapter = chapters[currentChapterIndex];

  // Get all story content so far for context
  const getStoryContext = useCallback(() => {
    return chapters.map(ch => ch.content).join("\n\n---\n\n");
  }, [chapters]);

  const generateNextChapter = useCallback(
    async (userChoice: string) => {
      setIsLoading(true);
      setIsAnimating(true);
      setFlipDirection("forward");

      try {
        const newChapterNumber = chapters.length + 1;
        
        const { data, error } = await supabase.functions.invoke('generate-story', {
          body: {
            userChoice,
            previousContent: getStoryContext(),
            chapterNumber: newChapterNumber,
          },
        });

        if (error) {
          throw error;
        }

        if (data.error) {
          throw new Error(data.error);
        }

        const newChapter: Chapter = {
          id: newChapterNumber,
          title: `Chapter ${newChapterNumber}: ${getChapterTitle(newChapterNumber)}`,
          content: data.content,
          userChoice,
        };

        setChapters((prev) => [...prev, newChapter]);
        setCurrentChapterIndex(chapters.length);
        
        toast.success("A new chapter unfolds!", {
          description: `Chapter ${newChapterNumber} has been written`,
        });

      } catch (error: any) {
        console.error("Error generating story:", error);
        
        // Handle specific error cases
        if (error.message?.includes("429") || error.message?.includes("Rate limit")) {
          toast.error("Please wait a moment", {
            description: "The story quill needs a short rest. Try again in a few seconds.",
          });
        } else if (error.message?.includes("402") || error.message?.includes("usage limit")) {
          toast.error("Story credits depleted", {
            description: "Please check your workspace credits to continue the adventure.",
          });
        } else {
          toast.error("The magic faltered", {
            description: "Could not write the next chapter. Please try again.",
          });
        }
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setIsAnimating(false);
          setFlipDirection(null);
        }, 600);
      }
    },
    [chapters, getStoryContext]
  );

  const resetStory = useCallback(() => {
    setIsAnimating(true);
    setFlipDirection("backward");
    setTimeout(() => {
      setChapters([initialChapter]);
      setCurrentChapterIndex(0);
      setIsAnimating(false);
      setFlipDirection(null);
      toast.success("The story begins anew", {
        description: "Turn to page one and start your adventure!",
      });
    }, 600);
  }, []);

  const goToPreviousChapter = useCallback(() => {
    if (currentChapterIndex > 0) {
      setIsAnimating(true);
      setFlipDirection("backward");
      setTimeout(() => {
        setCurrentChapterIndex((prev) => prev - 1);
      }, 300);
      setTimeout(() => {
        setIsAnimating(false);
        setFlipDirection(null);
      }, 600);
    }
  }, [currentChapterIndex]);

  const goToNextChapter = useCallback(() => {
    if (currentChapterIndex < chapters.length - 1) {
      setIsAnimating(true);
      setFlipDirection("forward");
      setTimeout(() => {
        setCurrentChapterIndex((prev) => prev + 1);
      }, 300);
      setTimeout(() => {
        setIsAnimating(false);
        setFlipDirection(null);
      }, 600);
    }
  }, [currentChapterIndex, chapters.length]);

  return {
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
  };
}
