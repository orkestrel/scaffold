import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { readBuild } from '../../.orkestrel/agent/instruments/harness/.build/bench5/build/helpers.js'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'
import { readMatrixFiles } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/helpers.js'

class Custody {
	#root = resolve(import.meta.dirname, '..', '..')

	execute(): void {
		const build = readBuild()
		const results = join(this.#root, '.orkestrel', 'agent', 'instruments', 'results', 'l14')
		const files = {
			build: hashFile(join(this.#root, '.orkestrel', 'agent', 'instruments', 'harness', '.build', 'build-manifest.json')),
			deployment: hashFile(join(this.#root, 'tmp', 'units', 'aggregate-final-daemon-deployment.json')),
			freeze: hashFile(join(results, 'q4-think0', 'freeze', 'manifest.json')),
			fit: hashFile(join(results, 'calibration', 'q4', 'fit', 'fit.json')),
			driver: hashFile(join(this.#root, 'tmp', 'units', 'aggregate-final-cell-driver.ts'))
		}
		const sources = readMatrixFiles()
		const receipt = { files, census: { sources: build.sources.length, resources: build.resources.length, compilerInputs: build.compiler.inputs.length, outputs: build.outputs.length, matrixFiles: sources.length, compiler: build.compiler } }
		const counts = { sources: build.sources.length, resources: build.resources.length, compilerInputs: build.compiler.inputs.length, outputs: build.outputs.length, matrixFiles: sources.length }
		writeFileSync(join(this.#root, 'tmp', 'units', 'aggregate-final-q4-cell-custody.json'), `${JSON.stringify(receipt, null, 2)}\n`, { flag: 'wx' })
		process.stdout.write(`${JSON.stringify({ files, counts })}\n`)
	}
}

new Custody().execute()
