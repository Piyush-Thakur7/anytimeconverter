// Data file containing style maps for plain text conversion

export interface FontStyle {
  id: string;
  name: string;
  // If string, must be exactly 62 unicode code points: A-Z (26), a-z (26), 0-9 (10)
  // If function, maps each character individually
  map: string | ((text: string) => string);
  previewText?: string; // custom preview if needed
}

// Helper to convert character index
// index 0-25: A-Z
// index 26-51: a-z
// index 52-61: 0-9
export function convertText(text: string, style: FontStyle): string {
  if (typeof style.map === 'function') {
    return style.map(text);
  }

  const glyphs = Array.from(style.map);
  if (glyphs.length < 62) {
    return text; // Invalid map length, return original
  }

  return text
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      let index = -1;

      if (code >= 65 && code <= 90) {
        // A-Z
        index = code - 65;
      } else if (code >= 97 && code <= 122) {
        // a-z
        index = code - 97 + 26;
      } else if (code >= 48 && code <= 57) {
        // 0-9
        index = code - 48 + 52;
      }

      if (index !== -1 && glyphs[index]) {
        return glyphs[index];
      }
      return char;
    })
    .join('');
}

// Combining diacritical marks helper
function combineDiacritical(text: string, mark: string): string {
  return text
    .split('')
    .map((char) => {
      // Don't apply to spaces
      if (char === ' ') return char;
      return char + mark;
    })
    .join('');
}

// Upside down mapping helper
const upsideDownChars: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴂ', j: 'ɾ', k: 'ʞ',
  l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ',
  w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: '◖', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: 'ʞ',
  L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ὁ', R: 'ᴚ', S: 'S', T: '┴', U: '∩', V: 'Λ',
  W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
  '.': '˙', ',': "'", "'": ',', '"': '„', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[',
  '{': '}', '}': '{', '<': '>', '>': '<', '_': '‾'
};

function makeUpsideDown(text: string): string {
  return text
    .split('')
    .map((char) => upsideDownChars[char] || char)
    .reverse()
    .join('');
}

// Mirror mapping helper
const mirrorChars: Record<string, string> = {
  a: 'ɒ', b: 'd', c: 'ɔ', d: 'b', e: 'ɘ', f: 'ʇ', g: 'ϱ', h: 'ʜ', i: 'i', j: '⌊', k: 'ʞ',
  l: 'l', m: 'm', n: 'ᴎ', o: 'o', p: 'q', q: 'p', r: 'я', s: 'ꙅ', t: 'ʇ', u: 'u', v: 'v',
  w: 'w', x: 'x', y: 'γ', z: 'ƹ',
  A: 'A', B: 'ᙏ', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'ㅋ', G: 'อ', H: 'H', I: 'I', J: 'Ⴑ', K: 'K',
  L: '⅃', M: 'M', N: 'И', O: 'O', P: 'ꟼ', Q: 'Ὁ', R: 'Я', S: 'Ꙅ', T: 'T', U: 'U', V: 'V',
  W: 'W', X: 'X', Y: 'Y', Z: 'Ƹ',
  '0': '0', '1': '1', '2': 'Ѕ', '3': 'Ɛ', '4': 'ߎ', '5': 'ट', '6': 'd', '7': '𐌓', '8': '8', '9': 'e',
};

function makeMirror(text: string): string {
  return text
    .split('')
    .map((char) => mirrorChars[char] || char)
    .reverse()
    .join('');
}

// Zalgo/Glitch text helper
const zalgoUp = ['̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̉', '̊', '̋', '̌', '̍', '̎', '̄', 'ͣ', 'ͤ', 'ͥ', 'ͦ', 'ͧ', 'ͨ', 'ͩ', 'ͪ', 'ͫ', 'ͬ', 'ͭ', 'ͮ', 'ͯ'];
const zalgoDown = ['̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̧', '̨', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲', '̳', '̾', '͛', '͆', '̚'];
const zalgoMid = ['̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵', '̶', '͏', '͜', '͝', '͞', '͟', '͠', '͡', '͢', 'ͣ', 'ͤ', 'ͥ', 'ͦ', 'ͧ', 'ͨ', 'ͩ', 'ͪ', 'ͫ', 'ͬ', 'ͭ', 'ͮ', 'ͯ'];

function makeGlitch(text: string): string {
  return text
    .split('')
    .map((char) => {
      if (char === ' ') return char;
      let result = char;
      const count = 3 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        if (rand < 0.33) {
          result += zalgoUp[Math.floor(Math.random() * zalgoUp.length)];
        } else if (rand < 0.66) {
          result += zalgoDown[Math.floor(Math.random() * zalgoDown.length)];
        } else {
          result += zalgoMid[Math.floor(Math.random() * zalgoMid.length)];
        }
      }
      return result;
    })
    .join('');
}

