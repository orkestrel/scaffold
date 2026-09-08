// port-paths.mjs <in> <out>: rewrites the container-form paths in a retained brief, report, or script to the host's, read from
// the environment: SCAFFOLD (the scaffold checkout), FLEET (the folder holding every package checkout as <FLEET>/<pkg>),
// SCR (the pass scratch directory), SCRATCH (the parent scratch directory holding ts6/pack). Longest prefix first.
// Drops the container's npm 11 prefix; the host's npm on PATH must be 11 or later. Paths use forward slashes on every host.
import { readFileSync, writeFileSync } from 'node:fs'
const [input, output] = process.argv.slice(2)
const need = (name) => {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set`)
  return value.replace(/\\/g, '/').replace(/\/$/, '')
}
const SCAFFOLD = need('SCAFFOLD'), FLEET = need('FLEET'), SCR = need('SCR')
const SCRATCH = process.env.SCRATCH ? need('SCRATCH') : `${SCR}/..`
const CONTAINER_SCRATCH = '/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad'
const rows = [
  [`${CONTAINER_SCRATCH}/docs/d7/pass`, SCR],
  [`${CONTAINER_SCRATCH}/ts6/pack`, `${SCR}/packed`],
  [CONTAINER_SCRATCH, SCRATCH],
  ['/home/user/scaffold', SCAFFOLD],
  ['/home/user/fleet', FLEET],
  ['PATH=/opt/npm11/bin:\\$PATH ', ''],
  ['PATH=/opt/npm11/bin:$PATH ', ''],
  ['PATH=/opt/npm11/bin:\\$PATH', ''],
  ['PATH=/opt/npm11/bin:$PATH', ''],
  ['/opt/npm11/bin/', ''],
]
let text = readFileSync(input, 'utf8')
for (const [from, to] of rows) text = text.split(from).join(to)
writeFileSync(output, text)
console.log(`${output} written from ${input}`)
