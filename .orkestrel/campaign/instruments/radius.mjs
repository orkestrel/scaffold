// Compute each breaking row's consumer blast radius: for every edited symbol, which fleet packages
// reference it in src/, tests/, or guides/ while importing from the owning package.
// Usage: node radius.mjs  (reads fix/breaking-ledger.json, writes fix/breaking-radius.json)
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
const FIX = '/home/user/scaffold/.orkestrel/campaign/fix'
const ledger = process.argv[2] === '--control'
	? [{ package: process.argv[3], id: 'control', kind: 'control', edits: [{ symbol: process.argv[4] }] }]
	: JSON.parse(readFileSync(join(FIX, 'breaking-ledger.json'), 'utf8'))
const repos = readdirSync('/home/user/fleet').filter(d => statSync(join('/home/user/fleet', d)).isDirectory()).map(d => [d, join('/home/user/fleet', d)])
repos.push(['scaffold', '/home/user/scaffold'])
function grep(dir, pattern, paths) {
	try {
		return execFileSync('grep', ['-rlE', pattern, ...paths.map(p => join(dir, p)).filter(p => { try { statSync(p); return true } catch { return false } })], { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
	} catch { return [] }
}
const out = []
for (const row of ledger) {
	const spec = `@orkestrel/${row.package}`
	const consumers = {}
	for (const [name, dir] of repos) {
		if (name === row.package) continue
		const importers = grep(dir, `from '${spec}(/[a-z]+)?'`, ['src', 'tests', 'guides', 'app'])
		if (!importers.length) continue
		for (const e of row.edits || []) {
			if (!e.symbol) continue
			const hits = grep(dir, `\\b${e.symbol}\\b`, ['src', 'tests', 'app', `guides/${name}.md`, 'guides/README.md'])
			// A vendored dependency guide mirror names every upstream symbol; only the consumer's own guide counts.
			const both = hits.filter(h => importers.includes(h) || h.endsWith(`/guides/${name}.md`) || h.endsWith('/guides/README.md'))
			if (both.length) (consumers[name] ||= {})[e.symbol] = both.map(h => h.replace(dir + '/', ''))
		}
	}
	out.push({ package: row.package, id: row.id, kind: row.kind, consumers })
}
if (process.argv[2] !== '--control') writeFileSync(join(FIX, 'breaking-radius.json'), JSON.stringify(out, null, 1))
else console.log('CONTROL', out[0].edits ? '' : '', JSON.stringify(Object.fromEntries(Object.entries(out[0].consumers).map(([k, v]) => [k, Object.values(v).flat().length]))))
const touched = new Set(out.flatMap(r => Object.keys(r.consumers)))
console.log('rows:', out.length, '| rows with external consumers:', out.filter(r => Object.keys(r.consumers).length).length, '| consumer packages:', [...touched].sort().join(','))
