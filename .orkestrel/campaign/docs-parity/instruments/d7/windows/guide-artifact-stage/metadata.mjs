import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { hashFile } from './functions.cjs'

const [output, commit, artifact, contract, html, markdown, test, contractHash, htmlHash, markdownHash, testHash] = process.argv.slice(2)
if ([output, commit, artifact, contract, html, markdown, test, contractHash, htmlHash, markdownHash, testHash].some((value) => value === undefined)) throw new Error('Expected metadata output and staging inputs.')
const value = { artifact: { path: resolve(artifact), sha256: hashFile(artifact) }, manifest: { dependencies: { contract: { from: '^0.0.16', to: '^0.0.17' }, markdown: { from: '^0.0.13', to: '^0.0.14' } }, version: '0.0.18' }, pending: ['parity-entry consolidation', 'material comparison', 'registry-final test:distribution'], source: { branch: 'claude/orkestrel-npm-audit-deps-14ibta', commit }, tooling: { contract: { path: resolve(contract), sha256: contractHash }, html: { path: resolve(html), sha256: htmlHash }, markdown: { path: resolve(markdown), sha256: markdownHash }, test: { path: resolve(test), sha256: testHash } } }
await writeFile(output, `${JSON.stringify(value, undefined, '\t')}\n`)
