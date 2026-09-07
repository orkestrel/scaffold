// Builds browser's drop-in from the pilot's canonical text, substituting this
// package's own constants and dropping the pilot-only executed block.
import { readFileSync, writeFileSync } from 'node:fs'

const pilot = readFileSync('/home/user/fleet/abort/tests/guides.test.ts', 'utf8')
let text = pilot

/** Replaces one exact occurrence, or throws naming the missing text. */
function swap(before, after) {
	const at = text.indexOf(before)
	if (at === -1) throw new Error(`missing: ${before.slice(0, 60)}`)
	if (text.indexOf(before, at + 1) !== -1) throw new Error(`repeated: ${before.slice(0, 60)}`)
	text = text.slice(0, at) + after + text.slice(at + before.length)
}

swap('// this repo\'s own `guides/README.md` manifest. The constants below are this',
	'// this repo\'s own `guides/README.md` manifest. The constants that follow are this')
swap("import { createRecorder, requireValue } from '@orkestrel/test'", "import { requireValue } from '@orkestrel/test'")
swap("import { readInventory } from '@orkestrel/test/server'\nimport { createAbort } from '@src/core'\n", "import { readInventory } from '@orkestrel/test/server'\n")
swap("const GUIDE_SPEC = 'guides/abort.md'", "const GUIDE_SPEC = 'guides/browser.md'")
swap("const MODULES = Object.freeze({ '@orkestrel/abort': 'src/core', '@src/core': 'src/core' })",
	`const MODULES = Object.freeze({
	'@orkestrel/browser': 'src/core',
	'@src/core': 'src/core',
	'@src/server': 'src/server',
})`)
swap('const INTERNAL: readonly string[] = Object.freeze([])',
	`const INTERNAL: readonly string[] = Object.freeze([
	'class BrowserDialog',
	'class BrowserDownload',
	'class BrowserFileChooser',
	'class BrowserHandle',
	'class BrowserRoute',
	'class BrowserWorker',
])`)
const at = text.indexOf('\n// The EXECUTED half.')
if (at === -1) throw new Error('missing: the executed block')
text = `${text.slice(0, at)}\n`
writeFileSync('tests/guides.test.ts', text)
console.log('wrote tests/guides.test.ts')
