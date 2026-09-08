const { join } = require('node:path')
const { createHTML, isHTMLDocument, renderHTML, renderText } = require('@orkestrel/html')
const { hashFile } = require('./functions.cjs')

const [archive] = process.argv.slice(2)

if (archive === undefined) throw new Error('Expected an extracted Contract package path.')

const contract = require('@orkestrel/contract/package.json')
const page = createHTML('<p>Hello</p>')

if (renderHTML(page.document) !== '<p>Hello</p>') throw new Error('HTML renderer returned unexpected markup.')
if (renderText(page.document) !== 'Hello') throw new Error('HTML renderer returned unexpected text.')
if (!isHTMLDocument(page.document)) throw new Error('HTML document guard rejected the parsed document.')

const entry = require.resolve('@orkestrel/contract')
const archiveEntry = join(archive, contract.main)
const installedHash = hashFile(entry)

if (hashFile(archiveEntry) !== installedHash) throw new Error('Installed Contract CommonJS entry differs from the accepted archive.')

console.log(`contract-cjs=${entry}`)
console.log(`contract-cjs-sha256=${installedHash}`)
console.log(`contract-version=${contract.version}`)
console.log('behavior=html-rendering-and-document-guard')
