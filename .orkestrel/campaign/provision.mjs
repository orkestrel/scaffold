// Fleet sweep: which published @orkestrel packages declare the scripts that only a
// present cross-cutting proof can produce. `package.json` ships in every tarball, and
// scaffold emits each script solely from its proof's presence, so the registry manifest
// reports the proof without needing a checkout.
import { readFileSync } from 'node:fs'

const NAMES = JSON.parse(readFileSync(new URL('./fleet-census.json', import.meta.url), 'utf8')).map(
	(row) => row.name,
)
const SCRIPTS = ['test:setup', 'test:distribution', 'test:integration', 'test:conformance', 'test:guides']

async function readManifest(name) {
	const response = await fetch(`https://registry.npmjs.org/${name.replace('/', '%2F')}/latest`)
	if (!response.ok) return { name, error: `HTTP ${response.status}` }
	const manifest = await response.json()
	const scripts = manifest.scripts ?? {}
	return {
		name,
		version: manifest.version,
		declared: SCRIPTS.filter((script) => typeof scripts[script] === 'string'),
	}
}

const rows = []
for (const name of NAMES) rows.push(await readManifest(name))

const failed = rows.filter((row) => row.error !== undefined)
console.log(`population ${rows.length} packages, read from registry.npmjs.org, ${failed.length} unreadable`)
for (const row of failed) console.log(`  UNREADABLE ${row.name}: ${row.error}`)
for (const script of SCRIPTS) {
	const carriers = rows.filter((row) => row.declared?.includes(script)).map((row) => row.name.slice('@orkestrel/'.length))
	console.log(`\n${script}: ${carriers.length === 0 ? 'NO PACKAGE DECLARES IT' : carriers.join(', ')}`)
}
