import { isDeepStrictEqual } from 'node:util'
import { join } from 'node:path'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'
import { measureMatrixCosts, readAttempt } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/helpers.js'
import { isMatrixAttempt } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/validators.js'
import { readJSON } from '../../.orkestrel/agent/instruments/harness/.build/bench5/helpers.js'

const root = 'C:/Users/mikes/WebstormProjects/scaffold'
const cell = join(root, '.orkestrel/agent/instruments/results/l14/q2-think0')
const manifestPath = join(cell, 'full/manifest.json')
const manifest = readJSON(manifestPath)
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)
if (!isRecord(manifest) || !Array.isArray(manifest.attempts) || manifest.attempts.length !== 1) throw new Error('full manifest missing the single retained attempt')
const attempts = manifest.attempts.filter(isMatrixAttempt)
if (attempts.length !== 1) throw new Error('full manifest has an invalid attempt record')
const attempt = attempts[0]
const run = readAttempt(attempt)
if (run === undefined) throw new Error('full attempt lacks parseable retained run evidence')
const costs = measureMatrixCosts(run)
const fullResource = isDeepStrictEqual(run.execution.resource, hashFile(join(cell, 'resource/manifest.json')))
process.stdout.write(JSON.stringify({
	manifest: { path: manifestPath, hash: hashFile(manifestPath).hash, accepted: manifest.accepted },
	attempt: { accepted: attempt.accepted, failures: attempt.failures, budget: attempt.budget, executionPhase: run.execution.phase, arm: run.execution.arm, copy: run.execution.copy, resourceReferenceMatches: fullResource },
	run: { status: run.status, failures: run.failures },
	costs: { metadata: costs.metadata, wire: costs.wire.map(item => ({ phase: item.phase, role: item.role, requests: item.requests, wall: item.wall, prompt: item.prompt, completion: item.completion, missing: item.missing })), stage: costs.stage, flush: costs.flush }
}, null, 2) + '\n')