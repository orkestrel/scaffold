// U2b dist surgery (audit side, stacked on the U2 guard patch): hoist the
// compile-constant declared set and replace the per-call presence Set with an
// entry-position bitmask; the collection form stays past the mask width.
// Run: node u2b-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const source = process.argv[2]
const target = process.argv[3]
const text = readFileSync(source, 'utf8')

const compileAnchor = `				const additional = closed || extra === true ? void 0 : this.#auditAt(extra);
				return (value, path) => {`

const compileReplacement = `				const additional = closed || extra === true ? void 0 : this.#auditAt(extra);
				const declaredSet = collectMembers(declaredKeys);
				const entryPositions = INTRINSICS.create(null);
				for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
					const entry = entries[entryIndex];
					if (entry !== void 0) entryPositions[entry.key] = entryIndex;
				}
				const entryMaskable = entries.length < 31;
				return (value, path) => {`

const callAnchor = `					const outcome = attempt(() => {
						const present = collectMembers(keys);
						const declared = collectMembers(declaredKeys);
						for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
							const entry = entries[entryIndex];
							if (entry === void 0) continue;
							if (faults.length >= 64) return;
							if (!matchesMember(present, entry.key)) {`

const callReplacement = `					const outcome = attempt(() => {
						let presentMask = 0;
						let presentSet;
						if (entryMaskable) {
							for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
								const key = keys[keyIndex];
								if (key !== void 0 && INTRINSICS.own(entryPositions, key)) presentMask |= 1 << entryPositions[key];
							}
						} else presentSet = collectMembers(keys);
						const declared = declaredSet;
						for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
							const entry = entries[entryIndex];
							if (entry === void 0) continue;
							if (faults.length >= 64) return;
							if (entryMaskable ? ((presentMask >> entryIndex) & 1) !== 1 : !matchesMember(presentSet, entry.key)) {`

if (!text.includes(compileAnchor)) { console.error('U2b: compile anchor missing'); process.exit(1) }
if (!text.includes(callAnchor)) { console.error('U2b: call anchor missing'); process.exit(1) }
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(compileAnchor, compileReplacement).replace(callAnchor, callReplacement))
console.log(`U2b audit patched -> ${target}`)
