# Unit J-BINDER — successor brief 2: the mechanisms under the amended contracts

This brief supersedes `j-binder-brief.md` for the unit's second round. What changed and why: audit round 1 (`j-binder-audit-verdict.md`, terminal line `FAIL 3, 10; outside the claims: F1, F2`) confirmed every mechanism and carried one overstated guarantee, missing mutation rows, the parameter seam, and the consumer-less helpers; the user ruled E9 to E11 and the J-ENGINE-SHAPE amendment (`j-engine-design-verdict.md` § Amendments, `units/j-engine-shape-verdict.md`) reshaped the contracts, which J-TYPES round 5 landed on `main` as BASE_COMMIT_B2 (`HostSnapshot*`, `EventWire<TMap, TEntity>` with `.vn.` names, `prevent`, `DropdownDetail.click`, the per-entity `classes`, `attributes`, and `selectors` groups with their maps, `DelegateOptions`'s per-entity groups, `ButtonOptions.signal`, no `data-bs-config`); and E10 renames `Snapshot` and deletes `isHost`. Round 1's tree stays uncommitted in the worktree; this round edits on top of it after the Orchestrator has cherry-picked the round-5 landing into the worktree's branch.

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`. The executor that opens this brief is that subagent, the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` (branch `unit/binder`), whose tree carries round 1's uncommitted edits over the base BASE_COMMIT_B2 of Veneer `main`.

## Objective

Bring the shared mechanisms and Button to the amended contracts, close every round-1 finding, and leave the tree with no export that lacks a consumer beyond the ones J-COLLAPSE lands with (`settleAnimations`, `reflow`, `readTarget`, `readTargets`, `resolveOptions`, the attribute constants), so that J-BINDER and J-COLLAPSE push together.

## Context

**Evidence.** Round 1's report `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-report.md`, its reconciled verdict `j-binder-audit-verdict.md`, and the lane verdicts `j-binder-audit-objective-verdict.md` and `j-binder-audit-subjective-verdict.md` (F1, F2, the referrals, the bounds); the Orchestrator's settling runs `j-binder-seed-red.log.txt` and `j-binder-mutations-orchestrator.log.txt`; the landed contracts in the worktree's `src/browser/types.ts` after the cherry-pick (read `EventWire`, `ButtonClassMap`, `ButtonSelectorMap`, `ButtonOptions`, `ColorModeAttributeMap`, `ColorModeOptions`, `DelegateOptions`, `HostSnapshotInterface`, `HostSnapshotTarget`, `RegistryInterface`, `EventHooks`); J-TYPES's report `j-types-report-5.md` (its vocabulary mapping table gives every default value and its Bootstrap constant); the amended verdict's R2, R3, R5, R11, R13, R17, R19; E6, E9, E10, E11 in `decisions.md`; the retained patch `j-binder-patch-buttonsection.diff` (the Orchestrator integrates it at landing; it stays off-limits to you).

**Law.** As in `j-binder-brief.md` § Context, plus `names.md` § Fleet name ownership (a new export name is checked against `node_modules/@orkestrel/scaffold/dist/host/guides/*.md` before it is declared) and `architecture.md` § Class order (static members after the constructor and before the instance members, as the rule orders them; read it).

**Installed primitives.** As in `j-binder-brief.md`: `@orkestrel/contract` (`isInstance`, `isRecord`, `parseJSONAs`, `Parser`, `Guard`, the `parse*` readers) and `@orkestrel/test` (`createRecorder`, `waitForCondition`, `waitForEvent`, `build`, `mount`, `waitForAnimations`); a helper whose job an installed export does is a defect.

**Host.** As in `j-binder-brief.md`: Windows 11, Git Bash, the worktree root, npm `12.0.2`, Chromium 153.0.8010.12, no network.

**Standing conditions.** The `collapse`, `dropdown`, `nav`, `alert`, and `carousel` cascade keys have landed on Veneer `main`; this unit reads none of them. The worktree is dirty with round 1's files and stays uncommitted; commit nothing. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and off-limits; `test:policy`'s `surface` rule must pass this round (E10 removes both collisions).

## The edits

