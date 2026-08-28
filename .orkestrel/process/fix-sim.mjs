import { Buffer } from 'node:buffer'

// trimHead, transcribed from src/server/helpers.ts:69-78.
function trimHead(bytes, limit) {
	const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes)
	if (buffer.byteLength <= limit) return buffer
	let end = limit
	while (end > 0) {
		const byte = buffer[end]
		if (byte === undefined || (byte & 0xc0) !== 0x80) break
		end -= 1
	}
	return Buffer.from(buffer.subarray(0, end))
}

function captureChunk(chunk, room) {
	if (!Buffer.isBuffer(chunk) || room <= 0) return undefined
	if (chunk.byteLength <= room) return chunk
	return Buffer.from(chunk.subarray(0, room))
}

// Drive both the current bound (limit) and the proposed bound (limit + 1) over the same streams.
function run(chunks, limit, extra) {
	const kept = []
	let retained = 0
	for (const c of chunks) {
		const slice = captureChunk(c, limit + extra - retained)
		if (slice !== undefined) { retained += slice.byteLength; kept.push(slice) }
	}
	return { text: trimHead(Buffer.concat(kept), limit).toString('utf8'), truncated: retained > limit - (extra ? 0 : 1) }
}

const text = 'aa€bb€€'          // multibyte at several offsets
const whole = Buffer.from(text, 'utf8')
let bad = { now: 0, fixed: 0 }, cases = 0
for (let limit = 1; limit <= whole.byteLength + 2; limit += 1) {
	// split the same payload into every 1-, 2-, and 3-way chunking to reach cross-chunk sequences
	for (const size of [1, 2, 3, 4, 5, whole.byteLength]) {
		const chunks = []
		for (let i = 0; i < whole.byteLength; i += size) chunks.push(Buffer.from(whole.subarray(i, i + size)))
		cases += 1
		if (run(chunks, limit, 0).text.includes('�')) bad.now += 1
		if (run(chunks, limit, 1).text.includes('�')) bad.fixed += 1
	}
}
console.log('cases                    :', cases)
console.log('replacement chars, today :', bad.now, '(the defect; must be > 0 or the probe is blind)')
console.log('replacement chars, fixed :', bad.fixed, '(must be 0)')
console.log('FIX CLOSES THE DEFECT    :', bad.now > 0 && bad.fixed === 0)
