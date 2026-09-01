// A6 BOUND (probe only, NOT parity-preserving): removes per-field and per-index
// pathOf allocation from the diagnostic walks by passing the parent path down.
// Faults carry wrong paths, so this measures only the ceiling a lazy-path
// mechanism could reach on a clean walk. Run: node a6-bound-patch.mjs <src> <target>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
let text = readFileSync(source, 'utf8')
const fieldAnchor = 'entry.audit(record[entry.key], pathOf(path, entry.key))'
const reportAnchor = 'entry.report(record[entry.key], pathOf(path, entry.key))'
const before = text.length
const fieldCount = text.split(fieldAnchor).length - 1
text = text.replaceAll(fieldAnchor, 'entry.audit(record[entry.key], path)')
const reportCount = text.split(reportAnchor).length - 1
text = text.replaceAll(reportAnchor, 'entry.report(record[entry.key], path)')
const indexPattern = /pathOf\(path, INTRINSICS\.text\((\w+)\)\)/g
const indexCount = (text.match(indexPattern) ?? []).length
text = text.replace(indexPattern, 'path')
console.log(`A6 bound: field sites ${fieldCount}, report sites ${reportCount}, index sites ${indexCount}`)
if (fieldCount === 0 || indexCount === 0) { console.error('A6: anchors missing'); process.exit(1) }
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text)
console.log('A6 bound patched -> ' + target)
