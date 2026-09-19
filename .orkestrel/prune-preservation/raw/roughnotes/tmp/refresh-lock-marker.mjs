import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

// A stale marker reinstalls node_modules under a live suite on the next resume,
// and the suite then reports a missing package that is present a moment later.
try {
	const digest = createHash('sha256').update(readFileSync('package-lock.json')).digest('hex')
	writeFileSync('node_modules/.orkestrel-lock.sha256', digest)
	console.log(`lock marker refreshed: ${digest.slice(0, 16)}`)
} catch (error) {
	console.log(`no marker written: ${error.message}`)
}
