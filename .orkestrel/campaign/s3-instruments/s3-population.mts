import { createGuide } from '@orkestrel/guide'
import { readFileSync } from 'node:fs'
import { parseSync } from 'vite'

let total = 0
for (const path of process.argv.slice(2)) {
	const content = readFileSync(path, 'utf8')
	let names = 0
	for (const fence of createGuide(content).fences()) {
		const source = parseSync('skill.ts', fence.code)
		for (const statement of source.program.body) {
			if (statement.type !== 'ImportDeclaration') continue
			if (!statement.source.value.startsWith('@orkestrel/')) continue
			for (const binding of statement.specifiers) {
				if (binding.type === "ImportSpecifier") console.log(`BIND ${path} ${statement.source.value} ${binding.imported.type === "Identifier" ? binding.imported.name : binding.imported.value}`)
			}
		}
	}
	total += names
	console.log(`POPULATION ${path} ${names}`)
}
console.log(`POPULATION TOTAL ${total}`)
