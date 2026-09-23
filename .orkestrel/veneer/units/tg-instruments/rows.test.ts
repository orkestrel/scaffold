import { writeFileSync } from 'node:fs'
import { it } from 'vitest'
import { readBuiltCascade, readCascadeBlocks, readOracleInventory } from '../../tests/setupServer.js'
import { normalizeComplexSelector } from '../../tests/setupStyles.js'

const NAMES = [
	'.btn-group > .btn.dropdown-toggle-split:first-child',
	'.btn-sm + .dropdown-toggle-split',
	'.btn-group-sm > .btn + .dropdown-toggle-split',
	'.btn-lg + .dropdown-toggle-split',
	'.btn-group-lg > .btn + .dropdown-toggle-split',
	'.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)',
	'.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)',
	'.dropdown-toggle-split',
	'.dropdown-toggle-split::after',
	'.dropup .dropdown-toggle-split::after',
	'.dropend .dropdown-toggle-split::after',
	'.dropstart .dropdown-toggle-split::before',
]

it('reads each formerly deferred selector in the built cascade against the inventory', () => {
	const blocks = readCascadeBlocks(readBuiltCascade())
	const inventory = readOracleInventory()
	const lines: string[] = []
	for (const name of NAMES) {
		const selector = normalizeComplexSelector(name)
		const written = blocks.filter((block) => block.selector === selector)
		const keys = Object.entries(inventory.components).filter(([, vocabulary]) =>
			vocabulary.rules.some((rule) => normalizeComplexSelector(rule.selector) === selector),
		)
		for (const [key, vocabulary] of keys)
			for (const rule of vocabulary.rules.filter(
				(entry) => normalizeComplexSelector(entry.selector) === selector,
			))
				for (const declaration of rule.declarations) {
					const emitted = written
						.filter((block) => block.declarations.has(declaration.property))
						.at(-1)
						?.declarations.get(declaration.property)
					lines.push(
						`${name} | ${key} | ${declaration.property} | recorded ${declaration.value} | built ${emitted ?? 'ABSENT'}`,
					)
				}
	}
	writeFileSync('tmp/probe/rows.txt', `${lines.join('\n')}\n`)
})
