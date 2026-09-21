export const meta = {
  name: 'handoff-check',
  description: 'Verify the Veneer campaign handoff: a verifier resolves every path, SHA, and script it names; an Opus reviewer reads it as a fresh session and reports what it could not execute',
  phases: [{ title: 'Check', detail: 'two clean-context read-only lanes in parallel' }],
}
const UNITS = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/units/'
const COMMON = ' You are a native subagent with a clean context: perform the assignment directly and spawn nothing. Your final text is exactly the output the brief\'s "## Output" section names, and nothing else: no process diary, no preamble.'
phase('Check')
const [check, critic] = await parallel([
  () => agent('Open ' + UNITS + 'handoff-check-brief.md and follow it exactly; it is the whole assignment.' + COMMON, { label: 'verifier:facts', phase: 'Check', agentType: 'verifier', model: 'sonnet', effort: 'medium' }),
  () => agent('Open ' + UNITS + 'handoff-critic-brief.md and follow it exactly; it is the whole assignment.' + COMMON, { label: 'reviewer:fresh-session', phase: 'Check', agentType: 'reviewer', model: 'opus', effort: 'high' }),
])
log('lanes returned: check=' + (check ? 'yes' : 'null') + ' critic=' + (critic ? 'yes' : 'null'))
return { check, critic }
