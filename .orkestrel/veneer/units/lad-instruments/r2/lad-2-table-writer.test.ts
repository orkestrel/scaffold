// Writes the guide's § Additions table from the ledger gate's own measurement. Input: the guide
// (its recorded rows are the owners the gate passes, and its Reason cells, which no measurement
// fixes) and the compiled cascade. Output: tmp/units/lad-2-table.md, one row per measured addition
// in measured order. A measured row takes the reason of the recorded row it equals, else the reason
// of its selector's row; a measured row with neither, and a recorded row no measured row carries,
// fail the run. Run through the probe project: copied into tmp/probe for the run.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { it } from 'vitest'
import {
	ABSENT_CELL,
	WORKSPACE_ROOT,
	collectLedger,
	collectShippedComponents,
	compileExpandedCascade,
	describeAddition,
	describeValueCell,
	readAdditions,
	readCompatibility,
	readOracleInventory,
} from '../../tests/setupServer.js'

it('writes the additions table from the measurement', () => {
	const guide = readFileSync(resolve(WORKSPACE_ROOT, 'guides/veneer.md'), 'utf8').split('\n')
	const start = guide.indexOf('### Additions')
	const end = guide.indexOf('### Outside the ledger')
	const raw = guide.slice(start, end).filter((line) => line.startsWith('| `'))
	const recorded = readAdditions()
	if (raw.length !== recorded.length) throw new Error('Raw rows and read rows disagree')
	const reasons = new Map<string, string>()
	for (const [index, row] of recorded.entries()) {
		const cells = (raw[index] ?? '').split('|').slice(1, -1)
		reasons.set(describeAddition(row), (cells[5] ?? '').trim())
	}
	const ledger = collectLedger(
		compileExpandedCascade(),
		readOracleInventory(),
		collectShippedComponents(readCompatibility()),
		recorded,
	)
	if (ledger.unattributed.length > 0) throw new Error(`Unattributed: ${ledger.unattributed.join(', ')}`)
	const carried = new Set<string>()
	const missing: string[] = []
	const rows = ledger.additions.map((row) => {
		const line = describeAddition(row)
		const selector = row.category === 'selector' ? row.name : row.name.split(' { ')[0]
		const site = describeAddition({ ...row, name: selector ?? '', category: 'selector', emitted: undefined })
		const reason = reasons.get(line) ?? reasons.get(site)
		if (reasons.has(line)) carried.add(line)
		if (reason === undefined) missing.push(line)
		const condition = row.condition === undefined ? ABSENT_CELL : `\`${row.condition}\``
		const value = row.emitted === undefined || row.emitted === '' ? describeValueCell(row.emitted) : `\`${row.emitted}\``
		return `| \`${row.component}\` | \`${row.name}\` | ${condition} | ${row.category} | ${value} | ${reason ?? ''} |`
	})
	const uncarried = [...reasons.keys()].filter((line) => !carried.has(line))
	console.log(`MEASURED ${String(rows.length)}\nMISSING ${JSON.stringify(missing)}\nUNCARRIED ${JSON.stringify(uncarried)}`)
	if (missing.length > 0 || uncarried.length > 0) throw new Error('The table does not close')
	const header = ['| Component | Name | Condition | Category | Veneer | Reason |', '| --- | --- | --- | --- | --- | --- |']
	writeFileSync(resolve(WORKSPACE_ROOT, 'tmp/units/lad-2-table.md'), `${[...header, ...rows].join('\n')}\n`)
}, 120000)
