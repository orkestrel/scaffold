// U2 dist surgery (guard side): compile-time positions record + per-call bitmask
// replaces the fresh presence Set in the compiled object GUARD only. The
// collection form stays as the fallback past the mask width.
// Run: node u2-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const source = process.argv[2]
const target = process.argv[3]
const text = readFileSync(source, 'utf8')

const compileAnchor = `				const required = [];
				const declared = INTRINSICS.keys(map);
				for (let keyIndex = 0; keyIndex < declared.length; keyIndex += 1) {
					const key = declared[keyIndex];
					if (key === void 0) continue;
					let optional = false;
					for (let optionalIndex = 0; optionalIndex < optionalKeys.length; optionalIndex += 1) if (optionalKeys[optionalIndex] === key) optional = true;
					if (!optional) required[required.length] = key;
				}
				return (value) => {
					if (!isRecord(value)) return false;`

const compileReplacement = `				const required = [];
				const declared = INTRINSICS.keys(map);
				for (let keyIndex = 0; keyIndex < declared.length; keyIndex += 1) {
					const key = declared[keyIndex];
					if (key === void 0) continue;
					let optional = false;
					for (let optionalIndex = 0; optionalIndex < optionalKeys.length; optionalIndex += 1) if (optionalKeys[optionalIndex] === key) optional = true;
					if (!optional) required[required.length] = key;
				}
				const positions = INTRINSICS.create(null);
				for (let keyIndex = 0; keyIndex < required.length; keyIndex += 1) {
					const key = required[keyIndex];
					if (key !== void 0) positions[key] = keyIndex;
				}
				const fullMask = required.length < 31 ? (1 << required.length) - 1 : void 0;
				return (value) => {
					if (!isRecord(value)) return false;`

const callAnchor = `					const outcome = attempt(() => {
						const present = collectMembers(keys);
						for (let keyIndex = 0; keyIndex < required.length; keyIndex += 1) {
							const key = required[keyIndex];
							if (key === void 0) continue;
							if (!matchesMember(present, key)) return false;
						}`

const callReplacement = `					const outcome = attempt(() => {
						if (fullMask === void 0) {
							const present = collectMembers(keys);
							for (let keyIndex = 0; keyIndex < required.length; keyIndex += 1) {
								const key = required[keyIndex];
								if (key === void 0) continue;
								if (!matchesMember(present, key)) return false;
							}
						} else {
							let mask = 0;
							for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
								const key = keys[keyIndex];
								if (key !== void 0 && INTRINSICS.own(positions, key)) mask |= 1 << positions[key];
							}
							if (mask !== fullMask) return false;
						}`

if (!text.includes(compileAnchor)) { console.error('U2: compile anchor missing'); process.exit(1) }
if (!text.includes(callAnchor)) { console.error('U2: call anchor missing'); process.exit(1) }
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(compileAnchor, compileReplacement).replace(callAnchor, callReplacement))
console.log(`U2 guard patched -> ${target}`)
