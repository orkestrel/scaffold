import { readFileSync } from 'node:fs'
import { isClaim, formatVerdict } from '@orkestrel/probe'
import { Probe } from '@orkestrel/probe/server'

const [workspace, path] = process.argv.slice(2)
if (workspace === undefined || path === undefined) throw new Error('workspace and claim are required')
const claim = JSON.parse(readFileSync(path, 'utf8'))
if (!isClaim(claim)) throw new Error('invalid claim')
const probe = new Probe({ workspace, deadline: 120_000 })
try {
  const verdict = await probe.prove(claim)
  console.log(formatVerdict(verdict))
  if (verdict.receipt === undefined) process.exitCode = 1
} finally {
  await probe.destroy()
}
