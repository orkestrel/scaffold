# J-BINDER audit round 4 — the objective lane's brief (the fix round on the round-3 findings)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: the handoff's correctness against the platform's reaction ordering on every path, the proofs' binding, and any interleaving that still breaks. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane ran blind before you (the bench serialized this lane behind the contract fix unit); do not read its verdict and do not hedge toward an imagined consensus. Opus 5.5 wrote this round; your engine did not, and your lane's round-3 verdict (`units/j-binder-audit-3-objective-verdict.md`) traced the paths this round closes.

## Subject

The J-BINDER unit's round 4 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 to 4 uncommitted, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief-4.md` (D1 to D6). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-4.diff` and status `j-binder-4-status.txt`; the report `j-binder-report-4.md`; the round-3 verdict `j-binder-audit-3-verdict.md` and your lane's round-3 verdict; the retained instruments `j-binder4-red.log.txt`, `j-binder4-mutate.mjs`, `j-binder4-mutations.json`, `j-binder4-mutation-results.json`; the patches the claims file lists; the worktree's files (`src/browser/HostSnapshot.ts`, `Button.ts`, `Delegate.ts`, `helpers.ts`, `types.ts`, `tests/src/browser/*.ts`, `tests/setupBrowser.ts`, `guides/veneer.md`); the HTML standard's custom-element reaction ordering and the DOM standard's mutation-observer delivery where a claim needs them.

## What the round decides

Whether the shared mechanisms every implementation unit builds on land on Veneer `main` under the landed contracts.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-binder-gates-4.log.txt`): the status lists exactly the owned files; `npm run check:src:browser`, the scoped oxlint and oxfmt checks, `npm run test:src:browser` (8 files, 127 of 127 on Chromium 153.0.8010.12), `npm run test:policy`, `npm run test:guides`, and `npm run build:src:browser` pass; the brief-4 names are absent; the tree-wide `npm run check` is red on the three off-limits app files until `j-binder2-app.diff` lands at integration; `git apply --check` accepts every report-only patch; the Orchestrator's re-run of a sample of the round-4 mutations is recorded in `j-binder-mutations-4-orchestrator.log.txt` where it exists at your reading, else it follows your verdict.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-4.md`, attempting refutation of each; claims 1, 2, and 5 are the ones your lane decides. For claim 1, trace every path your round-3 verdict named and every path the handoff opens (a reaction inside `save` while another restoration publishes; a reaction constructing a replacement that itself is destroyed before the first restoration ends; a `restore` re-entered from a reaction; two snapshots of different engines on one element; the `classed` bit's handoff when the replacement's first token save happens after the old restoration removed the `class` attribute) and name any sequence where a replacement's recorded state is wrong, a write lands on a taken target, an entry leaks in the registry, or a click is lost. For claim 2, read the instrument and its result file: name a mutation whose recorded reddening the proof could not have produced, or state that none exists, and for at least three handoff rows say which assertion distinguishes the mutation from the passing code. For claim 5, rule whether the first-publisher rule is the right resolution of an overlap and whether the contract must state it now. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. You may run `npx.cmd tsc --noEmit -p configs/src/tsconfig.browser.json` from the worktree and `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory; you run no browser test, no build, and no mutation. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

1. Whether `#take` deleting a pending entry can leave the restoring snapshot's `finally` withdrawing nothing for that key while a third snapshot published the same key in between, and whether that third snapshot's entry is then withdrawn by the wrong owner (claim 1): trace `#unpublish`'s owner check.
2. Whether a token's `classed` handoff is correct when the old restoration has already removed the emptied `class` attribute before the replacement's first token save (claim 1): trace the order in `restore` against `save`.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `architecture.md`, `patterns.md`, `tests.md`, `typescript.md`, `names.md`, `browser.md` in that folder; E6, E9, E10, E11 in `decisions.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding unless the sentence states a fact the code or the platform contradicts.

## Execution

**The Astra engine inside its CLI:** perform the assignment directly and spawn nothing; write no file outside the system temporary directory.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence (`file:line`), findings fitting no claim, "Attacked and held", referrals, bounds, and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
