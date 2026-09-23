// Prints each row carrying a run of at least <run> blue-dominant pixels (b > r + 40 and b > g + 20), with its modal RGB.
// Usage: node rows.cjs <png> <run>
const { PNG } = require('/home/user/veneer/node_modules/pngjs')
const fs = require('node:fs')
const [source, run] = process.argv.slice(2); const N = Number(run)
const image = PNG.sync.read(fs.readFileSync(source))
for (let y = 0; y < image.height; y++) {
	const tally = new Map(); let count = 0, first = -1, last = -1
	for (let x = 0; x < image.width; x++) {
		const i = (y * image.width + x) * 4, r = image.data[i], g = image.data[i + 1], b = image.data[i + 2]
		if (b > r + 40 && b > g + 20) { count++; if (first < 0) first = x; last = x; const k = `${r},${g},${b}`; tally.set(k, (tally.get(k) ?? 0) + 1) }
	}
	if (count >= N) { const mode = [...tally.entries()].sort((a, b) => b[1] - a[1])[0]; console.log(`${y} x=${first}..${last} n=${count} mode=${mode[0]}x${mode[1]}`) }
}
