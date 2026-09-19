import { readFileSync, writeFileSync } from 'node:fs'

// A retained artifact naming a launch copy resolves to nothing after the sweep.
const target = '.orkestrel/roughnotes/m2-report.md'
const before = readFileSync(target, 'utf8')

let after = before
after = after.replaceAll(
	'C:\\Users\\mikes\\WebstormProjects\\roughnotes\\tmp\\units\\',
	'.orkestrel/roughnotes/',
)
after = after.replaceAll('C:\\Users\\mikes\\WebstormProjects\\roughnotes\\', '')
after = after.replaceAll('tmp/units/', '.orkestrel/roughnotes/')
after = after.replaceAll('tmp/verify/', '.orkestrel/roughnotes/verify/')
after = after.replaceAll(
	'.orkestrel/roughnotes/m2-summaries.mjs',
	'.orkestrel/roughnotes/m2-instruments/m2-summaries.mjs',
)

writeFileSync(target, after)

const stale = after
	.split('\n')
	.filter((line) => line.includes('tmp/units') || line.includes('tmp\\units') || line.includes('tmp/verify'))
console.log(`rewrote ${target}`)
console.log(`remaining launch-copy references: ${stale.length}`)
for (const line of stale) console.log(`  ${line.trim()}`)
