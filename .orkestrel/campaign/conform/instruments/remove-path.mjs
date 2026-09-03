// Remove one file the Orchestrator owns the cleanup of, then remove its parent directory when that
// leaves it empty. Refuses anything outside a tmp/ directory of a fleet checkout or the scaffold checkout.
// Usage: node remove-path.mjs <absolute file path>
import { existsSync, readdirSync, rmdirSync, unlinkSync } from 'node:fs'
import { dirname } from 'node:path'
const target = process.argv[2]
if (!target || !/^\/home\/user\/(fleet\/[a-z]+|scaffold)\/tmp\//.test(target)) {
	console.error(`refused: ${target ?? '(no path)'} is not under a checkout's tmp/ directory`)
	process.exit(2)
}
if (!existsSync(target)) {
	console.log(`absent: ${target}`)
	process.exit(0)
}
unlinkSync(target)
console.log(`removed: ${target}`)
const parent = dirname(target)
if (readdirSync(parent).length === 0) {
	rmdirSync(parent)
	console.log(`removed empty directory: ${parent}`)
}
