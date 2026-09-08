const { createHash } = require('node:crypto')
const { readFileSync } = require('node:fs')

function hashFile(path) {
	return createHash('sha256').update(readFileSync(path)).digest('hex')
}

exports.hashFile = hashFile
