// Plant and restore CL5c's round-2 mutation as an exact text swap, so the probe script carries no
// quoting. The plant inlines the CSS system colour keywords into the shared mark mixin, which is
// the edit that would silently remove the two tokens as retune points.
// Usage: node cl5c-plant.mjs <plant|restore>
import { readFileSync, writeFileSync } from 'node:fs'

const path = 'C:/Users/mikes/WebstormProjects/veneer/src/styles/_mixins.scss'
const TOKENS = '\tcolor: var(--vn-text-mark);\n\tbackground-color: var(--vn-surface-mark);'
const INLINED = '\tcolor: marktext;\n\tbackground-color: mark;'

const action = process.argv[2]
const text = readFileSync(path, 'utf8')
const from = action === 'plant' ? TOKENS : INLINED
const to = action === 'plant' ? INLINED : TOKENS

if (action !== 'plant' && action !== 'restore') {
	console.error(`unknown action ${action}`)
	process.exit(2)
}
const count = text.split(from).length - 1
if (count !== 1) {
	console.error(`refused: ${action} matched ${count} times, expected exactly one`)
	process.exit(3)
}
writeFileSync(path, text.replace(from, to))
console.log(`${action}: one replacement in ${path}`)
