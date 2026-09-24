// Counts the built cascade's selectors under the unit's keys against the pinned inventory's, and
// reads the priority of every declaration they carry.
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
const root = '/home/user/veneer-ut/tmp/probe/base/'
const inventory = JSON.parse(readFileSync(root + 'tests/fixtures/oracle/inventory.json', 'utf8'))
const keys = ['text', 'text-truncate', 'link']
const recorded = new Map()
for (const key of keys)
	for (const rule of inventory.components[key].selectors)
		recorded.set(`${rule.selector.replace(/\s+/g, ' ')} @${rule.condition ?? ''}`, key)
const css = postcss.parse(readFileSync(root + 'dist/src/styles/index.css', 'utf8'))
const emitted = new Map()
const faults = []
css.walkRules((rule) => {
	const conditions = []
	for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent)
		if (parent.type === 'atrule' && parent.name === 'media') conditions.unshift(`@media ${parent.params}`)
	for (const selector of rule.selectors) {
		if (!/(^|[\s>+~,])\.(text|link)-/u.test(selector)) continue
		const site = `${selector} @${conditions.join(' and ')}`
		emitted.set(site, (emitted.get(site) ?? 0) + 1)
		rule.walkDecls((declaration) => {
			const custom = declaration.prop.startsWith('--')
			const helper = selector === '.text-truncate'
			if (custom && declaration.important) faults.push(`${site} ${declaration.prop} is important`)
			if (!custom && !helper && !declaration.important) faults.push(`${site} ${declaration.prop} is normal`)
			if (helper && declaration.important) faults.push(`${site} ${declaration.prop} is important`)
		})
	}
})
// The release writes `(min-width: Npx)`; the cascade writes the range form, so the recorded sites are
// read in the cascade's notation.
const normalize = (site) => site.replace(/\(min-width: (\d+)px\)/u, '(width>=$1px)').replace(/\s+/g, '')
const recordedSites = new Set([...recorded.keys()].map(normalize))
const emittedSites = new Set([...emitted.keys()].map(normalize))
console.log(`inventory selectors under text, text-truncate, and link: ${recorded.size}`)
console.log(`distinct cascade sites naming a .text- or .link- class: ${emitted.size}`)
console.log(`recorded sites the cascade lacks: ${JSON.stringify([...recordedSites].filter((site) => !emittedSites.has(site)))}`)
console.log(`cascade sites the inventory does not record under these keys: ${JSON.stringify([...emittedSites].filter((site) => !recordedSites.has(site)))}`)
console.log(`priority faults: ${JSON.stringify(faults)}`)
