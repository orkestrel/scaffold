import { readFileSync, writeFileSync } from 'node:fs'
import { it } from 'vitest'
import { TOKEN_NAMES } from '@src/core'
import {
	classifyValueGaps,
	collectLedger,
	collectShippedComponents,
	compileExpandedCascade,
	createValueResolver,
	readAdditions,
	readBootstrapCascade,
	readBuiltCascade,
	readCascadeBlocks,
	readCompatibility,
	readOracleInventory,
	readVeneerGuide,
	scanCanonicalValues,
	scanWitnesses,
} from '../../../../tests/setupServer.js'
import { collectReferenceRows, collectTokenNames } from '../../../../tests/setupStyles.js'

it('times the ledger resolution the conformance hook runs', async () => {
	const cascade = compileExpandedCascade()
	const inventory = readOracleInventory()
	const shipped = collectShippedComponents(readCompatibility())
	const measured = collectLedger(cascade, inventory, shipped, readAdditions())
	const references = collectReferenceRows(readVeneerGuide(), collectTokenNames(TOKEN_NAMES))
	const dark = (inventory.components.theme?.rules ?? [])
		.filter(({ selector }) => selector.startsWith('[data-bs-theme=dark] '))
		.flatMap(({ selector, declarations }) => declarations.map(({ property }) => [selector, property] as const))
	const repainted = `${cascade}\n@layer components { ${dark.map(([selector, property]) => `${selector} { ${property}: none }`).join(' ')} }\n`
	const repaints = [shipped, shipped.filter((key) => key !== 'theme')].map((keys) => collectLedger(repainted, inventory, keys).gaps)
	const load = readFileSync('/proc/loadavg', 'utf8').trim()
	const started = performance.now()
	const [departing, tokens] = await Promise.all([
		createValueResolver(readBootstrapCascade(), readBuiltCascade()),
		createValueResolver(readBuiltCascade(), readBuiltCascade()),
	])
	const launched = performance.now()
	const classifiedLedger = await classifyValueGaps(measured.gaps, departing)
	const classified = performance.now()
	for (const gaps of repaints) await classifyValueGaps(gaps, departing)
	const repainting = performance.now()
	const lines = await scanCanonicalValues(readCascadeBlocks(cascade), references, tokens)
	await scanWitnesses(classifiedLedger.departures, references, departing)
	await scanWitnesses(classifiedLedger.departures.map((row) => ({ ...row, departure: 'retuned' as const })), references, departing)
	const scanned = performance.now()
	await Promise.all([departing.destroy(), tokens.destroy()])
	const closed = performance.now()
	writeFileSync(
		'tmp/units/r2/probe/timing.txt',
		`${new Date().toISOString()} load ${load} gaps ${String(measured.gaps.length)} launch ${(launched - started).toFixed(0)} classify ${(classified - launched).toFixed(0)} repaints ${(repainting - classified).toFixed(0)} canonical and witnesses ${(scanned - repainting).toFixed(0)} (${String(lines.length)} lines) close ${(closed - scanned).toFixed(0)} total ${(closed - started).toFixed(0)} ms\n`,
		{ flag: 'a' },
	)
}, 400_000)
