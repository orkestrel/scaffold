// Manifest census over every @orkestrel package under /home/user. Reads manifests only;
// writes nothing. Coverage: every directory under /home/user holding a package.json whose
// name starts with '@orkestrel/'. Anything outside /home/user is not measured.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const rows = []
for (const dir of readdirSync('/home/user')) {
	const manifestPath = join('/home/user', dir, 'package.json')
	if (!existsSync(manifestPath)) continue
	let manifest
	try { manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) } catch { continue }
	if (typeof manifest.name !== 'string' || !manifest.name.startsWith('@orkestrel/')) continue

	const scripts = manifest.scripts ?? {}
	const dev = manifest.devDependencies ?? {}
	const runtime = manifest.dependencies ?? {}
	const exportsMap = manifest.exports ?? {}

	// Walk the exports map, collecting subpaths, the conditions each declares, and every
	// relative target string it resolves to.
	const subpaths = []
	for (const [subpath, value] of Object.entries(exportsMap)) {
		const conditions = new Set()
		const targets = []
		const stack = [value]
		while (stack.length > 0) {
			const node = stack.pop()
			if (typeof node === 'string') { if (node.startsWith('./')) targets.push(node.slice(2)); continue }
			if (typeof node === 'object' && node !== null) {
				for (const [key, child] of Object.entries(node)) { conditions.add(key); stack.push(child) }
			}
		}
		subpaths.push({ subpath, conditions: [...conditions].sort(), targets: targets.sort() })
	}

	rows.push({
		name: manifest.name,
		repo: dir,
		version: manifest.version,
		private: manifest.private === true,
		proof: existsSync(join('/home/user', dir, 'tests', 'distribution.test.ts')),
		scriptDeclared: typeof scripts['test:distribution'] === 'string',
		prepublishNames: typeof scripts.prepublishOnly === 'string' && scripts.prepublishOnly.includes('test:distribution'),
		releaseMode: typeof scripts.prepublishOnly === 'string' && scripts.prepublishOnly.includes('--mode release'),
		testDeclared: '@orkestrel/test' in dev || '@orkestrel/test' in runtime,
		typescriptDeclared: 'typescript' in dev,
		hasSrc: existsSync(join('/home/user', dir, 'src')),
		files: manifest.files ?? null,
		subpaths,
		anyRequire: subpaths.some((s) => s.conditions.includes('require')),
		anyTypes: subpaths.some((s) => s.conditions.includes('types')),
	})
}
rows.sort((a, b) => a.name.localeCompare(b.name))
console.log(JSON.stringify(rows, null, 0))
