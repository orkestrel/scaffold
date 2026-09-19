import { readFileSync, writeFileSync } from 'node:fs'

const target = '.orkestrel/scaffold/d3-report.md'
const instruments = ['d3-probe-predicate.sh', 'd3-plant.mjs', 'd3-probe-diagnostics.mjs']

let after = readFileSync(target, 'utf8')
after = after.replaceAll('C:\\Users\\mikes\\WebstormProjects\\scaffold\\tmp\\units\\', '.orkestrel/scaffold/')
after = after.replaceAll('C:\\Users\\mikes\\WebstormProjects\\scaffold\\', '')
after = after.replaceAll('tmp/units/', '.orkestrel/scaffold/')

for (const name of instruments) {
	after = after.replaceAll(`.orkestrel/scaffold/${name}`, `.orkestrel/scaffold/d3-instruments/${name}`)
}

writeFileSync(target, after)
const stale = after.split('\n').filter((l) => l.includes('tmp/units') || l.includes('tmp\\units'))
console.log(`rewrote ${target}; remaining launch-copy references: ${stale.length}`)
for (const line of stale) console.log(`  ${line.trim()}`)
