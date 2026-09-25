// Writes one mutation of the press's cancellation line into src/browser/Offcanvas.ts.
// Usage: node mutant.mjs <label>. It exits 1 when the line to mutate is not found exactly once.
import { readFileSync, writeFileSync } from 'node:fs'

const FILE = 'src/browser/Offcanvas.ts'
const LINE = '\t\tif (released && trigger !== undefined && holdsFocus(trigger)) event.preventDefault()'
const MUTANTS = {
	// The document's `activeElement` in place of the trigger's own root.
	document:
		'\t\tif (released && trigger !== undefined && trigger.ownerDocument.activeElement === trigger) event.preventDefault()',
	// The release condition dropped.
	release: '\t\tif (trigger !== undefined && holdsFocus(trigger)) event.preventDefault()',
	// Every dismissing press cancels.
	always: '\t\tevent.preventDefault()',
	// No press cancels.
	never: '\t\tvoid released',
	// The `:focus` pseudo-class in place of the root read.
	focus:
		"\t\tif (released && trigger !== undefined && trigger.matches(':focus')) event.preventDefault()",
}

const label = process.argv[2]
const replacement = MUTANTS[label]
const source = readFileSync(FILE, 'utf8')
const count = source.split(LINE).length - 1
if (replacement === undefined || count !== 1) {
	console.log(`mutant ${label}: line found ${count} times, or no such mutant`)
	process.exit(1)
}
writeFileSync(FILE, source.replace(LINE, replacement))
console.log(`mutant ${label} written`)
