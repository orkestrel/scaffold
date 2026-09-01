#!/bin/bash
# P1: does preview run under a VALID deep audit (union fan-out hypothesis)?
# Patches a scratch copy of the dist to count preview calls; zero on the valid
# workload refutes unit U5. Control: the invalid-explain workload must count > 0.
set -e
SP="$(dirname "$(dirname "$0")")"
mkdir -p "$SP/dists/p1"
cp /home/user/contract/dist/src/core/index.js "$SP/dists/p1/index.js"
node - "$SP/dists/p1/index.js" <<'PATCH'
const { readFileSync, writeFileSync } = require('node:fs')
const file = process.argv[2]
const text = readFileSync(file, 'utf8')
const marker = 'function preview(value) {'
if (!text.includes(marker)) { console.error('marker missing'); process.exit(1) }
const patched = text.replace(marker, 'function preview(value) {\n\tglobalThis.PREVIEW_COUNT = (globalThis.PREVIEW_COUNT ?? 0) + 1;')
writeFileSync(file, patched)
console.log('patched')
PATCH
node - "$SP/dists/p1/index.js" <<'RUN'
const distPath = process.argv[2]
import(distPath).then(({ createContract, arrayShape, booleanShape, integerShape, literalShape, objectShape, stringShape, unionShape }) => {
	const medium = objectShape({
		name: stringShape({ min: 1 }), age: integerShape({ min: 0, max: 150 }), active: booleanShape(),
		tags: arrayShape(stringShape(), { max: 16 }), role: literalShape(['admin', 'editor', 'viewer']),
	})
	const deep = objectShape({
		user: medium,
		addresses: arrayShape(objectShape({ street: stringShape(), city: stringShape(), zip: stringShape({ pattern: /^\d{5}$/ }) }), { max: 4 }),
		contact: unionShape(
			objectShape({ via: literalShape(['email']), value: stringShape() }),
			objectShape({ via: literalShape(['phone']), value: stringShape() }),
		),
		settings: objectShape({ theme: literalShape(['light', 'dark']), notify: booleanShape(), limits: objectShape({ daily: integerShape({ min: 0 }), monthly: integerShape({ min: 0 }) }) }),
	})
	const c = createContract(deep)
	const deepValid = {
		user: { name: 'Ada', age: 36, active: true, tags: ['ops'], role: 'admin' },
		addresses: [{ street: 'Main 1', city: 'Bern', zip: '30012' }],
		contact: { via: 'email', value: 'ada@example.test' },
		settings: { theme: 'dark', notify: true, limits: { daily: 10, monthly: 200 } },
	}
	const deepInvalid = { ...deepValid, settings: { ...deepValid.settings, limits: { daily: 10, monthly: -1 } } }
	globalThis.PREVIEW_COUNT = 0
	for (let i = 0; i < 100; i++) c.audit(deepValid)
	const validCount = globalThis.PREVIEW_COUNT
	globalThis.PREVIEW_COUNT = 0
	for (let i = 0; i < 100; i++) c.explain(deepInvalid)
	const invalidCount = globalThis.PREVIEW_COUNT
	console.log(`preview calls: valid-audit x100 = ${validCount}; invalid-explain x100 = ${invalidCount} (control, must be > 0)`)
	console.log(validCount > 0 ? 'U5 GATE: FIRES - losing variants build previews on valid walks' : 'U5 GATE: REFUTED - zero preview calls on valid walk')
})
RUN
