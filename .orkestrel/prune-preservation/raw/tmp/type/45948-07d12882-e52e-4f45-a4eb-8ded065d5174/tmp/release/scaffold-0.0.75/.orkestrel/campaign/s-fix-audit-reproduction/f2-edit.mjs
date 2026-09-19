// Edit a scratch target's package.json scripts for the fix-round reproductions. Usage:
//   node f2-edit.mjs <target> indirect   — route the journey invocation through test:checks
//   node f2-edit.mjs <target> extra      — add test:extra naming an absent project and an absent config
//   node f2-edit.mjs <target> extra-config-only — the same with the project token removed
//   node f2-edit.mjs <target> restore    — restore the manifest saved by the first edit
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const [target, mode] = process.argv.slice(2)
const path = join(target, 'package.json')
const saved = join(target, 'package.json.saved')
if (mode === 'restore') {
	writeFileSync(path, readFileSync(saved, 'utf8'))
	console.log('restored')
	process.exit(0)
}
if (!existsSync(saved)) writeFileSync(saved, readFileSync(path, 'utf8'))
const manifest = JSON.parse(readFileSync(saved, 'utf8'))
if (mode === 'indirect') {
	manifest.scripts.test = manifest.scripts.test.replace('npm run test:journey', 'npm run test:checks')
	manifest.scripts['test:checks'] = 'npm run "test:journey"'
} else if (mode === 'extra') {
	manifest.scripts['test:extra'] = 'vitest run --project absent --config configs/absent.config.ts'
} else if (mode === 'extra-config-only') {
	manifest.scripts['test:extra'] = 'vitest run --config configs/absent.config.ts'
} else if (mode === 'e2e') {
	manifest.scripts['test:e2e'] = 'playwright test --config playwright.config.ts'
} else if (mode === 'grouped') {
	manifest.scripts.test = manifest.scripts.test.replace(
		'npm run test:app && npm run test:journey',
		'npm run test:gui',
	)
	manifest.scripts['test:gui'] = 'npm run test:app && npm run test:journey'
} else {
	throw new Error(`unknown mode ${mode}`)
}
writeFileSync(path, `${JSON.stringify(manifest, undefined, '\t')}\n`)
console.log(`edited: ${mode}; test = ${manifest.scripts.test}`)
