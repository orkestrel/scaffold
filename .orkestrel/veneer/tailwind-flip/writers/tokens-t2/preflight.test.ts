import { expect, it } from 'vitest'
import { commands } from 'vitest/browser'
import built from '../../../dist/src/tailwindcss/index.css?raw'
import preflight from '../../../node_modules/tailwindcss/preflight.css?raw'
import reboot from '../../../node_modules/bootstrap/dist/css/bootstrap-reboot.css?raw'
import before from '../../../tests/fixtures/tailwindcss/preflight.json'
import { isPreflightRecord } from '../../../tests/setup.js'
import { collectElementNames, collectPreflightPseudos, collectPreflightRows, readChromiumMajor } from '../../../tests/setupStyles.js'

it('writes the live Chromium preflight record only when its bytes differ', async () => {
	const chromium = readChromiumMajor()
	const path = 'tests/fixtures/tailwindcss/preflight.json'
	const current = await commands.readFile(path)
	expect(JSON.parse(current)).toEqual(before)
	const record = {
		tailwindcss: before.tailwindcss,
		bootstrap: before.bootstrap,
		chromium,
		elements: collectElementNames(reboot + '\n' + preflight),
		pseudos: collectPreflightPseudos(preflight),
		rows: collectPreflightRows(built, preflight, reboot),
	}
	expect(isPreflightRecord(record)).toBe(true)
	console.log('preflight reading', JSON.stringify({ chromium, before: before.rows.length, after: record.rows.length }))
	const text = JSON.stringify(record, null, '\t') + '\n'
	if (current !== text) await commands.writeFile(path, text)
	expect(await commands.readFile(path)).toBe(text)
})