export const FONT_STYLES: FontStyle[] = [
  {
    id: 'serif-bold',
    name: 'Serif Bold',
    map: '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗'
  },
  {
    id: 'serif-italic',
    name: 'Serif Italic',
    map: '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽client-side𝐾🔲𝐿𝑀🔲🔲𝑁𝑂🔲𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝖷𝖸𝖹𝑎𝑏𝑐𝑑𝑒𝑓𝑔𝑕𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789'
  },
  {
    id: 'serif-bold-italic',
    name: 'Serif Bold Italic',
    map: '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍授权𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛0123456789'
  },
  {
    id: 'sans-bold',
    name: 'Sans Bold',
    map: '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
  },
  {
    id: 'sans-italic',
    name: 'Sans Italic',
    map: '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789'
  },
  {
    id: 'sans-bold-italic',
    name: 'Sans Bold Italic',
    map: '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘             𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯0123456789'
  },
  {
    id: 'script-normal',
    name: 'Script',
    map: '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789'
  },
  {
    id: 'script-bold',
    name: 'Script Bold',
    map: '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫🇨🇩𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃0123456789'
  },
  {
    id: 'gothic-normal',
    name: 'Gothic / Fraktur',
    map: '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜𝔝𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔨𝔩𝔪🔲𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789'
  },
  {
    id: 'gothic-bold',
    name: 'Gothic Bold',
    map: '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺🕻𝕼𝕽𕾎𝕾𝕿𝖀𝖁𝖂𝖃𝖄🕻𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜🕼𝖝🕽𝖶𝖞𝖟0123456789'
  },
  {
    id: 'double-struck',
    name: 'Double-Struck (Outline)',
    map: '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜🟪𝟞𝟟𝟠🟪'
  },
  {
    id: 'monospace',
    name: 'Monospace',
    map: '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝔣𝔤𝔥𝔦𝔨𝔩𝔪🔲𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝟶𝟷𝟸𝟹𝟺𝟻🔿𝟼𝟽𝟾𝟿'
  },
  {
    id: 'circled-light',
    name: 'Circled Light',
    map: 'ⒶⒷⒸⒹⒺⒻⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨'
  },
  {
    id: 'circled-dark',
    name: 'Circled Dark',
    map: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩⓪❶❷❸❹❺❻❼❽❾'
  },
  {
    id: 'squared-light',
    name: 'Squared Light',
    map: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅content🅇🅈content🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅content🅇🅈content0123456789'
  },
  {
    id: 'squared-dark',
    name: 'Squared Dark',
    map: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🅄🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🅄🆁🆂🆃🆄🆅🆆🆇🆈🆉0123456789'
  },
  {
    id: 'parenthesized',
    name: 'Parenthesized',
    map: '🄐🄑🄒🄓🄔🄕🄖🄗🄘🄙🄚🄛🄜🄝🄞🄟🄠🄡🄢🄣🄤🄥🄦🄧🄨🄩⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⑴⑵⑶⑷⑸⑹⑺⑻⑼'
  },
  {
    id: 'full-width',
    name: 'Full-Width',
    map: 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９'
  },
  {
    id: 'small-caps',
    name: 'Small Caps',
    map: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ0123456789'
  },
  {
    id: 'superscript',
    name: 'Superscript',
    map: 'ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᵠᴿˢᵀᵁⱽᵂˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹'
  },
  {
    id: 'subscript',
    name: 'Subscript',
    map: 'ₐ₈CDₑF_ₕᵢⱼₖₗₘₙₒₚQᵣₛₜᵤᵥWₓYZₐ₆cdₑf_ₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz₀₁₂₃₄₅₆₇₈₉'
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave / Spaced',
    map: (text) => text.split('').join(' ')
  },
  {
    id: 'strikethrough',
    name: 'Strike-through',
    map: (text) => combineDiacritical(text, '\u0336')
  },
  {
    id: 'slash-through',
    name: 'Slash-through',
    map: (text) => combineDiacritical(text, '\u0338')
  },
  {
    id: 'cross-out',
    name: 'Cross-out',
    map: (text) => combineDiacritical(text, '\u0337')
  },
  {
    id: 'underline',
    name: 'Underline',
    map: (text) => combineDiacritical(text, '\u0332')
  },
  {
    id: 'double-underline',
    name: 'Double Underline',
    map: (text) => combineDiacritical(text, '\u0333')
  },
  {
    id: 'overline',
    name: 'Overline',
    map: (text) => combineDiacritical(text, '\u0305')
  },
  {
    id: 'upside-down',
    name: 'Upside Down',
    map: makeUpsideDown
  },
  {
    id: 'mirror',
    name: 'Mirror Text',
    map: makeMirror
  },
  {
    id: 'glitch',
    name: 'Glitch / Zalgo',
    map: makeGlitch
  },
  {
    id: 'brackets-square',
    name: 'Square Brackets',
    map: (text) => text.split('').map(c => c === ' ' ? ' ' : `[${c}]`).join('')
  },
  {
    id: 'brackets-curly',
    name: 'Curly Brackets',
    map: (text) => text.split('').map(c => c === ' ' ? ' ' : `{${c}}`).join('')
  },
  {
    id: 'arrow-below',
    name: 'Arrow Below',
    map: (text) => combineDiacritical(text, '\u0354')
  },
  {
    id: 'harpoon-above',
    name: 'Harpoon Above',
    map: (text) => combineDiacritical(text, '\u035a')
  },
  {
    id: 'asterisk-below',
    name: 'Asterisk Below',
    map: (text) => combineDiacritical(text, '\u0359')
  },
  {
    id: 'x-above',
    name: 'X Above',
    map: (text) => combineDiacritical(text, '\u033d')
  },
  {
    id: 'bridge-above',
    name: 'Bridge Above',
    map: (text) => combineDiacritical(text, '\u0346')
  },
  {
    id: 'gothic-italic',
    name: 'Gothic Italic',
    map: '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔎𝔏𝔐🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔨𝔩𝔪🔲𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789',
    previewText: '𝔊𝔬𝔱𝔥𝔦𝔠 ℑ𝔱𝔞𝔩𝔦𝔠'
  },
  {
    id: 'mini-room',
    name: 'Mini / Small Letters',
    map: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789'
  },
  {
    id: 'luna-font',
    name: 'Luna / Accent',
    map: 'ÄßÇÐÈFGHÏJKLMñÖPQRŠTÜVWXYZäßçðèfghïjklmñöpqrštüvwxyz0123456789'
  },
  {
    id: 'invert-font',
    name: 'Inverted Symbols',
    map: 'zʎxʍʌnʇsɹbdouɯlʞɾıɥƃɟǝpɔqɐzʎxʍʌnʇsɹbdouɯlʞɾıɥƃɟǝpɔqɐ0123456789',
    previewText: 'ʇxǝʇ pǝʇɹǝʌuI'
  }
];

