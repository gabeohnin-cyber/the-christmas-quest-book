import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="text-center py-6 md:py-10">
      {/* Decorative flourish */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-gold" />
        <BookOpen className="w-6 h-6 text-gold" />
        <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-gold" />
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-wide mb-2 text-shadow-gold">
        The Great Christmas Quest
      </h1>

      {/* Subtitle */}
      <p className="font-body text-base md:text-lg text-foreground/80 italic">
        of the Frost Wood
      </p>

      {/* Author */}
      <p className="font-display text-sm text-gold mt-3">
        By John Kayl
      </p>

      {/* Bottom flourish */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
        <div className="w-8 h-[1px] bg-gold/40" />
        <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-gold/60 to-transparent" />
      </div>
    </header>
  );
}
