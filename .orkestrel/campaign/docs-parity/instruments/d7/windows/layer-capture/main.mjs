import { lstat, mkdir, stat } from 'node:fs/promises'
import { isAbsolute, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Capture } from './Capture.mjs'
import { PACKAGES } from './constants.mjs'
import { isInside } from './helpers.mjs'

export async function run(root, output, npm, git) {
	if (!isAbsolute(root) || !isAbsolute(output) || !isAbsolute(npm) || !isAbsolute(git)) throw new Error('Input paths must be absolute.')
	if (!(await stat(root)).isDirectory()) throw new Error('Fleet root must be a directory.')
	if (!(await stat(npm)).isFile()) throw new Error('npm CLI path must be a file.')
	if (!(await stat(git)).isFile()) throw new Error('Git path must be a file.')
	for (const packageName of PACKAGES) {
		if (resolve(output) === resolve(root, packageName)) throw new Error('Output path must not equal a checkout root.')
	}
	if (!isInside(resolve(root, 'scaffold', 'tmp', 'pass'), output)) throw new Error('Output path must remain beneath scaffold/tmp/pass.')
	try {
		await lstat(output)
		throw new Error('Output path is occupied.')
	} catch (error) {
		if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') throw error
	}
	await mkdir(output)
	const capture = new Capture({ git, npm, output })
	await capture.begin({ git, npm, output, population: PACKAGES, root })
	for (const packageName of PACKAGES) {
		const row = await capture.package(root, packageName)
		if (row.expired || row.aborted) break
	}
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	const [root, output, npm, git] = process.argv.slice(2)
	if (root === undefined || output === undefined || npm === undefined || git === undefined) throw new Error('Expected fleet root, output directory, npm CLI path, and Git path.')
	await run(root, output, npm, git)
}
