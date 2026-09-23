import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { expect, it } from 'vitest'
import { readBuiltCascade, SheetReader } from '../../tests/setupServer.js'

// L2 LEDGER-PRIORITY measurement (the Orchestrator's probe, run 2026-09-23 04:55 UTC in
// /home/user/veneer-bpc at d60d91c as tmp/probe/priority.test.ts, then removed): for every
// (selector, property) pair both the release and the built cascade declare, where do the
// priorities differ? Result: 1350 pairs compared, 59 important in the release, 89 important in the
// cascade overall, no mismatch (l2-probe.log.txt).
it('measures the priority mismatches between the release and the built cascade', () => {
	const release = new SheetReader(
		readFileSync(createRequire(import.meta.url).resolve('bootstrap/dist/css/bootstrap.css'), 'utf8'),
	)
	const cascade = new SheetReader(readBuiltCascade())
	const key = (selector: string, property: string): string => `${selector} { ${property} }`
	const shipped = new Map<string, boolean>()
	for (const declaration of cascade.declarations) {
		const k = key(declaration.selector, declaration.property)
		shipped.set(k, (shipped.get(k) ?? false) || declaration.important)
	}
	const mismatches: string[] = []
	const seen = new Set<string>()
	let compared = 0
	let releaseImportant = 0
	for (const declaration of release.declarations) {
		const k = key(declaration.selector, declaration.property)
		if (!shipped.has(k) || seen.has(k)) continue
		seen.add(k)
		compared += 1
		if (declaration.important) releaseImportant += 1
		const ours = shipped.get(k) ?? false
		if (ours !== declaration.important) mismatches.push(`${k}: release ${declaration.important ? 'important' : 'normal'}, cascade ${ours ? 'important' : 'normal'}`)
	}
	const cascadeImportant = [...shipped.values()].filter(Boolean).length
	console.log(JSON.stringify({ compared, releaseImportant, cascadeImportant, mismatches }, null, 1))
	expect(compared).toBeGreaterThan(0)
})
