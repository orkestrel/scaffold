// The `#!/usr/bin/env node` shebang is re-emitted by the build's `output.banner`, not source.
import { CLI } from './CLI.js'

await new CLI().run(process.argv.slice(2))
