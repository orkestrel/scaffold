// CL12: which src/styles files does the guide's Files table name?
import { readdirSync, statSync, readFileSync } from 'node:fs'
import { resolve, join } from 'node:path'

const root = process.cwd()
const guide = readFileSync(resolve(root, 'guides/veneer.md'), 'utf8')

function walk(directory) {
	const entries = []
	for (const name of readdirSync(directory)) {
		const full = join(directory, name)
		if (statSync(full).isDirectory()) entries.push(...walk(full))
		else entries.push(full)
	}
	return entries
}

const files = walk(resolve(root, 'src/styles'))
	.map((path) => path.replaceAll('\\', '/').split(`${root.replaceAll('\\', '/')}/`)[1])
	.sort()

const unnamed = files.filter((path) => !guide.includes(path))
console.log(JSON.stringify({ files: files.length, unnamed }, null, '\t'))
