# Unit foundation-audit-analyst — objective lane over the `@orkestrel/veneer` foundation

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`), reached as `codex exec` from this file brief. You hold the objective lane: correctness, constraints, the toolchain, the package as installed, and the sufficiency of the proofs. Another lane holds the subjective lane in a separate clean context; you are not shown its answer and it is not shown yours. No engine that wrote the foundation audits it here; the foundation was written by an earlier Claude session on 2026-09-29, and you did not write any of it.

Perform the assignment yourself and spawn nothing.

## Claims

Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-audit-claims.md` first. It carries the subject, what the round decides, what the Orchestrator already established, the review evidence, the 27 numbered claims, the unknowns, the threshold, and where a probe may run. Every claim is yours; none is skipped. Your primary claims, where the lanes differ in strength, are 1 to 13, 16 to 19, 23, and 26; give the rest the same verdict discipline.

## Law

Read only what a claim needs: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/workspace.md`, `.claude/rules/tests.md`, `.claude/rules/architecture.md`, `.claude/rules/styles.md`, `.claude/rules/documentation.md`, and `.claude/rules/quality.md` under that checkout. Existing code is evidence, never authority.

## Host

Windows 11; Node 22; npm 12.0.2; the veneer checkout at `C:/Users/mikes/WebstormProjects/veneer` has `node_modules` installed and `dist/` built by the Orchestrator's `npm run build` (exit 0). Your sandbox is `danger-full-access`; the launcher records `git status --porcelain` before and after your run, and any tracked change is a deviation that discards your report. Read-only: run `git`, `node`, `npx tsc --noEmit -p <config>`, and `npm run test:probe` inside the veneer checkout; run no `format`, `lint --fix`, `build`, install, or publish command; edit no tracked file; write only under `C:/Users/mikes/WebstormProjects/veneer/tmp/probes/` and delete what you wrote before you return. A nested `git` inside the sandbox has reported `not a git repository` while `git status` worked; do not diagnose the checkout. No network is promised: for claim 2, reason from the bundler rule you can cite and say whether you ran a probe.

## Output

Your final message is the report. Exactly this shape, nothing else, no process diary:

1. Numbered verdicts in claim order, 1 to 27, one value each: `CONFIRMED` (attacked and held; name the attack you tried that failed), `BROKEN` (the failing input, state, file, or command output, plus the smallest correct fix and what over-correcting would break), `UNRESOLVED` (what would settle it; a claim whose only evidence is the writer's prose), `NOT-EVIDENCED` (the capture or run that is missing). A claim you cannot decide is `UNRESOLVED`, never `CONFIRMED`. Cite `path:line` for every fact.
2. Findings outside the claims, each substantiated to the `BROKEN` standard, ids `O1`, `O2`, and so on.
3. Attacked and held: attacks no verdict line carries, and the adjacent behaviour that looks like a defect and is correct.
4. One terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`.

Before confirming a claim about a proof, name the mutation that would make the proof fail and state whether the assertions distinguish it. Do not hedge toward an imagined consensus. Assume this chain has one more round.
