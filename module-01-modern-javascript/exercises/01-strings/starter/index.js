import { shout, whisper, formatTag, containsWord, initials } from './strings.js';

console.log('shout("hello"):', shout('hello'));
console.log('whisper("DANGER"):', whisper('DANGER'));
console.log('formatTag("TRX-001", "North Ridge"):', formatTag('TRX-001', 'North Ridge'));
console.log('containsWord("Rex spotted near fence", "Rex"):', containsWord('Rex spotted near fence', 'Rex'));
console.log('initials("Ellie Sattler"):', initials('Ellie Sattler'));
