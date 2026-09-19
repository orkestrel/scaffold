import { readFileSync, writeFileSync } from 'node:fs'

// A retained artifact naming a launch copy resolves to nothing after the sweep,
// so rewrite every tmp/units path to the retained path it now names.
const target = '.orkestrel/roughnotes/m1-report.md'
const before = readFileSync(target, 'utf8')

const instruments = [
	'm1-vite-config-capture.ts',
	'm1-package-json-capture.json',
	'm1-oxlintrc-capture.json',
	'm1-prettierignore-capture.txt',
	'm1-restore.mjs',
	'm1-restore-showcase.mjs',
	'm1-restore-script.mjs',
	'm1-drop-journey.mjs',
	'm1-fix-summary.mjs',
	'm1-offlimits-lint.txt',
]

let after = before
// Windows absolute spellings first, then the repository-relative spelling.
after = after.replaceAll(
	'C:\\Users\\mikes\\WebstormProjects\\roughnotes\\tmp\\units\\',
	'.orkestrel/roughnotes/',
)
after = after.replaceAll('tmp/units/', '.orkestrel/roughnotes/')

for (const name of instruments) {
	after = after.replaceAll(`.orkestrel/roughnotes/${name}`, `.orkestrel/roughnotes/m1-instruments/${name}`)
}

writeFileSync(target, after)

const remaining = after.split('\n').filter((line) => line.includes('tmp/units') || line.includes('tmp\\units'))
console.log(`rewrote ${target}`)
console.log(`remaining tmp/units references: ${remaining.length}`)
for (const line of remaining) console.log(`  ${line.trim()}`)
