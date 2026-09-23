// Prints the RGB of a pixel row segment in a PNG.
const { PNG } = require('/home/user/veneer-bfg/node_modules/pngjs')
const fs = require('node:fs')
const [source, y, x0, x1] = process.argv.slice(2)
const image = PNG.sync.read(fs.readFileSync(source))
const row = []
for (let x = Number(x0); x <= Number(x1); x++) {
	const i = (Number(y) * image.width + x) * 4
	row.push(`${x}:${image.data[i]},${image.data[i + 1]},${image.data[i + 2]}`)
}
console.log(row.join(' '))
