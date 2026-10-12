import { readJSON } from '../../.orkestrel/agent/instruments/harness/.build/bench5/helpers.js'
import { isParserRequest, isStoppedRequest, measureMatrixCosts, permitsContinuation, readAttempt, readRequestOutcome, verifyMatrixFeasibility } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/helpers.js'
import { isMatrixResource } from '../../.orkestrel/agent/instruments/harness/.build/bench5/matrix/validators.js'

const manifest = readJSON('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/agent/instruments/results/l14/q2-think0/full/manifest.json')
if (!isMatrixResource(manifest)) throw new Error('invalid retained full manifest')
const attempt = manifest.attempts[0]
if (attempt === undefined) throw new Error('missing full attempt')
const run = readAttempt(attempt)
if (run === undefined) throw new Error('missing retained full run')
const parser = run.requests.find((request) => request.sequence === 20)
const follower = run.requests.find((request) => request.sequence === 21)
const control = run.requests.find((request) => request.sequence === 19)
if (parser === undefined || follower === undefined || control === undefined || parser.goal === undefined)
	throw new Error('missing deciding requests')
let refusal: string | undefined
try {
	verifyMatrixFeasibility(run)
} catch (error) {
	if (!(error instanceof Error)) throw error
	refusal = error.message
}
process.stdout.write(JSON.stringify({
	phase: run.execution.phase,
	status: run.status,
	accepted: manifest.accepted,
	parser: { sequence: parser.sequence, sent: parser.sent, status: parser.status, response: parser.response, error: parser.error, failures: parser.failures, matched: isParserRequest(parser), outcome: readRequestOutcome(parser, run.execution.budget, run.frozen), prompt: parser.prompt, completion: parser.completion },
	follower: { sequence: follower.sequence, sent: follower.sent, error: follower.error, matched: isStoppedRequest(follower, run.requests), outcome: readRequestOutcome(follower, run.execution.budget, run.frozen) },
	control: { sequence: control.sequence, parser: isParserRequest(control), outcome: readRequestOutcome(control, run.execution.budget, run.frozen) },
	continuation: permitsContinuation(run.requests, run.frozen, run.execution, parser.goal),
	refusal,
	wire: measureMatrixCosts(run).wire,
}, null, 2) + '\n')
