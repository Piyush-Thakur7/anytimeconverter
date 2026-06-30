// Dataset of invisible Unicode characters for gaming nicknames

export interface InvisibleChar {
  id: string;
  name: string;
  unicode: string;
  char: string;
  description: string;
  // Game compatibility notes - using TODO comments as requested for manual verification before launch
  ffCompatibility: string; // Free Fire compatibility
  bgmiCompatibility: string; // BGMI compatibility
  generalCompatibility: string;
}

export const INVISIBLE_CHARS: InvisibleChar[] = [
  {
    id: 'hangul-filler',
    name: 'Hangul Filler (U+3164)',
    unicode: 'U+3164',
    char: '\u3164',
    description: 'This is the most popular character used to create completely invisible names or add spaces in games. It is treated as a valid letter by most game engines, preventing it from being stripped.',
    // TODO: Verify Free Fire compatibility manually before launching. Often works to bypass character restrictions.
    ffCompatibility: 'Highly Compatible (Works for creating invisible names or spacing).',
    // TODO: Verify BGMI compatibility manually before launching. Sometimes works to bypass naming constraints.
    bgmiCompatibility: 'Compatible (Works in most name versions, but subject to patch updates).',
    generalCompatibility: 'Works in Call of Duty Mobile, Apex Legends, and PUBG Mobile.'
  },
  {
    id: 'braille-blank',
    name: 'Braille Pattern Blank (U+2800)',
    unicode: 'U+2800',
    char: '\u2800',
    description: 'A 3-dot cell blank space, originally used for Braille. Many mobile games recognize it as a character instead of a space, preventing stripping.',
    // TODO: Verify Free Fire compatibility manually before launching.
    ffCompatibility: 'Likely Compatible (Untested, needs in-game verification).',
    // TODO: Verify BGMI compatibility manually before launching.
    bgmiCompatibility: 'Likely Compatible (Untested, needs in-game verification).',
    generalCompatibility: 'Widely compatible with general Steam and mobile games.'
  },
  {
    id: 'zero-width-space',
    name: 'Zero-Width Space (U+200B)',
    unicode: 'U+200B',
    char: '\u200b',
    description: 'An invisible space with zero width. Useful for bypassing minimum character length limits without visually expanding the name.',
    // TODO: Verify Free Fire compatibility manually before launching.
    ffCompatibility: 'Compatible (Mostly used to exceed minimum length limits).',
    // TODO: Verify BGMI compatibility manually before launching.
    bgmiCompatibility: 'Compatible (Bypasses minimum length limits, does not add visible space).',
    generalCompatibility: 'Compatible with Discord, Steam, and general websites.'
  },
  {
    id: 'ideographic-space',
    name: 'Ideographic Space (U+3000)',
    unicode: 'U+3000',
    char: '\u3000',
    description: 'A wide space used in Chinese, Japanese, and Korean typography. It matches the width of a full-width CJK character.',
    // TODO: Verify Free Fire compatibility manually before launching.
    ffCompatibility: 'Compatible (Creates a double-wide space).',
    // TODO: Verify BGMI compatibility manually before launching.
    bgmiCompatibility: 'Compatible (Useful for wide nickname gaps).',
    generalCompatibility: 'Works in most games that support CJK characters.'
  },
  {
    id: 'zero-width-non-joiner',
    name: 'Zero-Width Non-Joiner (U+200C)',
    unicode: 'U+200C',
    char: '\u200c',
    description: 'An invisible control character that prevents adjacent characters from forming ligatures. Zero visual width.',
    // TODO: Verify Free Fire compatibility manually before launching.
    ffCompatibility: 'Bypasses character count checks without visual gap.',
    // TODO: Verify BGMI compatibility manually before launching.
    bgmiCompatibility: 'Bypasses character count checks without visual gap.',
    generalCompatibility: 'Works on Steam, EA, and Minecraft.'
  },
  {
    id: 'mathematical-space',
    name: 'Mathematical Space (U+205F)',
    unicode: 'U+205F',
    char: '\u205f',
    description: 'A medium mathematical space. Often bypassed by game filters that strip ordinary ASCII space characters.',
    // TODO: Verify Free Fire compatibility manually before launching.
    ffCompatibility: 'May be stripped (Needs verification).',
    // TODO: Verify BGMI compatibility manually before launching.
    bgmiCompatibility: 'May be stripped (Needs verification).',
    generalCompatibility: 'Works in Web browsers and desktop games.'
  },
  {
    id: 'halfwidth-hangul-filler',
    name: 'Halfwidth Hangul Filler (U+FFA0)',
    unicode: 'U+FFA0',
    char: '\uffa0',
    description: 'A half-width version of the Hangul Filler. Ideal for adding standard-width invisible gaps in nicknames.',
    // TODO: Verify Free Fire compatibility manually before launching.
    ffCompatibility: 'Highly Compatible (Works for standard spacing).',
    // TODO: Verify BGMI compatibility manually before launching.
    bgmiCompatibility: 'Highly Compatible (Creates a neat standard-width space).',
    generalCompatibility: 'Works in PUBG Mobile, Free Fire Max, and BGMI.'
  }
];
