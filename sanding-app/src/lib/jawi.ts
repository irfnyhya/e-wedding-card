// Jawi initials helpers, ported from the prototype (src/4-app.js): the letters for an on-screen pad
// (most phones have no Jawi keyboard) and a best guess of a name's first Jawi letter.

export const JAWI_DIGITS = '١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ٠'.split(' ');
export const JAWI_KEYS = 'ا ب ت ث ج چ ح خ د ذ ر ز س ش ص ض ط ظ ع غ ڠ ف ڤ ق ک ݢ ل م ن و ۏ ه ة ء ي ڽ'.split(' ');

const JAWI_FIRST: Record<string, string> = { a: 'ا', b: 'ب', c: 'چ', d: 'د', e: 'ا', f: 'ف', g: 'ݢ', h: 'ح', i: 'ا', j: 'ج', k: 'ک', l: 'ل', m: 'م', n: 'ن', o: 'ا', p: 'ڤ', q: 'ق', r: 'ر', s: 'س', t: 'ت', u: 'ا', v: 'ۏ', w: 'و', x: 'ک', y: 'ي', z: 'ز' };

// common names whose Jawi spelling starts with a different letter than the Rumi guess
const JAWI_NAME: Record<string, string> = { aisyah: 'ع', aishah: 'ع', ali: 'ع', alia: 'ع', aliya: 'ع', aliyah: 'ع', abdul: 'ع', abd: 'ع', abdullah: 'ع', umar: 'ع', uthman: 'ع', usman: 'ع', ain: 'ع', aina: 'ع', izzah: 'ع', izzati: 'ع', iffah: 'ع', imran: 'ع', isa: 'ع', adib: 'ا', syafiq: 'ش', syahirah: 'ش', syazwani: 'ش', sharifah: 'ش', syed: 'س', safiyyah: 'ص', sabrina: 'ص', solehah: 'ص', zahra: 'ز', zulaikha: 'ز', hakim: 'ح', hawa: 'ح', harith: 'ح', hana: 'ه', hani: 'ه', hidayah: 'ه', taufiq: 'ت', tahir: 'ط', thahirah: 'ط', dhia: 'ض', khadijah: 'خ', khairul: 'خ', ghazali: 'غ', qistina: 'ق', qaisara: 'ق' };

/** Best guess at the first Jawi letter of a Rumi name. Couples should check it before publishing. */
export function jawiInitial(name: string): string {
  const w = String(name || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/\s+/)[0] || '';
  if (!w) return '';
  if (JAWI_NAME[w]) return JAWI_NAME[w];
  if (w.startsWith('sy')) return 'ش';
  if (w.startsWith('kh')) return 'خ';
  if (w.startsWith('gh')) return 'غ';
  if (w.startsWith('ng')) return 'ڠ';
  if (w.startsWith('ny')) return 'ڽ';
  return JAWI_FIRST[w[0]] || '';
}