- **B1 (E10).** Rename `src/browser/Snapshot.ts` to `src/browser/HostSnapshot.ts` with the class `HostSnapshot implements HostSnapshotInterface`, its test file to `tests/src/browser/HostSnapshot.test.ts`, every import and sentence with it; the guide's row moves with the name. Delete `isHost` from `validators.ts` and its guide row, and call `isInstance(value, HTMLElement)` from `@orkestrel/contract` at each of its call sites (`Button`, `Delegate`, `readTargets`); delete its proof case.
- **B2 (R19, F1).** Add the frozen default tables to `constants.ts`: `BUTTON_CLASSES: ButtonClassMap`, `BUTTON_SELECTORS: ButtonSelectorMap`, `COLOR_MODE_ATTRIBUTES: ColorModeAttributeMap`, each value from the mapping table (`pressed: 'active'`, `trigger: '[data-bs-toggle="button"]'`, `theme: 'data-bs-theme'`), and delete `BUTTON_ACTIVE`, `BUTTON_SELECTOR`, `BUTTON_PRESSED`, and `COLOR_MODE_ATTRIBUTE` outright (`aria-pressed` is a platform name and stays a literal in `Button.ts`, or a `BUTTON_PRESSED` constant only if the rule for platform names in constants applies; rule it and record it). Add `resolveClasses`, `resolveAttributes`, and `resolveSelectors` to `helpers.ts` only if one shared leaf serves every entity (`{ ...defaults, ...overrides }` after validating each override); otherwise the class resolves inline. Add `isClassToken`, `isAttributeName`, and `isSelector` to `validators.ts` as total guards (a class token is one non-empty string with no ASCII whitespace; an attribute name parses as one by `document.createAttribute` or the name production; a selector parses by `CSS.supports('selector(…)')` or a try over `matches`), each with its proof, and throw `BUTTON_OPTION_INVALID` or `COLOR_MODE_OPTION_INVALID` for a refused value. `Button` resolves its `classes` and `selectors` at construction, snapshots them, and reads every token and selector from the resolved tables; `ColorMode` resolves `attributes`. `readTargets(trigger, attributes)` and `readTarget(trigger, attributes)` take the resolved attribute names (`target` and the platform `href`) as a parameter; `resolveOptions(element, code, defaults, parsers, options, prefix)` takes the option-attribute prefix as a parameter, its default `OPTION_PREFIX` (`data-bs-`), and reads no `data-bs-config` (delete `CONFIG_ATTRIBUTE`, the config branch, and its proofs).
- **B3 (R5, F-referrals).** `Delegate` takes `DelegateOptions`'s per-entity groups (`button` this round; the others land with their components), resolves each entity's tables once at construction, routes by the resolved `selectors.trigger`, and constructs each engine with that entity's groups. Key the per-click mark on the click, the host, and the route (the engine class), so a host under two routes is driven once per route; prove it with a second route stub only if a second route exists this round, else record the key's shape in the report. At each activation and each delivery, drop every owned engine its class's registry no longer holds (`Button.find(engine.host) !== engine`), so a consumer's direct `destroy()` of a delegate-acquired engine does not leave a dead entry; prove it.
- **B4 (R2, E11).** `emitEvent` no longer mirrors detail fields as own properties (delete the loop and its proof; the detail travels in `detail` alone). `BUTTON_EVENTS` is typed `EventWire<ButtonEventMap, 'button'>`. `Button.toggle` stays non-cancelable, as R2 now makes every completed event.
- **B5 (claim 3).** Restate the reinsertion guarantee: the guide's Delegation sentence and the case title say "removed and reinserted in the same synchronous run, before the observer delivers"; add the boundary case (remove, `await Promise.resolve()`, reinsert; assert the engine is released and the host restored).
- **B6 (claim 10).** Name and run one mutation per case the round-1 table left out (`Snapshot.test.ts` "restores an empty attribute distinctly from an absent one" and "keeps every token the snapshot never recorded", `Registry.test.ts` "records the claiming engine and finds it by host" and "keeps one record per registry", `helpers.test.ts` "dispatches a bubbling non-cancelable event", "binds nothing for absent hooks or an aborted signal", "resolves in a microtask when the element has no running animation", `Button.test.ts` the frozen-table assertion), plus the new cases this round adds; add the `resolveOptions` proofs the objective lane named (an array-valued attribute is refused; a constructor `false` and `0` survive).
- **B7 (F2).** Delete `generateId` and its proof (J-TOOLTIP adds it with the first `id` write). Keep `settleAnimations`, `reflow`, `readTarget`, `readTargets`, and `resolveOptions`, which J-COLLAPSE consumes in the same push.
- **B8 (bounds).** Reorder `Button`'s `static find` per `architecture.md` § Class order. Update the guide: the `## Engine` intro (wire names are `.vn.`; the vocabulary groups replace the defaults; the `dispose` departure named at `destroy`), `### Vocabulary` (new: the rules of R19 in the guide's voice, with Button's and ColorMode's default tables), `### Events` (no mirrored properties; completed events not cancelable), `### Delegation` (the groups, the routed-once-per-route rule, the reinsertion sentence, the dead-engine rule), `### Ownership and restoration` (names `static find` for every class); the § Surface intro's stale color-mode sentence and its paragraph saying the `bindEventMap` function and the `Delegate` class are shaped around Button (around guide line 187; the round-5 audit's B9); the `emitEvent` example's name; the `Delegate` remarks naming `find`.

