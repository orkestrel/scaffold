export const meta = {
  name: 'cl2-audit',
  description: 'CL2 audit round 1: Opus wrote the unit, so the reviewer on Opus holds the subjective lane and the Astra analyst the objective lane outside this workflow; checker rules the mechanical claims; verifier runs the Veneer gates; implementation only',
  phases: [{ title: 'Audit', detail: 'three clean-context read-only lanes in parallel' }],
}
const UNITS = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/units/'
const COMMON = ' You are a native subagent with a clean context: perform the assignment directly and spawn nothing. Read every file the brief names from the paths it gives. The user has ruled that this audit covers implementation only (correctness, rule compliance, test sufficiency, scope honesty): report no wording, comment, doc-block, or guide-prose finding. Your final text is exactly the output the brief\'s "## Output" section names, and nothing else: no process diary, no preamble.'
phase('Audit')
const [reviewer, checker, verifier] = await parallel([
  () => agent('Open ' + UNITS + 'cl2-audit-reviewer-brief.md and follow it exactly; it is the whole assignment and it fixes your lane (SUBJECTIVE; the objective lane runs on Astra) and the claims file you rule on.' + COMMON, { label: 'reviewer:subjective', phase: 'Audit', agentType: 'reviewer', model: 'opus', effort: 'high' }),
  () => agent('Open ' + UNITS + 'cl2-audit-checker-brief.md and follow it exactly; it is the whole assignment and it fixes the claims you rule on.' + COMMON, { label: 'checker:mechanical', phase: 'Audit', agentType: 'checker', model: 'sonnet', effort: 'medium' }),
  () => agent('Open ' + UNITS + 'cl2-gate-brief.md and follow it exactly; it is the whole assignment. Run every step it lists in order from the Veneer checkout it names and report exit-code truth.' + COMMON, { label: 'verifier:gates', phase: 'Audit', agentType: 'verifier', model: 'sonnet', effort: 'medium' }),
])
log('lanes returned: reviewer=' + (reviewer ? 'yes' : 'null') + ' checker=' + (checker ? 'yes' : 'null') + ' verifier=' + (verifier ? 'yes' : 'null'))
return { reviewer, checker, verifier }
