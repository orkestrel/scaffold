// U1 dist surgery: order-aware readArrayEntries - sort only when the reflected
// arrival is out of ascending order; reuse the verified key string on the
// ascending path. Every refusal, both freezes, and the dense fact unchanged.
// Run: node u1-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const source = process.argv[2]
const target = process.argv[3]
const text = readFileSync(source, 'utf8')

const original = `		const collected = [];
		const members = INTRINSICS.members(value);
		for (let position = 0; position < members.length; position += 1) {
			const key = members[position];
			if (!isString(key)) continue;
			const index = INTRINSICS.numeric(key);
			if (INTRINSICS.integer(index) && index >= 0 && index < 2 ** 32 - 1 && INTRINSICS.text(index) === key) {
				if (index >= length) throw new INTRINSICS.error("Array index views disagree");
				collected[collected.length] = index;
			}
		}
		const indices = sortValues(collected);
		const entries = new INTRINSICS.list(length);
		for (let position = 0; position < indices.length; position += 1) {
			const index = indices[position];
			if (index === void 0) continue;
			const key = INTRINSICS.text(index);
			if (!INTRINSICS.own(value, key)) throw new INTRINSICS.error("Array index views disagree");
			entries[index] = value[index];
		}`

const replacement = `		const collected = [];
		const keys = [];
		let ascending = true;
		let previous = -1;
		const members = INTRINSICS.members(value);
		for (let position = 0; position < members.length; position += 1) {
			const key = members[position];
			if (!isString(key)) continue;
			const index = INTRINSICS.numeric(key);
			if (INTRINSICS.integer(index) && index >= 0 && index < 2 ** 32 - 1 && INTRINSICS.text(index) === key) {
				if (index >= length) throw new INTRINSICS.error("Array index views disagree");
				if (index <= previous) ascending = false;
				previous = index;
				collected[collected.length] = index;
				keys[keys.length] = key;
			}
		}
		const indices = ascending ? collected : sortValues(collected);
		const entries = new INTRINSICS.list(length);
		for (let position = 0; position < indices.length; position += 1) {
			const index = indices[position];
			if (index === void 0) continue;
			const key = ascending ? keys[position] : INTRINSICS.text(index);
			if (key === void 0 || !INTRINSICS.own(value, key)) throw new INTRINSICS.error("Array index views disagree");
			entries[index] = value[index];
		}`

if (!text.includes(original)) {
	console.error('U1 patch: original block not found - dist drifted')
	process.exit(1)
}
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(original, replacement))
console.log(`U1 patched -> ${target}`)
