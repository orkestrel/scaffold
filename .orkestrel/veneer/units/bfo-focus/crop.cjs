// Crops a region out of a PNG and scales it by an integer factor, nearest neighbour.
const { PNG } = require('/home/user/veneer/node_modules/pngjs')
const fs = require('node:fs')
const [source, target, x0, y0, w, h, k] = process.argv.slice(2)
const image = PNG.sync.read(fs.readFileSync(source))
const X = Number(x0), Y = Number(y0), W = Number(w), H = Number(h), K = Number(k)
const out = new PNG({ width: W * K, height: H * K })
for (let y = 0; y < H * K; y++)
	for (let x = 0; x < W * K; x++) {
		const sx = X + Math.floor(x / K), sy = Y + Math.floor(y / K)
		const si = (sy * image.width + sx) * 4, di = (y * W * K + x) * 4
		for (let c = 0; c < 4; c++) out.data[di + c] = image.data[si + c]
	}
fs.writeFileSync(target, PNG.sync.write(out))
