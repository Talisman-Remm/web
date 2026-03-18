import { ArrowRight, Cpu, Zap, BarChart2 } from 'lucide-react';

const HERO_BG = 'https://storage.googleapis.com/talisman/SocialMedia2026-03-13T17:17:47.545Z.PNG';

export default function LandingV2() {
  return (
    <div className="min-h-screen text-white flex flex-col font-['Inter']">

      {/* NAVBAR */}
      <nav className="w-full px-8 py-5 flex items-center justify-between bg-[#0A0F2C] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">AI Automation</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#" className="hover:text-white transition-colors">Solutions</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button className="bg-white text-[#0A0F2C] text-sm px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors font-semibold">
          Get Started
        </button>
      </nav>

      {/* HERO */}
      <main
        className="flex-1 flex flex-col items-center justify-center px-6 text-center w-full py-24 relative min-h-screen"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Gradiente: color sólido arriba → transparente abajo */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(to bottom, #0A0F2C 0%, #0A0F2C 30%, rgba(10,15,44,0.6) 60%, transparent 100%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">

          <span className="inline-block bg-white/10 backdrop-blur-sm text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase border border-white/20">
            AI-Powered Workflows
          </span>

          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
            Automate Smarter.
            <br />
            <span className="text-blue-300">Grow Faster.</span>
          </h1>

          <p className="text-xl text-white/70 max-w-xl mb-10 leading-relaxed font-light">
            We build AI systems that work while you sleep. Streamline operations, reduce costs, and scale with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="flex items-center gap-2 bg-white text-[#0A0F2C] px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all text-base shadow-lg">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="text-white/60 text-base hover:text-white transition-colors px-6 py-4 underline underline-offset-4">
              See how it works
            </button>
          </div>

          {/* STATS */}
          <div className="mt-20 grid grid-cols-3 gap-8 border-t border-white/10 pt-12 w-full max-w-2xl">
            {[
              { icon: Zap, value: '10x', label: 'Faster workflows' },
              { icon: BarChart2, value: '87%', label: 'Cost reduction' },
              { icon: Cpu, value: '500+', label: 'Automations built' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-5 h-5 text-blue-300" />
                <span className="text-3xl font-bold text-white">{value}</span>
                <span className="text-sm text-white/40">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-white/30 border-t border-white/10 bg-[#0A0F2C]">
        © {new Date().getFullYear()} AI Automation. All rights reserved.
      </footer>
    </div>
  );
}