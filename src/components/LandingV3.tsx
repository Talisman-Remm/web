import { ArrowRight, Zap, Terminal, Cpu } from 'lucide-react';

export default function LandingV3() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-['Inter'] overflow-hidden">

      {/* GLOW BACKGROUNDS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 w-full px-8 py-5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 border border-purple-500/50 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-bold text-lg tracking-widest uppercase text-white">AI Automation</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/40 tracking-wider uppercase">
          <a href="#" className="hover:text-purple-400 transition-colors">Systems</a>
          <a href="#" className="hover:text-purple-400 transition-colors">About</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Deploy</a>
        </div>
        <button className="relative group px-6 py-2.5 text-sm font-bold tracking-widest uppercase text-purple-400 border border-purple-500/50 hover:border-purple-400 transition-all hover:bg-purple-500/10">
          Launch Now
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.3)]" />
        </button>
      </nav>

      {/* HERO */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto w-full py-20">

        {/* BADGE */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 mb-8">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">System Online — v3.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        {/* HEADLINE */}
        <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-6 tracking-tight">
          <span className="block text-white">THE FUTURE OF</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(90deg, #a855f7, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AUTOMATION
          </span>
          <span className="block text-white">IS HERE.</span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-lg md:text-xl text-white/40 max-w-lg mb-12 leading-relaxed font-light tracking-wide">
          Unleash AI. Dominate your industry. We engineer systems that make your competitors obsolete.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            className="group flex items-center gap-3 px-10 py-4 font-bold uppercase tracking-widest text-sm text-black transition-all"
            style={{ background: 'linear-gradient(90deg, #a855f7, #22d3ee)' }}
          >
            <Zap className="w-4 h-4" />
            Deploy Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="text-white/30 text-sm tracking-widest uppercase hover:text-white/60 transition-colors px-6 py-4 border border-white/5 hover:border-white/20">
            View Systems
          </button>
        </div>

        {/* GRID STATS */}
        <div className="mt-20 grid grid-cols-3 gap-px bg-white/5 border border-white/5 w-full max-w-2xl">
          {[
            { value: '∞', label: 'Scalability' },
            { value: '0.01s', label: 'Response time' },
            { value: '99.9%', label: 'Uptime SLA' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-[#0A0A0A] px-6 py-8 flex flex-col items-center gap-2">
              <span
                className="text-4xl font-black"
                style={{
                  background: 'linear-gradient(90deg, #a855f7, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {value}
              </span>
              <span className="text-xs text-white/30 uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 py-6 text-center text-xs text-white/20 border-t border-white/5 tracking-widest uppercase font-mono">
        © {new Date().getFullYear()} AI Automation — All Systems Operational
      </footer>
    </div>
  );
}