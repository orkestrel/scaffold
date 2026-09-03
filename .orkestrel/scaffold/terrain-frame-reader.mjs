import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

function decode(file) {
	const buffer = fs.readFileSync(file)
	let offset = 8
	const chunks = []
	let width = 0
	let height = 0
	let depth = 0
	let color = 0
	while (offset < buffer.length) {
		const length = buffer.readUInt32BE(offset)
		const type = buffer.toString('ascii', offset + 4, offset + 8)
		const data = buffer.subarray(offset + 8, offset + 8 + length)
		if (type === 'IHDR') {
			width = data.readUInt32BE(0)
			height = data.readUInt32BE(4)
			depth = data[8]
			color = data[9]
		}
		if (type === 'IDAT') chunks.push(data)
		offset += length + 12
	}
	if (depth !== 8) throw new Error(`unsupported bit depth ${depth}`)
	const channels = color === 6 ? 4 : color === 2 ? 3 : 0
	if (channels === 0) throw new Error(`unsupported color type ${color}`)
	const raw = zlib.inflateSync(Buffer.concat(chunks))
	const stride = width * channels
	const pixels = Buffer.alloc(height * stride)
	let source = 0
	for (let row = 0; row < height; row += 1) {
		const filter = raw[source]
		source += 1
		const line = raw.subarray(source, source + stride)
		source += stride
		const target = pixels.subarray(row * stride, row * stride + stride)
		const above = row === 0 ? null : pixels.subarray((row - 1) * stride, (row - 1) * stride + stride)
		for (let index = 0; index < stride; index += 1) {
			const left = index >= channels ? target[index - channels] : 0
			const up = above === null ? 0 : above[index]
			const corner = above === null || index < channels ? 0 : above[index - channels]
			let value = line[index]
			if (filter === 1) value += left
			else if (filter === 2) value += up
			else if (filter === 3) value += Math.floor((left + up) / 2)
			else if (filter === 4) {
				const estimate = left + up - corner
				const deltaLeft = Math.abs(estimate - left)
				const deltaUp = Math.abs(estimate - up)
				const deltaCorner = Math.abs(estimate - corner)
				value += deltaLeft <= deltaUp && deltaLeft <= deltaCorner ? left : deltaUp <= deltaCorner ? up : corner
			}
			target[index] = value & 0xff
		}
	}
	return { width, height, channels, pixels }
}

function rowColor(frame, row) {
	const stride = frame.width * frame.channels
	const base = row * stride
	const first = `rgb(${frame.pixels[base]}, ${frame.pixels[base + 1]}, ${frame.pixels[base + 2]})`
	for (let column = 1; column < frame.width; column += 1) {
		const at = base + column * frame.channels
		if (`rgb(${frame.pixels[at]}, ${frame.pixels[at + 1]}, ${frame.pixels[at + 2]})` !== first) return undefined
	}
	return first
}

const dir = process.argv[2]
for (const name of fs.readdirSync(dir).sort()) {
	if (!name.endsWith('.png')) continue
	const frame = decode(path.join(dir, name))
	const floor = rowColor(frame, frame.height - 1)
	let uniform = 0
	for (let row = frame.height - 1; row >= 0; row -= 1) {
		if (rowColor(frame, row) !== floor) break
		uniform += 1
	}
	console.log(`${name} ${frame.width}x${frame.height} floor=${floor ?? 'mixed'} trailingUniformRows=${uniform}`)
}
