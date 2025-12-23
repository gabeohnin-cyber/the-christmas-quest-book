export function BookSpine() {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-20 hidden md:block">
      {/* Main spine */}
      <div className="absolute inset-0 bg-gradient-to-r from-wood-dark via-wood to-wood-dark rounded-sm" />
      
      {/* Gold decorative lines */}
      <div className="absolute inset-y-4 left-1 w-[2px] bg-gradient-to-b from-gold via-gold-light to-gold opacity-60" />
      <div className="absolute inset-y-4 right-1 w-[2px] bg-gradient-to-b from-gold via-gold-light to-gold opacity-60" />
      
      {/* Center shadow for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
      
      {/* Top and bottom caps */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-wood to-wood-dark rounded-t-sm" />
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-wood to-wood-dark rounded-b-sm" />
    </div>
  );
}
