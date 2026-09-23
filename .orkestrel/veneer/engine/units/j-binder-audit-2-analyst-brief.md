# J-BINDER audit round 2 — the objective lane's brief (the mechanisms under the landed contracts)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: correctness of the mechanisms against the contracts, the platform readings, and the proofs' binding. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Opus 5.5 wrote this round; your engine did not.

## Subject

The J-BINDER unit's round 2 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, Veneer `main` merged as `cea3359`), uncommitted, briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief-2.md` (B1 to B8 with B7a). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-2.diff` and status `j-binder-2-status.txt`; the report `j-binder-report-2.md`; the round-1 verdict `j-binder-audit-verdict.md`; the retained instruments `j-binder2-red.log.txt`, `j-binder2-mutate.mjs`, `j-binder2-mutations.json`, `j-binder2-mutations-2.json`, `j-binder2-mutation-results.json`, `j-binder2-mutation-results-2.json`; the patches `j-binder2-app.diff` and `j-binder2-roadmap.diff`; the worktree's files (`src/browser/*.ts`, `tests/src/browser/*.ts`, `guides/veneer.md`); the installed `node_modules/@orkestrel/contract/dist/**/*.d.ts` in the worktree (for `isInstance`, `instanceOf`, `Guard`, `AppError`); the design verdicts `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` § Amendments and `units/j-engine-shape-verdict.md` § Question 1; Bootstrap 5.3.8's `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/util/index.js` (`getSelector`) and `dom/data.js` where a claim names Bootstrap's behaviour.

## What the round decides

Whether the shared mechanisms every implementation unit builds on (the registry, the snapshot, the events, the vocabulary resolver and guards, the option merge, the target reader, the delegate) land on Veneer `main` under the landed contracts. A wrong resolver or a delegate that drives the wrong engine reaches every component.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree (`j-binder-gates-2.log.txt`): the status lists exactly the owned files; `npm run check:src:browser`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`, `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`, `npm run test:src:browser` (8 files, 119 of 119 on Chromium 153.0.8010.12), `npm run test:policy` (109 passed, 1 skipped), `npm run test:guides` (19 of 19), and `npm run build:src:browser` pass; the old-name grep returns only `HostSnapshot*` names and one test fixture string. The tree-wide `npm run check` is red on the three off-limits app files until `j-binder2-app.diff` lands, which the Orchestrator applies at integration; do not report that as a finding.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-2.md`, attempting refutation of each; claims 2, 3, 4, 5, and 6 are the ones your lane decides, and on 1 you rule the `instanceOf` reason against the installed declarations. For claim 6, read the instrument and its result files: name a mutation whose recorded reddening the proof could not have produced, or state that none exists, and for at least three rows say which assertion distinguishes the mutation from the passing code. For claim 4, trace `#release(delivered)` against the retitled and boundary cases and name any sequence (a click during a delivery, a host moved between roots, an engine destroyed by a consumer between deliveries) where the delegate drives a destroyed engine or leaks an owned one. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. You may run `npx.cmd tsc --noEmit -p configs/src/tsconfig.browser.json` from the worktree and `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory for a type-level attack; you run no browser test, no build, and no mutation. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

1. `resolveOptions` reads each declared attribute as prefix plus key, so a replaced attribute name (`CollapseOptions.attributes.parent` naming another attribute than `data-bs-parent`) would not be read (the unit's observation). Rule whether the resolver's contract for the first consumer with an attribute map is a prefix or the entity's resolved attribute table (a key-to-name map), with the design verdict's resolution rules as the law, and report which change that needs and where.
2. Whether `isAttributeName`'s implementation agrees with the platform beyond the names the unit listed: name an attribute name the guard accepts and `setAttribute` refuses, or the reverse, or state that none exists in the HTML standard's attribute-name production.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `architecture.md`, `patterns.md`, `tests.md`, `typescript.md`, `names.md`, `browser.md` in that folder; E6, E9, E10, E11 in `decisions.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding unless the sentence states a fact the code or the platform contradicts.

## Execution

**The Astra engine inside its CLI:** perform the assignment directly and spawn nothing; write no file outside the system temporary directory.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence (`file:line`), findings fitting no claim, "Attacked and held", referrals, bounds, and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
