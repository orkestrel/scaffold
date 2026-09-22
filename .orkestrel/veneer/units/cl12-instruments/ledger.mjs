// CL12: lists compatibility rows whose obligation names both a class and a token, so each
// "class X paints from token Y" claim can be read against the built cascade.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const lines = readFileSync(resolve(process.cwd(), 'guides/veneer.md'), 'utf8').split('\n')
let inLedger = false
for (const line of lines) {
	if (line.startsWith('## Compatibility')) inLedger = true
	if (line.startsWith('## Showcase')) inLedger = false
	if (!inLedger || !line.startsWith('|') || /^\|\s*-{3,}/.test(line)) continue
	const cells = line.split('|').slice(1, -1).map((cell) => cell.trim())
	const obligation = cells[2] ?? ''
	const classes = [...obligation.matchAll(/`(\.[\w-]+[^`]*)`/g)].map((match) => match[1])
	const tokens = [...obligation.matchAll(/`(--[\w-]+[^`]*)`/g)].map((match) => match[1])
	if (classes.length > 0 && tokens.length > 0)
		console.log(`${cells[0]} | ${classes.join(' ')} | ${tokens.join(' ')}`)
}
