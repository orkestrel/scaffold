export const meta = {
	name: 'roughnotes-r-a-2',
	description: 'Unit R-A-2 in roughnotes: the opus writer on the successor brief, then the checker and the verifier over its tree',
	phases: [
		{ title: 'Implement', detail: 'opus writes unit R-A-2 from the successor brief' },
		{ title: 'Check', detail: 'checker reads the report against the mechanical criteria' },
		{ title: 'Verify', detail: 'verifier runs the named gates over the uncommitted tree' },
	],
}

const repo = 'C:/Users/mikes/WebstormProjects/roughnotes'
const scaffold = 'C:/Users/mikes/WebstormProjects/scaffold'
const baseline = args.baseline
const gates = args.gates

phase('Implement')
const implemented = await agent(
	`You are the \`opus\` role (Claude Opus 5), the sole writer in the checkout ${repo}, dispatched from the clean committed baseline ${baseline} (\`git log --oneline -1\` names it; \`git status --short\` shows nothing tracked; \`.orkestrel/\` is a prior campaign's retained folder; \`tmp/units/\` holds briefs and reports). Unit R-A landed in that baseline and was audited; the Orchestrator's gate reading over it: ${gates}.

Read and execute the successor brief at ${repo}/tmp/units/r-a-brief-2.md exactly; it binds ${repo}/tmp/units/r-a-brief.md with the changes it names, so read that brief first and in full, then the audit verdict it points at (${scaffold}/.orkestrel/campaign/r-a-audit-verdict.md) and the two lane reports beside it. Before acting, read ${repo}/AGENTS.md, then ${scaffold}/AGENTS.md, ${scaffold}/.claude/rules/browser.md, application.md, tests.md, names.md, writing.md, documentation.md, and ${scaffold}/.agents/orchestration.md section Deviation protocol, in that order after the briefs, then the skill sections the briefs name under ${scaffold}/.agents/skills/orkestrel-prove-journey/. A fleet target carries no rules or skills of its own. Perform the assignment directly and spawn nothing. Write the report the brief names at tmp/units/r-a-2-report.md and return, as your final text, only the sentence "The report is written." followed by the report path, or, on a deviation stop, the sentence "Stopped under the Deviation protocol." followed by the report path.`,
	{ label: 'r-a-2:opus', phase: 'Implement', agentType: 'opus', model: 'opus', effort: 'high' },
)
log(`Implement: ${String(implemented).slice(0, 160)}`)

const [checked, verified] = await parallel([
	() =>
		agent(
			`You are the \`checker\` role (Claude Sonnet), a native subagent with Read, Grep, and Glob and no shell, in the checkout ${repo} after unit R-A-2 returned (uncommitted edits in the tree; baseline ${baseline}). Read and execute the brief at ${repo}/tmp/units/r-a-2-check-brief.md exactly. Report each criterion MET or UNMET with the quoted lines it rests on; rule on nothing subjective; edit nothing; perform the assignment directly and spawn nothing. Return, as your final text and nothing else, one line per criterion and the terminal line CHECK: PASS or CHECK: FAIL <criteria>.`,
			{ label: 'r-a-2:checker', phase: 'Check', agentType: 'checker', model: 'sonnet', effort: 'medium' },
		),
	() =>
		agent(
			`You are the \`verifier\` role (Claude Sonnet), a native subagent with Read, Grep, Glob, and Bash and no edit or write tool, in the checkout ${repo} after unit R-A-2 returned (uncommitted edits in the tree; baseline ${baseline}). Read and execute the brief at ${repo}/tmp/units/r-a-2-verify-brief.md exactly: run each named command as its own invocation from the checkout root, log each to the path the brief names, and report exit codes and totals lines verbatim. Fix nothing; edit nothing; perform the assignment directly and spawn nothing. Return, as your final text and nothing else, the table the brief fixes, the Anomalies list, and the terminal line GATES: GREEN or GATES: RED <commands>.`,
			{ label: 'r-a-2:verifier', phase: 'Verify', agentType: 'verifier', model: 'sonnet', effort: 'medium' },
		),
])

return { implemented, checked, verified }
