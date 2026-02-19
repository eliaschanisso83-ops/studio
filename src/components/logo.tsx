
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className, size = 32, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div 
        className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
        style={{ width: size, height: size }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
        
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 w-full h-full"
        >
          {/* Outer Ring */}
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" className="text-white/10" />
          <path
            d="M50 2A48 48 0 0 1 98 50"
            stroke="url(#logo_gradient_1)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Forge/Gamepad Icon */}
          <path
            d="M30 45C30 38.3726 35.3726 33 42 33H58C64.6274 33 70 38.3726 70 45V60C70 66.6274 64.6274 72 58 72H42C35.3726 72 30 66.6274 30 60V45Z"
            fill="black"
            stroke="url(#logo_gradient_1)"
            strokeWidth="3"
          />
          
          {/* Buttons/Controls */}
          <circle cx="40" cy="48" r="4" fill="currentColor" className="text-primary" />
          <circle cx="40" cy="58" r="4" fill="currentColor" className="text-primary/40" />
          <path d="M58 45V55M53 50H63" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-accent" />
          
          {/* AI Spark */}
          <path
            d="M50 20L53 28H47L50 20Z"
            fill="currentColor"
            className="text-primary animate-pulse"
          />
          
          <defs>
            <linearGradient id="logo_gradient_1" x1="2" y1="2" x2="98" y2="98" gradientUnits="userSpaceOnUse">
              <stop stopColor="hsl(var(--primary))" />
              <stop offset="1" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-headline font-bold tracking-tighter text-white">
            FORGE<span className="text-primary">.AI</span>
          </span>
          <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white/30 italic">
            Pro_Engine_v2.5
          </span>
        </div>
      )}
    </div>
  );
}
