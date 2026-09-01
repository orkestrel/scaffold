// A3 dist surgery (probe only, BOUND): createStringFaults resolves the
// stateless pattern once per captured shape through a module WeakMap instead
// of re-reading `shape.pattern` (a fresh frozen RegExp per read) and rebuilding
// it through readPattern on every call. This measures the ceiling of a
// compile-time pattern capture; the shipped form would capture in the plan.
// Run: node a3-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const anchor = '\t\tif (shape.pattern !== void 0 && !matchesPattern(readPattern(shape.pattern), value)) {\n\t\t\tconst limit = readPatternSource(shape.pattern);'
if (!text.includes(anchor)) { console.error('A3: anchor missing'); process.exit(1) }
const replacement = '\t\tlet resolved = PATTERN_CACHE.get(shape);\n\t\tif (resolved === void 0) {\n\t\t\tconst raw = shape.pattern;\n\t\t\tresolved = raw === void 0 ? null : readPattern(raw);\n\t\t\tPATTERN_CACHE.set(shape, resolved);\n\t\t}\n\t\tif (resolved !== null && !matchesPattern(resolved, value)) {\n\t\t\tconst limit = readPatternSource(shape.pattern);'
const head = 'function createStringFaults(shape, value, path) {'
if (!text.includes(head)) { console.error('A3: head anchor missing'); process.exit(1) }
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(head, 'const PATTERN_CACHE = new WeakMap();\n' + head).replace(anchor, replacement))
console.log('A3 patched -> ' + target)
