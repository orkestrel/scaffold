const { join } = require('node:path')
const { createAbort } = require('@orkestrel/abort')
const { ContractError } = require('@orkestrel/contract')
const { hashFile } = require('./functions.cjs')

const [archive] = process.argv.slice(2)

if (archive === undefined) {
	throw new Error('Expected an extracted Contract package path.')
}

const contract = require('@orkestrel/contract/package.json')
const parent = createAbort({ id: 'parent' })
const child = createAbort({ id: 'child', signal: parent.signal })
parent.abort(false)

if (child.signal.reason !== false) {
	throw new Error('Child AbortSignal did not preserve the parent false reason.')
}

let invalid = false
try {
	createAbort({ id: 1 })
} catch (error) {
	invalid = error instanceof ContractError
}

if (!invalid) {
	throw new Error('Invalid Abort id did not throw the consumer ContractError.')
}

const entry = require.resolve('@orkestrel/contract')
const archiveEntry = join(archive, contract.main)
const installedHash = hashFile(entry)
const archiveHash = hashFile(archiveEntry)

if (installedHash !== archiveHash) {
	throw new Error('Installed Contract CommonJS entry differs from the accepted archive.')
}

console.log(`contract-cjs=${entry}`)
console.log(`contract-cjs-sha256=${installedHash}`)
console.log(`contract-version=${contract.version}`)
console.log('behavior=parent-false-propagates; invalid-id-is-contract-error')
