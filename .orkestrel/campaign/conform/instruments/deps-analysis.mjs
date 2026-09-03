// For every checkout: @orkestrel ranges that lag the registry latest (deps, dev, peer, optional), and whether
// @vitest/browser-playwright or playwright is declared without a browser environment.
import { readFileSync, existsSync, readdirSync } from 'node:fs'
const reg = JSON.parse(readFileSync('/home/user/work/registry.json', 'utf8'))
const dir = (n) => (n === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${n}`)
const names = [...readdirSync('/home/user/fleet'), 'scaffold']
const out = {}
for (const n of names) {
	const m = JSON.parse(readFileSync(`${dir(n)}/package.json`, 'utf8'))
	const lag = []
	for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
		for (const [k, v] of Object.entries(m[field] ?? {})) {
			if (!k.startsWith('@orkestrel/')) continue
			const bare = k.slice(11)
			const latest = reg[bare]?.version
			if (!latest) { lag.push(`${field}:${k} ${v} (registry unknown)`); continue }
			if (v !== `^${latest}`) lag.push(`${field}:${k} ${v} -> ^${latest}`)
		}
	}
	const browser = existsSync(`${dir(n)}/src/browser`) || existsSync(`${dir(n)}/app/browser`) || existsSync(`${dir(n)}/tests/setupBrowser.ts`) || existsSync(`${dir(n)}/src/styles`)
	const dev = m.devDependencies ?? {}
	const runner = ['@vitest/browser-playwright', 'playwright'].filter((k) => k in dev)
	out[n] = { lag, browser, runner: runner.length && !browser ? runner : [] }
}
for (const [n, r] of Object.entries(out)) {
	const parts = []
	if (r.lag.length) parts.push(`lag: ${r.lag.join('; ')}`)
	if (r.runner.length) parts.push(`unused runner: ${r.runner.join(', ')}`)
	if (parts.length) console.log(`${n} [${r.browser ? 'browser' : 'no-browser'}] ${parts.join(' | ')}`)
}
console.log('--- browser packages:', Object.entries(out).filter(([, r]) => r.browser).map(([n]) => n).join(' '))
