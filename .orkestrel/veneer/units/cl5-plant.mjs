// Plant and restore CL5's round-2 mutation as an exact text edit, so the probe script carries no
// quoting. The plant appends a literal size to the fourth heading class equal to that level's
// default, which is the mutation no default-value case can observe and the retune matrix exists
// to catch. Usage: node cl5-plant.mjs <plant|restore>
import { readFileSync, writeFileSync } from 'node:fs'

const path = 'C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_type.scss'
const PLANT = '\n@layer components {\n\t.h4 {\n\t\tfont-size: 20px;\n\t}\n}\n'

const action = process.argv[2]
const text = readFileSync(path, 'utf8')

if (action === 'plant') {
	if (text.includes(PLANT)) {
		console.error('refused: the plant is already present')
		process.exit(3)
	}
	writeFileSync(path, text + PLANT)
	console.log('plant: appended the literal size block')
} else if (action === 'restore') {
	const count = text.split(PLANT).length - 1
	if (count !== 1) {
		console.error(`refused: restore matched ${count} times, expected exactly one`)
		process.exit(3)
	}
	writeFileSync(path, text.replace(PLANT, ''))
	console.log('restore: removed the literal size block')
} else {
	console.error(`unknown action ${action}`)
	process.exit(2)
}
