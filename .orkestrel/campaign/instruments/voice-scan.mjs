// Count TSDoc blocks under src/ and app/ of every checkout by first-sentence voice and boolean @returns wording.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
const roots = { scaffold: '/home/user/scaffold' }
for (const n of readdirSync('/home/user/fleet')) roots[n] = `/home/user/fleet/${n}`
const walk = (dir, out) => { for (const e of readdirSync(dir)) { const p = join(dir, e); const s = statSync(p); if (s.isDirectory()) walk(p, out); else if (/\.ts$/.test(e) && !/\.d\.ts$/.test(e)) out.push(p) }; return out }
const THIRD = /^(?:[A-Z][a-z]+(?:-[a-z]+)*s|Is|Has|Does|Can)\b/
const IMPER = /^(?:[A-Z][a-z]+(?:-[a-z]+)*)\b/
const LIST = process.argv[2] === '--list' ? process.argv[3] : undefined
const rows = []
let totals = { blocks: 0, imperative: 0, verbless: 0, returnsBad: 0 }
for (const [name, root] of Object.entries(roots)) {
	const files = []
	for (const d of ['src', 'app']) if (existsSync(join(root, d))) walk(join(root, d), files)
	const r = { name, files: files.length, blocks: 0, imperative: 0, verbless: 0, returnsBad: 0 }
	for (const f of files) {
		const text = readFileSync(f, 'utf8')
		for (const m of text.matchAll(/\/\*\*([\s\S]*?)\*\//g)) {
			const body = m[1].split('\n').map((l) => l.replace(/^\s*\*\s?/, '')).join('\n').trim()
			if (!body) continue
			const first = body.split(/\n\s*\n|\n@/)[0].trim().split('\n')[0].trim()
			r.blocks++
			const word = first.match(/^[`A-Za-z]+/)?.[0] ?? ''
			if (LIST === name && !(word && THIRD.test(first))) console.error(`${f}: ${first.slice(0, 100)}`)
			if (word && THIRD.test(first)) { /* third person */ }
			else if (word && IMPER.test(first) && !/^(?:The|A|An|This|Each|Every|One|All|Any|No|Its|Their|Whether|If|When|How|What|Which|Where|Why|Options|Input|Output|Result|Runtime|Default|Type|Shape|Value|Name|Number|Boolean|String|True|False|Null|Undefined)$/.test(word)) r.imperative++
			else r.verbless++
			if (/@returns\s+(?:Whether|`true`|true\b|`false`|false\b)/i.test(body) && !/@returns\s+True if [\s\S]*; false otherwise/.test(body)) r.returnsBad++
		}
	}
	rows.push(r); for (const k of ['blocks', 'imperative', 'verbless', 'returnsBad']) totals[k] += r[k]
}
rows.sort((a, b) => b.imperative + b.verbless + b.returnsBad - (a.imperative + a.verbless + a.returnsBad))
for (const r of rows) console.log(`${r.name.padEnd(11)} files=${String(r.files).padStart(3)} blocks=${String(r.blocks).padStart(4)} imperative=${String(r.imperative).padStart(4)} verbless=${String(r.verbless).padStart(4)} returnsBad=${String(r.returnsBad).padStart(3)}`)
console.log('TOTAL', JSON.stringify(totals))
