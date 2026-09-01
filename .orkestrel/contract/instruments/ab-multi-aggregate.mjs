// Aggregates ab-multi.sh replicate outputs: per family, per-process median
// ratios with swapped-order runs inverted; reports median, min, max, and the
// spread. Run: node ab-multi-aggregate.mjs <dir>
/* eslint-disable */
import { readdirSync, readFileSync } from 'node:fs'
const dir = process.argv[2]
const perFamily = new Map()
for (const file of readdirSync(dir).sort()) {
	const swapped = file.startsWith('ba-')
	for (const line of readFileSync(`${dir}/${file}`, 'utf8').split('\n')) {
		const m = /^([a-z0-9-]+): A \d+ ns\/op  B \d+ ns\/op  B\/A median ([0-9.]+)/.exec(line)
		if (!m) continue
		const ratio = swapped ? 1 / Number(m[2]) : Number(m[2])
		if (!perFamily.has(m[1])) perFamily.set(m[1], [])
		perFamily.get(m[1]).push({ file, ratio })
	}
}
for (const [family, rows] of perFamily) {
	const ratios = rows.map(r => r.ratio).sort((x, y) => x - y)
	const median = ratios[Math.floor(ratios.length / 2)]
	console.log(`${family}: median ${median.toFixed(3)} min ${ratios[0].toFixed(3)} max ${ratios[ratios.length - 1].toFixed(3)} replicates ${rows.map(r => `${r.file.replace('.out', '')}=${r.ratio.toFixed(3)}`).join(' ')}`)
}
