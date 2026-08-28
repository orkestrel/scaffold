import { Buffer } from 'node:buffer'

// The current published behaviour, transcribed from src/server/Retention.ts:35-43.
class Retention {
	#delivered = 0
	#retained = 0
	get delivered() { return this.#delivered }
	get retained() { return this.#retained }
	retain(chunk, limit) {
		if (!Buffer.isBuffer(chunk)) return undefined
		this.#delivered += chunk.byteLength
		const room = limit - this.#retained
		if (room <= 0) return undefined
		const slice = chunk.byteLength <= room ? chunk : Buffer.from(chunk.subarray(0, room))
		this.#retained += slice.byteLength
		return slice
	}
}

// The proposed fold: one counter per stream, retained derived as min(delivered, limit).
function retainHead(chunk, limit, delivered) {
	const room = limit - delivered
	if (room <= 0) return undefined
	return chunk.byteLength <= room ? chunk : Buffer.from(chunk.subarray(0, room))
}

// Deterministic pseudo-random sequence: no Math.random, so the run is reproducible.
let seed = 20260828
const next = (n) => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff), seed % n)

let cases = 0, mismatches = 0
for (const limit of [0, 1, 2, 7, 16, 64, 1000]) {
	for (let trial = 0; trial < 400; trial += 1) {
		const r = new Retention()
		let delivered = 0
		const a = [], b = []
		for (let i = 0; i < 12; i += 1) {
			const chunk = Buffer.alloc(next(40))
			const viaClass = r.retain(chunk, limit)
			const viaFold = retainHead(chunk, limit, delivered)
			delivered += chunk.byteLength
			if (viaClass !== undefined) a.push(viaClass)
			if (viaFold !== undefined) b.push(viaFold)
			cases += 1
			const sameSlice = (viaClass === undefined) === (viaFold === undefined) &&
				(viaClass === undefined || viaClass.byteLength === viaFold.byteLength)
			const sameDelivered = r.delivered === delivered
			const sameRetained = r.retained === Math.min(delivered, limit)
			if (!sameSlice || !sameDelivered || !sameRetained) {
				mismatches += 1
				if (mismatches === 1) console.log('FIRST MISMATCH', { limit, trial, i, sameSlice, sameDelivered, sameRetained, classRetained: r.retained, derived: Math.min(delivered, limit) })
			}
		}
		if (Buffer.concat(a).byteLength !== Buffer.concat(b).byteLength) { mismatches += 1 }
	}
}
console.log('chunk comparisons :', cases)
console.log('mismatches        :', mismatches)
console.log('EQUIVALENT        :', mismatches === 0)
