// Generate the two Cursor Grok briefs for one package's audit round from the templates under tmp/units/grok/.
// Usage: node tmp/work/mkgrok.mjs <pkg> <round> [<round note>]
// Writes tmp/cursor/<pkg>-r<round>-distill-brief.md and tmp/cursor/<pkg>-r<round>-checker-brief.md and prints both.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const [pkg, round, note] = process.argv.slice(2)
if (!pkg || !round) {
	console.error('usage: node mkgrok.mjs <pkg> <round> [<round note>]')
	process.exit(2)
}
const repo = pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`
const out = '/home/user/scaffold/tmp/cursor'
mkdirSync(out, { recursive: true })
const roundNote = note ?? (Number(round) > 1 ? `This is audit round ${round} after a fix round; the report's Fix round sections name what each fix changed.` : 'This is the first audit round on the unit.')
const fill = (text) => text.replaceAll('PACKAGE', pkg).replaceAll('ROUND_NOTE', roundNote).replaceAll('ROUND', String(round)).replaceAll('REPO', repo)
const templates = { distill: 'distill-template.md', checker: 'checker-template.md' }
for (const [kind, file] of Object.entries(templates)) {
	const template = readFileSync(`/home/user/scaffold/tmp/units/grok/${file}`, 'utf8')
	const target = `${out}/${pkg}-r${round}-${kind}-brief.md`
	writeFileSync(target, fill(template))
	console.log(target)
}
