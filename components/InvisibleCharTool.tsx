'use client';

import React, { useState, useEffect, useRef } from 'react';
import { INVISIBLE_CHARS, InvisibleChar } from '../lib/invisibleChars';

export default function InvisibleCharTool() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [word1, setWord1] = useState('DARK');
  const [word2, setWord2] = useState('SOUL');
  const [selectedCharId, setSelectedCharId] = useState('hangul-filler');
  const [isCombinedCopied, setIsCombinedCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const triggerToast = (message: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleCopy = async (text: string, id: string, isCombined: boolean = false) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      if (isCombined) {
        setIsCombinedCopied(true);
        setTimeout(() => setIsCombinedCopied(false), 1500);
      } else {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
      }
      triggerToast('Copied to Clipboard! 📋');
    } catch (err) {
      console.error(err);
      triggerToast('Failed to copy. Copy manually.');
    }
  };

  // Find the currently selected invisible character
  const selectedCharObj = INVISIBLE_CHARS.find(c => c.id === selectedCharId) || INVISIBLE_CHARS[0];
  const combinedResult = `${word1}${selectedCharObj.char}${word2}`;
  
  // Length calculations handling surrogate pairs
  const combinedLength = Array.from(combinedResult).length;

  return (
    <div className="w-full space-y-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-300 dark:bg-slate-100 dark:text-slate-950 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Explainer Section */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none">
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
          🤔 Why Do Games Block Normal Spaces?
        </h2>
        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
          <p>
            When you type a standard space using your keyboard spacebar, popular games like <span className="font-semibold text-orange-500">Free Fire</span> and <span className="font-semibold text-amber-500">BGMI (Battlegrounds Mobile India)</span> automatically strip it out. They do this to keep game database indexes clean and avoid formatting exploits.
          </p>
          <p>
            To bypass this restriction, players use <span className="font-semibold text-violet-500 dark:text-violet-400">Invisible Unicode characters</span>. These characters behave like letters (so the game database accepts them), but they display absolutely nothing on the screen. By pasting these in place of a space, you can create clean, spaced-out, or completely blank names!
          </p>
        </div>
      </div>

      {/* Spacing Widget */}
      <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 dark:border-slate-800/80 dark:bg-slate-900/40">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">
          🛠️ Name Spacing Creator Widget
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Word 1 */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">First Word</label>
                <input
                  type="text"
                  value={word1}
                  onChange={(e) => setWord1(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                />
              </div>

              {/* Word 2 */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Second Word</label>
                <input
                  type="text"
                  value={word2}
                  onChange={(e) => setWord2(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                />
              </div>
            </div>

            {/* Separator Character Selection */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Select Invisible Spacer</label>
              <select
                value={selectedCharId}
                onChange={(e) => setSelectedCharId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-violet-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {INVISIBLE_CHARS.map((char) => (
                  <option key={char.id} value={char.id}>
                    {char.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-violet-250 bg-violet-50/20 p-5 dark:border-violet-950/40 dark:bg-violet-950/5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  Combined Preview
                </span>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  Length: <span className="font-bold text-slate-600 dark:text-slate-300">{combinedLength}</span> chars
                </span>
              </div>
              
              <div className="rounded-xl bg-white border border-slate-200 p-4 text-center font-mono text-xl font-bold select-all dark:bg-slate-950 dark:border-slate-850 dark:text-slate-100">
                {combinedResult}
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 text-center">
                *The blank gap between letters is the invisible code.
              </p>
            </div>

            <button
              onClick={() => handleCopy(combinedResult, 'combined', true)}
              className={`w-full mt-4 rounded-xl py-3 text-sm font-bold transition-all shadow-md ${
                isCombinedCopied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-violet-600 text-white hover:bg-violet-750'
              }`}
            >
              {isCombinedCopied ? '✓ Copied Combined Result' : 'Copy Combined Result'}
            </button>
          </div>
        </div>
      </div>

      {/* Curated List of Characters */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          📋 Curated Invisible Unicode Characters
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {INVISIBLE_CHARS.map((char) => {
            const isCopied = copiedId === char.id;
            return (
              <div 
                key={char.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900"
              >
                <div className="space-y-3 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-850 dark:text-slate-150">
                      {char.name}
                    </h3>
                    <span className="rounded-lg bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {char.unicode}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {char.description}
                  </p>

                  {/* Compatibility notes table */}
                  <div className="grid grid-cols-2 gap-3 pt-1.5 border-t border-slate-150/40 dark:border-slate-800/50 text-xs">
                    <div>
                      <span className="block font-bold text-orange-500 uppercase tracking-wide text-[10px]">Free Fire</span>
                      <span className="text-slate-600 dark:text-slate-400">{char.ffCompatibility}</span>
                    </div>
                    <div>
                      <span className="block font-bold text-amber-500 uppercase tracking-wide text-[10px]">BGMI</span>
                      <span className="text-slate-600 dark:text-slate-400">{char.bgmiCompatibility}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 justify-center items-stretch md:w-44 flex-shrink-0">
                  {/* Invisible character sandbox display box */}
                  <div className="rounded-xl border border-dashed border-slate-200 p-2 text-center text-sm font-mono text-slate-400 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950">
                    Character: <span className="font-bold text-slate-800 dark:text-white bg-slate-200 dark:bg-slate-850 rounded px-1.5 py-0.5">{char.char}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(char.char, char.id)}
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all shadow-sm ${
                      isCopied
                        ? 'bg-emerald-500 text-white shadow-emerald-100'
                        : 'bg-violet-600 text-white hover:bg-violet-750'
                    }`}
                  >
                    {isCopied ? '✓ Copied' : 'Copy Character'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
