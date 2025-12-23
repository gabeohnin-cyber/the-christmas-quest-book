import { Sparkles } from "lucide-react";
import chapter1Image from "@/assets/chapter1-illustration.png";

interface IllustrationPlaceholderProps {
  chapterNumber: number;
}

const scenes = [
  { title: "The Cozy Hearth", description: "A warm fireplace with stockings hung with care", hasImage: true },
  { title: "Into the Frost Wood", description: "Snow-laden pines tower over our brave heroes", hasImage: false },
  { title: "Biff Leads the Way", description: "The stalwart bulldog sniffs out adventure", hasImage: false },
  { title: "The Crystal Bramble", description: "Frozen vines glitter with dangerous beauty", hasImage: false },
  { title: "Guardian's Watch", description: "The Snowball Guardians stand vigilant", hasImage: false },
  { title: "A Magical Discovery", description: "Something wonderful awaits in the snow", hasImage: false },
];

const chapterImages: { [key: number]: string } = {
  1: chapter1Image,
};

export function IllustrationPlaceholder({ chapterNumber }: IllustrationPlaceholderProps) {
  const scene = scenes[Math.min(chapterNumber - 1, scenes.length - 1)];
  const image = chapterImages[chapterNumber];

  if (image) {
    return (
      <div className="relative w-full h-full min-h-[300px] flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Decorative frame */}
        <div className="absolute inset-4 border-2 border-gold/30 rounded-lg" />
        <div className="absolute inset-6 border border-gold/20 rounded-lg" />
        
        {/* Image */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
          <img 
            src={image} 
            alt={scene.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            style={{
              filter: "sepia(10%) saturate(90%)",
            }}
          />
        </div>

        {/* Caption */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-parchment/90 px-4 py-1 rounded-full border border-gold/30">
          <p className="font-display text-xs text-crimson text-center whitespace-nowrap">
            {scene.title}
          </p>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[300px] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Decorative frame */}
      <div className="absolute inset-4 border-2 border-gold/30 rounded-lg" />
      <div className="absolute inset-6 border border-gold/20 rounded-lg" />
      
      {/* Inner content */}
      <div className="relative z-10 text-center space-y-4">
        {/* Decorative icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-crimson/10 flex items-center justify-center mb-4 animate-pulse-glow">
          <Sparkles className="w-8 h-8 text-gold" />
        </div>
        
        {/* Scene title */}
        <h3 className="font-display text-xl text-crimson font-semibold">
          {scene.title}
        </h3>
        
        {/* Description */}
        <p className="font-body text-sm text-muted-foreground italic max-w-[200px]">
          {scene.description}
        </p>
        
        {/* Decorative flourish */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
          <div className="w-2 h-2 rotate-45 bg-gold/40" />
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
    </div>
  );
}
