// CL10 emitted-value control. `break` retunes the vertical rule's opacity in its own partial and
// `restore` puts back the exact byte it replaced, so the revert is the inverse of this edit alone.
import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const target = 'src/styles/components/_vr.scss'
const shipped = 'opacity: 0.25;'
const planted = 'opacity: 0.35;'
const [, , action] = process.argv
const text = readFileSync(target, 'utf8')

if (action === 'break') {
	if (!text.includes(shipped)) throw new Error('The partial does not carry the shipped opacity')
	writeFileSync(target, text.replace(shipped, planted))
} else if (action === 'restore') {
	if (!text.includes(planted)) throw new Error('The partial does not carry the planted opacity')
	writeFileSync(target, text.replace(planted, shipped))
} else {
	throw new Error(`Unknown action ${String(action)}`)
}

console.log(
	`${action} ${target} sha256 ${createHash('sha256').update(readFileSync(target)).digest('hex')}`,
)
