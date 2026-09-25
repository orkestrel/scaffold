// Round 2: gives the Carousel door's `marks` parameter a default of `[]` and drops every trailing
// `[]` argument that passed it. Prints how many call sites changed.
import { readFileSync, writeFileSync } from 'node:fs'

const path = 'src/browser/Carousel.ts'
let text = readFileSync(path, 'utf8')
const signature =
	'\t\tmarks: ReadonlyArray<readonly [HTMLElement, string | null]>,\n\t): boolean {\n\t\tif (!this.#owns(change)) return false'
if (!text.includes(signature)) {
	console.error('The door signature was not found')
	process.exit(1)
}
text = text.replace(
	signature,
	'\t\tmarks: ReadonlyArray<readonly [HTMLElement, string | null]> = [],\n\t): boolean {\n\t\tif (!this.#owns(change)) return false',
)
let sites = 0
text = text.replace(/\n\t+\[\],\n(\t+\)\n\t+\) \{)/g, (_match, tail) => {
	sites += 1
	return `\n${tail}`
})
text = text.replace(/, blocked, \[\]\)\)/g, () => {
	sites += 1
	return ', blocked))'
})
writeFileSync(path, text)
console.log(`call sites changed: ${sites}`)
