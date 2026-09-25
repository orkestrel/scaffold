// Compares the before and after rendered readings, reporting every key whose value differs.
import { readFileSync } from 'node:fs'
const load = (file) =>
	Object.fromEntries(
		readFileSync(file, 'utf8')
			.trim()
			.split('\n')
			.map((line) => {
				const [key, ...rest] = line.split(' ')
				return [key, JSON.parse(rest.join(' '))]
			}),
	)
const flatten = (value, prefix = '') =>
	typeof value === 'object' && value !== null
		? Object.entries(value).flatMap(([key, inner]) => flatten(inner, `${prefix}/${key}`))
		: [[prefix, value]]
const before = new Map(flatten(load(process.argv[2])))
const after = new Map(flatten(load(process.argv[3])))
let same = 0
for (const key of new Set([...before.keys(), ...after.keys()])) {
	if (before.get(key) === after.get(key)) same += 1
	else console.log(`DIFF ${key}: ${JSON.stringify(before.get(key))} -> ${JSON.stringify(after.get(key))}`)
}
console.log(`same=${same}`)
