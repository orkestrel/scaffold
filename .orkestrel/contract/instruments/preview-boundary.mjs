// Evidence instrument for the preview change: boundary and hostile string
// samples through preview; prints one line per sample. Two dists must print
// identical lines. Run: node preview-boundary.mjs </abs/dist/index.js>
/* eslint-disable */
const lib = await import(process.argv[2])
const { preview } = lib
const control = String.fromCharCode(1)
const del = String.fromCharCode(127)
const samples = {
	empty: '', short: 'guest', quote: 'a"b', backslash: 'a\\b', newline: 'a\nb', tab: '\t', control: control + 'x', del,
	pair: '\u{1F600}', pairs40: '\u{1F600}'.repeat(40), lone: '\ud800', loneTrail: '\udc00x', accented70: 'é'.repeat(70),
	len61: 'x'.repeat(61), len62: 'x'.repeat(62), len63: 'x'.repeat(63), len64: 'x'.repeat(64), len65: 'x'.repeat(65), len200: 'x'.repeat(200), huge: 'y'.repeat(1000000),
	escapes30: '"'.repeat(30), escapes31: '"'.repeat(31), escapes32: '"'.repeat(32), escapes33: '"'.repeat(33),
	controlEscape10: control.repeat(10), controlEscape11: control.repeat(11),
}
for (const [name, value] of Object.entries(samples)) console.log(`${name}: ${JSON.stringify(preview(value))}`)
const others = [['sym', Symbol('s')], ['sym64', Symbol('y'.repeat(64))], ['sym65', Symbol('z'.repeat(65))], ['symQuote', Symbol('a"b')], ['num', 42], ['neg0', -0], ['nan', Number.NaN], ['big', 10n], ['bool', true], ['nul', null], ['undef', undefined], ['arr', [1]], ['obj', {}], ['fn', () => 1]]
for (const [name, value] of others) console.log(`${name}: ${JSON.stringify(preview(value))}`)
