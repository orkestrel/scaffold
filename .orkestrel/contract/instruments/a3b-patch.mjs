// A3b dist surgery (probe only, BOUND for the pattern-capture row): the
// auditor and reporter string leaves capture the stateless pattern once at
// compile time (readPattern over the captured shape's pattern) and route the
// refinement check through a probe-local copy of createStringFaults that takes
// the captured pattern. The shipped form is a design question (helper
// signature); this measures the ceiling. Run: node a3b-patch.mjs <src> <target>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
let text = readFileSync(source, 'utf8')
const leafAnchor = '\t\t\t\tconst node = owned;\n\t\t\t\tconst refined = owned.min !== void 0 || owned.max !== void 0 || owned.pattern !== void 0;\n'
const leafCount = text.split(leafAnchor).length - 1
if (leafCount !== 2) { console.error('A3b: expected two string leaf anchors, found ' + leafCount); process.exit(1) }
text = text.replaceAll(leafAnchor, leafAnchor + '\t\t\t\tconst captured = owned.pattern === void 0 ? void 0 : readPattern(owned.pattern);\n')
const auditCall = 'return refined ? createStringFaults(node, value, path) : [];'
const reportCall = 'return refined ? createStringFaults(node, parsed, path) : [];'
if (!text.includes(auditCall) || !text.includes(reportCall)) { console.error('A3b: call anchors missing'); process.exit(1) }
text = text.replace(auditCall, 'return refined ? createStringFaultsCaptured(node, value, path, captured) : [];')
text = text.replace(reportCall, 'return refined ? createStringFaultsCaptured(node, parsed, path, captured) : [];')
const helperAnchor = 'function createStringFaults(shape, value, path) {'
if (!text.includes(helperAnchor)) { console.error('A3b: helper anchor missing'); process.exit(1) }
const helper = `function createStringFaultsCaptured(shape, value, path, captured) {
	return readValue(() => {
		const faults = [];
		if (shape.min !== void 0 && value.length < shape.min) faults[faults.length] = {
			reason: "constraint",
			path,
			expected: "string",
			constraint: "min",
			limit: shape.min,
			received: preview(value)
		};
		if (shape.max !== void 0 && value.length > shape.max) faults[faults.length] = {
			reason: "constraint",
			path,
			expected: "string",
			constraint: "max",
			limit: shape.max,
			received: preview(value)
		};
		if (captured !== void 0 && !matchesPattern(captured, value)) {
			const limit = readPatternSource(shape.pattern);
			faults[faults.length] = {
				reason: "constraint",
				path,
				expected: "string",
				constraint: "pattern",
				...limit === void 0 ? {} : { limit },
				received: preview(value)
			};
		}
		return faults;
	}, "createStringFaults", { subject: "shape" });
}
`
text = text.replace(helperAnchor, helper + helperAnchor)
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text)
console.log('A3b patched -> ' + target)