export interface DecorationPreset {
  name: string;
  left: string;
  right: string;
}

export const DECORATION_PRESETS: DecorationPreset[] = [
  { name: 'Double Crowns', left: '꧁ ', right: ' ꧂' },
  { name: 'Royal Wings', left: '꧁ঔৣ☬✞ ', right: ' ✞☬ঔৣ꧂' },
  { name: 'Eagle Eye', left: '🦅 ', right: ' 🦅' },
  { name: 'Slayer Swords', left: '⚔️ ', right: ' ⚔️' },
  { name: 'Cyber brackets', left: '⚡『', right: '』⚡' },
  { name: 'Ghost skull', left: '💀[ ', right: ' ]💀' },
  { name: 'Heart beats', left: '❤️ ', right: ' ❤️' },
  { name: 'Fire sparkles', left: '🔥 ', right: ' 🔥' },
  { name: 'Royal Crown', left: '👑 ', right: ' 👑' },
  { name: 'Evil King', left: '😈 ', right: ' 😈' },
  { name: 'Stars wrapper', left: '★彡 ', right: ' 彡★' },
  { name: 'Japanese vibe', left: '✿ ', right: ' ✿' },
  { name: 'Sniper Crosshair', left: '︻╦̵̵͇̿̿̿̿╤── ', right: ' ──╤╦̵̵͇̿̿̿̿︻' },
  { name: 'Bullet Shells', left: '▄︻̷̿┻̿═━一 ', right: ' 一━═┻̷̿̿︻▄' },
  { name: 'Trident Spear', left: 'Ψ ', right: ' Ψ' },
  { name: 'Infinity loop', left: '∞ ', right: ' ∞' },
  { name: 'Smileys', left: 'ツ ', right: ' ツ' },
  { name: 'Thunder bolts', left: '⚡ ', right: ' ⚡' },
  { name: 'Devil horns', left: '◥꧁ ', right: ' ꧂◤' }
];

