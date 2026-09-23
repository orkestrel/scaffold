// Probe (unit bfl, criterion 1): measures the ledger rows whose owner the tiered attribution
// ladder changes, with `form` appended to the shipped keys, before the ladder or the partial lands.
// The membership ladder is the landed `attributeSelector`; the tiered ladder is reproduced here from
// the exported pieces (exact class, then the longest class prefix, then recording order). After
// the ladder lands, the same probe reads the landed ledger and confirms the prediction.
import { writeFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
	LAYER_COMPONENTS,
	WORKSPACE_ROOT,
	attributeSelector,
	collectLedger,
	collectSelectorClasses,
	collectShippedComponents,
	compileExpandedCascade,
	indexRecordingKeys,
	matchShippedKey,
	readCascadeBlocks,
	readCompatibility,
	readOracleInventory,
} from '../../tests/setupServer.js'

function tiered(
	selector: string,
	layer: string | undefined,
	recording: ReadonlyMap<string, readonly string[]>,
	shipped: readonly string[],
): string | undefined {
	const keys = recording.get(selector) ?? []
	const classes = collectSelectorClasses(selector)
	const members = keys.filter((key) => shipped.includes(key))
	const prefix = (candidates: readonly string[]): string | undefined =>
		classes
			.flatMap((token) => {
				const key = matchShippedKey(token, candidates)
				return key === undefined ? [] : [key]
			})
			.sort((left, right) => right.length - left.length)
			.at(0)
	const member =
		members
			.filter((key) => classes.includes(key))
			.sort((left, right) => right.length - left.length)
			.at(0) ??
		prefix(members) ??
		members.at(0)
	if (layer !== undefined) {
		const owned = LAYER_COMPONENTS[layer]
		if (owned !== undefined) return shipped.includes(owned) ? owned : undefined
	}
	if (keys.length > 0) return member
	return prefix(shipped)
}

describe('bfl ladder probe', () => {
	it('lists every ledger row the tiered ladder re-owns with form shipped', () => {
		const cascade = compileExpandedCascade()
		const inventory = readOracleInventory()
		const today = collectShippedComponents(readCompatibility())
		const shipped = [...new Set([...today, 'form'])].sort()
		const recording = indexRecordingKeys(inventory)
		const blocks = readCascadeBlocks(cascade)
		const layers = new Map(blocks.map((block) => [block.selector, block.layer]))
		const before = collectLedger(cascade, inventory, today)
		const membership = collectLedger(cascade, inventory, shipped)
		const lines: string[] = []
		lines.push(
			`today: ${before.departures.length} departures, ${before.additions.length} additions`,
			`form shipped, membership ladder: ${membership.departures.length} departures, ${membership.additions.length} additions`,
		)
		const movedToForm = membership.departures.filter((row) => row.component === 'form')
		lines.push(`departure rows the membership ladder hands to form: ${movedToForm.length}`)
		const moves: string[] = []
		for (const row of membership.departures) {
			const owner = tiered(row.selector, undefined, recording, shipped)
			const landed = attributeSelector(row.selector, undefined, recording, shipped)
			if (owner !== row.component || landed !== row.component)
				moves.push(
					`departure | ${row.selector} | ${row.property} | ${row.condition ?? '—'} | row ${row.component} | membership ${landed ?? '—'} | tiered ${owner ?? '—'}`,
				)
		}
		for (const row of membership.additions) {
			if (row.category === 'keyframes') continue
			const selector = row.category === 'selector' ? row.name : row.name.split(' { ')[0]
			if (selector === undefined || row.category === 'property') continue
			const owner = tiered(selector, layers.get(selector), recording, shipped)
			if (owner !== row.component)
				moves.push(
					`addition | ${row.name} | ${row.condition ?? '—'} | ${row.category} | membership ${row.component} | tiered ${owner ?? '—'}`,
				)
		}
		// Rows whose owner differs between today's guide ledger (no form) and the tiered ladder.
		const againstToday: string[] = []
		for (const row of before.departures) {
			const owner = tiered(row.selector, undefined, recording, shipped)
			if (owner !== row.component)
				againstToday.push(
					`departure | ${row.selector} | ${row.property} | ${row.condition ?? '—'} | today ${row.component} | tiered ${owner ?? '—'}`,
				)
		}
		for (const row of before.additions) {
			if (row.category === 'keyframes' || row.category === 'property') continue
			const selector = row.category === 'selector' ? row.name : row.name.split(' { ')[0]
			if (selector === undefined) continue
			const owner = tiered(selector, layers.get(selector), recording, shipped)
			if (owner !== row.component)
				againstToday.push(
					`addition | ${row.name} | ${row.condition ?? '—'} | ${row.category} | today ${row.component} | tiered ${owner ?? '—'}`,
				)
		}
		lines.push('', `membership vs tiered (form shipped): ${moves.length}`, ...moves)
		lines.push('', `today vs tiered (form shipped): ${againstToday.length}`, ...againstToday)
		// The prediction: the membership ledger with each row re-owned by the tiered ladder. Before
		// the ladder lands the landed ledger is the membership ledger, so every move reads as a
		// mismatch; after it lands the mismatch list is empty. Rows the label partial adds are its own.
		const describe = (row: { readonly component: string }, rest: string): string =>
			`${row.component} | ${rest}`
		const partial = /^\.(form-label|form-text|col-form-label)/u
		const predicted = membership.departures
			.filter((row) => !partial.test(row.selector))
			.map((row) =>
				describe(
					{ component: tiered(row.selector, undefined, recording, shipped) ?? '—' },
					`${row.selector} | ${row.property} | ${row.condition ?? '—'} | ${row.emitted ?? '—'}`,
				),
			)
		const landed = collectLedger(cascade, inventory, shipped)
			.departures.filter((row) => !partial.test(row.selector))
			.map((row) =>
				describe(
					row,
					`${row.selector} | ${row.property} | ${row.condition ?? '—'} | ${row.emitted ?? '—'}`,
				),
			)
		const mismatched = [
			...predicted
				.filter((line) => !landed.includes(line))
				.map((line) => `predicted only: ${line}`),
			...landed.filter((line) => !predicted.includes(line)).map((line) => `landed only: ${line}`),
		]
		lines.push('', `landed ledger vs tiered prediction: ${mismatched.length}`, ...mismatched)
		writeFileSync(`${WORKSPACE_ROOT}tmp/units/bfl-ladder-probe.txt`, `${lines.join('\n')}\n`)
		expect(movedToForm.length).toBeGreaterThan(0)
	}, 120_000)
})
