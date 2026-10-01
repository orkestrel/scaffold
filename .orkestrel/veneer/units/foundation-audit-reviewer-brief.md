# Unit foundation-audit-reviewer — subjective lane over the `@orkestrel/veneer` foundation

## Role and lane

`reviewer` on Claude Opus 5.5, reached as `claude -p --model opus` from this file brief. You hold the subjective lane: design fit against the roadmap's tenets, API and vocabulary shape, architecture and placement, the coherence of the package as a whole, and the guide voice. Another lane holds the objective lane in a separate clean context; you are not shown its answer and it is not shown yours. An earlier Claude session wrote the foundation on 2026-09-29; audit it as work you did not write and do not defend.

Perform the assignment yourself and spawn nothing. Use no Agent, Task, or subagent tool.

## Claims

Read `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\foundation-audit-claims.md` first. It carries the subject, what the round decides, what the Orchestrator already established, the review evidence, the 27 numbered claims, the unknowns, the threshold, and where a probe may run. Every claim is yours; none is skipped. Your primary claims, where the lanes differ in strength, are 11 to 17, 20 to 22, 24, 25, and 27; give the rest the same verdict discipline.

## Law

Read only what a claim needs: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`, `C:\Users\mikes\WebstormProjects\scaffold\.agents\orchestration.md`, and under `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\` the files `workspace.md`, `tests.md`, `architecture.md`, `styles.md`, `browser.md`, `documentation.md`, `writing.md`, and `quality.md`. The plan of record is `C:\Users\mikes\WebstormProjects\veneer\ROADMAP.md`. Existing code is evidence, never authority.

## Host

Windows 11; Node 22; npm 12.0.2; the veneer checkout at `C:\Users\mikes\WebstormProjects\veneer` has `node_modules` installed and `dist/` built (exit 0). Read-only: read files, run `git`, `node`, `npx tsc --noEmit -p <config>`, and `npm run test:probe` inside the veneer checkout; run no `format`, `lint --fix`, `build`, install, or publish command; edit no tracked file; write only under `C:\Users\mikes\WebstormProjects\veneer\tmp\probes\` and delete what you wrote before you return. The launcher records `git status --porcelain` before and after your run; any tracked change discards your report. No network is promised.

## Output

Your final message is the report. Exactly this shape, nothing else, no process diary:

1. Numbered verdicts in claim order, 1 to 27, one value each: `CONFIRMED` (attacked and held; name the attack you tried that failed), `BROKEN` (the failing input, state, file, or command output, plus the smallest correct fix and what over-correcting would break), `UNRESOLVED` (what would settle it; a claim whose only evidence is the writer's prose), `NOT-EVIDENCED` (the capture or run that is missing). A claim you cannot decide is `UNRESOLVED`, never `CONFIRMED`. Cite `path:line` for every fact.
2. Findings outside the claims, each substantiated to the `BROKEN` standard, ids `S1`, `S2`, and so on.
3. Attacked and held: attacks no verdict line carries, and the adjacent behaviour that looks like a defect and is correct.
4. One terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`.

Before confirming a claim about a proof, name the mutation that would make the proof fail and state whether the assertions distinguish it. Do not hedge toward an imagined consensus. Assume this chain has one more round.
