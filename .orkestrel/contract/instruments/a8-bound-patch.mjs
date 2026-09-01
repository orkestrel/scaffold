// A8 BOUND (probe only, NOT a shipping form): #trackGuard and #trackFaults
// return their plan untracked, so no scope, slot, or ledger work runs per
// repeating node. Measures the ceiling of the ledger's per-call cost on a
// one-object-per-node value. Shared subobjects would be re-walked, so this is
// a bound, not a mechanism. Run: node a8-bound-patch.mjs <src> <target>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
let text = readFileSync(source, 'utf8')
const guard = /#trackGuard\((\w+)\) \{/
const faults = /#trackFaults\((\w+)\) \{/
if (!guard.test(text) || !faults.test(text)) { console.error('A8: anchors missing'); process.exit(1) }
text = text.replace(guard, (m, p) => `${m}\n\t\treturn ${p};`).replace(faults, (m, p) => `${m}\n\t\treturn ${p};`)
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text)
console.log('A8 bound patched -> ' + target)
