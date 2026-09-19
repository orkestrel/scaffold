import { readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

let patch = ''
for (const file of ['HomeView', 'MagazineView', 'ShopView']) {
	const path = `app/browser/components/${file}.vue`
	const before = readFileSync(path, 'utf8')
	let after = before
	if (file === 'HomeView') {
		after = after.replace(/\t+<p\r?\n\t+class="chip chip-(?:south|north)[\s\S]*?<\/p>\r?\n/g, '')
		after = after.replace('border shadow-lg', 'border').replace('class="voice text-warning-emphasis"', 'class="text-warning-emphasis"')
	} else {
		after = after.replace('class="btn rounded-pill"', 'class="btn"')
	}
	const proposed = `tmp/codex/u4-${file}.vue`
	writeFileSync(proposed, after)
	const result = spawnSync('git', ['diff', '--no-index', '--', path, proposed], { encoding: 'utf8' })
	if (result.status !== 1) throw new Error(`Patch failed: ${result.stderr}`)
	patch += result.stdout.replaceAll(`b/${proposed}`, `b/${path}`)
}
writeFileSync('tmp/codex/u4-views.patch', patch)
console.log(patch)
