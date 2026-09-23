# J-BINDER audit round 5 — the objective lane's brief (the fix round on the round-4 findings)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: the write sequences' liveness re-checks on every path, the per-invocation ownership against the platform's reaction ordering, whether any interleaving distinguishes the per-call owner from the snapshot, and the proofs' binding. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane runs blind, in parallel; do not read its verdict and do not hedge toward an imagined consensus. Opus 5.5 wrote this round; your engine did not, and your lane's round-4 verdict (`units/j-binder-audit-4-objective-verdict.md`) found the two interleavings this round closes.

## Subject

The J-BINDER unit's round 5 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 to 5 uncommitted, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief-5.md` (E1 to E5). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-5.diff` and status `j-binder-5-status.txt`; the report `j-binder-report-5.md`; the round-4 verdict `j-binder-audit-4-verdict.md` and your lane's round-4 verdict; the retained instruments `j-binder5-red.log.txt`, `j-binder5-mutate.mjs`, `j-binder5-mutations.json`, `j-binder5-mutations-2.json`, `j-binder5-mutation-results.json`, `j-binder5-mutation-results-2.json`, and the round-4 results `j-binder4-mutation-results.json`; the worktree's files (`src/browser/HostSnapshot.ts`, `Button.ts`, `ColorMode.ts`, `Delegate.ts`, `helpers.ts`, `types.ts`, `tests/src/browser/*.ts`, `tests/setupBrowser.ts`, `guides/veneer.md`); the HTML standard's custom-element reaction ordering where a claim needs it.

## What the round decides

Whether the shared mechanisms every implementation unit builds on land on Veneer `main` under the landed contracts.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-binder-gates-5.log.txt`): the status lists exactly the owned files; `npm run check:src:browser`, the scoped oxlint and oxfmt checks, `npm run test:src:browser` (8 files, 134 of 134 on Chromium 153.0.8010.12), `npm run test:policy`, `npm run test:guides`, and `npm run build:src:browser` pass; the brief-5 ownership grep returns no hit; the older names' grep hits only the guide's conformance rows quoting Bootstrap's `.bs.` event names; the tree-wide `npm run check` is red on the three off-limits app files alone until `j-binder2-app.diff` lands at integration; the red log records five failed tests on the round-4 source; the Orchestrator's re-run of a sample of the round-5 mutations follows your verdict (`j-binder-mutations-5-orchestrator.log.txt`).

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-5.md`, attempting refutation of each; claims 1, 2, 4, and 5 are the ones your lane decides. For claim 1, trace every reaction-capable write in `src/browser` (a `class` reaction at `classList.toggle`, an attribute reaction at each `setAttribute` and `removeAttribute`, the restore's own writes) and name any sequence where a destroyed engine writes, dispatches, or stores after its destruction, or where a live engine's write is skipped. For claim 2, trace the round-4 claim-5 interleaving and every re-entry you can construct (a nested `restore()` on the same snapshot whose records include a key the outer has pending; a nested restore of a different snapshot; a reaction inside `#writeBack`'s write that saves the same key through a third snapshot; a write that throws inside the nested restore) and rule whether any of them distinguishes the per-call `invocation` object from `this` as the entry's owner, given that `finally` walks the invocation's captured records rather than the element's map; if none does, say so and name what the captured lists carry that the token then duplicates. For claim 4, for each of the seven new proofs name the mutation that would make it fail and whether its assertions tell that mutation apart from the passing case; read the instrument and its result files and name a mutation whose recorded reddening the proof could not have produced, or state that none exists. For claim 5, check the moved tallies against the two result files. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. You may run `npx.cmd tsc --noEmit -p configs/src/tsconfig.browser.json` from the worktree and `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory; you run no browser test, no build, and no mutation. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

1. Whether any reachable interleaving distinguishes the per-call `invocation` object from the snapshot as the pending entry's owner (claim 2): the unit's mutation reddened nothing; rule from the traces, not from the tally.
2. Whether `ColorMode`'s constructor, which applies a stored mode through `apply` before any consumer holds the controller, has a reaction-capable write whose destruction path the re-check does not cover (claim 1): trace `#original` across construction, `apply`, and `destroy`.
3. Whether a `finally` that walks the captured records can leave an entry published when a record's element map was replaced by a third snapshot's publish between the outer's publish and its withdrawal (claim 2): trace `#publish` and `#withdraw` on the `WeakMap`.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (§ Design laws: derive state, no superfluous wrappers); `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `architecture.md`, `patterns.md`, `tests.md`, `typescript.md`, `names.md`, `browser.md` in that folder; E6, E9, E10, E11 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding unless the sentence states a fact the code or the platform contradicts.

## Execution

**The Astra engine inside its CLI:** perform the assignment directly and spawn nothing; write no file outside the system temporary directory.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence (`file:line`), findings fitting no claim, "Attacked and held", referrals, bounds, and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
