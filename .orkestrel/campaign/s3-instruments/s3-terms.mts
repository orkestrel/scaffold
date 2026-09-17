import { readFileSync } from 'node:fs'
import { POLICY_BANNED_TERMS, POLICY_JUDGED_TERMS, stripPolicyCode } from '../../configs/policy.ts'

const paths = process.argv.slice(2)
for (const path of paths) {
	const prose = stripPolicyCode(readFileSync(path, 'utf8'))
	for (const term of POLICY_BANNED_TERMS) {
		for (const match of prose.matchAll(term.pattern)) {
			const line = prose.slice(0, match.index).split('\n').length
			console.log(`BANNED ${path}:${line} ${term.term} -> ${match[0]}`)
		}
	}
	for (const judged of POLICY_JUDGED_TERMS) {
		const pattern = new RegExp(`\\b${judged}\\b`, 'giu')
		for (const match of prose.matchAll(pattern)) {
			const line = prose.slice(0, match.index).split('\n').length
			console.log(`JUDGED ${path}:${line} ${judged} -> ${match[0]}`)
		}
	}
}
console.log('SWEPT', paths.join(' '))
