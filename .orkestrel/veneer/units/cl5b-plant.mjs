// Plant and restore CL5b's mutation as exact text appends, so the probe script carries no
// quoting. The plant writes one identical declaration block into two partials the extractions
// never touched, which is exactly what the shipped sweep exists to catch.
// Usage: node cl5b-plant.mjs <plant|restore>
import { readFileSync, writeFileSync } from 'node:fs'

const V = 'C:/Users/mikes/WebstormProjects/veneer/src/styles/'
const BLOCK =
	'\n@layer elements {\n\t.orchestrator-plant {\n\t\t--probe-first: 19px;\n\t\t--probe-second: 29px;\n\t}\n}\n'
const paths = [`${V}elements/_address.scss`, `${V}components/_quote.scss`]

const action = process.argv[2]
for (const path of paths) {
	const text = readFileSync(path, 'utf8')
	if (action === 'plant') {
		if (text.includes(BLOCK)) {
			console.error(`refused: ${path} already carries the plant`)
			process.exit(3)
		}
		writeFileSync(path, text + BLOCK)
		console.log(`plant: appended the block to ${path}`)
	} else if (action === 'restore') {
		const count = text.split(BLOCK).length - 1
		if (count !== 1) {
			console.error(`refused: ${path} matched the plant ${count} times, expected exactly one`)
			process.exit(3)
		}
		writeFileSync(path, text.replace(BLOCK, ''))
		console.log(`restore: removed the block from ${path}`)
	} else {
		console.error(`unknown action ${action}`)
		process.exit(2)
	}
}
