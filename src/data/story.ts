export interface Chapter {
  id: number;
  title: string;
  content: string;
  userChoice?: string;
}

export const initialChapter: Chapter = {
  id: 1,
  title: "Chapter 1: Christmas Morning",
  content: `It was Christmas morning at the house on the hill, and the world was wrapped in a thick, glittering blanket of white. Inside, the air smelled of cinnamon and pine. Lindsey and Andrew sat by the fireplace, sipping hot cocoa from their favorite mugs. They watched the snow fall outside the frost-covered window, waiting for the morning's excitement to truly begin.

Suddenly, a blur of energy exploded into the room. It was five-year-old Ilo, his pajamas already slightly rumpled from his first wrestling match of the day with Biff, the family bulldog. Ilo lived for mischief and pranks, and today his eyes were dancing with ideas. Biff followed close behind, his tongue lolling out and his tail wagging so hard his whole back end wiggled. "It's time! It's time!" Ilo shouted, bouncing on his heels.

While Ilo was a whirlwind, ten-year old Violet was the calm center of the storm. She walked into the room holding a leather-bound notebook and a very sharp pencil. "Wait, Ilo," she said sternly, checking her list. "Phase one is the pre-gift breakfast. Phase two is the backyard sledding race. Gift opening is phase three, and it doesn't start for another hour."

The family headed out for the traditional backyard sledding race. But the snow was slicker than usual. Violet and Ilo hopped onto their big red sled, with Biff jumping into the middle. With a sudden whoosh, they hit a patch of blue ice! The sled didn't stop at the bottom of the hill. It sped faster and faster, gliding right past the garden fence and deep into the mysterious Frost Wood that bordered their home...`,
};

export const storyPrompts = [
  "They discover a hidden ice cave",
  "Biff finds mysterious paw prints in the snow",
  "A friendly snow owl appears with a message",
  "The Snowball Guardians sense magic nearby",
  "Ilo spots something glittering in the trees",
  "Violet's notebook begins to glow",
];

export function getChapterTitle(chapter: number): string {
  const titles = [
    "Christmas Morning",
    "Into the Unknown",
    "The Frost Wood Secret",
    "Biff's Discovery",
    "The Guardian's Path",
    "Whispers in the Snow",
    "The Crystal Challenge",
    "A Magical Encounter",
    "The Winter Spirit",
    "Home at Last",
    "A New Mystery",
    "The Frozen Trail",
    "Courage in the Cold",
    "The Final Chapter",
  ];
  return titles[Math.min(chapter - 1, titles.length - 1)];
}
