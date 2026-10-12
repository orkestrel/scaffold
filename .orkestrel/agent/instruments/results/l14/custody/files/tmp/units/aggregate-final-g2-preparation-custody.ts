import { readBuild, BUILD } from '../../.orkestrel/agent/instruments/harness/.build/bench5/build/helpers.js'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'
import { join } from 'node:path'

const manifest = readBuild()
process.stdout.write(JSON.stringify({
	build: BUILD,
	manifestHash: hashFile(join(BUILD, 'build-manifest.json')).hash,
	sources: manifest.sources.length,
	compilerInputs: manifest.compiler.inputs.length,
	outputs: manifest.outputs.length,
	resources: manifest.resources.map(resource => ({ path: resource.path, hash: resource.hash })),
	compiler: { path: manifest.compiler.path, hash: manifest.compiler.hash, version: manifest.compiler.version }
}, null, 2) + '\n')
