// Sweeps every emitted rule whose selector writes `:is(` or `:where(`, and logs its attribution,
// its ownership with the guide's recorded rows, and the departure and addition lines the ledger
// measures at that selector. Run through the probe project: copied into tmp/probe for the run.
import { it } from 'vitest'
import {
	attributeBlock,
	attributeSelector,
	collectLedger,
	collectShippedComponents,
	compileExpandedCascade,
	describeAddition,
	describeDeparture,
	indexRecordingKeys,
	readAdditions,
	readCascadeBlocks,
	readCompatibility,
	readOracleInventory,
} from '../../tests/setupServer.js'

it('sweeps the functional-list selectors', () => {
	const cascade = compileExpandedCascade()
	const inventory = readOracleInventory()
	const shipped = collectShippedComponents(readCompatibility())
	const recording = indexRecordingKeys(inventory)
	const recorded = readAdditions()
	const listed = (selector: string) => selector.includes(':is(') || selector.includes(':where(')
	const lines: string[] = []
	for (const block of readCascadeBlocks(cascade).filter((entry) => listed(entry.selector))) {
		const bare = attributeSelector(block.selector, block.layer, recording, shipped)
		const owned = attributeBlock(block, inventory, recording, shipped, recorded)
		const unowned = attributeBlock(block, inventory, recording, shipped, [])
		lines.push(
			`ATTRIBUTE | ${block.layer ?? '—'} | ${block.selector} | ${block.condition ?? '—'} | selector=${bare ?? '(none)'} | measured=${unowned ?? '(none)'} | owned=${owned ?? '(none)'}`,
		)
	}
	const ledger = collectLedger(cascade, inventory, shipped, recorded)
	for (const row of ledger.departures.filter((entry) => listed(entry.selector)))
		lines.push(`DEPARTURE | ${describeDeparture(row)}`)
	for (const row of ledger.additions.filter((entry) => listed(entry.name)))
		lines.push(`ADDITION | ${describeAddition(row)}`)
	for (const line of ledger.unattributed) lines.push(`UNATTRIBUTED | ${line}`)
	console.log(`SWEEP\n${lines.join('\n')}\nEND`)
}, 120000)
