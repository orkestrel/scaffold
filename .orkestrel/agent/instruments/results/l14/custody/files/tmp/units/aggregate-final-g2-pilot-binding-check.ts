import { isDeepStrictEqual } from 'node:util'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'
import { readJSON } from '../../.orkestrel/agent/instruments/harness/.build/bench5/helpers.js'
import { isMatrixResource } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/validators.js'

const cell = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/agent/instruments/results/l14/g2-think0'
const expectedFrozen = hashFile(`${cell}/freeze/manifest.json`)
const resourceRef = hashFile(`${cell}/resource/manifest.json`)
const value = readJSON(resourceRef.path)
const valid = isMatrixResource(value)
const embedded = valid ? value.frozen : undefined
process.stdout.write(JSON.stringify({
	expectedFrozen,
	resourceRef,
	valid,
	attempts: valid ? value.attempts.length : undefined,
	embedded,
	deepEqual: valid ? isDeepStrictEqual(embedded, expectedFrozen) : false
}, null, 2) + '\n')
