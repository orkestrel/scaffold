import { readdirSync, statSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { join, relative } from 'node:path'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'
import { buildMatrixBound, measureMatrixCosts, readAttempt, readFrozen, readResource, verifyMatrixFeasibility } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/helpers.js'
import { isMatrixAttempt } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/validators.js'
import { readJSON } from '../../.orkestrel/agent/instruments/harness/.build/bench5/helpers.js'

const root = 'C:/Users/mikes/WebstormProjects/scaffold'
const cell = join(root, '.orkestrel/agent/instruments/results/l14/q2-think0')
const frozenPath = join(cell, 'freeze/manifest.json')
const resourcePath = join(cell, 'resource/manifest.json')
const fullPath = join(cell, 'full/manifest.json')
const frozenReference = hashFile(frozenPath)
const frozen = readFrozen(frozenReference)
const resourceReference = hashFile(resourcePath)
const resource = readResource(resourceReference, frozenReference)
if (!resource.accepted) throw new Error('resource unexpectedly refused')
const resourceAttempts = resource.attempts.map((attempt, index) => {
	const run = readAttempt(attempt)
	verifyMatrixFeasibility(run)
	if (run === undefined) throw new Error('resource attempt lacks its retained run')
	const costs = measureMatrixCosts(run)
	return {
		index,
		budget: attempt.budget,
		accepted: attempt.accepted,
		resource: attempt.resource,
		failures: attempt.failures,
		runFailures: run.failures,
		wire: costs.wire.map(item => ({ phase: item.phase, role: item.role, requests: item.requests, wall: item.wall, prompt: item.prompt, completion: item.completion, missing: item.missing }))
	}
})
const fullValue = readJSON(fullPath)
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)
if (!isRecord(fullValue) || fullValue.protocol !== 'l6' || !isDeepStrictEqual(fullValue.frozen, frozenReference) || !Array.isArray(fullValue.attempts) || fullValue.attempts.length !== 1) throw new Error('invalid full-view manifest identity or attempt count')
const fullAttempts = fullValue.attempts.filter(isMatrixAttempt)
if (fullAttempts.length !== 1) throw new Error('invalid full-view attempt record')
const fullAttempt = fullAttempts[0]
const fullRun = readAttempt(fullAttempt)
verifyMatrixFeasibility(fullRun)
if (fullRun === undefined) throw new Error('full-view attempt lacks its retained run')
if (fullRun.execution.phase !== 'full' || fullRun.execution.arm !== 'records' || fullRun.execution.copy !== 1 || !isDeepStrictEqual(fullRun.execution.frozen, frozenReference) || !isDeepStrictEqual(fullRun.execution.resource, resourceReference)) throw new Error('full-view attempt configuration differs')
if (fullValue.accepted !== fullAttempt.accepted) throw new Error('full-view decision differs from its attempt')
const priorAttempt = resource.attempts.at(-1)
if (priorAttempt === undefined) throw new Error('accepted resource lacks its terminal attempt')
const priorRun = readAttempt(priorAttempt)
if (priorRun === undefined) throw new Error('resource lacks its complete records trace')
const expectedBound = buildMatrixBound(priorRun)
const boundPath = join(cell, 'full/bound.json')
const actualBound = readJSON(boundPath)
if (!isDeepStrictEqual(actualBound, expectedBound) || !isDeepStrictEqual(fullValue.bound, expectedBound)) throw new Error('full-view bound differs from recomputed bound')
const fullCosts = measureMatrixCosts(fullRun)
const walk = (dir: string): string[] => readdirSync(dir).flatMap(name => {
	const path = join(dir, name)
	return statSync(path).isDirectory() ? walk(path) : [path]
})
const artifacts = ['resource', 'full'].flatMap(phase => walk(join(cell, phase)).map(path => {
	const file = hashFile(path)
	return { path: relative(root, path).replaceAll('\\', '/'), bytes: statSync(path).size, sha256: file.hash }
}))
process.stdout.write(JSON.stringify({
	frozen: { path: frozenPath, hash: frozenReference.hash, key: frozen.key, think: frozen.think },
	resource: { path: resourcePath, hash: resourceReference.hash, accepted: resource.accepted, budget: resource.budget, attempts: resourceAttempts },
	full: { path: fullPath, hash: hashFile(fullPath).hash, accepted: fullAttempt.accepted, budget: fullAttempt.budget, bound: expectedBound, run: { status: fullRun.status, failures: fullRun.failures }, wire: fullCosts.wire.map(item => ({ phase: item.phase, role: item.role, requests: item.requests, wall: item.wall, prompt: item.prompt, completion: item.completion, missing: item.missing })) },
	artifacts
}, null, 2) + '\n')