'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  response: React.ReactNode;
}

export default function InteractiveTerminal({ isOpen, onClose }: InteractiveTerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleGlobalKeyDown);
    }
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (history.length === 0) {
        setHistory([
          {
            command: 'welcome',
            response: (
              <div className="space-y-1 text-xs">
                <div className="text-emerald-400 font-bold">
                  ⚡ Piyush Singh Interactive Developer CLI [v2.6.0]
                </div>
                <div className="text-slate-400">
                  Type <span className="text-cyan-300 font-semibold">&apos;help&apos;</span> to see available system commands or <span className="text-cyan-300 font-semibold">&apos;about&apos;</span> to learn more.
                </div>
              </div>
            ),
          },
        ]);
      }
    }
  }, [isOpen, history.length]);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setCommandList(prev => [...prev, cmd]);
    setHistoryIndex(null);

    let output: React.ReactNode;

    switch (trimmed) {
      case 'help':
      case '?':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-emerald-400 font-bold mb-1">Available System Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-cyan-300 font-semibold">about</span> - Who is Piyush Singh?</div>
              <div><span className="text-cyan-300 font-semibold">skills</span> - List technical arsenal</div>
              <div><span className="text-cyan-300 font-semibold">projects</span> - View featured builds</div>
              <div><span className="text-cyan-300 font-semibold">milestones</span> - Google Ambassador & hackathons</div>
              <div><span className="text-cyan-300 font-semibold">contact</span> - Direct contact details</div>
              <div><span className="text-cyan-300 font-semibold">sudo hire-piyush</span> - Initiate interview</div>
              <div><span className="text-cyan-300 font-semibold">clear</span> - Clear terminal buffer</div>
              <div><span className="text-cyan-300 font-semibold">exit</span> - Close terminal console</div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-emerald-400 font-bold">{PORTFOLIO_DATA.personal.name}</div>
            <div className="text-cyan-300">{PORTFOLIO_DATA.personal.headline}</div>
            <div className="text-slate-400">{PORTFOLIO_DATA.personal.summary}</div>
            <div className="text-slate-500 pt-1">📍 {PORTFOLIO_DATA.personal.location} | 🎖️ {PORTFOLIO_DATA.personal.ambassadorBadge}</div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs text-slate-300">
            {PORTFOLIO_DATA.skills.map((cat, idx) => (
              <div key={idx}>
                <span className="text-cyan-300 font-bold">{cat.title}:</span>{' '}
                <span className="text-slate-400">{cat.skills.map(s => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-emerald-400 font-bold">Featured Production Builds:</div>
            {PORTFOLIO_DATA.projects.map((p, idx) => (
              <div key={idx} className="border-l-2 border-slate-700 pl-2">
                <div className="font-bold text-slate-100">{p.title} <span className="text-[10px] text-cyan-400 font-normal">({p.status})</span></div>
                <div className="text-slate-400">{p.description}</div>
                {p.demoUrl && <div className="text-emerald-400 text-[11px]">🔗 {p.demoUrl}</div>}
              </div>
            ))}
          </div>
        );
        break;

      case 'milestones':
      case 'experience':
        output = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-purple-400 font-bold">Key Milestones & Programs:</div>
            {PORTFOLIO_DATA.milestones.map((m, idx) => (
              <div key={idx} className="border-l-2 border-purple-500/40 pl-2">
                <div className="font-semibold text-slate-100">{m.title} ({m.year})</div>
                <div className="text-slate-400">{m.organization} — {m.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
      case 'socials':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-emerald-400 font-bold">Get In Touch:</div>
            <div>📧 Email: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-cyan-300 hover:underline">{PORTFOLIO_DATA.personal.email}</a></div>
            <div>📞 Phone: <span className="text-slate-300">{PORTFOLIO_DATA.personal.phone}</span></div>
            <div>💼 LinkedIn: <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">{PORTFOLIO_DATA.personal.linkedin}</a></div>
            <div>💻 GitHub: <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">{PORTFOLIO_DATA.personal.github}</a></div>
          </div>
        );
        break;

      case 'sudo hire-piyush':
      case 'hire':
        output = (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-1 text-emerald-300">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Permission Granted! Initiating Direct Line...</span>
            </div>
            <div className="text-slate-300">
              Piyush Singh is actively exploring AI/ML and Full-Stack Engineering roles.
            </div>
            <div className="pt-2">
              <a 
                href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Exciting%20Opportunity%20for%20Piyush%20Singh`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
              >
                <span>Send Email to Piyush &rarr;</span>
              </a>
            </div>
          </div>
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      case '':
        output = null;
        break;

      default:
        output = (
          <div className="text-xs text-rose-400">
            command not found: &apos;{trimmed}&apos;. Type <span className="text-cyan-300 font-semibold">&apos;help&apos;</span> to see valid commands.
          </div>
        );
    }

    setHistory(prev => [...prev, { command: cmd, response: output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex === null ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandList[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandList.length) {
        setHistoryIndex(null);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandList[nextIndex]);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={`relative w-full rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col font-mono text-slate-200 overflow-hidden transition-all duration-300 ${
          isMaximized ? 'max-w-5xl h-[85vh]' : 'max-w-2xl h-[480px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <div className="flex items-center gap-1.5 ml-2 text-xs text-slate-400">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>piyush@cyberdeck:~</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-white"
              title={isMaximized ? "Restore size" : "Maximize"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white"
              title="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Buffer */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar text-xs leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">➜</span>
                  <span className="text-cyan-300">~</span>
                  <span className="text-white font-medium">{item.command}</span>
                </div>
              )}
              {item.response && (
                <div className="pl-4">
                  {item.response}
                </div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-bold">➜</span>
            <span className="text-cyan-300">~</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-100 outline-none font-mono text-xs caret-emerald-400"
              placeholder="type 'help'..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div ref={terminalBottomRef} />
        </div>

        {/* Terminal Footer Info */}
        <div className="px-4 py-1.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
          <span>Interactive Shell</span>
          <span className="hidden sm:inline">Use ↑/↓ for command history</span>
        </div>
      </div>
    </div>
  );
}
