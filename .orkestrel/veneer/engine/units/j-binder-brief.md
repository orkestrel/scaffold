# Unit J-BINDER — the shared mechanisms and the generalized delegate, on Button

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`. The executor that opens this brief is that subagent, the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` (branch `unit/binder`, base `1868007` of Veneer `main`, which carries J-TYPES's contracts and J-SEED's repair).

## Objective

Land the shared mechanisms every component builds on, each conforming to the contract J-TYPES landed in `src/browser/types.ts` and proved on Button, the first consumer: `Registry` and `Snapshot`; `emitEvent` with the cancelable flag and the mirrored detail properties; the entity-neutral `bindEventMap`; `settleAnimations`, `reflow`, `readTarget`, `readTargets`, and `generateId`; `parsers.ts` with the shared attribute merge; `isHost` in place of `isButtonHost`; and `Delegate` generalized to route by contract and to release a removed host at observer delivery — with Button migrated onto them and every existing Button, Delegate, helpers, and validators proof green or rewritten to the ruled behaviour.

## Context

**Evidence.** The terrain record `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-evidence.txt`, taken on the J-TYPES tree that landed as `1868007`, carries every measurement this unit starts from: the export list of `src/browser/types.ts` (`grep -n "^export "`), the export-set proof `tests/src/browser/index.test.ts` lines 1 to 26 (the sorted name list it asserts, which your barrel additions extend as a report-only patch), the rename bound (`grep -n "isButtonHost\|BUTTON_TOGGLE\|emitEvent\|bindEventMap\|ButtonHooks" -r src tests guides`: `Button.ts`, `Delegate.ts`, `helpers.ts`, `constants.ts`, `types.ts`, and the guide row), the file lists of `src/browser` and `tests/src/browser`, and the guide's § Methods headings. Where this brief and the record disagree, the record wins; stop and report rather than resolve. `ButtonHooks` is already the `EventHooks<ButtonEventMap>` alias (J-TYPES round 2), so no `types.ts` change is needed for it. The seed's present semantics: `src/browser/Delegate.ts` `#activate` releases a removed host on the next click that reaches the root; `tests/src/browser/Delegate.test.ts` cases "restores removed hosts on a later unrelated click", "releases a connected host moved outside the root on a later unrelated click", "keeps the engine and the state of a host reinserted before the next root click", and "reacquires a pruned host after reinsertion" pin that behaviour and go false under R5; `tests/src/browser/helpers.test.ts` asserts `emitEvent` dispatches `cancelable: false`; `tests/src/browser/Button.test.ts` asserts `toggle.vn.button` is non-cancelable (stays true under R2).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md` (one class per file; `helpers.ts` pure leaves; `parsers.ts` exports only `parse*`; `validators.ts` total guards; the leaf pair imports no class; the barrel `export *` only), `patterns.md` (the Browser/DOM event variant: a typed bubbling `CustomEvent`, shared dispatch and listener helpers, `options.on` bound through `bindEventMap`), `tests.md` (real browser; `recordListeners`, `recordEvents`, `createRecorder`; the regression form; the mutation each assertion distinguishes), `documentation.md`, `writing.md`; skill: none; spec: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` R1, R2, R4, R5, R6, R11, R12, R13, R17, R18, and the contracts in `src/browser/types.ts` as landed (authoritative; a gap is a stop, not an edit).

**Installed primitives.** `@orkestrel/contract` (`isInstance`, `literalOf`, `isRecord`, `isString`, `isFunction`, `Guard`; `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`); `@orkestrel/test` (`createRecorder`, `createRecorders`, `waitForCondition`, `waitForEvent`; `node_modules/@orkestrel/test/dist/src/core/index.d.ts`) and `@orkestrel/test/browser` (`build`, `mount`, `waitForAnimations`; `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`). A helper, guard, wait, recorder, or deferred whose job an installed export does is a defect; the audit's checker runs the export-name probe over the diff.

**Host.** Windows 11; Git Bash; the worktree root; npm `12.0.2`; the browser project launches Chromium 153.0.8010.12 and every receipt names it; `npm run test:src:browser -- <file>` runs one file; no network.

**Measurements.** The terrain record `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-record.md`: `transition.getAnimations`, `transition.cancel`, `transition.removeMidway`, `transition.reducedMotionZero`, `transition.sameTask.readBeforeChange` (a layout read before the change makes the transition readable in the same task), `observer.removeReinsertSameTask`, `observer.moveBefore`, `event.ownProperty.readback`, `event.completedCancelable.defaultPrevented`. Restate none; cite the key.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The `collapse`, `dropdown`, and `nav` cascade keys have landed on Veneer `main` (the baseline's `a658879`) and no other engine key has; this unit reads none of them, and `settleAnimations` is proved on probe elements with a test-local transition declared in `tests/setupBrowser.ts` (report-only: return the patch) or inline in the test's own mounted `<style>`. The guide parity proof compares each § Surface `Summary` with its doc block and each § Methods row with its method's TSDoc; J-TYPES landed the rows and tables for the contracts you implement, so implement to those doc blocks. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and off-limits.

## Unknowns

1. Whether Vitest's browser provider delivers a `MutationObserver` callback before the next `it` step in the delegate's release proof without an explicit `await`: measure with the proof itself and, where a microtask turn is needed, await one (`await Promise.resolve()`) and record it; never a timer.
2. Whether `parse*` functions can express the merge order (defaults, `data-bs-config` JSON, declared `data-bs-*` keys, the constructor object) as a single `parseOptions`-shaped leaf per entity or need one shared `parseConfig` plus per-entity readers: rule it inside `architecture.md` § Kind purity (every export in `parsers.ts` is named `parse*` and returns `T | undefined`), record the ruling, and keep the Button and Delegate paths using it.

## Scope

**Owned.** `src/browser/Registry.ts`, `src/browser/Snapshot.ts` (new); `src/browser/helpers.ts`, `src/browser/validators.ts`, `src/browser/parsers.ts` (new), `src/browser/constants.ts`, `src/browser/Delegate.ts`, `src/browser/Button.ts`, `src/browser/index.ts`; `tests/src/browser/Registry.test.ts`, `tests/src/browser/Snapshot.test.ts`, `tests/src/browser/parsers.test.ts` (new), `tests/src/browser/helpers.test.ts`, `tests/src/browser/validators.test.ts`, `tests/src/browser/Delegate.test.ts`, `tests/src/browser/Button.test.ts`, `tests/src/browser/index.test.ts` (the export list); in `guides/veneer.md`: the § Surface rows of every export this unit adds, renames, or removes, the § Methods tables of `RegistryInterface` and `SnapshotInterface`, the § Surface paragraphs on the delegate's release and on the Button-shaped mechanisms (R18: the sentence that they stay Button-shaped goes), and the new `## Engine` section with its `### Events`, `### Delegation`, `### Ownership and restoration`, and `### Motion` subsections (the remaining subsections are later units').

