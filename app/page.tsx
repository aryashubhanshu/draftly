export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] font-sans selection:bg-indigo-500/30">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.1),transparent_50%)]" />
      
      {/* Center glowing orb */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,rgba(0,0,0,0)_70%)] blur-2xl" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div 
          className="mb-8 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium uppercase tracking-widest text-zinc-400 backdrop-blur-md transition-colors hover:bg-white/10"
          style={{ animation: 'fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          Coming Soon
        </div>
        
        <h1 
          className="mb-6 bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent opacity-0 sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ animation: 'fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards' }}
        >
          Draftly
        </h1>
        
        <p 
          className="max-w-[500px] text-lg leading-relaxed text-zinc-400 opacity-0 sm:text-xl md:text-2xl"
          style={{ animation: 'fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' }}
        >
          Create stunning social media posts with ease.
        </p>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}