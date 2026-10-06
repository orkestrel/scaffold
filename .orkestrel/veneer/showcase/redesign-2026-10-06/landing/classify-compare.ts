import { readFileSync } from 'node:fs'
// Usage: node classify-compare.ts COMPARE_MD — classifies every "## Differences" line of a compare.ts report against the S-R1 predicted set (design-verdict.md § 6, read in substance: the preservation summary wherever it appears, the partition rows, lines, and control counts, the J1 to J3 journal entries). Exit 0 when none is outside the set, 3 otherwise.
const report = readFileSync(process.argv[2] ?? '', 'utf8')
const start = report.indexOf('## Differences')
const end = report.indexOf('## Host-bound rows')
const lines = report.slice(start, end < 0 ? undefined : end).split('\n').filter((l) => l.startsWith('- '))
const PREDICTED: [string, RegExp][] = [
	["signature/partition rows", /^- Rows \([^)]*\): (added|removed) \d+ × ((light-1280|light-390) )?(signature coverage|partition):/],
	["preservation rows", /^- Rows \([^)]*\): (added|removed) \d+ × [a-z]+ component preservation:/],
	["row order (dark-390 preservation values)", /^- Row order \([^)]*, dark-390\): ordered rows differ/],
	["preservation/partition lines", /^- Lines \([^)]*\): (added|removed) \d+ × (Component preservation|Partition population|Partition control|Partition) \[/],
	["preservation/partition journal copies", /^- Journal \([^)]*\): (added|removed) \d+ × (info: )?(Component preservation|Partition population|Partition control|Partition) /],
	["J1/J2 journal at 390", /^- Journal \([^)]*\): (added|removed) \d+ × (open Contents:|tab Contents:|press Enter on Contents:|press Escape on Contents:)/],
	["J3 heading margin", /^- Journal \([^)]*\): (added|removed) \d+ × measure minimum heading margin:/],
]
let outside = 0
const counts = new Map<string, number>()
for (const line of lines) {
	const hit = PREDICTED.find(([, re]) => re.test(line))
	if (hit) counts.set(hit[0], (counts.get(hit[0]) ?? 0) + 1)
	else { outside++; console.log(`OUTSIDE: ${line.slice(0, 300)}`) }
}
for (const [k, v] of counts) console.log(`predicted ${k}: ${v}`)
console.log(`${lines.length} differences; ${outside} outside the predicted set`)
process.exitCode = outside === 0 ? 0 : 3