**Shared (report-only).** `tests/setupBrowser.ts` (a test-local transition stylesheet or a helper, returned as a patch), `tests/setup.ts`, `src/browser/types.ts` (J-TYPES's; a contract gap stops the unit with the exact gap named), `ROADMAP.md`.

**Owned, prose bounds carried from the J-SEED audit (B2, B3):** in `src/browser/ColorMode.ts`, the class `@remarks` phrase "the root's live mode" and, in `tests/src/browser/ColorMode.test.ts`, the two case titles ending "and toggles to the live mode" — reword each so `toggle` after destruction is described as returning the mode the root carries rather than toggling, using one phrase in both places and no other change to those files.

**Off-limits.** `src/core/**`, every component class other than `Button.ts` (and `ColorMode.ts` beyond the two prose bounds named under Owned), `tests/src/core/**`, `src/styles/**`, `tests/src/styles/**`, `app/**`, `configs/**`, `vite.config.ts`, `tsconfig.json`, `package.json`, the lockfile, the vendored `tests/setupPolicy.ts` and `tests/policy.test.ts`, `README.md`.

**What asserts the state this change ends.** `tests/src/browser/index.test.ts` (the export list grows: `Registry`, `Snapshot`, `isHost`, the parsers, the new helpers; `isButtonHost` and `BUTTON_TOGGLE` leave if renamed — owned); `tests/src/browser/Delegate.test.ts` (the four next-click release cases go false under R5 — owned, rewritten to the ruled behaviour with the mutation "observer removed" reddening them); `tests/src/browser/helpers.test.ts` (`emitEvent` cancelable assertion — owned); `tests/src/browser/Button.test.ts` (owned; `toggle.vn.button` stays non-cancelable); `tests/guides.test.ts` (every export documented; `report.drift`; `report.methods`) — read-only, closed through the guide rows and tables; `tests/policy.test.ts` (the prose sweep; the placement rules: `parsers.ts` exports only `parse*`, `helpers.ts` holds no class) — read-only. The rename bound: a word-boundary sweep over `isButtonHost`, `BUTTON_TOGGLE`, `emitEvent`, `bindEventMap` across `src/`, `tests/`, and `guides/`, followed by a case-insensitive sweep over their `-s`, `-ed`, `-ing` inflections; every hit is yours to update.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. No install, commit, push, or discarding git command; no tree-wide `format`, `lint --fix`, or `build`. Scoped validation: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` (`--write` on your own TypeScript files where it fails; never on the guide); `npm run test:src:browser` (the whole browser project is yours here: every file in it is owned or unchanged); `npm run test:guides`; `npm run test:policy`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write the report to `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/j-binder-report.md` and return its path as your final message. The report carries: touched files with one line each; the red-first record for each rewritten proof (the exact command, its failing count and case names before, the same command green after); the mutation each new assertion distinguishes; the rulings taken on the Unknowns; the command and output of each acceptance criterion; `git status --short` and `git diff --stat`; every shared-file patch as an exact diff block; deviation state. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — when a contract in `src/browser/types.ts` cannot be implemented as declared, when a criterion needs an off-limits file, or when a verdict ruling contradicts a rule file. Decide, record, and carry on from the Unknowns, from helper signatures within the contracts, from the order of declarations, and from the wording of the guide subsections.

## Acceptance criteria

1. `npm run check:src:browser` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` and `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` exit 0.
3. `tests/src/browser/index.test.ts` lists the export set exactly, and `npm run test:src:browser` exits 0 in Chromium 153.0.8010.12, with every rewritten proof recorded red first.
4. `Registry`, `Snapshot`, `settleAnimations` (real transition, cancelled transition, removed element, zero-duration, abort), `reflow`, `readTarget` (with `CSS.escape` over an id that carries a special character), `readTargets`, `generateId`, `emitEvent` (cancelable and non-cancelable, mirrored own properties readable at the document), `bindEventMap` (a non-Button map), and the parsers (defaults, JSON, declared keys, constructor object, `false` and `0` surviving, an invalid attribute throwing `{ENTITY}_OPTION_INVALID`) each have a proof whose report names the mutation it distinguishes.
5. `Delegate` releases a removed or moved-out host at observer delivery and keeps a same-task reinserted host, proved with the observer-removed mutation, and registers no document or window listener on import (`tests/src/browser/index.test.ts`).
6. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** None beyond the whole-project run the Orchestrator repeats on the merged tree.

## Review evidence

A code change: the actual diff and the actual status output, both in the report.
