// CL10 control instrument for the emitted-vocabulary comparison.
//
// `remove` deletes a recorded selector from the built cascade, `add` plants an unrecorded selector
// under one of this unit's prefixes, and `restore` rebuilds neither: it copies the pristine byte
// stream this script saved before its first mutation. The cascade is build output under `dist/`,
// which git ignores, so no tracked file is touched.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const target = 'dist/src/styles/index.css'
const pristine = 'tmp/units/cl10-cascade-pristine.css'
const [, , action] = process.argv

if (!existsSync(pristine)) copyFileSync(target, pristine)

if (action === 'remove') {
	const text = readFileSync(pristine, 'utf8')
	if (!text.includes('.vr{')) throw new Error('The cascade carries no .vr rule to remove')
	writeFileSync(target, text.replace('.vr{', '.omitted-vr{'))
} else if (action === 'add') {
	writeFileSync(
		target,
		`${readFileSync(pristine, 'utf8')}\n@layer components{.ratio-5x4{--bs-aspect-ratio:80%}}\n`,
	)
} else if (action === 'restore') {
	copyFileSync(pristine, target)
} else {
	throw new Error(`Unknown action ${String(action)}`)
}

const digest = createHash('sha256').update(readFileSync(target)).digest('hex')
console.log(`${action} ${target} sha256 ${digest}`)
console.log(`pristine sha256 ${createHash('sha256').update(readFileSync(pristine)).digest('hex')}`)
