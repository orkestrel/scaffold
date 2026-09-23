# J-TYPES audit round 4 — the objective lane's brief (the per-element entry)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: correctness against the platform's semantics and the installed toolchain, and contract sufficiency. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Opus 5.5 wrote this round; your engine did not, and your round-3 claim 2 is the finding this round closes.

## Subject

The J-TYPES unit's round 4 in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (base `1868007`), uncommitted on top of round 3's tree, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief-4.md` (edit E12) to give the sanitizer dictionary mirror a per-element entry, state `dataAttributes`'s defaults and validity, and put the rollup rationale in one home under one name. Review evidence: the actual diff against the base `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-4.diff` (rounds 3 and 4; `j-types-3.diff` is round 3 alone) and the actual status `j-types-4-status.txt`; the unit's report `j-types-report-4.md`; round 3's verdicts `j-types-audit-3-verdict.md` and `j-types-audit-3-objective-verdict.md` (yours); the Orchestrator's probes `j-types-3-probe-sanitizer-2.log.txt` and `j-types-3-probe-sanitizer-3.log.txt` with the tests beside them; the installed libraries at `C:/Users/mikes/WebstormProjects/veneer-types/node_modules/typescript/lib/lib.dom.d.ts` (6.0.3) and `C:/Users/mikes/WebstormProjects/veneer-types/node_modules/@microsoft/api-extractor/node_modules/typescript/lib/lib.dom.d.ts` (5.9.3).

## What the round decides

Whether J-TYPES lands on Veneer `main` with a sanitizer contract that can express Bootstrap's per-tag allowlist and a build gate that completes.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-types-gates-4.log.txt`): `git status --short` lists exactly the two files; `npm run build:src:browser` exits 0; `npm run check:src:browser`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts`, `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md`, `npm run test:guides` (19 of 19), and `npm run test:policy` pass; the Orchestrator's run of the unit's probe (`j-types-probe-4.ts`, `j-types-probe-4.log.txt`) reports exactly its two refusals. The Orchestrator's `git diff -w -U0 -- guides/veneer.md` shows the widened separator, the new row, and the `SetHTMLOptions` summary as the guide's only content change beyond round 3.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-4.md`, attempting refutation of each; claims 1, 2, and 3 are the ones your lane decides. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. Re-run your round-3 claim 2 attack (the per-element value with `TS2322`) against the fixed tree and name the result under claim 1. You may run `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory; you run no build and no browser test; the probe readings are the Orchestrator's. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

Whether R10's helper can build Bootstrap's `DefaultAllowlist` (per-tag lists plus the `*` list with `aria-*` expanded from the input) from exactly `elements` entries and `attributes` with no field the mirror omits (claim 1 and 2): walk `util/sanitizer.js` `DefaultAllowlist` in `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/util/sanitizer.js` and report any tag or attribute rule the two fields cannot carry.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `typescript.md`, `names.md`, `documentation.md`, `writing.md` in that folder; E6 and E7 in `decisions.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding unless the sentence states a fact the installed library or the probes contradict.

## Execution

**A bench engine reading this brief inside its own CLI:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts one per claim in the claims file's order, each `CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED` with its evidence; findings fitting no claim, each substantiated to the `BROKEN` standard; "Attacked and held"; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
