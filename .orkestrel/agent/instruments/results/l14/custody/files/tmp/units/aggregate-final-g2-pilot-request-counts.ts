import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
import { isMatrixRequest } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/validators.js'

const path = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/agent/instruments/results/l14/g2-think0/pilot/development/l6-g2-think0-aggregate-v1/requests.jsonl'
const lines = createInterface({ input: createReadStream(path), crlfDelay: Infinity })
const counts = new Map<string, number>()
let valid = 0
let incomplete = 0

for await (const line of lines) {
	if (line.length === 0) continue
	let value: unknown
	try {
		value = JSON.parse(line)
	} catch {
		incomplete += 1
		continue
	}
	if (!isMatrixRequest(value)) {
		incomplete += 1
		continue
	}
	if (!value.sent) continue
	valid += 1
	const phase = value.goal === undefined ? 'calibration' : 'trajectory'
	const key = `${value.role}/${phase}`
	counts.set(key, (counts.get(key) ?? 0) + 1)
}

process.stdout.write(JSON.stringify({ validSentRequests: valid, incompleteRecords: incomplete, rolePhase: Object.fromEntries(counts) }) + '\n')
