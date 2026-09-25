import { readFileSync, writeFileSync } from 'node:fs'
const path = 'tmp/units/mcol-report.md'
let text = readFileSync(path, 'utf8')
const pairs = [
	['The two partials and the pinned checks were as the Evidence\n  states.', 'The partials and the pinned checks were as the Evidence states.'],
	['One command runs the owned proofs:', 'This command runs the owned proofs:'],
	['Both partials were set back to their `877e7c6` bytes', '`_collapse.scss` and `_accordion.scss` were set back to their `877e7c6` bytes'],
	['One row is added to the `accordion` table', 'A row is added to the `accordion` table'],
	['carrying the two rows printed in § Unknowns.', 'carrying the `collapsing` rows printed in § Unknowns.'],
	['after the three elements the fade case mounts', 'after the elements the fade case mounts'],
	['- **Final rerun.** All four plants were run again with the final script, and those runs are what the logs keep.', '- **Final rerun.** Every plant was run again with the final script, and those runs are what the logs keep.'],
	['over the six owned files', 'over the owned files'],
	['The patch changes one behaviour:', 'The patch changes a behaviour:'],
]
for (const [from, to] of pairs) {
	if (text.split(from).length !== 2) throw new Error(`missing: ${from.slice(0, 50)}`)
	text = text.replace(from, to)
}
writeFileSync(path, text)
