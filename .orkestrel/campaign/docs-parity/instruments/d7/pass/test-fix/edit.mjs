import { readFileSync, writeFileSync } from 'node:fs'

const path = '/home/user/fleet/test/guides/test.md'
const lines = readFileSync(path, 'utf8').split('\n')
const at = (n) => lines[n - 1]

const CORE_TYPES = [
	"A `Shape` cell holds an interface's `readonly` data members in braces and its call-signature",
	'members after `plus`, an extended interface\'s name before `plus` with the members it adds after,',
	'`alone` after the call-signature members of an interface that declares no data members, and a type',
	"alias's own type.",
	'',
]
const CORE_REST = [
	'Each interface\'s call-signature members are listed under [Methods](#methods). `Result` defaults `E`',
	'to `Error`, where `@orkestrel/contract` publishes the same name defaulting to `unknown`;',
	'[Limits](#limits) rules that divergence.',
]
const BROWSER_TYPES = [
	"A `Shape` cell holds an interface's `readonly` data members in braces and its call-signature",
	"members after `plus`, and a type alias's own type.",
	'',
]
const SERVER_TYPES = [
	"A `Shape` cell holds an interface's `readonly` data members in braces and its call-signature",
	'members after `plus`, an extended interface\'s name before `plus` with the members it adds after,',
	"and a type alias's own type, whose arms are written with `or`.",
	'',
]
const CONSTANTS = ['A `Shape` cell holds the constant\'s declared type.', '']

function wrap(text, width, indent) {
	const out = []
	let line = indent
	for (const word of text.split(' ')) {
		if (line !== indent && (line + ' ' + word).length > width) {
			out.push(line)
			line = indent + word
		} else line = line === indent ? line + word : line + ' ' + word
	}
	out.push(line)
	return out
}

// Guard every anchor before touching anything.
const expect = (n, text) => {
	if (at(n) !== text) throw new Error(`line ${n} mismatch:\n  got: ${at(n)}\n  want: ${text}`)
}
expect(106, lines[105])
if (!at(106).startsWith('| Type ')) throw new Error('106 not core Types header')
if (!at(128).startsWith('A `Shape` cell holds')) throw new Error('128')
if (at(131) !== 'name defaulting to `unknown`; [Limits](#limits) rules that divergence.') throw new Error('131')
if (!at(135).includes('| Signature ')) throw new Error('135')
if (!at(226).startsWith('| Type ')) throw new Error('226')
if (!at(238).startsWith('A `Shape` cell holds')) throw new Error('238')
if (at(240) !== '') throw new Error('240')
if (!at(243).includes('| Signature ')) throw new Error('243')
if (!at(589).startsWith('| Type ')) throw new Error('589')
if (!at(600).startsWith('A `Shape` cell holds')) throw new Error('600')
if (at(602) !== '') throw new Error('602')
if (!at(2922).startsWith('- [`tests/guides.test.ts`]')) throw new Error('2922')
if (!at(2935).endsWith('and budget.')) throw new Error('2935')

const bullet = lines.slice(2921, 2935).map((l) => l.trim()).join(' ')
const withTitle = bullet.replace(
	'the titled fence against the `@example` block of that title',
	'the titled `Own a temporary directory` fence against the `@example` block of that title',
)
if (withTitle === bullet) throw new Error('titled fence phrase not found')
const wrapped = wrap(withTitle.slice(2), 100, '  ')
wrapped[0] = wrapped[0].replace(/^ {2}/, '- ')

const renameHeader = (line) => {
	const next = line.replace('| Signature ', '| Shape     ')
	if (next === line) throw new Error('header rename failed')
	return next
}

// Apply descending so earlier line numbers stay valid.
lines.splice(2921, 14, ...wrapped)
lines.splice(599, 3)
lines.splice(588, 0, ...SERVER_TYPES)
lines.splice(242, 1, ...CONSTANTS, renameHeader(at(243)))
lines.splice(237, 3)
lines.splice(225, 0, ...BROWSER_TYPES)
lines.splice(134, 1, ...CONSTANTS, renameHeader(at(135)))
lines.splice(127, 4, ...CORE_REST)
lines.splice(105, 0, ...CORE_TYPES)

writeFileSync(path, lines.join('\n'))
console.log('edits applied')
