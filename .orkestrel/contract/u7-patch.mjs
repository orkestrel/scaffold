// U7 dist surgery (probe only): the compiled object GUARD's per-call attempt
// closure becomes a direct try/catch with the walk body inlined - identical
// verdict mapping (body false -> false, throw -> false). Probes whether the
// containment-allocation row can reach its 15% bar on the final tree.
// Run: node u7-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const source = process.argv[2]
const target = process.argv[3]
const text = readFileSync(source, 'utf8')

const anchorHead = `					const outcome = attempt(() => {
						if (maskable) {
							let seen = 0;`

const replacementHead = `					try {
						if (maskable) {
							let seen = 0;`

const anchorTail = `						return true;
					});
					return outcome.success && outcome.value;
				};
			}
			case "union": {
				const guards = [];`

const replacementTail = `						return true;
					} catch {
						return false;
					}
				};
			}
			case "union": {
				const guards = [];`

if (!text.includes(anchorHead)) { console.error('U7: head anchor missing'); process.exit(1) }
if (!text.includes(anchorTail)) { console.error('U7: tail anchor missing'); process.exit(1) }
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(anchorHead, replacementHead).replace(anchorTail, replacementTail))
console.log(`U7 patched -> ${target}`)
