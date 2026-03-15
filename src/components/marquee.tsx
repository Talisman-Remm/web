import React from 'react';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  repeat?: number;
  style?: React.CSSProperties;
}

const Marquee = ({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
  style,
}: MarqueeProps) => {
  return (
    <div
      style={
        {
          '--duration': '40s',
          '--gap': '1rem',
          ...style,
        } as React.CSSProperties
      }
      className={`group flex overflow-hidden p-2 [gap:var(--gap)] ${className}`}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={[
              'flex shrink-0 justify-around [gap:var(--gap)]',
              'animate-marquee',
              reverse ? '[animation-direction:reverse]' : '',
              pauseOnHover ? 'group-hover:[animation-play-state:paused]' : '',
            ].join(' ')}
          >
            {children}
          </div>
        ))}

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% - var(--gap))); }
        }
        .animate-marquee {
          animation: marquee var(--duration) linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;