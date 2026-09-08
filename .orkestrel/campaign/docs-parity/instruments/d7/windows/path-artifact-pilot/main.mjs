import { run } from './functions.mjs'

const [output] = process.argv.slice(2)

if (output === undefined) throw new Error('Expected an absent absolute output path.')

await run(output)
