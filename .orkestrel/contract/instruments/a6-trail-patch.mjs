// A6 HONEST MECHANISM (probe only): the auditor and reporter plans thread a
// trail record { parent, segment } (root: { parent: undefined, segments }) in
// place of a materialized path array, and render the exact readonly string[]
// (compacting undefined segments as pathOf does) at every fault literal, every
// readValue context, and every refinement-helper call. Answers must be
// identical; only allocation timing moves. Run: node a6-trail-patch.mjs <src> <target>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
const lines = readFileSync(source, 'utf8').split('\n')
const find = (needle, from = 0) => { for (let i = from; i < lines.length; i++) if (lines[i].includes(needle)) return i; return -1 }
const auditStart = find('#exposeAudit(plan) {')
const seedStart = find('#seedOf(index) {')
if (auditStart < 0 || seedStart < 0) { console.error('A6: region anchors missing'); process.exit(1) }
let pathLines = 0, pathOfSites = 0, helperSites = 0, exposeSites = 0, literalSites = 0
for (let i = auditStart; i < seedStart; i++) {
	let line = lines[i]
	if (/^\t+path,$/.test(line)) { line = line.replace('path,', 'path: renderTrail(path),'); pathLines++ }
	const literal = /path: pathOf\(path, ([^)]+)\)/g
	if (literal.test(line)) { line = line.replace(literal, 'path: renderTrail(trailOf(path, $1))'); literalSites++ }
	if (line.includes('pathOf(path, ')) { line = line.replaceAll('pathOf(path, ', 'trailOf(path, '); pathOfSites++ }
	const helper = /(create(?:String|Number|Array)Faults\([^;]*?), path\)/
	if (helper.test(line)) { line = line.replace(helper, '$1, renderTrail(path))'); helperSites++ }
	if (line.includes('contain(() => plan(value, path), ')) { line = line.replace('plan(value, path)', 'plan(value, rootTrail(path))'); exposeSites++ }
	lines[i] = line
}
console.log(`A6: path literal lines ${pathLines}, fault-literal pathOf sites ${literalSites}, child pathOf sites ${pathOfSites}, helper sites ${helperSites}, expose sites ${exposeSites}`)
if (pathLines === 0 || pathOfSites === 0 || helperSites === 0 || exposeSites !== 2) { console.error('A6: unexpected site counts'); process.exit(1) }
const helperDefs = `function trailOf(parent, segment) {
	return { parent, segment };
}
function rootTrail(path) {
	return { parent: void 0, segments: path };
}
function renderTrail(trail) {
	const reversed = [];
	let node = trail;
	let root;
	while (node !== void 0) {
		if (node.segments !== void 0) { root = node.segments; break; }
		if (node.segment !== void 0) reversed[reversed.length] = node.segment;
		node = node.parent;
	}
	const rendered = [];
	if (root !== void 0) for (let index = 0; index < root.length; index += 1) {
		const existing = root[index];
		if (existing === void 0) continue;
		rendered[rendered.length] = existing;
	}
	for (let index = reversed.length - 1; index >= 0; index -= 1) rendered[rendered.length] = reversed[index];
	return rendered;
}
`
const pathOfAt = find('function pathOf(path, ...segments) {')
if (pathOfAt < 0) { console.error('A6: pathOf anchor missing'); process.exit(1) }
lines.splice(pathOfAt, 0, helperDefs)
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, lines.join('\n'))
console.log('A6 trail patched -> ' + target)
