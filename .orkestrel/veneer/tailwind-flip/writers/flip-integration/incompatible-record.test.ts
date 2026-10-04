import { expect, it } from 'vitest'
import { commands } from 'vitest/browser'
import built from '../../../dist/src/bootstrap/index.css?raw'
import comparison from '../../../tests/fixtures/tailwindcss/comparison.json'
import recipe from '../../../tests/fixtures/tailwindcss/recipe.json'
import { isIncompatibleRecord, RELATION_WIDTHS, LAYER_STATEMENT } from '../../../tests/setup.js'
import { deriveIncompatibleRows, readClassLonghands } from '../../../tests/setupStyles.js'

it('re-derives raw-composition incompatibility and writes only changed rows', async () => {
	const path = 'tests/fixtures/tailwindcss/incompatible.json'
	const text = await commands.readFile(path)
	const current: unknown = JSON.parse(text)
	if (!isIncompatibleRecord(current)) throw new Error('Malformed incompatible record')
	const alone = readClassLonghands(comparison.shared, RELATION_WIDTHS, [built])
	const exposed = readClassLonghands(comparison.shared, RELATION_WIDTHS, [built, recipe.unexcluded])
	const reversed = readClassLonghands(comparison.shared, RELATION_WIDTHS, [recipe.unexcluded, built])
	console.log('unexcluded order', JSON.stringify({ opening: recipe.unexcluded.slice(0, 300), statement: LAYER_STATEMENT, equal: JSON.stringify(exposed.map((row) => [...row.values])) === JSON.stringify(reversed.map((row) => [...row.values])) }))
	const rows = deriveIncompatibleRows(alone, exposed)
	const changed = JSON.stringify(current.rows) !== JSON.stringify(rows)
	await commands.writeFile('tmp/units/flip-integration/incompatible-reading.json', JSON.stringify({
		before: current.rows.length, after: rows.length, changed,
		names: [...new Set([...current.rows, ...rows].map((row) => row.name))].filter((name) => JSON.stringify(current.rows.filter((row) => row.name === name)) !== JSON.stringify(rows.filter((row) => row.name === name))),
		opening: recipe.unexcluded.slice(0, 300), statement: LAYER_STATEMENT,
		reversed: deriveIncompatibleRows(exposed, reversed),
	}, null, '\t') + '\n')
	console.log('incompatible reading', JSON.stringify({ before: current.rows.length, after: rows.length, changed, names: [...new Set([...current.rows, ...rows].map((row) => row.name))].filter((name) => JSON.stringify(current.rows.filter((row) => row.name === name)) !== JSON.stringify(rows.filter((row) => row.name === name))) }))
	if (changed) await commands.writeFile(path, JSON.stringify({ bootstrap: current.bootstrap, tailwindcss: current.tailwindcss, widths: current.widths, rows }, null, '\t') + '\n')
	const written: unknown = JSON.parse(await commands.readFile(path))
	if (!isIncompatibleRecord(written)) throw new Error('Malformed written record')
	expect(written.rows).toEqual(rows)
}, 60000)
