// Prints the bounding box of the rows carrying a run of at least <run> pixels within <tolerance> of
// a target RGB in a PNG (a focus ring's horizontal edges), or "none".
// Usage: node bbox.cjs <png> <r,g,b> <tolerance> <run>
const { PNG } = require('/home/user/veneer/node_modules/pngjs')
const fs = require('node:fs')
const [source, rgb, tol, run] = process.argv.slice(2)
const [R, G, B] = rgb.split(',').map(Number), T = Number(tol), N = Number(run)
const image = PNG.sync.read(fs.readFileSync(source))
let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1, rows = 0
for (let y = 0; y < image.height; y++) {
	let first = -1, last = -1, count = 0
	for (let x = 0; x < image.width; x++) {
		const i = (y * image.width + x) * 4
		if (Math.abs(image.data[i] - R) <= T && Math.abs(image.data[i + 1] - G) <= T && Math.abs(image.data[i + 2] - B) <= T) {
			count++; if (first < 0) first = x; last = x
		}
	}
	if (count >= N) { rows++; if (first < x0) x0 = first; if (last > x1) x1 = last; if (y < y0) y0 = y; if (y > y1) y1 = y }
}
console.log(rows ? `${x0} ${y0} ${x1 - x0 + 1} ${y1 - y0 + 1} rows=${rows}` : 'none')
