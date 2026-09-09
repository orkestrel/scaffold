import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

class ChangingResult {
	#reads = 0

	get testModules() {
		this.#reads += 1
		return this.#reads === 1
			? [
					{
						state() {
							return 'failed'
						},
					},
				]
			: []
	}

	get unhandledErrors() {
		return []
	}

	get reads() {
		return this.#reads
	}
}

const scaffold = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const helper = await import(pathToFileURL(resolve(scaffold, '..', 'guide', 'src', 'server', 'helpers.ts')).href)
const passed = helper.matchesGuideResult({
	testModules: [
		{
			state() {
				return 'passed'
			},
		},
	],
	unhandledErrors: [],
})
const failed = helper.matchesGuideResult({
	testModules: [
		{
			state() {
				return 'failed'
			},
		},
	],
	unhandledErrors: [],
})
const empty = helper.matchesGuideResult({ testModules: [], unhandledErrors: [] })
const adversarial = new ChangingResult()
const result = helper.matchesGuideResult(adversarial)
const evidence = {
	adversarial: { reads: adversarial.reads, result },
	controls: { empty, failed, passed },
}

process.stdout.write(`${JSON.stringify(evidence)}\n`)
if (passed !== true || failed !== false || empty !== false || result !== false || adversarial.reads !== 1) {
	process.exitCode = 1
}
