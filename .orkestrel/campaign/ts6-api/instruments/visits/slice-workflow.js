export const meta = {
  name: 'u12-phase-a-slice',
  description: 'Fleet phase A slice: a builder visit then an independent cheap-gate verifier per checkout named in args.packages',
  phases: [{ title: 'Visit', detail: 'builder per checkout on its generated brief' }, { title: 'Verify', detail: 'verifier per checkout on its generated brief' }],
}
const PACKAGES = args.packages
function buildPrompt(name) {
  return `You are the \`builder\` role on the Sonnet engine, the sole writer in /home/user/fleet/${name} for the life of this unit. Read and follow the brief at /home/user/fleet/${name}/tmp/units/ts6-u12-visit-brief.md exactly. Before acting, read /home/user/scaffold/AGENTS.md § Non-negotiable rules, /home/user/scaffold/.agents/orchestration.md § Permission floor and § Publishing the fleet (never edit a vendored file inside a target), then the brief and the files it names. Non-negotiables restated: edit only the owned files the brief names; never run a bare \`npm install\` (it restores the registry copy over the installed head start); commit nothing; no \`git checkout\`, \`git restore\`, \`git stash\`, \`git reset\`, \`git clean\`; no publish; no tree-wide \`format\` or lint \`--fix\`; read, print, or copy no secret. If the host refuses an \`npx scaffold\` invocation, run the identical installed binary as \`node node_modules/@orkestrel/scaffold/dist/bin/main.js <command> --offline\` and record the substitution under Deviations. Perform the assignment directly and spawn nothing. Write the report to /home/user/fleet/${name}/tmp/units/ts6-u12-visit-report.md in the shape the brief's Output section states, then return the report's content as your final message, with nothing else.`
}
function verifyPrompt(name) {
  return `You are the \`verifier\` role on the Sonnet engine, a native Claude Code subagent. Read and follow the brief at /home/user/fleet/${name}/tmp/units/ts6-u12-visit-verify-brief.md exactly: run the named commands from /home/user/fleet/${name} in the stated order, fix nothing, edit no file, never run \`npm install\`, \`git checkout\`, \`git restore\`, \`git stash\`, \`git reset\`, \`git clean\`, a tree-wide \`format\`, or lint \`--fix\`, never commit, never publish, perform the assignment directly and spawn nothing. If the host refuses an \`npx scaffold\` invocation, run the identical installed binary as \`node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline\` and say so. Write the gate report to the path the brief names, return it as your final message, and end with the single terminal line the brief prescribes. No process diary.`
}
const results = await pipeline(
  PACKAGES,
  (name) => agent(buildPrompt(name), { label: `visit:${name}`, phase: 'Visit', agentType: 'builder', model: 'sonnet', effort: 'medium' }).then((text) => ({ name, report: text })),
  (built, name) => agent(verifyPrompt(name), { label: `verify:${name}`, phase: 'Verify', agentType: 'verifier', model: 'sonnet', effort: 'low' }).then((text) => ({ name, report: built ? built.report : null, verify: text })),
)
const rows = results.filter(Boolean).map((r) => ({ name: r.name, verdict: (r.verify || '').split('\n').filter((l) => l.startsWith('GATES:')).at(-1) || '(no terminal line)', deviation: /## Deviations\s*\n\s*None/i.test(r.report || '') ? 'none' : (r.report ? 'see report' : 'no report') }))
log(rows.map((r) => `${r.name}: ${r.verdict}; deviations ${r.deviation}`).join(' | '))
return { rows }
