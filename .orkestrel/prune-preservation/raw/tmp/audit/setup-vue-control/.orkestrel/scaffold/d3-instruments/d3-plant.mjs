// Swaps the vendored predicate between its corrected form and the form unit D2 shipped, inside one
// generated workspace's own `tests/config.test.ts`. The `old` direction is the negative control:
// it restores the module-scope expression that rethrows an inspection error, so a run that reports
// nothing under it has measured nothing. The `new` direction restores the corrected bytes.
import { readFileSync, writeFileSync } from 'node:fs'

const [path, direction] = process.argv.slice(2)
const corrected = [
	"const publishes = ['core', 'browser', 'server'].some((environment) => {",
	'\ttry {',
	"\t\tconst entry = lstatSync(resolve(root, 'src', environment))",
	'\t\treturn entry.isDirectory() && !entry.isSymbolicLink()',
	'\t} catch {',
	'\t\treturn false',
	'\t}',
	'})',
].join('\n')
const shipped = [
	"const publishes = ['core', 'browser', 'server'].some(",
	'\t(environment) =>',
	"\t\tlstatSync(resolve(root, 'src', environment), { throwIfNoEntry: false })?.isDirectory() === true,",
	')',
].join('\n')
const [from, to] = direction === 'old' ? [corrected, shipped] : [shipped, corrected]
const text = readFileSync(path, 'utf8')
if (!text.includes(from)) throw new Error(`The ${direction} plant found no source block in ${path}`)
writeFileSync(path, text.replace(from, to))
console.log(`PLANT=${direction} OK`)
