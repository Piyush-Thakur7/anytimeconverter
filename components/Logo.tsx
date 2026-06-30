'use client';

import React, { useState } from 'react';

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex items-center space-x-3 cursor-pointer select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Nano Banana SVG Icon */}
      <div className="relative flex items-center justify-center w-12 h-12">
        {/* Glow effect background */}
        <div className={`absolute inset-0 rounded-full bg-yellow-400/20 blur-md transition-all duration-500 scale-75 group-hover:scale-125 group-hover:bg-yellow-400/40 dark:bg-yellow-500/10 dark:group-hover:bg-yellow-400/30`} />
        
        <svg 
          viewBox="0 0 100 100" 
          className={`w-10 h-10 transition-all duration-500 transform ${
            isHovered 
              ? 'scale-110 rotate-12 -translate-y-1 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]' 
              : 'scale-100 rotate-0 translate-y-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]'
          }`}
        >
          <defs>
            {/* Cyber Gradient */}
            <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" /> {/* Light Yellow */}
              <stop offset="60%" stopColor="#eab308" /> {/* Yellow-500 */}
              <stop offset="100%" stopColor="#ca8a04" /> {/* Yellow-600 */}
            </linearGradient>
            
            {/* Tech Cyber Grid Pattern */}
            <pattern id="nanoGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
            </pattern>
            
            {/* Cyberpunk Pink Accent Gradient */}
            <linearGradient id="cyberPink" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" /> {/* Pink-500 */}
              <stop offset="100%" stopColor="#a855f7" /> {/* Purple-500 */}
            </linearGradient>
          </defs>

          {/* Banana Body Path */}
          {/* A futuristic banana composed of geometric curves & panel cuts */}
          <path
            d="M 25 15 
               C 35 12, 65 15, 80 40 
               C 92 60, 85 85, 75 90 
               C 65 95, 72 82, 75 75
               C 80 62, 78 45, 65 30
               C 52 15, 30 22, 20 28
               Z"
            fill="url(#bananaGrad)"
            stroke={isHovered ? "#fde047" : "#ca8a04"}
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />

          {/* Tech overlay Grid (makes it "Nano") */}
          <path
            d="M 25 15 
               C 35 12, 65 15, 80 40 
               C 92 60, 85 85, 75 90 
               C 65 95, 72 82, 75 75
               C 80 62, 78 45, 65 30
               C 52 15, 30 22, 20 28
               Z"
            fill="url(#nanoGrid)"
            mask="url(#bananaMask)"
          />

          {/* Futuristic panel lines & glowing circuitry cuts */}
          <path
            d="M 40 22 C 50 20, 68 28, 73 45"
            fill="none"
            stroke={isHovered ? "#ffffff" : "rgba(254, 240, 138, 0.6)"}
            strokeWidth="1"
            strokeDasharray="4 2"
          />
          <path
            d="M 52 29 C 58 30, 68 38, 71 52"
            fill="none"
            stroke={isHovered ? "#ec4899" : "rgba(234, 179, 8, 0.4)"}
            strokeWidth="1"
          />

          {/* Nano stem (top joint) */}
          <path
            d="M 25 15 C 20 18, 15 15, 12 10 C 14 8, 22 10, 25 15 Z"
            fill="#854d0e"
            stroke="#ca8a04"
            strokeWidth="1"
          />

          {/* Nano tips/ports (bottom joint) */}
          <circle cx="75" cy="90" r="3" fill="#3f3f46" stroke="#f43f5e" strokeWidth="1" />
          
          {/* Floating cyber energy ring */}
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="18"
            fill="none"
            stroke="url(#cyberPink)"
            strokeWidth="1.5"
            strokeDasharray="20 10"
            transform="rotate(-25 50 50)"
            className={`transition-all duration-1000 ${
              isHovered ? 'animate-[spin_4s_linear_infinite]' : 'opacity-60'
            }`}
          />
          
          {/* Micro dots */}
          <circle cx="28" cy="45" r="1.5" fill="#22c55e" className={isHovered ? "animate-ping" : ""} />
          <circle cx="58" cy="62" r="1.5" fill="#3b82f6" className={isHovered ? "animate-ping" : ""} />
        </svg>
      </div>

      {/* Brand Wordmark with fancy font transition */}
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-pink-400 transition-all duration-300">
          {isHovered ? '꧁ 𝔖𝔱𝔶𝔩𝔢𝔑𝔞𝔪𝔢 ꧂' : '꧁ SᴛʏʟᴇNᴀᴍᴇ ꧂'}
        </span>
        <span className="text-[9px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 transition-colors group-hover:text-yellow-500 dark:group-hover:text-yellow-400">
          Nᴀɴᴏ Bᴀɴᴀɴᴀ Lᴀʙs
        </span>
      </div>
    </div>
  );
}
