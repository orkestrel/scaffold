// Probe for the U3i round claim 1: how many times does createStringFaults ask a
// hand-rolled shape's `pattern` accessor per call, by case?
// Run: node readcount-cases.mjs </abs/dist/index.js>
/* eslint-disable */
const { createStringFaults, readPattern } = await import(process.argv[2])
function count(extra, answer, supplied) {
	let reads = 0
	const shape = { type: 'string', ...extra, get pattern() { reads += 1; return answer } }
	createStringFaults(shape, 'abc', [], supplied)
	return reads
}
console.log(`declared pattern, omitted argument: ${count({}, /^[0-9]+$/)}`)
console.log(`declared pattern, supplied argument: ${count({}, /^[0-9]+$/, readPattern(/^[0-9]+$/))}`)
console.log(`min only (accessor answers undefined), omitted argument: ${count({ min: 4 }, undefined)}`)
console.log(`max only (accessor answers undefined), omitted argument: ${count({ max: 2 }, undefined)}`)
