# J-BINDER audit round 3 — the objective lane's brief (the fix round on the round-2 findings)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: the resolver's correctness against the contracts, the teardown order's soundness against the platform's reaction ordering, the proofs' binding, and the residual restoration path. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane ran blind before you (the bench serialized this lane behind another unit); do not read its verdict and do not hedge toward an imagined consensus. Opus 5.5 wrote this round; your engine did not, and your lane's round-2 verdict (`units/j-binder-audit-2-objective-verdict.md`) raised claim 2's interleaving.

## Subject

The J-BINDER unit's round 3 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 and 3 uncommitted, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief-3.md` (C1 to C7). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-3.diff` and status `j-binder-3-status.txt`; the reports `j-binder-report-3.md` and `j-binder-report-2.md`; the round-2 verdict `j-binder-audit-2-verdict.md` and your lane's round-2 verdict; the retained instruments `j-binder3-red.log.txt`, `j-binder3-mutate.mjs`, `j-binder3-mutations.json`, `j-binder3-mutations-2.json`, `j-binder3-mutation-results.json`, `j-binder3-mutation-results-2.json`, `j-binder3-probe-results.json`, `j-binder3-probe-results-2.json`; the patches `j-binder3-setuptest.diff`, `j-binder2-app.diff`, `j-binder2-roadmap.diff`, `j-binder-patch-buttonsection.diff`; the worktree's files (`src/browser/*.ts`, `tests/src/browser/*.ts`, `tests/setupBrowser.ts`, `guides/veneer.md`); the design verdicts `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` § Amendments and `units/j-engine-shape-verdict.md` § Question 1; the HTML standard's custom-element reaction ordering where claim 2 needs it.

## What the round decides

Whether the shared mechanisms every implementation unit builds on land on Veneer `main` under the landed contracts.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-binder-gates-3.log.txt`): the status lists exactly the owned files; `npm run check:src:browser`, the scoped oxlint and oxfmt checks, `npm run test:src:browser` (8 files, 124 of 124 on Chromium 153.0.8010.12), `npm run test:policy`, `npm run test:guides`, and `npm run build:src:browser` pass; the prefix grep hits only the guide's CSS vendor-prefix prose; the tree-wide `npm run check` is red on the three off-limits app files until `j-binder2-app.diff` lands at integration; `git apply --check` accepts every report-only patch; the Orchestrator's re-run of a sample of the round-3 mutations is recorded in `j-binder-mutations-3-orchestrator.log.txt` where it exists at your reading, else it follows your verdict.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-3.md`, attempting refutation of each; claims 1, 2, and 5 are the ones your lane decides. For claim 2, trace the teardown order (`Button.destroy`: abort, release, restore; `HostSnapshot.restore`: forget, tokens, empty `class` removal, properties, attributes last; the delegate's hold) against every reaction a custom element can run synchronously inside those writes (`attributeChangedCallback` for `class`, for `style`, and for the restored attributes; a `MutationObserver` cannot, being asynchronous), and name any sequence where a replacement engine's state is overwritten or a click is lost, including the residual path the unit bounds; rule whether that path needs closing now (name the mechanism if one is cheap and correct) or is a documented limit, and whether the contract's remark states it. For claim 1, check the resolver against the design's resolution rules and name any declared key whose attribute an entity could not read through the table. For claim 5, read the instrument and its result files: name a mutation whose recorded reddening the proof could not have produced, or state that none exists, and for at least three rows say which assertion distinguishes the mutation from the passing code. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. You may run `npx.cmd tsc --noEmit -p configs/src/tsconfig.browser.json` from the worktree and `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory for a type-level attack; you run no browser test, no build, and no mutation. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

1. Whether a reaction to the `class` attribute write (the token restoration is the first write) can construct a replacement engine that the later `style` and attribute writes overwrite, on the delegate's path as well as on a direct destroy (claim 2): rule with the exact sequence.
2. Whether `NoInfer<AttributeNames<TKey>>` lets a caller pass an attribute table that lacks a declared key or carries an undeclared one without a compile error (claim 1): rule with a type-level probe.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `architecture.md`, `patterns.md`, `tests.md`, `typescript.md`, `names.md`, `browser.md` in that folder; E6, E9, E10, E11 in `decisions.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding unless the sentence states a fact the code or the platform contradicts.

## Execution

**The Astra engine inside its CLI:** perform the assignment directly and spawn nothing; write no file outside the system temporary directory.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence (`file:line`), findings fitting no claim, "Attacked and held", referrals, bounds, and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
