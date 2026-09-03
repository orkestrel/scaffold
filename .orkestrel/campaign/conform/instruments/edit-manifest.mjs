// Align every @orkestrel/* range (dependencies, devDependencies, peerDependencies, optionalDependencies) to
// ^<registry latest>, and drop @vitest/browser-playwright from a workspace with no browser environment.
// Prints one line per change. Usage: node edit-manifest.mjs <pkg>
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
const name = process.argv[2]
const dir = name === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${name}`
const reg = JSON.parse(readFileSync('/home/user/work/registry.json', 'utf8'))
const path = `${dir}/package.json`
const text = readFileSync(path, 'utf8')
const m = JSON.parse(text)
const changes = []
for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
	for (const [k, v] of Object.entries(m[field] ?? {})) {
		if (!k.startsWith('@orkestrel/')) continue
		const latest = reg[k.slice(11)]?.version
		if (latest && v !== `^${latest}`) { m[field][k] = `^${latest}`; changes.push(`${field} ${k} ${v} -> ^${latest}`) }
	}
}
const browser = ['src/browser', 'app/browser', 'tests/setupBrowser.ts', 'src/styles'].some((p) => existsSync(`${dir}/${p}`))
if (!browser && name !== 'scaffold' && m.devDependencies?.['@vitest/browser-playwright']) {
	delete m.devDependencies['@vitest/browser-playwright']
	changes.push('devDependencies @vitest/browser-playwright removed (no browser environment)')
}
if (changes.length) {
	const indent = text.match(/^(\t| +)"/m)?.[1] ?? '\t'
	writeFileSync(path, JSON.stringify(m, null, indent) + '\n')
}
console.log(changes.length ? changes.join('\n') : 'no change')
