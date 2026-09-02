// Second distributable inventory: for every fleet package (built by the gate sweep), compare dist/ and
// README.md against the published tarball of its declared version, join with the layer order, and
// write .orkestrel/campaign/inventory-2.md with the republish order. Usage: node inventory2.mjs
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
const dirs = { scaffold: '/home/user/scaffold' }
for (const n of readdirSync('/home/user/fleet')) dirs[n] = `/home/user/fleet/${n}`
const layers = execFileSync('node', ['/home/user/work/layers.mjs'], { encoding: 'utf8' }).trim().split('\n')
const layerOf = new Map()
for (const line of layers) {
	const m = line.match(/^L(\d+): (.*)$/)
	if (m) for (const n of m[2].split(' ')) layerOf.set(n, Number(m[1]))
}
const rows = []
for (const [n, d] of Object.entries(dirs).sort()) {
	const pkg = JSON.parse(readFileSync(join(d, 'package.json'), 'utf8'))
	let dist
	try { dist = JSON.parse(execFileSync('node', ['/home/user/work/distdiff.mjs', d], { encoding: 'utf8' })) } catch (error) { dist = { moved: 'ERR', error: String(error.message).slice(0, 200) } }
	const slug = pkg.name.replace('@', '').replace('/', '-')
	const pubReadme = join('/home/user/work/published', `${slug}-${pkg.version}`, 'package', 'README.md')
	const readmeMoved = existsSync(pubReadme) ? readFileSync(join(d, 'README.md'), 'utf8') !== readFileSync(pubReadme, 'utf8') : 'no published copy'
	const tip = execFileSync('git', ['-C', d, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
	rows.push({ name: n, version: pkg.version, layer: layerOf.get(n), tip, distMoved: dist.moved, added: dist.added?.length ?? 0, removed: dist.removed?.length ?? 0, changed: dist.changed?.length ?? 0, readmeMoved, error: dist.error })
}
const lines = [`# ${process.env.INVENTORY_TITLE || 'Second'} distributable inventory`, '', `Taken ${new Date().toISOString().slice(0, 10)} against each package's declared published version; dist compared by material content (no sourcemaps, whitespace ignored); README compared byte for byte. The layer is the runtime-dependency publish round from layers.mjs; scaffold publishes on its own account.`, '', '| Package | Version | Layer | Tip | dist moved | added | removed | changed | README moved |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- |']
for (const r of rows) lines.push(`| ${r.name} | ${r.version} | ${r.layer ?? '—'} | ${r.tip} | ${r.distMoved}${r.error ? ' (' + r.error + ')' : ''} | ${r.added} | ${r.removed} | ${r.changed} | ${r.readmeMoved} |`)
lines.push('', '## Republish order', '', 'Every package whose dist moved bumps and publishes in layer order; a package whose dist stands but whose README moved publishes on its next release. Layers:', '')
for (const line of layers) lines.push(`- ${line}`)
writeFileSync(process.env.INVENTORY_OUT || '/home/user/scaffold/.orkestrel/campaign/inventory-2.md', lines.join('\n') + '\n')
console.log(JSON.stringify(rows.map((r) => ({ name: r.name, layer: r.layer, distMoved: r.distMoved, readmeMoved: r.readmeMoved }))))
