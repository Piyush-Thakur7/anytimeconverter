import React from 'react';
import Generator from '@/components/Generator';
import { Metadata } from 'next';

// TODO: Manually verify the Free Fire 12-character limit in-game before launching.
const FF_LIMIT = 12;

export const metadata: Metadata = {
  title: 'Free Fire Name Generator — Stylish Nicknames for FF Max',
  description: 'Generate stylish names and fancy fonts for Free Fire. Live 12-character limit counter, invisible spacing symbols, crowns, wings, and step-by-step instructions.',
  keywords: ['free fire name generator', 'ff stylish name', 'free fire nick finder', 'invisible space free fire', 'ff name change'],
};

export default function FreeFireNameGeneratorPage() {
  // FAQ Schema JSON-LD structure
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is the character limit for Free Fire nicknames?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The nickname limit in Free Fire (and Free Fire Max) is exactly 12 characters, including any letters, custom font lookalikes, symbols, and invisible spacing codes.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I put a space in my Free Fire name?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Free Fire strips ordinary spacebar inputs. To add spacing, copy the Hangul Filler (U+3164) character from our Invisible Text section and paste it between your words.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How many diamonds are required to change my nickname in Free Fire?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'It costs 390 Diamonds to change your nickname, or you can use a Name Change Card which is frequently available in the guild store or seasonal events.'
        }
      }
    ]
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-fadeIn">
      {/* FAQ Schema Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header and Explainer */}
      <section className="space-y-4 mb-10 text-center md:text-left">
        <div className="inline-flex items-center space-x-1.5 rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600 dark:bg-orange-950/30 dark:text-orange-400">
          <span>🔥 Free Fire Max Nicknames</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl md:text-5xl">
          Free Fire Stylish Name Generator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          Create premium stylish nicknames for Free Fire Max. Our generator automatically tracks the strict <strong>12-character limit</strong> imposed by Garena, warning you if your custom fonts and symbols exceed the bounds.
        </p>
      </section>

      {/* Generator Component */}
      <section className="mb-14">
        <Generator gameLimit={FF_LIMIT} gameName="Free Fire" />
      </section>

      {/* Paste Instructions */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900 mb-14 space-y-6">
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-150">
          📋 How to Change Your Nickname in Free Fire (Step-by-Step)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-650 dark:text-slate-450 leading-relaxed">
            <li>
              Generate your favorite name using the tool above and click the <strong>Copy</strong> button.
            </li>
            <li>
              Open the <strong>Free Fire Max</strong> app on your Android or iOS device.
            </li>
            <li>
              Tap your <strong>Profile Banner</strong> in the top-left corner of the main lobby.
            </li>
            <li>
              Tap the yellow <strong>Edit Icon</strong> (pencil inside a notepad symbol) near your avatar.
            </li>
            <li>
              Select your current nickname field to open the Naming dialog.
            </li>
            <li>
              Tap inside the new nickname field, paste your copied stylish name, and tap <strong>Confirm</strong> (costs 390 Diamonds or 1 Name Change Card).
            </li>
          </ol>

          {/* Screenshot placeholder box for premium layout */}
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-950 flex flex-col items-center justify-center min-h-[220px]">
            <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-bold text-slate-550 dark:text-slate-450 uppercase tracking-wider">
              [Screenshot Placeholder]
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
              Free Fire Profile Naming dialog showing the input text field and Name Change Card confirmation.
            </span>
          </div>
        </div>
      </section>

      {/* Manual FAQ Text Blocks */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-150">
          ❓ Frequently Asked Questions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100">
              Why did my Free Fire name get truncated?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              If your nickname is cut short, it exceeded the strict 12-character limit. Note that stylish Unicode characters and symbol decorations count as characters, and some complex emojis may occupy 2 to 4 slots in database indexing.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100">
              Can I use emojis in my Free Fire username?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              While standard mobile keyboard emojis (like 👍, 😂) are generally rejected or display as white squares, special symbolic diacritics (like ꧁ ꧂, ☬, ༒) are fully supported by Free Fire Max.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
