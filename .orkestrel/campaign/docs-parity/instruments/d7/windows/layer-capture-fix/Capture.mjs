import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { execute } from '@orkestrel/process/server'
import { GIT, LIMIT, REGISTRY, TIMEOUT } from './constants.mjs'
import { digestBytes } from './helpers.mjs'

export class Capture {
	#git
	#npm
	#output
	#rows

	constructor(options) {
		this.#git = options.git
		this.#npm = options.npm
		this.#output = options.output
		this.#rows = join(options.output, 'rows.jsonl')
	}

	async begin(input) {
		await mkdir(this.#output, { recursive: true })
		await writeFile(join(this.#output, 'run.json'), `${JSON.stringify({
			...input,
			encoding: 'utf8',
			limit: LIMIT,
			note: 'Command streams are returned as decoded strings by execute and saved as UTF-8 bytes; this carrier does not retain raw native command bytes.',
			origin: 'cached',
			platform: process.platform,
			registry: REGISTRY,
			timeout: TIMEOUT,
			timestamp: new Date().toISOString(),
			version: process.version
		}, undefined, '\t')}\n`)
	}

	async file(packageName, source, saved) {
		const started = new Date().toISOString()
		try {
			const bytes = await readFile(source)
			await writeFile(saved, bytes)
			const row = { digest: digestBytes(bytes), finish: new Date().toISOString(), package: packageName, saved, source, started, type: 'record' }
			await this.#row(row)
			return row
		} catch (error) {
			const row = { error: error instanceof Error ? error.message : String(error), finish: new Date().toISOString(), package: packageName, saved, source, started, type: 'record' }
			await this.#row(row)
			return row
		}
	}

	async command(packageName, source, file, arguments_, workspace) {
		const started = new Date().toISOString()
		let result
		let error
		try {
			result = await execute({ arguments: arguments_, file }, { limit: LIMIT, strict: false, timeout: TIMEOUT, workspace })
		} catch (caught) {
			error = caught
		}
		const folder = join(this.#output, packageName)
		await mkdir(folder, { recursive: true })
		const stdout = join(folder, `${source}.stdout.txt`)
		const stderr = join(folder, `${source}.stderr.txt`)
		const output = result?.stdout ?? ''
		const diagnostics = result?.stderr ?? ''
		await writeFile(stdout, output, 'utf8')
		await writeFile(stderr, diagnostics, 'utf8')
		const row = {
			arguments: arguments_,
			command: result?.command,
			cwd: workspace,
			executable: file,
			finish: new Date().toISOString(),
			package: packageName,
			requested: `@orkestrel/${packageName}`,
			label: source,
			started,
			stderr: { digest: digestBytes(Buffer.from(diagnostics, 'utf8')), path: stderr },
			stdout: { digest: digestBytes(Buffer.from(output, 'utf8')), path: stdout },
			type: 'record',
			...(result === undefined ? { error: error instanceof Error ? error.message : String(error) } : {
				aborted: result.aborted,
				code: result.code,
				expired: result.expired,
				failed: result.failed,
				signal: result.signal,
				truncated: result.truncated
			})
		}
		await this.#row(row)
		return row
	}

	async package(root, packageName) {
		const checkout = resolve(root, packageName)
		const folder = join(this.#output, packageName)
		await mkdir(folder, { recursive: true })
		await this.file(packageName, join(checkout, 'package.json'), join(folder, 'package.before.json'))
		await this.file(packageName, join(checkout, 'package-lock.json'), join(folder, 'package-lock.before.json'))
		for (const command of GIT) {
			const row = await this.command(packageName, command.source, this.#git, ['-C', checkout, ...command.arguments], checkout)
			if (row.expired || row.aborted) return row
		}
		const npm = await this.command(packageName, 'npm-view', process.execPath, [this.#npm, 'view', `@orkestrel/${packageName}`, `--registry=${REGISTRY}`, '--json'], checkout)
		if (npm.expired || npm.aborted) return npm
		await this.file(packageName, join(checkout, 'package.json'), join(folder, 'package.after.json'))
		await this.file(packageName, join(checkout, 'package-lock.json'), join(folder, 'package-lock.after.json'))
		for (const command of GIT) {
			const row = await this.command(packageName, `${command.source}-after`, this.#git, ['-C', checkout, ...command.arguments], checkout)
			if (row.expired || row.aborted) return row
		}
		return npm
	}

	async #row(row) {
		await appendFile(this.#rows, `${JSON.stringify(row)}\n`)
	}
}
