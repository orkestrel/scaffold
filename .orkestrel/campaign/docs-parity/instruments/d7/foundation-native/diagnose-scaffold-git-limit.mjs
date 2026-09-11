import { executeSync } from '@orkestrel/process/server'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const directory = resolve(fileURLToPath(new URL('../..', import.meta.url)))

for (const limit of [1048576, 16777216, Number.MAX_SAFE_INTEGER]) {
	const result = executeSync({ file: 'git', arguments: ['-C', directory, 'ls-files', '-z'] }, { limit, strict: false })
	const error = result.cause instanceof Error ? result.cause : undefined
	const stdout = new TextEncoder().encode(result.stdout).byteLength
	console.log(JSON.stringify({ limit, failed: result.failed, truncated: result.truncated, code: result.code, signal: result.signal, cause: error === undefined ? undefined : { name: error.name, message: error.message }, stdout, stderr: result.stderr }))
}
