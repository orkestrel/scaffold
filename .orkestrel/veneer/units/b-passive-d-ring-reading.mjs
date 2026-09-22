// Reads a capture frame's top band: the first painted row, and the rows carrying the focus ring's
// own mix color with the span of each. A ring clipped by the frame's edge reports its first painted
// row as zero; an unclipped one reports the stage's padding less the ring's spread.
import { readFileSync } from 'node:fs'
import { PNG } from 'pngjs'

const [source, band = '120'] = process.argv.slice(2)
const png = PNG.sync.read(readFileSync(source))
const height = Math.min(Number(band), png.height)
const background = [png.data[0], png.data[1], png.data[2]]
let firstRow
for (let y = 0; y < height && firstRow === undefined; y += 1) {
	for (let x = 0; x < png.width; x += 1) {
		const at = (png.width * y + x) << 2
		if (
			png.data[at] !== background[0] ||
			png.data[at + 1] !== background[1] ||
			png.data[at + 2] !== background[2]
		) {
			firstRow = y
			break
		}
	}
}
console.log(JSON.stringify({ source, width: png.width, height: png.height, background, firstRow }))
for (let y = 0; y < height; y += 1) {
	let left = Infinity
	let right = -1
	let count = 0
	for (let x = 0; x < png.width; x += 1) {
		const at = (png.width * y + x) << 2
		if (
			Math.abs(png.data[at] - 195) < 10 &&
			Math.abs(png.data[at + 1] - 219) < 10 &&
			Math.abs(png.data[at + 2] - 255) < 10
		) {
			count += 1
			left = Math.min(left, x)
			right = Math.max(right, x)
		}
	}
	if (count > 0) console.log(`row ${y}: ${count} px, x ${left}..${right}`)
}
