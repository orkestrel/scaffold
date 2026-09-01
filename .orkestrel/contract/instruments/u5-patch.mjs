// U5 dist surgery: anyOf diagnostic short-circuit - audit and explain union
// plans return the empty report at the FIRST clean variant when the union is
// not exclusive; oneOf keeps its full tally. The behavior ruling (a later
// variant's coded refusal is no longer reached on an earlier acceptance) ships
// with the implementation unit's guide sentence and pin.
// Run: node u5-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const source = process.argv[2]
const target = process.argv[3]
let text = readFileSync(source, 'utf8')

const auditAnchor = `				return (value, path) => {
					const perVariant = [];
					let matched = 0;
					for (let index2 = 0; index2 < plans.length; index2 += 1) {
						const plan = plans[index2];
						if (plan === void 0) continue;
						const variantFaults = plan(value, path);
						perVariant[perVariant.length] = variantFaults;
						if (variantFaults.length === 0) matched += 1;
					}`

const auditReplacement = `				return (value, path) => {
					const perVariant = [];
					let matched = 0;
					for (let index2 = 0; index2 < plans.length; index2 += 1) {
						const plan = plans[index2];
						if (plan === void 0) continue;
						const variantFaults = plan(value, path);
						if (!exclusive && variantFaults.length === 0) return [];
						perVariant[perVariant.length] = variantFaults;
						if (variantFaults.length === 0) matched += 1;
					}`

const explainAnchor = `				return (value, path) => {
					const perVariant = [];
					for (let index2 = 0; index2 < plans.length; index2 += 1) {
						const plan = plans[index2];
						if (plan === void 0) continue;
						perVariant[perVariant.length] = plan(value, path);
					}
					const closest = selectClosestFaults(perVariant);`

const explainReplacement = `				return (value, path) => {
					const perVariant = [];
					for (let index2 = 0; index2 < plans.length; index2 += 1) {
						const plan = plans[index2];
						if (plan === void 0) continue;
						const variantFaults = plan(value, path);
						if (!exclusive && variantFaults.length === 0) return [];
						perVariant[perVariant.length] = variantFaults;
					}
					const closest = selectClosestFaults(perVariant);`

if (!text.includes(auditAnchor)) { console.error('U5: audit union anchor missing'); process.exit(1) }
if (!text.includes(explainAnchor)) { console.error('U5: explain union anchor missing'); process.exit(1) }
text = text.replace(auditAnchor, auditReplacement).replace(explainAnchor, explainReplacement)
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text)
console.log(`U5 patched -> ${target}`)
