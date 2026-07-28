// Self-contained fork entrypoint: Node executes this file directly inside each generated clone.
import { writeSync } from 'node:fs'
import { inspect } from 'node:util'
import { createBuilder, createLogger } from 'vite'

class OutputConsole {
	#messages = []

	get output() {
		return this.#messages.join('')
	}

	log = (...values) => {
		this.#append(values)
	}

	warn = (...values) => {
		this.#append(values)
	}

	error = (...values) => {
		this.#append(values)
	}

	capture = (chunk, encoding, callback) => {
		this.#messages.push(String(chunk))
		const complete = typeof encoding === 'function' ? encoding : callback
		if (typeof complete === 'function') complete()
		return true
	}

	#append(values) {
		this.#messages.push(
			`${values
				.map((value) => (typeof value === 'string' ? value : inspect(value, { colors: false })))
				.join(' ')}\n`,
		)
	}
}

const packageDirectory = process.argv[2]
let active
let incident
let failing = false

function sendMessage(message) {
	return new Promise((resolve, reject) => {
		if (process.send === undefined) {
			reject(new Error('boundary build driver lost IPC'))
			return
		}
		process.send(message, (error) => {
			if (error === null) resolve()
			else reject(error)
		})
	})
}

function renderFailure(reason) {
	if (reason instanceof Error) return reason.stack ?? reason.message
	try {
		return inspect(reason, { colors: false })
	} catch {
		return 'unrenderable boundary build driver failure'
	}
}

function waitForTurn() {
	return new Promise((resolve) => setImmediate(resolve))
}

function writeDiagnostic(output) {
	try {
		writeSync(2, output)
	} catch {
		return
	}
}

async function executeBuild(message) {
	const output = new OutputConsole()
	const logger = createLogger('info', { allowClearScreen: false, console: output })
	const stdout = process.stdout.write
	const stderr = process.stderr.write
	let status = 0
	active = message.id
	incident = undefined
	process.stdout.write = output.capture
	process.stderr.write = output.capture
	try {
		try {
			const builder = await createBuilder(
				{
					configFile: message.config,
					customLogger: logger,
					clearScreen: false,
				},
				null,
			)
			await builder.buildApp()
			await builder.runDevTools()
		} catch (error) {
			status = 1
			output.error(`error during build:\n${renderFailure(error)}`)
		}
		await waitForTurn()
		if (incident !== undefined) {
			status = 1
			output.error(`error after build teardown:\n${renderFailure(incident.reason)}`)
		}
	} finally {
		process.stdout.write = stdout
		process.stderr.write = stderr
	}
	await sendMessage({ command: 'result', id: message.id, status, output: output.output })
	active = undefined
	incident = undefined
}

async function receiveMessage(message) {
	if (typeof message !== 'object' || message === null || Array.isArray(message)) {
		throw new Error('boundary build driver received an invalid message')
	}
	if (message.command === 'destroy') {
		if (active !== undefined)
			throw new Error('boundary build driver received destroy during a build')
		process.exit(0)
	}
	if (
		message.command !== 'build' ||
		typeof message.id !== 'number' ||
		!Number.isSafeInteger(message.id) ||
		typeof message.config !== 'string' ||
		active !== undefined
	) {
		throw new Error('boundary build driver received an invalid build request')
	}
	await executeBuild(message)
}

async function failDriver(reason) {
	if (failing) return
	failing = true
	const stack = renderFailure(reason)
	writeDiagnostic(`${stack}\n`)
	try {
		await sendMessage({ command: 'failure', id: active, stack })
	} catch (error) {
		writeDiagnostic(`${renderFailure(error)}\n`)
	}
	process.exit(1)
}

function captureFailure(reason) {
	if (active !== undefined) {
		if (incident === undefined) {
			incident = { reason }
			writeDiagnostic(`case ${String(active)} asynchronous failure:\n${renderFailure(reason)}\n`)
		}
		return
	}
	void failDriver(reason)
}

process.on('disconnect', () => {
	process.exit(0)
})
process.on('unhandledRejection', (reason) => {
	captureFailure(reason)
})
process.on('uncaughtException', (error) => {
	captureFailure(error)
})
process.on('message', (message) => {
	receiveMessage(message).catch(failDriver)
})

async function startDriver() {
	if (packageDirectory === undefined) throw new Error('missing generated package directory')
	if (process.send === undefined) throw new Error('boundary build driver requires IPC')
	await sendMessage({ command: 'ready' })
}

startDriver().catch(failDriver)
