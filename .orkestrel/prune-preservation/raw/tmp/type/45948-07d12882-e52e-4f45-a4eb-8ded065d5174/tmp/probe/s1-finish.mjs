import { readFileSync, writeFileSync } from 'node:fs'

const configPath = 'tests/config.test.ts'
let config = readFileSync(configPath, 'utf8')
const start = config.indexOf('\t\t\t\t\tconst names: string[] = []', config.indexOf("if (environment === 'journey')"))
const end = config.indexOf('\n\t\t\t\t\tcontinue', start)
if (start < 0 || end < 0) throw new Error('Journey assertion block not found')
const block = config.slice(start, end)
const assertions = block.slice(block.indexOf('\t\t\t\t\t\texpect('), block.lastIndexOf('\n\t\t\t\t\t}'))
const collection = block.slice(0, block.indexOf('\t\t\t\t\t\texpect('))
	.replace('const names: string[] = []', 'const tests: object[] = []')
	+ '\t\t\t\t\t\ttests.push(test)\n\t\t\t\t\t}\n\t\t\t\t\tjourneys.push(tests)'
config = config.slice(0, start) + collection + config.slice(end)
config = config.replace("\t\tconst targets = required.map", "\t\tconst journeys: object[][] = []\n\t\tconst targets = required.map")
const closing = '\t\t\texpect(types).toStrictEqual(expectedTypes)\n\t\t}\n'
if (!config.includes(closing)) throw new Error('Wrapper loop closing not found')
config = config.replace(closing, closing + '\t\tfor (const tests of journeys) {\n\t\t\tconst names: string[] = []\n\t\t\tfor (const test of tests) {\n' + assertions.replaceAll('\t\t\t\t\t\t', '\t\t\t\t') + '\n\t\t\t}\n\t\t}\n')
writeFileSync(configPath, config)

const cliPath = 'tests/src/bin/CLI.test.ts'
let cli = readFileSync(cliPath, 'utf8')
const conditional = "\t\t\t\tif (state === 'present') {\n\t\t\t\t\texpect(workspace.read('target/configs/app/vite.journey.config.ts')).toBe('// adopter variants\\n')\n\t\t\t\t}"
if (!cli.includes(conditional)) throw new Error('Birth preservation assertion not found')
cli = cli.replace(conditional, "\t\t\t\texpect(workspace.read('target/configs/app/vite.journey.config.ts')).toBe(\n\t\t\t\t\tstate === 'present' ? '// adopter variants\\n' : undefined,\n\t\t\t\t)")
writeFileSync(cliPath, cli)
