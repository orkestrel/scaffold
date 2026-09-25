import { readFileSync, writeFileSync } from 'node:fs'
const path = 'tmp/units/mcol-plants.mjs'
let text = readFileSync(path, 'utf8')
const from = `		from: \`'<div class="fade collapsing" style="height: 24px">Tide table</div><div class="collapsing"\`,
		to: \`'<style>@layer components { .fade { transition: opacity var(--vn-motion-feedback) var(--vn-ease-out) } }</style><div class="fade collapsing" style="height: 24px">Tide table</div><div class="collapsing"\`,`
const to = `		// The planted sheet follows the three elements, so the readings keep their order, and it
		// writes the fade rule again later in the components layer than the collapsing rule.
		from: \`<div class="fade">Tide table</div>',\`,
		to: \`<div class="fade">Tide table</div><style>@layer components { .fade { transition: opacity var(--vn-motion-feedback) var(--vn-ease-out) } }</style>',\`,`
if (text.split(from).length !== 2) throw new Error('missing')
writeFileSync(path, text.replace(from, to))
