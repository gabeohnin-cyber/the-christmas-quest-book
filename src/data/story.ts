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

export const storyTemplates = [
  "The brave adventurers discovered",
  "Biff sniffed the air and led them toward",
  "Suddenly, a magical creature appeared—",
  "The Snowball Guardians barked excitedly as they saw",
  "Hidden beneath the snow, they found",
  "A voice echoed through the frost-covered trees:",
];

export function generateNextChapter(userChoice: string, chapterNumber: number): Chapter {
  const templates = [
    `${userChoice}\n\nBiff's ears perked up at this unexpected turn of events. His stubby tail wagged with excitement as he led the way deeper into the adventure. The Snowball Guardians—two fluffy white Bichon Frises named Snowdrop and Flurry—bounded ahead, leaving tiny pawprints in the fresh powder snow.\n\n"Look!" Violet exclaimed, pointing ahead. The path before them shimmered with an otherworldly glow. Ilo grabbed Biff's collar, his eyes wide with wonder. "This is even better than opening presents!" he whispered.`,
    
    `${userChoice}\n\nThe Frost Wood seemed to respond to this choice, the ancient pines creaking and swaying as if nodding in approval. Biff let out a mighty "WOOF!" that echoed through the crystalline forest. The Snowball Guardians circled around the children protectively, their white fur almost invisible against the snow.\n\nViolet quickly sketched a map in her notebook. "According to my calculations," she said thoughtfully, "we're about to discover something extraordinary."`,
    
    `${userChoice}\n\nSnowdrop and Flurry, the loyal Snowball Guardians, immediately sprang into action. Their fluffy white coats bristled with determination as they flanked Biff on either side. The bulldog's wrinkled face seemed to smile—he knew he had the best backup team in all of Frost Wood.\n\n"Come on, everyone!" Ilo shouted, already running ahead. "The adventure is just getting started!" Even Violet couldn't help but grin, tucking her notebook under her arm and racing after her brother.`,
  ];

  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

  return {
    id: chapterNumber,
    title: `Chapter ${chapterNumber}: ${getChapterTitle(chapterNumber)}`,
    content: randomTemplate,
    userChoice,
  };
}

function getChapterTitle(chapter: number): string {
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
  ];
  return titles[Math.min(chapter - 1, titles.length - 1)];
}
