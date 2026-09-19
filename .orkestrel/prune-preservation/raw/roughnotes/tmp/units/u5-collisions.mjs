import { readFileSync } from 'node:fs'
const shipped = new Set(
	[...readFileSync('node_modules/bootstrap/dist/css/bootstrap.css', 'utf8')
		.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1]),
)
const files = ['app/browser/styles/_signature.scss', 'app/browser/styles/_theme.scss']
const authored = new Set()
for (const file of files) {
	for (const m of readFileSync(file, 'utf8').matchAll(/(^|[\s,>])\.(-?[_a-zA-Z][\w-]*)/gm)) {
		authored.add(m[2])
	}
}
const control = ['monogram', 'roughnotes-undeclared-control']
console.log('population:', files.join(' '))
console.log('authored declarations:', [...authored].sort().join(' '))
console.log('named by bootstrap:', [...authored].filter((n) => shipped.has(n)).sort().join(' '))
console.log('control (must be absent from the preceding line):',
	control.filter((n) => shipped.has(n)).join(' ') || 'none')
console.log('control (bootstrap does ship these, so the reader works):',
	['mark', 'card'].filter((n) => shipped.has(n)).join(' '))
