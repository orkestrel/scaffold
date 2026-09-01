// A7 dist surgery (probe only): the masked auditor object plan detects extra
// keys inside its presence pass (a key absent from `positions` is undeclared)
// and runs the second key scan only when one was seen, using the positions
// record instead of Set.has through Reflect.apply. Fault order is unchanged:
// missing/field faults first, extras after, in key order.
// Run: node a7-patch.mjs <src> <target>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const presenceAnchor = `						let seen = 0;
						if (present === void 0) for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							if (!INTRINSICS.own(positions, key)) continue;
							const position = positions[key];
							if (position !== void 0) seen |= 1 << position;
						}
						for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
							const entry = entries[entryIndex];
							if (entry === void 0) continue;
							if (faults.length >= 64) return;
							if (present === void 0 ? (seen & 1 << entryIndex) === 0 : !matchesMember(present, entry.key)) {
								if (!entry.optional) faults[faults.length] = {
									reason: "missing",
									path: pathOf(path, entry.key),
									expected: entry.kind
								};
								continue;
							}
							appendEntries(faults, entry.audit(record[entry.key], pathOf(path, entry.key)));
						}
						for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							if (faults.length >= 64) return;
							if (matchesMember(vocabulary, key)) continue;`
if (!text.includes(presenceAnchor)) { console.error('A7: anchor missing'); process.exit(1) }
const replacement = `						let seen = 0;
						let undeclared = present !== void 0;
						if (present === void 0) for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							if (!INTRINSICS.own(positions, key)) { undeclared = true; continue; }
							const position = positions[key];
							if (position !== void 0) seen |= 1 << position;
						}
						for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
							const entry = entries[entryIndex];
							if (entry === void 0) continue;
							if (faults.length >= 64) return;
							if (present === void 0 ? (seen & 1 << entryIndex) === 0 : !matchesMember(present, entry.key)) {
								if (!entry.optional) faults[faults.length] = {
									reason: "missing",
									path: pathOf(path, entry.key),
									expected: entry.kind
								};
								continue;
							}
							appendEntries(faults, entry.audit(record[entry.key], pathOf(path, entry.key)));
						}
						if (undeclared) for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							if (faults.length >= 64) return;
							if (present === void 0 ? INTRINSICS.own(positions, key) : matchesMember(vocabulary, key)) continue;`
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(presenceAnchor, replacement))
console.log('A7 patched -> ' + target)
