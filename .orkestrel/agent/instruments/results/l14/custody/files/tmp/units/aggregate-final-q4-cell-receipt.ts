import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { readJSON } from '../../.orkestrel/agent/instruments/harness/.build/bench5/helpers.js'
import { hashFile } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'
import { isMatrixResource } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/validators.js'
import { listCapacityFailures, measureMatrixCosts, readAttempt, readFrozen, readResource } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/helpers.js'

class Receipt {
	#root = resolve(import.meta.dirname, '..', '..')

	execute(): void {
		const results = join(this.#root, '.orkestrel', 'agent', 'instruments', 'results', 'l14')
		const freezePath = join(results, 'q4-think0', 'freeze', 'manifest.json')
		const frozenRef = hashFile(freezePath)
		const frozen = readFrozen(frozenRef)
		const resourceRef = hashFile(join(results, 'q4-think0', 'resource', 'manifest.json'))
		const resource = readResource(resourceRef, frozenRef)
		const resourceAttempt = resource.attempts.at(-1)
		if (resourceAttempt === undefined) throw new Error('resource has no terminal attempt')
		const resourceRun = readAttempt(resourceAttempt)
		if (resourceRun === undefined) throw new Error('resource has no decoded run')
		const fullPath = join(results, 'q4-think0', 'full', 'manifest.json')
		const fullValue = readJSON(fullPath)
		if (!isMatrixResource(fullValue)) throw new Error('full manifest is not a matrix resource')
		const fullAttempt = fullValue.attempts[0]
		if (fullAttempt === undefined) throw new Error('full manifest has no attempt')
		const fullRun = readAttempt(fullAttempt)
		if (fullRun === undefined) throw new Error('full attempt has no decoded run')
		const receipt = {
			frozen: frozenRef,
			resource: { reference: resourceRef, accepted: resource.accepted, costs: measureMatrixCosts(resourceRun) },
			full: {
				reference: hashFile(fullPath),
				accepted: fullValue.accepted,
				attempt: fullAttempt,
				costs: measureMatrixCosts(fullRun),
				capacityFailures: listCapacityFailures(fullRun.requests, fullRun.frozen, fullRun.execution.budget),
				status: fullRun.status,
				error: fullRun.error,
				requests: fullRun.requests.length,
				sent: fullRun.requests.filter((request) => request.sent).length,
				turns: fullRun.rows.length
			}
		}
		writeFileSync(join(this.#root, 'tmp', 'units', 'aggregate-final-q4-cell-receipts.json'), `${JSON.stringify(receipt, null, 2)}\n`, { flag: 'wx' })
		process.stdout.write(`${JSON.stringify({ resourceAccepted: resource.accepted, fullAccepted: fullValue.accepted, fullCapacityFailures: receipt.full.capacityFailures, resourceCost: receipt.resource.costs.wire, fullCost: receipt.full.costs.wire })}\n`)
	}
}

new Receipt().execute()