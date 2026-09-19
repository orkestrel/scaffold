export const meta = {
	name: 'roughnotes-r-b',
	description: 'Unit R-B in roughnotes: the opus writer adopts the published journey layer, then the checker and the verifier over its tree',
	phases: [
		{ title: 'Implement', detail: 'opus writes unit R-B from its brief' },
		{ title: 'Check', detail: 'checker reads the report against the mechanical criteria' },
		{ title: 'Verify', detail: 'verifier runs the named gates and the capture run over the uncommitted tree' },
	],
}

const repo = 'C:/Users/mikes/WebstormProjects/roughnotes'
const scaffold = 'C:/Users/mikes/WebstormProjects/scaffold'
const baseline = args.baseline
const gates = args.gates

phase('Implement')
const implemented = await agent(
	`You are the \`opus\` role (Claude Opus 5), the sole writer in the checkout ${repo}, dispatched from the clean committed baseline ${baseline} (\`git log --oneline -1\` names it; \`git status --short\` shows nothing tracked; \`.orkestrel/\` is a prior campaign's retained folder; \`tmp/units/\` holds briefs and reports; \`tmp/capture/\` receives frames). Unit R-A landed in that baseline (its report: ${repo}/tmp/units/r-a-report.md). The Orchestrator's gate reading over the baseline: ${gates}.

Read and execute the brief at ${repo}/tmp/units/r-b-brief.md exactly. Before acting, read ${repo}/AGENTS.md, then the sibling scaffold checkout's ${scaffold}/AGENTS.md, ${scaffold}/.claude/rules/tests.md, browser.md, application.md, names.md, typescript.md, architecture.md, writing.md, quality.md section Instruments, and ${scaffold}/.agents/orchestration.md section Deviation protocol, in that order after the brief, then the whole skill at ${scaffold}/.agents/skills/orkestrel-prove-journey/ (SKILL.md and every reference). A fleet target carries no rules or skills of its own. Perform the assignment directly and spawn nothing. Write the report the brief names at tmp/units/r-b-report.md and return, as your final text, only the sentence "The report is written." followed by the report path, or, on a deviation stop, the sentence "Stopped under the Deviation protocol." followed by the report path.`,
	{ label: 'r-b:opus', phase: 'Implement', agentType: 'opus', model: 'opus', effort: 'high' },
)
log(`Implement: ${String(implemented).slice(0, 160)}`)

const [checked, verified] = await parallel([
	() =>
		agent(
			`You are the \`checker\` role (Claude Sonnet), a native subagent with Read, Grep, and Glob and no shell, in the checkout ${repo} after unit R-B returned (uncommitted edits in the tree; baseline ${baseline}). Read and execute the brief at ${repo}/tmp/units/r-b-check-brief.md exactly. Report each criterion MET or UNMET with the quoted lines it rests on; rule on nothing subjective; edit nothing; perform the assignment directly and spawn nothing. Return, as your final text and nothing else, one line per criterion and the terminal line CHECK: PASS or CHECK: FAIL <criteria>.`,
			{ label: 'r-b:checker', phase: 'Check', agentType: 'checker', model: 'sonnet', effort: 'medium' },
		),
	() =>
		agent(
			`You are the \`verifier\` role (Claude Sonnet), a native subagent with Read, Grep, Glob, and Bash and no edit or write tool, in the checkout ${repo} after unit R-B returned (uncommitted edits in the tree; baseline ${baseline}). Read and execute the brief at ${repo}/tmp/units/r-b-verify-brief.md exactly: run each named command as its own invocation from the checkout root, log each to the path the brief names, and report exit codes and totals lines verbatim, plus the capture count and listing. Fix nothing; edit nothing; perform the assignment directly and spawn nothing. Return, as your final text and nothing else, the table the brief fixes, the capture listing, the Anomalies list, and the terminal line GATES: GREEN or GATES: RED <commands>.`,
			{ label: 'r-b:verifier', phase: 'Verify', agentType: 'verifier', model: 'sonnet', effort: 'medium' },
		),
])

return { implemented, checked, verified }
