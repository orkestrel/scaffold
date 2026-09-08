import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createAbort } from '@orkestrel/abort'
import { ContractError } from '@orkestrel/contract'
import { hashFile } from './functions.cjs'

const [archive] = process.argv.slice(2)

if (archive === undefined) {
	throw new Error('Expected an extracted Contract package path.')
}

const consumer = createRequire(join(process.cwd(), 'package.json'))
const abortManifest = consumer.resolve('@orkestrel/abort/package.json')
const abort = JSON.parse(await readFile(abortManifest, 'utf8'))
const contractManifest = consumer.resolve('@orkestrel/contract/package.json')
const contract = JSON.parse(await readFile(contractManifest, 'utf8'))
const abortRequire = createRequire(abortManifest)
const abortContractManifest = abortRequire.resolve('@orkestrel/contract/package.json')
const contractRequire = abortRequire.resolve('@orkestrel/contract')
const rootRequire = consumer.resolve('@orkestrel/contract')
const contractImport = fileURLToPath(await import.meta.resolve('@orkestrel/contract'))

if (abort.dependencies['@orkestrel/contract'] !== '^0.0.17') {
	throw new Error('Abort does not declare the expected Contract runtime pin.')
}

if (contract.version !== '0.0.17') {
	throw new Error('Consumer Contract is not version 0.0.17.')
}

if ((await realpath(abortContractManifest)) !== (await realpath(contractManifest))) {
	throw new Error('Abort resolves a different Contract package from the consumer.')
}

if ((await realpath(contractRequire)) !== (await realpath(rootRequire))) {
	throw new Error('Abort resolves a different Contract entry from the consumer.')
}

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

const esmArchive = join(archive, contract.module)
const cjsArchive = join(archive, contract.main)
const esmInstalled = contractImport
const cjsInstalled = contractRequire

const esmArchiveHash = hashFile(esmArchive)
const esmInstalledHash = hashFile(esmInstalled)
const cjsArchiveHash = hashFile(cjsArchive)
const cjsInstalledHash = hashFile(cjsInstalled)

if (esmArchiveHash !== esmInstalledHash || cjsArchiveHash !== cjsInstalledHash) {
	throw new Error('Installed Contract entries differ from the accepted Contract archive.')
}

console.log(`abort-contract-manifest=${abortContractManifest}`)
console.log(`contract-package=${contractManifest}`)
console.log(`contract-esm=${esmInstalled}`)
console.log(`contract-cjs=${cjsInstalled}`)
console.log(`contract-version=${contract.version}`)
console.log(`contract-esm-sha256=${esmInstalledHash}`)
console.log(`contract-cjs-sha256=${cjsInstalledHash}`)
console.log('behavior=parent-false-propagates; invalid-id-is-contract-error')
