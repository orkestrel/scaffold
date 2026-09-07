import { readFileSync } from 'node:fs'
const text = readFileSync(process.argv[2], 'utf8')
const out = []
let inBlock = false
for (const line of text.split('\n')) {
	const t = line.trim()
	if (inBlock) {
		if (t.endsWith('*/')) inBlock = false
		continue
	}
	if (t.startsWith('/*')) {
		if (!t.endsWith('*/')) inBlock = true
		continue
	}
	if (t.startsWith('//')) continue
	if (t.length === 0) continue
	out.push(line)
}
process.stdout.write(out.join('\n') + '\n')
