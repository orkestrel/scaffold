import { readFileSync, writeFileSync } from 'node:fs'

const target = '.orkestrel/scaffold/d2-report.md'
const instruments = ['d2-probe-predicate.sh', 'd2-generate.mjs', 'd2-repin.mjs', 'd2-gates.sh']

let after = readFileSync(target, 'utf8')
after = after.replaceAll('C:\\Users\\mikes\\WebstormProjects\\scaffold\\tmp\\units\\', '.orkestrel/scaffold/')
after = after.replaceAll('C:\\Users\\mikes\\WebstormProjects\\scaffold\\', '')
after = after.replaceAll('tmp/units/', '.orkestrel/scaffold/')

for (const name of instruments) {
	after = after.replaceAll(`.orkestrel/scaffold/${name}`, `.orkestrel/scaffold/d2-instruments/${name}`)
}

writeFileSync(target, after)

const stale = after.split('\n').filter((l) => l.includes('tmp/units') || l.includes('tmp\\units'))
console.log(`rewrote ${target}`)
console.log(`remaining launch-copy references: ${stale.length}`)
for (const line of stale) console.log(`  ${line.trim()}`)
