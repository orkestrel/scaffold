// Plants or restores one mutation. `plant <spec>` copies the subject to the backup path and applies
// every [search, replace] pair, refusing a search that does not occur exactly once; `restore <spec>`
// copies the backup back over the subject. The spec is a JSON file naming `file`, `backup`, and `pairs`.
const fs = require('node:fs')
const [command, specPath] = process.argv.slice(2)
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'))
if (command === 'plant') {
	if (fs.existsSync(spec.backup)) throw new Error(`A backup already exists: ${spec.backup}`)
	let text = fs.readFileSync(spec.file, 'utf8')
	fs.writeFileSync(spec.backup, text)
	for (const [search, replace] of spec.pairs) {
		const count = text.split(search).length - 1
		if (count !== 1) throw new Error(`Expected one occurrence, found ${count}: ${search}`)
		text = text.replace(search, replace)
	}
	fs.writeFileSync(spec.file, text)
} else if (command === 'restore') {
	fs.copyFileSync(spec.backup, spec.file)
	fs.rmSync(spec.backup)
} else throw new Error(`Unknown command: ${command}`)
