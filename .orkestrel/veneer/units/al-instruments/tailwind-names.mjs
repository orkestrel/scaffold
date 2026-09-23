// Probe: compiles the Tailwind utilities layer against the shipped alert class names and reports
// every name Tailwind generates a rule for. Control: `table` and `container`, which the exclusion
// line names because Tailwind generates them.
import { compile } from '@tailwindcss/node'
import { readFileSync } from 'node:fs'
const css = readFileSync('tmp/probe/base/dist/src/styles/index.css', 'utf8')
const names = [...new Set([...css.matchAll(/\.(alert[\w-]*)/g)].map((match) => match[1]))]
const compiler = await compile("@import 'tailwindcss/utilities' source(none);", {
	base: process.cwd(),
	onDependency() {},
})
for (const name of [...names, 'table', 'container']) {
	const out = compiler.build([name])
	console.log(name, out.includes(`.${name}`) ? 'GENERATED' : 'none')
}
