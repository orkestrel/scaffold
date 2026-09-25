import { readFileSync, writeFileSync } from 'node:fs'
const path = 'tmp/units/mcol-plants.mjs'
let text = readFileSync(path, 'utf8')
const pairs = [
	[
		"to: '@include transition(\\n\\t\\t\\theight var(--vn-motion-panel) var(--vn-ease-panel),\\n\\t\\t\\topacity var(--vn-motion-panel) var(--vn-ease-panel)\\n\\t\\t);',",
		"to: '@include transition((height var(--vn-motion-panel) var(--vn-ease-panel), opacity var(--vn-motion-panel) var(--vn-ease-panel)));',",
	],
	[
		"\t\tappendFileSync(log, `$ npm run build:src:styles\\nexit=${build.status}\\n`)\n\t}\n\tconst args",
		"\t\tappendFileSync(log, `$ npm run build:src:styles\\nexit=${build.status}\\n`)\n\t\tif (build.status !== 0) {\n\t\t\tcopyFileSync(backup, plant.file)\n\t\t\tthrow new Error(`${plant.name}: the planted build failed; the file is restored`)\n\t\t}\n\t}\n\tconst args",
	],
]
for (const [from, to] of pairs) {
	if (text.split(from).length !== 2) throw new Error(`missing: ${from.slice(0, 50)}`)
	text = text.replace(from, to)
}
writeFileSync(path, text)
