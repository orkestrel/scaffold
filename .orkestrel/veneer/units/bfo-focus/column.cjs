// Prints the runs of constant RGB along one column of a PNG between two rows.
// Usage: node column.cjs <png> <x> <y0> <y1>
const { PNG } = require('/home/user/veneer/node_modules/pngjs')
const fs = require('node:fs')
const [source, x, y0, y1] = process.argv.slice(2)
const image = PNG.sync.read(fs.readFileSync(source)); const X = Number(x)
let start = Number(y0), prev = ''
for (let y = Number(y0); y <= Number(y1); y++) {
	const i = (y * image.width + X) * 4, k = `${image.data[i]},${image.data[i + 1]},${image.data[i + 2]}`
	if (k !== prev) { if (prev) console.log(`${start}..${y - 1} ${prev}`); start = y; prev = k }
}
console.log(`${start}..${y1} ${prev}`)
