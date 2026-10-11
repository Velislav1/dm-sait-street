// Прости илюстрации на дрехи (SVG). Ключът съвпада с полето "type" в products.js
const S = 'fill="rgba(255,255,255,.88)" stroke="rgba(0,0,0,.18)" stroke-width="1.5" stroke-linejoin="round"';
const D = 'fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.5" stroke-linecap="round"';
const svg = inner => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const ICONS = {
  coat: svg(`<path ${S} d="M36 12 50 24 64 12 86 24 94 70 82 72 80 112H20L18 72 6 70 14 24Z"/><path ${D} d="M50 24V112M42 50h5M42 62h5"/>`),
  dress: svg(`<path ${S} d="M38 8h8l4 10 4-10h8l4 30-8 10 18 68H22l18-68-8-10Z"/><path ${D} d="M40 48h20"/>`),
  shirt: svg(`<path ${S} d="M34 12 50 22 66 12 92 28 82 46 72 40V108H28V40L18 46 8 28Z"/><path ${D} d="M50 22V108M50 40h0M50 56h0M50 72h0"/>`),
  blouse: svg(`<path ${S} d="M32 12 50 24 68 12 90 30 80 46 70 42 74 108H26l4-66-10 4L10 30Z"/><path ${D} d="M50 24l-6 14M50 24l6 14"/>`),
  jeans: svg(`<path ${S} d="M28 8h44l6 104H56L50 44l-6 68H22Z"/><path ${D} d="M28 20h44M50 20v24"/>`),
  jacket: svg(`<path ${S} d="M34 10 50 30 66 10 90 24 94 76 82 78 80 110H20L18 78 6 76 10 24Z"/><path ${D} d="M50 30V110M34 10 42 50M66 10 58 50"/>`),
  pants: svg(`<path ${S} d="M30 8h40l4 104H56L50 40l-6 72H26Z"/><path ${D} d="M30 18h40"/>`),
  sweater: svg(`<path ${S} d="M36 12h28l4 6 22 24-10 14-10-8V108H30V48l-10 8L10 42 32 18Z"/><path ${D} d="M36 12q14 12 28 0M30 100h40"/>`),
  belt: svg(`<rect ${S} x="6" y="50" width="88" height="16" rx="4"/><rect ${D} x="52" y="45" width="18" height="26" rx="3"/><path ${D} d="M14 58h30"/>`),
  scarf: svg(`<path ${S} d="M26 14h48l-6 24H34Z"/><path ${S} d="M34 38h14l-6 70H26ZM52 38h14l8 56H60Z"/><path ${D} d="M30 100h10M62 90h10"/>`),
  bag: svg(`<path ${D} d="M34 44V30a16 16 0 0 1 32 0v14"/><path ${S} d="M16 44h68l6 64H10Z"/><path ${D} d="M16 62h68"/>`),
  hat: svg(`<path ${S} d="M26 70c0-28 10-44 24-44s24 16 24 44Z"/><rect ${S} x="22" y="70" width="56" height="16" rx="6"/><circle cx="50" cy="20" r="6" ${S}/>`)
};
