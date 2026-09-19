// Crops one band from a capture frame and optionally halves it, so a tall full-page PNG can be
// read a region at a time. Usage: node u6-frame.mjs <source> <target> <offset> <band> [divisor]
import { readFileSync, writeFileSync } from 'node:fs'
import { PNG } from 'pngjs'

const [source, target, offsetText, bandText, divisorText] = process.argv.slice(2)
const png = PNG.sync.read(readFileSync(source))
const offset = Math.min(Number(offsetText), png.height)
const band = Math.min(Number(bandText), png.height - offset)
const divisor = divisorText === undefined ? 1 : Number(divisorText)
const width = Math.floor(png.width / divisor)
const height = Math.floor(band / divisor)
const out = new PNG({ width, height })
for (let y = 0; y < height; y += 1) {
	for (let x = 0; x < width; x += 1) {
		const from = ((offset + y * divisor) * png.width + x * divisor) * 4
		const to = (y * width + x) * 4
		out.data[to] = png.data[from]
		out.data[to + 1] = png.data[from + 1]
		out.data[to + 2] = png.data[from + 2]
		out.data[to + 3] = png.data[from + 3]
	}
}
writeFileSync(target, PNG.sync.write(out))
console.log(`${source} ${png.width}x${png.height} -> ${target} ${width}x${height} from ${offset}`)
