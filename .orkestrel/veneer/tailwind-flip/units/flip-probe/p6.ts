import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { OUT, CANDIDATES, compileRecipe, launchBrowser, flattenSheet, readSheet, writeJSON } from './lib.ts'
const browser = await launchBrowser()
const page = await browser.newPage()
const emissions = []
for (const candidate of ['hidden', 'collapse!', 'container!', 'col-6!', 'md:collapse', 'print:table']) for (const population of ['alone', 'full']) {
	try {
		const css = await compileRecipe(population === 'alone' ? [candidate] : [...CANDIDATES, candidate])
		writeFileSync(resolve(OUT, 'sheets', `p6-${candidate.replaceAll(':', '-').replaceAll('!', '-important')}-${population}.css`), css)
		const flattened = await page.evaluate(flattenSheet, { text: css })
		const escaped = await page.evaluate((candidate) => '.' + CSS.escape(candidate), candidate)
		emissions.push({ candidate, population, expected: 'emitted; exact exclusion does not exclude variants or important modifiers', rows: flattened.rows.filter((row) => row.context.includes('@layer utilities') && row.selector.includes(escaped)) })
	} catch (error) { emissions.push({ candidate, population, error: String(error) }) }
}
const hidden = []
for (const face of ['bootstrap', 'unexcluded', 'tailwindcss']) {
	const css = face === 'bootstrap' ? readSheet('lifted.css') : face === 'unexcluded' ? readSheet('unexcluded.css') + readSheet('lifted.css') : readSheet('recipe.css')
	await page.setContent(`<!doctype html><style>${css}</style><div hidden="until-found" class="d-flex">Hidden until found</div>`)
	hidden.push({ face, expected: { display: face === 'tailwindcss' ? 'flex' : 'none', visibility: 'hidden' }, measured: await page.locator('div').evaluate((element) => ({ display: getComputedStyle(element).display, visibility: getComputedStyle(element).contentVisibility })) })
}
writeJSON('out/p6.json', { emissions, hidden })
await browser.close()
console.log('P6 complete')
