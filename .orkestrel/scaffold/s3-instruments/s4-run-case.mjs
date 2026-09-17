// Runs only the named hazard through the real Vitest entry. A valid result must name
// that assertion, report its expected outcome, and contain no other executed case.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

export function runCase(label, title, status, expected) {
	const result = spawnSync(
		process.execPath,
		[
			'node_modules/vitest/vitest.mjs',
			'run',
			'--config',
			'vite.config.ts',
			'--no-cache',
			'--reporter=json',
			'--project',
			'src:core',
			'-t',
			title,
		],
		{ encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 },
	)
	assert.equal(result.error, undefined, 'Vitest could not start')
	assert.equal(result.signal, null, 'Vitest was terminated')
	assert.equal(result.status, status === 'failed' ? 1 : 0, result.stderr)
	const report = JSON.parse(result.stdout)
	assert.ok(report.testResults.every((suite) => suite.message === ''), 'A suite failed to collect')
	const assertions = report.testResults.flatMap((suite) => suite.assertionResults)
	const executed = assertions.filter((assertion) =>
		['passed', 'failed'].includes(assertion.status),
	)
	assert.equal(executed.length, 1, 'The run did not execute exactly the named case')
	assert.equal(executed[0].title, title, 'The run executed a different case')
	assert.equal(executed[0].status, status, 'The named assertion returned the wrong outcome')
	assert.equal(report.numFailedTests, status === 'failed' ? 1 : 0)
	assert.equal(report.numPassedTests, status === 'passed' ? 1 : 0)
	assert.equal(report.numTotalTests, expected)
	assert.equal(report.numPendingTests, expected - 1)
	assert.equal(report.numTodoTests, 0)
	if (status === 'failed') {
		assert.ok(executed[0].failureMessages.some((message) => message.includes('AssertionError:')))
	} else {
		assert.equal(report.success, true)
	}
	console.log(
		label + ': exit ' + result.status + ' — 1 ' + status + ' | ' +
			report.numPendingTests + ' skipped (' + report.numTotalTests + '); named case: ' + title,
	)
}
