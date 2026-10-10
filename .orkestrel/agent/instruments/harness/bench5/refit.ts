import { Refit } from './refit/Refit.ts'

process.exitCode = await Refit.run(process.argv.slice(2))
