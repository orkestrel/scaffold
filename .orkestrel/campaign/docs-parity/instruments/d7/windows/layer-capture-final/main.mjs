import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { run } from './functions.mjs'

if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	const [root, output, npm, git] = process.argv.slice(2)
	if (root === undefined || output === undefined || npm === undefined || git === undefined) throw new Error('Expected fleet root, output directory, npm CLI path, and Git path.')
	await run(root, output, npm, git)
}
