import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { hashFile, readRefitAssessment, selectMajorityCutoff, collectRefitIdentities, measureRecall } from '../../.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js'

for (const key of process.argv.slice(2)) {
	assert(['q2', 'g2', 'g4', 'q4'].includes(key))
	const directory = `.orkestrel/agent/instruments/results/l14/calibration/${key}/fit`
	const reference = hashFile(`${directory}/diagnosis.json`)
	const assessment = readRefitAssessment(reference)
	const cutoff = selectMajorityCutoff(assessment)
	const identities = collectRefitIdentities(assessment.readings)
	const negatives = assessment.readings.filter((reading) => reading.verdict !== 'supported')
	const negativeIdentities = identities.readings.filter((reading) => reading.verdict !== 'supported')
	console.log(JSON.stringify({ key, reference, accepted: assessment.accepted, strict: assessment.cutoff, reasons: assessment.reasons, errors: assessment.errors, occurrences: assessment.occurrences, distinct: assessment.distinct, change: assessment.change, limitation: assessment.limitation, exploration: cutoff === undefined ? undefined : { cutoff, occurrences: measureRecall(assessment.readings, cutoff), distinct: measureRecall(identities.readings, cutoff), negatives: negatives.length, admitted: negatives.filter((reading) => reading.lexical && reading.score !== undefined && reading.score >= cutoff).length, negativeIdentities: negativeIdentities.length, admittedIdentities: negativeIdentities.filter((reading) => reading.lexical && reading.score !== undefined && reading.score >= cutoff).length }, custody: assessment.custody, preparation: assessment.preparation }))
	for (const extension of ['jsonl', 'err']) console.log(readFileSync(`.orkestrel/agent/instruments/results/l14/logs/${key}-calibration-fit.${extension}`, 'utf8'))
}
