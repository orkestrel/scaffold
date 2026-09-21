// Splice a section file into the handoff between two headings, without any shell quoting in the
// way: the replacement text is read from a file rather than written inside a command argument.
// Usage: node splice-handoff.mjs <startHeading> <endHeading> <sectionFile>
import { readFileSync, writeFileSync } from 'node:fs'

const [startHeading, endHeading, sectionFile] = process.argv.slice(2)
const path = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/handoff.md'
const text = readFileSync(path, 'utf8')
const start = text.indexOf(startHeading)
const end = text.indexOf(endHeading)
if (start < 0 || end < 0 || end < start) {
	console.error(`bounds not found: start ${start}, end ${end}`)
	process.exit(2)
}
const replacement = readFileSync(sectionFile, 'utf8')
writeFileSync(path, text.slice(0, start) + replacement + text.slice(end))
console.log(`spliced ${replacement.length} bytes between the headings`)
