// Usage: node pack-list.cjs PACKAGE.tgz — prints "path size sha256" for every file in an npm tarball, sorted.
const zlib = require('zlib')
const fs = require('fs')
const crypto = require('crypto')
const body = zlib.gunzipSync(fs.readFileSync(process.argv[2]))
const text = (bytes) => bytes.toString('utf8').replace(/\0[\s\S]*$/, '')
const rows = []
let offset = 0
while (offset + 512 <= body.length) {
	const header = body.subarray(offset, offset + 512)
	if (header[0] === 0) break
	const name = text(header.subarray(0, 100))
	const prefix = text(header.subarray(345, 500))
	const size = parseInt(text(header.subarray(124, 136)).trim() || '0', 8)
	const type = String.fromCharCode(header[156])
	offset += 512
	if (type === '0' || type === '\0') {
		const data = body.subarray(offset, offset + size)
		rows.push([(prefix ? prefix + '/' : '') + name, size, crypto.createHash('sha256').update(data).digest('hex')])
	}
	offset += Math.ceil(size / 512) * 512
}
rows.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
for (const row of rows) console.log(row.join(' '))
