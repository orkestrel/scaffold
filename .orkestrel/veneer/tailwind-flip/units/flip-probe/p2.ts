import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { OUT, readSheet, compileRecipe, launchBrowser, flattenSheet, writeJSON } from './lib.ts'

const recipe = await compileRecipe()
writeFileSync(resolve(OUT, 'sheets/recipe.css'), recipe)
writeFileSync(resolve(OUT, 'sheets/unexcluded.css'), await compileRecipe(undefined, false))
const browser = await launchBrowser()
const page = await browser.newPage()
const tuned = await page.evaluate(flattenSheet, { text: readSheet('tuned.css') })
const composed = await page.evaluate(flattenSheet, { text: recipe, drop: ['theme', 'base', 'utilities'] })
const all = await page.evaluate(flattenSheet, { text: recipe })
const utilities = all.rules.filter((rule) => rule.context.includes('@layer utilities'))
const a = tuned.rows.map((row) => JSON.stringify(row))
const b = composed.rows.map((row) => JSON.stringify(row))
const remaining = [...b]
const removed = []
for (const row of a) {
	const index = remaining.indexOf(row)
	if (index < 0) removed.push(JSON.parse(row))
	else remaining.splice(index, 1)
}
writeJSON('out/p2.json', { first: recipe.replace(/\/\*[\s\S]*?\*\//g, '').trim().split(/\r\n|\n/)[0], expectedFirst: '@layer properties;', sourceRemains: recipe.includes('@source'), emissions: ['collapse', 'container', 'table', 'col-1', 'mt-3'].map((name) => ({ name, expected: name === 'mt-3', measured: utilities.some((rule) => rule.selector === `.${name}`) })), flattened: { tuned: a.length, composed: b.length, removed, added: remaining.map((row) => JSON.parse(row)), sequenceEqualAfterKnownRewrite: JSON.stringify(a.filter((row) => !removed.some((value) => JSON.stringify(value) === row))) === JSON.stringify(b) } })
await browser.close()
console.log('P2 complete')