export interface TextArt {
  category: string;
  art: string;
}

export const TEXT_ART_LIBRARY: TextArt[] = [
  // COOL
  { category: 'Cool', art: '★彡 [NAME] 彡★' },
  { category: 'Cool', art: '✿ [NAME] ✿' },
  { category: 'Cool', art: '『NAME』' },
  { category: 'Cool', art: '〆[NAME]〆' },
  { category: 'Cool', art: '×͜× [NAME]' },
  { category: 'Cool', art: '⚚ [NAME] ⚚' },
  { category: 'Cool', art: '☯ [NAME] ☯' },
  { category: 'Cool', art: '彡[NAME]彡' },
  { category: 'Cool', art: '⎳ [NAME]' },
  { category: 'Cool', art: '『OP』NAME' },

  // FIRE
  { category: 'Fire', art: '🔥[NAME]🔥' },
  { category: 'Fire', art: '⚡[NAME]⚡' },
  { category: 'Fire', art: '☢️[NAME]☢️' },
  { category: 'Fire', art: '💥[NAME]💥' },
  { category: 'Fire', art: '🌋[NAME]🌋' },
  { category: 'Fire', art: '☠️ [NAME] ☠️' },
  { category: 'Fire', art: '⚔️ [NAME] ⚔️' },

  // ROYAL
  { category: 'Royal', art: '👑 [NAME] 👑' },
  { category: 'Royal', art: '꧁ঔৣ☬✞ [NAME] ✞☬ঔৣ꧂' },
  { category: 'Royal', art: '♛ [NAME] ♛' },
  { category: 'Royal', art: '⚜️ [NAME] ⚜️' },
  { category: 'Royal', art: '🔱 [NAME] 🔱' },
  { category: 'Royal', art: '💎 [NAME] 💎' },
  { category: 'Royal', art: '꧂ [NAME] ꧁' },

  // SKULL
  { category: 'Skull', art: '💀 [NAME] 💀' },
  { category: 'Skull', art: '☠️[NAME]☠️' },
  { category: 'Skull', art: '👻 [NAME] 👻' },
  { category: 'Skull', art: '😈 [NAME] 😈' },
  { category: 'Skull', art: '👹 [NAME] 👹' },
  { category: 'Skull', art: '👺 [NAME] 👺' },

  // PRO
  { category: 'Pro', art: '︻╦̵̵͇̿̿̿̿╤── [NAME]' },
  { category: 'Pro', art: '▄︻̷̿┻̿═━一 [NAME]' },
  { category: 'Pro', art: '★ [NAME] ★' },
  { category: 'Pro', art: '◤ [NAME] ◥' },
  { category: 'Pro', art: '『PRO』[NAME]' },
  { category: 'Pro', art: '⚔️[NAME]⚔️' },
  { category: 'Pro', art: '☣️ [NAME] ☣️' },

  // LOVE
  { category: 'Love', art: '❤️ [NAME] ❤️' },
  { category: 'Love', art: '💖 [NAME] 💖' },
  { category: 'Love', art: '💕 [NAME] 💕' },
  { category: 'Love', art: '💌 [NAME] 💌' },
  { category: 'Love', art: '✿ [NAME] ✿' },
  { category: 'Love', art: '❣ [NAME] ❣' },
  { category: 'Love', art: '🧸 [NAME] 🧸' }
];
