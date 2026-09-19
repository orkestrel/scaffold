import { readFileSync, writeFileSync } from 'node:fs'

// A retained artifact naming a launch copy resolves to nothing after the sweep.
const target = '.orkestrel/scaffold/d1-report.md'
const before = readFileSync(target, 'utf8')

const instruments = [
	'd1-probe-appshape.mjs',
	'd1-run-apponly.sh',
	'd1-repin.mjs',
	'd1-probe-skipreport.sh',
	'd1-probe-skipreport-2.sh',
	'd1-probe-skipreport-3.sh',
]

let after = before
after = after.replaceAll('C:\\Users\\mikes\\WebstormProjects\\scaffold\\tmp\\units\\', '.orkestrel/scaffold/')
after = after.replaceAll('C:\\Users\\mikes\\WebstormProjects\\scaffold\\', '')
after = after.replaceAll('tmp/units/', '.orkestrel/scaffold/')

for (const name of instruments) {
	after = after.replaceAll(`.orkestrel/scaffold/${name}`, `.orkestrel/scaffold/d1-instruments/${name}`)
}

writeFileSync(target, after)

const stale = after.split('\n').filter((l) => l.includes('tmp/units') || l.includes('tmp\\units'))
console.log(`rewrote ${target}`)
console.log(`remaining launch-copy references: ${stale.length}`)
for (const line of stale) console.log(`  ${line.trim()}`)
