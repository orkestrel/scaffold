import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHTML, isHTMLDocument, renderHTML, renderText } from '@orkestrel/html'
import { hashFile } from './functions.cjs'

const [archive] = process.argv.slice(2)

if (archive === undefined) throw new Error('Expected an extracted Contract package path.')

const consumer = createRequire(join(process.cwd(), 'package.json'))
const htmlManifest = consumer.resolve('@orkestrel/html/package.json')
const html = JSON.parse(await readFile(htmlManifest, 'utf8'))
const contractManifest = consumer.resolve('@orkestrel/contract/package.json')
const contract = JSON.parse(await readFile(contractManifest, 'utf8'))
const htmlRequire = createRequire(htmlManifest)
const htmlContractManifest = htmlRequire.resolve('@orkestrel/contract/package.json')
const contractRequire = htmlRequire.resolve('@orkestrel/contract')
const rootRequire = consumer.resolve('@orkestrel/contract')
const contractImport = fileURLToPath(await import.meta.resolve('@orkestrel/contract'))

if (html.dependencies['@orkestrel/contract'] !== '^0.0.17') throw new Error('HTML does not declare the expected Contract runtime pin.')
if (contract.version !== '0.0.17') throw new Error('Consumer Contract is not version 0.0.17.')
if ((await realpath(htmlContractManifest)) !== (await realpath(contractManifest))) throw new Error('HTML resolves a different Contract package from the consumer.')
if ((await realpath(contractRequire)) !== (await realpath(rootRequire))) throw new Error('HTML resolves a different Contract entry from the consumer.')

const page = createHTML('<p>Hello</p>')
if (renderHTML(page.document) !== '<p>Hello</p>') throw new Error('HTML renderer returned unexpected markup.')
if (renderText(page.document) !== 'Hello') throw new Error('HTML renderer returned unexpected text.')
if (!isHTMLDocument(page.document)) throw new Error('HTML document guard rejected the parsed document.')

const esmArchive = join(archive, contract.module)
const cjsArchive = join(archive, contract.main)
const esmInstalledHash = hashFile(contractImport)
const cjsInstalledHash = hashFile(contractRequire)

if (hashFile(esmArchive) !== esmInstalledHash || hashFile(cjsArchive) !== cjsInstalledHash) {
	throw new Error('Installed Contract entries differ from the accepted Contract archive.')
}

console.log(`html-contract-manifest=${htmlContractManifest}`)
console.log(`contract-package=${contractManifest}`)
console.log(`contract-esm=${contractImport}`)
console.log(`contract-cjs=${contractRequire}`)
console.log(`contract-version=${contract.version}`)
console.log(`contract-esm-sha256=${esmInstalledHash}`)
console.log(`contract-cjs-sha256=${cjsInstalledHash}`)
console.log('behavior=html-rendering-and-document-guard')
