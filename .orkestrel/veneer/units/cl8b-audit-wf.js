export const meta = {
	name: 'cl8b-audit',
	description:
		'CL8b audit round 1: Astra wrote the unit, so the Opus reviewer holds the OBJECTIVE lane here and the Astra analyst the subjective lane outside this workflow; checker rules the mechanical claim; verifier runs the Veneer gates; implementation only',
	phases: [{ title: 'Audit' }],
}

const UNITS = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/units/'
const COMMON =
	' You are a native subagent with a clean context: perform the assignment directly and spawn nothing. Read every file the brief names from the paths it gives. The user has ruled that this audit covers implementation only: correctness, rule compliance, test sufficiency, scope honesty. Report no wording, comment, doc-block, or guide-prose finding.'

const lanes = [
	() =>
		agent(
			'Open ' +
				UNITS +
				'cl8b-audit-reviewer-brief.md and follow it exactly; it is the whole assignment and it fixes your lane (OBJECTIVE; the subjective lane runs on Astra) and the claims file you rule on.' +
				COMMON,
			{ label: 'reviewer:objective', phase: 'Audit', agentType: 'reviewer', model: 'opus' },
		),
	() =>
		agent(
			'Open ' +
				UNITS +
				'cl8b-audit-checker-brief.md and follow it exactly; it is the whole assignment and it fixes the claims you rule on.' +
				COMMON,
			{ label: 'checker:mechanical', phase: 'Audit', agentType: 'checker', model: 'sonnet' },
		),
	() =>
		agent(
			'Open ' +
				UNITS +
				'cl8b-gate-brief.md and follow it exactly; it is the whole assignment. Run every step it lists in order from the Veneer checkout it names and report exit-code truth.' +
				COMMON,
			{ label: 'verifier:gates', phase: 'Audit', agentType: 'verifier', model: 'sonnet' },
		),
]

const results = await parallel(lanes)
return { reviewer: results[0], checker: results[1], verifier: results[2] }
