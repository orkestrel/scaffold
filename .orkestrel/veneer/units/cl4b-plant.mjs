// Plant and restore CL4b's two mutations, as exact string swaps, so the probe script carries no
// quoting. Usage: node cl4b-plant.mjs <hr|specimen> <plant|restore>
import { readFileSync, writeFileSync } from 'node:fs'

const [subject, action] = process.argv.slice(2)
const V = 'C:/Users/mikes/WebstormProjects/veneer/'

const swaps = {
	hr: {
		path: `${V}src/styles/elements/_hr.scss`,
		before: '\t\t@include box-reset {\n\t\t\tcolor: inherit;\n\t\t}',
		after: '\t\tmargin: 0;\n\t\tcolor: inherit;',
	},
	specimen: {
		path: `${V}app/browser/constants.ts`,
		before: "name: 'Heading 1'",
		after: "name: 'Renamed heading one'",
	},
}

const swap = swaps[subject]
if (!swap) {
	console.error(`unknown subject ${subject}`)
	process.exit(2)
}
const from = action === 'plant' ? swap.before : swap.after
const to = action === 'plant' ? swap.after : swap.before
const text = readFileSync(swap.path, 'utf8')
const count = text.split(from).length - 1
if (count !== 1) {
	console.error(`refused: ${subject} ${action} matched ${count} times, expected exactly one`)
	process.exit(3)
}
writeFileSync(swap.path, text.replace(from, to))
console.log(`${subject} ${action}: one replacement in ${swap.path}`)