## Unknowns

1. Whether `CSS.supports('selector(…)')` accepts every selector Bootstrap's tables use, including `:not(.disabled):not(:disabled)`: measure it in the proof and report.
2. Whether the resolved tables belong on a `#classes` field per instance or on the constructor's local scope only: rule under the derive-state law and record it.

## Scope

**Owned.** As in `j-binder-brief.md` § Scope, with `src/browser/HostSnapshot.ts` and `tests/src/browser/HostSnapshot.test.ts` in place of the `Snapshot` pair, `src/browser/ColorMode.ts` and `tests/src/browser/ColorMode.test.ts` (the `attributes` group), and the guide's `### Vocabulary` subsection added to the owned set.

**Shared (report-only).** `src/browser/types.ts` (a contract gap stops the unit with the exact gap named), `tests/setupBrowser.ts`, `tests/setup.ts`, `ROADMAP.md`.

**Off-limits.** As in `j-binder-brief.md`, `tests/app/**` included (the Orchestrator integrates `j-binder-patch-buttonsection.diff` at landing).

**Tools and limits.** As in `j-binder-brief.md`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message (the harness refuses a report file; the Orchestrator captures it to `tmp/units/j-binder-report-2.md`): per edit B1 to B8, what changed and the finding it closes; the rulings with the rule that bounds each; the red-first record of each new or rewritten proof; the mutation table for every case, this round's and the round-1 gaps; the output of each acceptance command verbatim; the answers to the Unknowns; `git status --short` and `git diff --stat`; every shared-file patch as an exact diff block. No process diary and no full diff.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Ancillary choices you settle yourself: helper signatures within the contracts, the validators' exact checks, the order of declarations, and the guide subsections' wording. Stop and report when a contract in `types.ts` cannot be implemented as declared, when a criterion needs an off-limits file, or when a fleet name collides.

## Acceptance criteria

1. `npm run check:src:browser` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` and `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` exit 0.
3. `npm run test:src:browser` exits 0 in Chromium 153.0.8010.12, the export list in `tests/src/browser/index.test.ts` naming exactly the exports (no `Snapshot`, `isHost`, `generateId`, `BUTTON_ACTIVE`, `BUTTON_SELECTOR`, `BUTTON_PRESSED`, `COLOR_MODE_ATTRIBUTE`, or `CONFIG_ATTRIBUTE`).
4. `npm run test:policy` exits 0 (the `surface` rule reports no fleet collision).
5. `npm run test:guides` exits 0.
6. `npm run build:src:browser` exits 0.
7. Every new and rewritten proof has its red-first record and its mutation row.

**Observations, not criteria.** None beyond the whole-project run the Orchestrator repeats on the merged tree.

## Review evidence

A code change: the actual diff and the actual status output, captured by the Orchestrator beside this brief as `j-binder-2.diff` and `j-binder-2-status.txt`, and the report named under Output.
