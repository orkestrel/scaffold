import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'
import { measureMatrixCosts, readAttempt, readFrozen, readResource, verifyMatrixFeasibility } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/helpers.js'

const root = 'C:/Users/mikes/WebstormProjects/scaffold'
const cell = join(root, '.orkestrel/agent/instruments/results/l14/g2-think0')
const frozenPath = join(cell, 'freeze/manifest.json')
const resourcePath = join(cell, 'resource/manifest.json')
const frozenReference = hashFile(frozenPath)
const frozen = readFrozen(frozenReference)
const resourceReference = hashFile(resourcePath)
const resource = readResource(resourceReference, frozenReference)
const attempts = resource.attempts.map((attempt, index) => {
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
const walk = (dir: string): string[] => readdirSync(dir).flatMap(name => {
	const path = join(dir, name)
	return statSync(path).isDirectory() ? walk(path) : [path]
})
const artifacts = walk(join(cell, 'resource')).map(path => {
	const file = hashFile(path)
	return { path: relative(root, path).replaceAll('\\', '/'), bytes: statSync(path).size, sha256: file.hash }
})
process.stdout.write(JSON.stringify({
	frozen: { path: frozenPath, hash: frozenReference.hash, key: frozen.key, think: frozen.think },
	resource: { path: resourcePath, hash: resourceReference.hash, accepted: resource.accepted, budget: resource.budget, attempts },
	artifacts
}, null, 2) + '\n')