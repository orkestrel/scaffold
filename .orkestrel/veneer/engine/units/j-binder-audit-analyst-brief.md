# J-BINDER audit — the objective lane's brief (round 1)

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: correctness under adverse orderings, constraints, test sufficiency, and conformance to the source Bootstrap behaviour the verdict carries. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lane runs blind and in parallel; do not hedge toward an imagined consensus. Opus 5.5 wrote this unit; your engine did not.

## Subject

The whole chain: Veneer `main` at `1868007` (J-TYPES's contracts, unpushed and unlanded further while J-TYPES rounds 3 to 5 repair its sanitizer contract in another worktree), the J-BINDER unit's uncommitted change in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (its first round), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-brief.md` to land the shared mechanisms (`Registry`, `Snapshot`, `emitEvent`, `bindEventMap`, `settleAnimations`, `reflow`, `readTarget`, `readTargets`, `generateId`, the option merge) and the generalized `Delegate`, with `Button` migrated onto them. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder.diff` and the actual status `j-binder-status.txt` beside it; the unit's report `j-binder-report.md`; the terrain record `j-binder-evidence.txt`; the worktree's files themselves; Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` (`dom/selector-engine.js` `getSelector` and `parseSelector`, `util/config.js` `_mergeConfigObj` and `_typeCheckConfig`, `dom/manipulator.js` `normalizeData`, `util/index.js` `getUID` and `reflow`, `dom/event-handler.js` `hydrateObj` and `trigger`); the installed `@orkestrel/contract` declarations at `C:/Users/mikes/WebstormProjects/veneer-binder/node_modules/@orkestrel/contract/dist/src/core/index.d.ts` (`Parser`, `parseJSONAs`, `isRecord`, `isInstance`) and `@orkestrel/test` at `node_modules/@orkestrel/test/dist/src/core/index.d.ts` and `dist/src/browser/index.d.ts`.

## What the round decides

Whether the mechanisms every component builds on land on Veneer `main`. A defect in `Registry`, `Snapshot`, `Delegate`'s release, `settleAnimations`, or `resolveOptions` reaches all eleven components, so a finding here is worth more than one in any component.

## Already established — do not re-run

Verified by the Orchestrator directly in the worktree, not taken from the unit's report (`j-binder-gates.log.txt`): `git status --short` lists the fourteen modified and four new files; `npm run check:src:browser` exits 0; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` and `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` exit 0; `npm run test:src:browser` passes 101 of 101 on Chromium 153.0.8010.12; `npm run test:guides` passes 19 of 19; `npm run test:policy` exits 1 with exactly the two `surface` violations E10 rules on (`Snapshot`, `isHost`); `npm run build:src:browser` exits 1 on `Unable to follow symbol for "Sanitizer"`, the base `1868007`'s own `src/browser/types.ts` reference that J-TYPES round 3 repairs in another worktree, which this unit does not touch and which counts against nothing here. The off-limits `tests/app/browser/sections/ButtonSection.test.ts` fails on the registry message until the retained patch lands.

## Claims

Rule on every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims.md`, attempting refutation of each; claims 1 to 7 are the ones your lane decides. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. Before confirming a claim about a proof, name the mutation that would make that proof fail and say whether its assertions distinguish that mutation from the passing case; the report's mutation table is the unit's word, and your lane confirms a row by reading the assertion, not by repeating the row. Your sandbox is read-only and denies the loopback listener the browser project binds, so you run no browser test: where a claim needs a run, rule `UNRESOLVED` and name the exact command and the mutation the Orchestrator runs on the host. You may run `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files.

## Unknowns

Whether `resolveOptions`'s "attribute wins over `data-bs-config` for the same key" is R11's order (R11 lists `data-bs-config` JSON before the declared `data-bs-*` keys, so the attribute overrides the config) and Bootstrap's (`_mergeConfigObj`: `{ ...Default, ...dataConfig, ...dataAttributes, ...config }`, read `util/config.js`): report which. Whether `Snapshot`'s token restore through `classList.toggle(name, present)` can clobber a token a consumer added to the same element after construction when the recorded state was present (claim 2's "keeps every consumer edit"): construct the interleaving and rule. Whether `Delegate`'s `event.preventDefault()` on every routed click departs from Bootstrap's button data API (`button.js`'s click handler) and whether that reaches a `<a>` host: report.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification (the conduct law); `typescript.md`, `tests.md`, `architecture.md`, `patterns.md`, `names.md`, `writing.md` in that folder; E6, E9, E10 in `decisions.md`; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding: a wording, comment, or guide-sentence observation is a bound the Orchestrator records, not a finding.

## Execution

**A bench engine reading this brief inside its own CLI:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts one per claim in the claims file's order, each `CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED` with its evidence (`file:line`, the attack, or the settling command); findings fitting no claim, each substantiated to the `BROKEN` standard; "Attacked and held"; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
