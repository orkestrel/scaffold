import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
// Per pool (family, motion, description): per-run slowest readings; own ratio over per-run slowest >= THRESHOLD; largest ratio across all pools.
const args = process.argv.slice(2)
const runs = args.filter((a) => !a.startsWith('--'))
const thresholds = (args.find((a) => a.startsWith('--thresholds=')) ?? '--thresholds=10,20,50,100,150,200,300').slice(13).split(',').map(Number)
type Reading = { run: string; family: string; motion: string; description: string; ms: number }
const readings: Reading[] = []
for (const run of runs) {
	const files = [join(run, 'stdout.log')]
	const journey = join(run, 'journey')
	if (existsSync(journey)) for (const f of readdirSync(journey)) files.push(join(journey, f))
	for (const file of files) {
		if (!existsSync(file)) continue
		for (const line of readFileSync(file, 'utf8').split('\n')) {
			const at = line.indexOf('Settle probe {')
			if (at < 0) continue
			const text = line.slice(at + 'Settle probe '.length)
			let depth = 0, end = -1
			for (let i = 0; i < text.length; i++) { if (text[i] === '{') depth++; else if (text[i] === '}') { depth--; if (depth === 0) { end = i; break } } }
			if (end < 0) continue
			let entry: any
			try { entry = JSON.parse(text.slice(0, end + 1)) } catch { continue }
			for (const w of entry.waits ?? []) readings.push({ run: basename(run), family: entry.family, motion: String(entry.motion ?? 'n/a'), description: w.description, ms: w.milliseconds })
		}
	}
}
const pools = new Map<string, Map<string, Reading>>()
for (const r of readings) {
	const k = `${r.description} [${r.family}, ${r.motion}]`
	if (!pools.has(k)) pools.set(k, new Map())
	const perRun = pools.get(k)!
	const cur = perRun.get(r.run)
	if (!cur || r.ms > cur.ms) perRun.set(r.run, r)
}
const ceiling = [...pools.values()].flatMap((m) => [...m.values()]).reduce((a, b) => (b.ms > a.ms ? b : a))
console.log(`pools=${pools.size} ceiling=${ceiling.ms.toFixed(1)} ${ceiling.description} [${ceiling.family}, ${ceiling.motion}] ${ceiling.run}`)
for (const t of thresholds) {
	const ratios: { pool: string; ratio: number; slow: Reading; fast: Reading }[] = []
	for (const [pool, perRun] of pools) {
		const counting = [...perRun.values()].filter((r) => r.ms >= t).sort((a, b) => b.ms - a.ms)
		if (counting.length < 2) continue
		ratios.push({ pool, ratio: counting[0].ms / counting[counting.length - 1].ms, slow: counting[0], fast: counting[counting.length - 1] })
	}
	ratios.sort((a, b) => b.ratio - a.ratio)
	const top = ratios[0]
	const over2 = ratios.filter((r) => r.ratio > 2).length, over15 = ratios.filter((r) => r.ratio > 1.5).length
	console.log(`threshold ${t} ms: pools with own ratio ${ratios.length}; >1.5: ${over15}; >2: ${over2}; largest ${top?.ratio.toFixed(4)} ${top?.pool} (${top?.slow.ms.toFixed(1)} ${top?.slow.run} / ${top?.fast.ms.toFixed(1)} ${top?.fast.run}) -> budget ${Math.ceil((ceiling.ms * Math.max(1.1637, top?.ratio ?? 0)) / 100) * 100}`)
	for (const r of ratios.slice(1, 4)) console.log(`    next ${r.ratio.toFixed(4)} ${r.pool} (${r.slow.ms.toFixed(1)}/${r.fast.ms.toFixed(1)})`)
}
