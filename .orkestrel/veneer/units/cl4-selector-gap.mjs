// Read-only measurement for the CL4 stop: which pinned reboot selectors are absent from the built
// cascade by the scan's exact rule, and which of those are present under an equivalent spelling.
// Run from the Veneer checkout root.
import { readFileSync } from 'node:fs'
import { parse } from 'postcss'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const wanted = inventory.components.reboot.selectors.map((entry) => entry.selector)
const css = readFileSync('dist/src/styles/index.css', 'utf8')
const emitted = new Set()
parse(css).walkRules((rule) => {
	for (const selector of rule.selectors) emitted.add(selector.replace(/\s+/gu, ' ').trim())
})

// The candidate equivalence: fold a legacy single-colon pseudo-element to its double-colon form,
// and drop a redundant leading universal before a pseudo-element.
const legacy = /(^|[\s>+~,])(:(?:before|after|first-line|first-letter)\b)/gu
function canonical(selector) {
	let out = selector.replace(/\s+/gu, ' ').trim()
	out = out.replace(legacy, (whole, lead, pseudo) => `${lead}:${pseudo}`)
	out = out.replace(/(^|[\s>+~,])\*(::)/gu, '$1$2')
	return out
}
const emittedCanonical = new Set([...emitted].map(canonical))

const missingExact = wanted.filter((name) => !emitted.has(name.replace(/\s+/gu, ' ').trim()))
const stillMissing = missingExact.filter((name) => !emittedCanonical.has(canonical(name)))
const recoveredByCanonical = missingExact.filter((name) => emittedCanonical.has(canonical(name)))

console.log(`pinned reboot selectors: ${wanted.length}`)
console.log(`emitted selectors in the built cascade: ${emitted.size}`)
console.log(`absent by the scan's exact rule: ${missingExact.length}`)
console.log(`of those, present under the candidate equivalence: ${recoveredByCanonical.length}`)
console.log(JSON.stringify(recoveredByCanonical, undefined, '\t'))
console.log(`still absent after the equivalence: ${stillMissing.length}`)
console.log(JSON.stringify(stillMissing.slice(0, 60), undefined, '\t'))
