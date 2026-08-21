// The executable entry, and the only module that touches process state: it reads
// the arguments the process was given and assigns the code the run returned. The
// `#!/usr/bin/env node` shebang is re-emitted by the build's `output.banner`
// rather than written here, because the bundler strips a shebang from source.
import { CLI } from './CLI.js'

process.stdout.on('error', (error) => {
	if ('code' in error && error.code === 'EPIPE') return
	throw error
})
process.exitCode = await new CLI(
	process.env.ORKESTREL_SCAFFOLD_REGISTRY === undefined
		? undefined
		: { upstream: { registry: { base: process.env.ORKESTREL_SCAFFOLD_REGISTRY } } },
).execute(process.argv.slice(2))
