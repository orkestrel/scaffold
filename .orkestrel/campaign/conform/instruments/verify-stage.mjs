// Verify that every staged tarball registered for a consumer is the copy actually installed under
// node_modules, file by file. Exit 1 on any difference. Usage: node verify-stage.mjs <consumer>
import { readFileSync, readdirSync, statSync, mkdtempSync, rmSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, relative } from 'node:path'
import { tmpdir } from 'node:os'

const consumer = process.argv[2]
if (!consumer) throw new Error('consumer required')
const dir = consumer === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${consumer}`
const register = JSON.parse(readFileSync('/home/user/scaffold/.orkestrel/campaign/fix/tarballs.json', 'utf8'))
const rows = register.filter((row) => row.consumer === consumer)
if (rows.length === 0) {
	console.log(`${consumer}: no register rows`)
	process.exit(2)
}

function walk(root) {
	const out = []
	const visit = (path) => {
		for (const entry of readdirSync(path)) {
			const full = join(path, entry)
			if (statSync(full).isDirectory()) visit(full)
			else out.push(relative(root, full))
		}
	}
	visit(root)
	return out.sort()
}

let failed = false
for (const row of rows) {
	const tarball = `/home/user/scaffold/tmp/tarballs/${row.tarball}`
	const installed = join(dir, 'node_modules', row.dependency)
	if (!existsSync(tarball)) {
		console.log(`${consumer}: ${row.dependency} RED — tarball missing: ${tarball}`)
		failed = true
		continue
	}
	if (!existsSync(installed)) {
		console.log(`${consumer}: ${row.dependency} RED — not installed at ${installed}`)
		failed = true
		continue
	}
	const scratch = mkdtempSync(join(tmpdir(), 'verify-stage-'))
	try {
		execFileSync('tar', ['-xzf', tarball, '-C', scratch])
		const packed = join(scratch, 'package')
		let first
		for (const file of walk(packed)) {
			const target = join(installed, file)
			if (!existsSync(target)) {
				first = `${file} (missing)`
				break
			}
			if (!readFileSync(join(packed, file)).equals(readFileSync(target))) {
				first = `${file} (differs)`
				break
			}
		}
		if (first === undefined) console.log(`${consumer}: ${row.dependency} OK — ${row.tarball} is the installed copy`)
		else {
			console.log(`${consumer}: ${row.dependency} RED — ${first}`)
			failed = true
		}
	} finally {
		rmSync(scratch, { recursive: true, force: true })
	}
}
process.exit(failed ? 1 : 0)
