import { Header } from "@/components/Header";
import { Storybook } from "@/components/Storybook";
import { Snowfall } from "@/components/Snowfall";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Snowfall effect */}
      <Snowfall />

      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none z-0" />

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-6 md:py-12">
        <Header />
        <Storybook />

        {/* Footer */}
        <footer className="text-center mt-10 pb-6">
          <p className="font-body text-sm text-foreground/50 italic">
            A magical tale of adventure, friendship, and the spirit of Christmas
          </p>
          <p className="font-display text-xs text-gold/60 mt-2">
            ✦ Choose Your Own Adventure ✦
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
