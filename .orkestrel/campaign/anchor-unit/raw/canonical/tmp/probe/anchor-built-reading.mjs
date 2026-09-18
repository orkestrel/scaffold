import { strict as assert } from 'node:assert'
import { lstatSync } from 'node:fs'
import { matchesAnchor, readAnchor } from '../release/scaffold-0.0.75/dist/src/server/index.js'
const anchor = readAnchor(process.cwd())
assert.ok(anchor)
const native = lstatSync(process.cwd(), { bigint: true })
assert.equal(anchor.device, native.dev)
assert.equal(anchor.inode, native.ino)
assert.equal(matchesAnchor(anchor), true)
assert.equal(matchesAnchor({ ...anchor, device: anchor.device + 1n }), false)
assert.equal(matchesAnchor({ ...anchor, inode: anchor.inode + 1n }), false)
process.stdout.write(`${JSON.stringify({ cwd: process.cwd(), device: String(anchor.device), inode: String(anchor.inode), representation: typeof anchor.inode, untouched: true, altered: false })}\n`)
