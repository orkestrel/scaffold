// A5 dist surgery (probe only): the auditor object plan builds its readValue
// options record once per call and hands the same record to the prototype
// probe and the key read. readValue copies its context inside the containment
// and retains nothing, so sharing the record across the two reads changes no
// read and no published refusal. Run: node a5-patch.mjs <src> <target>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const anchor = `				return (value, path) => {
					if (isObject(value)) readValue(() => INTRINSICS.parent(value), "compileAuditor", {
						subject: "object",
						context: {
							path,
							shape: "object"
						}
					});
					if (!isRecord(value)) return [{
						reason: "type",
						path,
						expected: "object",
						received: preview(value)
					}];
					const record = value;
					const keys = readValue(() => INTRINSICS.freeze(INTRINSICS.keys(record)), "compileAuditor", {
						subject: "object",
						context: {
							path,
							shape: "object"
						}
					});`
if (!text.includes(anchor)) { console.error('A5: anchor missing'); process.exit(1) }
const replacement = `				return (value, path) => {
					const reading = {
						subject: "object",
						context: {
							path,
							shape: "object"
						}
					};
					if (isObject(value)) readValue(() => INTRINSICS.parent(value), "compileAuditor", reading);
					if (!isRecord(value)) return [{
						reason: "type",
						path,
						expected: "object",
						received: preview(value)
					}];
					const record = value;
					const keys = readValue(() => INTRINSICS.freeze(INTRINSICS.keys(record)), "compileAuditor", reading);`
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(anchor, replacement))
console.log('A5 patched -> ' + target)
