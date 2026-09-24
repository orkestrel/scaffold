# Unit J-ALERT — the Alert engine, its delegate route, and its proofs

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash); the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/alert` (branch `unit/alert`, cut from Veneer `main` at `the J-COLLAPSE landing commit on `main`, named in the dispatch message`; E14).

## Objective

`Alert` (`src/browser/Alert.ts`) conforms to `AlertInterface` over the landed binder, with its delegate route, its default tables, its guard, its proofs on Chromium 153, and its guide subsection, so the `Alert` `plugin` row reads `shipped`.

## Context

**Evidence.** The W2 terrain record `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-w2-terrain-record.md` § Alert (one home for every measurement; where this brief and the record disagree, the record wins and the unit stops rather than resolving it): Bootstrap 5.3.8's behaviour with `file:line` in `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/alert.js` (read for the behaviour, never for the names), the landed contract in `src/browser/types.ts` (`AlertInterface`, `AlertOptions`, `AlertEventMap`, the `AlertClassMap`, `AlertAttributeMap`, and `AlertSelectorMap`; locate by symbol), the rulings that bind it, the prior art, and the cascade. The landed engine pattern to follow: `src/browser/Collapse.ts` (the per-phase write doors through `#holds` and `#apply`, the `#change` identity, `HostSnapshot` saving before the first write, `settleAnimations` for completion, the sibling ownership, `readTag` in the constructor's error, `resolveVocabulary` and `resolveOptions` for the groups and options, `emitEvent` with `null` detail, `bindEventMap` for hooks, the `signal` option), `src/browser/Button.ts`, `src/browser/Delegate.ts` (`#activate`, `#conflicts`, `#routeButton`, `#routeCollapse`, `#mark`, `#acquire`, the observer release), `src/browser/helpers.ts`, `src/browser/validators.ts`, `src/browser/constants.ts` (`COLLAPSE_CLASSES`, `COLLAPSE_ATTRIBUTES`, `COLLAPSE_SELECTORS`, `COLLAPSE_EVENTS` as the table pattern), `tests/src/browser/Collapse.test.ts` and `Delegate.test.ts` (the proof shapes: custom-element reactions at the doors, the recorder, `scene`, the cascade mounted from `src/styles/components/_collapse.scss?inline`, the mutation each case distinguishes), and `guides/veneer.md` `#### Collapse` (the subsection shape).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md` (one class per file, flat at `src/browser/`), `patterns.md` (the Browser/DOM event variant), `tests.md` (real browser, trusted input through `userEvent` where the platform distinguishes it, `@orkestrel/test` recorders and waits, the mutation each assertion distinguishes), `documentation.md` (parity; the § Compatibility row rules), `writing.md`; skill: none; spec: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` R1, R2, R3, R4, R5 (the `alert` dismiss value), R6, R11, R12, R13, R15, R17 ("Alert's `closed` on the detached host"), R18, R19, § Amendments winning; E6 to E14 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` (E11 `.vn.` wire names; E12 as amended, the delegate's same-host refusal; E13; E14).

**Installed primitives.** `@orkestrel/contract` 0.0.18 (`isInstance`, `instanceOf`, `literalOf`, `Guard`, the `parse*` readers; `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`); `@orkestrel/test` 0.0.22 (`createRecorder`, `waitForCondition`, `waitForEvent`; `node_modules/@orkestrel/test/dist/src/core/index.d.ts`) and `@orkestrel/test/browser` (`build`, `mount`, `stageMedia`, `clickAccessible`, `waitForAnimations`); the landed `Registry`, `HostSnapshot`, `emitEvent`, `bindEventMap`, `settleAnimations`, `reflow`, `readTarget`, `readTargets`, `readTag`, `resolveOptions`, `resolveVocabulary`, `parseElement`, and the validators in `src/browser/`. A helper, guard, wait, recorder, or deferred whose job an installed or landed export does is a defect; the audit's checker runs the export-name probe over the diff.

**Host.** Windows 11; Git Bash (`npm.cmd` and `npx.cmd` resolve as `npm` and `npx`); the worktree root; the browser project launches Chromium 153.0.8010.12 and every receipt names it; the platform floor is the Chromium family (E11); `npm run test:src:browser -- <file>` runs one file; no network needed. The `prove` MCP server is not reachable to a subagent; record that you made no call.

**Measurements.** The terrain record's § Alert rows and the J-ENGINE terrain record `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-record.md` keys (`transition.*`); restate none, cite the key.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The element guard is `isInstance(x, HTMLElement)` where J-ISINSTANCE landed it and `instanceOf(HTMLElement)` as a predicate passed to `filter` or `find`; follow what `Collapse.ts` at the base commit uses. E6: no alias, re-export, `@deprecated` tag, fallback path, or wrapper survives a change. The `alert` cascade key has landed (`src/styles/components/_alert.scss`), which declares no `show`, `fade`, or transition, so the proofs mount `_alert.scss?inline` for the host's rules and a test-local `<style>` carrying Bootstrap's `.fade { transition: opacity 0.15s linear } .fade:not(.show) { opacity: 0 }` where a case proves the fade wait, stating which sheet each case read. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and off-limits; a new export name is checked against `node_modules/@orkestrel/scaffold/dist/host/guides/*.md` before it is declared. No `data-bs-config` is read (R11 as amended). No `.bs.` name is dispatched or listened for (E11). `npm run test:src:browser` prints one reported `SyntaxError` diagnostic from the landed `HostSnapshot` case that throws by design; the run passes. The delegate's routes in `Delegate.ts`, `src/browser/index.ts`, and `tests/src/browser/index.test.ts` are shared across the W2 units writing in parallel: edit them in this worktree (the unit's own route, export, and export-list entry) and expect the Orchestrator to resolve the mechanical merge at landing; edit no other unit's route.

**The obligations (each an edit and a proof, red first where the behaviour is new).**

- **ALERT1.** `Alert` conforms to `AlertInterface` (`host`, `close`, `destroy`): construction validates the host with `isInstance`, resolves the three groups through `resolveVocabulary`, claims the host, binds the hooks; `close` dispatches the cancelable `close.vn.alert` with `null` detail, refuses on prevention with `false` and no write, refuses with `false` while a close is in flight, removes the `shown` token through a door read, waits through `settleAnimations` when the host carries `fade`, removes the host from the document, dispatches `closed.vn.alert` on the detached host (R17), and resolves `true`; `destroy` during the fade restores the `shown` token through `HostSnapshot`, abandons the wait (`false`, no `closed`), and never removes the host. Proofs for each with mutations.
- **ALERT2.** The delegate's dismiss route (R5, shared later by Modal and Toast): a click inside a trigger the `dismiss` selector matches (`[data-bs-dismiss="alert"]`) resolves the alert through `readTarget` with the `target` attribute then `href`, else the closest element carrying the `host` token, prevents the default action of an anchor, skips a trigger carrying the `disabled` token or attribute, and calls `close` on the engine `Alert.find` returns or one the delegate acquires with the alert group; the route is written so Modal's and Toast's dismiss routes reuse its resolution through one private method taking the entity's class, selector, and host token. Proofs in `Delegate.test.ts`, with the E12 same-host refusal against the button route where the alert host is also a button host.
- **ALERT3.** `isAlertEvent` narrows an engine-shaped event with `detail === null`; the `ALERT_EVENTS`, `ALERT_CLASSES`, `ALERT_ATTRIBUTES`, and `ALERT_SELECTORS` tables are frozen; the barrel and the export-list test grow.

**Departures the guide lists.** No `role` or `data-alert-open` is written (the prior art's additions are not Bootstrap's); `closed` fires on the removed host; `destroy` restores rather than removing; no fallback timer (R6); the `.vn.` names (E11); every other departure the unit finds against `alert.js`.

**Prior art (read, copied nowhere).** The terrain record § Alert (`alert.js` `close` 37-48, `_destroyElement` 51-55, the dismiss route in `util/component-functions.js` 12-29); the terrain distillate § B Alert (around line 118) and § C (around line 226: alerts stay in flow).

## Unknowns

1. Whether `readTarget` for a dismiss trigger with neither attribute falls back to `closest(host)` inside the route or inside a helper the three dismiss routes share: rule (the route) and report.

## Scope

**Owned.** `src/browser/Alert.ts` (new), `tests/src/browser/Alert.test.ts` (new); in `src/browser/constants.ts` the `ALERT_EVENTS`, `ALERT_CLASSES`, `ALERT_ATTRIBUTES`, `ALERT_SELECTORS`, and, where the entity has a default option value, `ALERT_DEFAULTS` rows; in `src/browser/validators.ts` `isAlertEvent` and its test rows in `tests/src/browser/validators.test.ts`; in `src/browser/parsers.ts` a parser only where no `@orkestrel/contract` reader coerces the attribute, with its test rows; in `src/browser/Delegate.ts` the `alert` route reading `DelegateOptions.alert` and its cases in `tests/src/browser/Delegate.test.ts`; `src/browser/index.ts` and `tests/src/browser/index.test.ts` (the export list); in `guides/veneer.md`: the Alert rows under § Surface, the `#### \`AlertInterface\`` § Methods table where a summary changes, the Alert fence under § Examples, the `#### Alert` subsection under `## Engine` › `### Components` (host, the default tables beside the attribute table with option paths, events, the takeover reading, the delegate route, departures), and the Alert `plugin` row's Status, Proof, and Obligation cells.

**Shared (report-only).** `src/browser/types.ts` (a summary or `@returns` sentence the implementation makes false: return an exact patch with the guide row parity compares); `ROADMAP.md`.

**Off-limits.** `src/browser/HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `ColorMode.ts`, `helpers.ts`, `Registry.ts`; every other unit's route in `Delegate.ts`; `tests/setupBrowser.ts` (report a needed helper as a patch); `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/src/styles/**`, `tests/service/**`, `src/styles/**`, `app/**`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`.

**What asserts the state this change ends.** `tests/src/browser/index.test.ts` (the export list grows; owned); `tests/src/browser/Delegate.test.ts` (a route case; owned); `tests/guides.test.ts` (every export documented; `report.drift`; `report.methods`) read-only, closed through the guide rows; `tests/conformance.test.ts` (reads the `plugin` row) read-only; `tests/policy.test.ts` read-only. Search bound: `grep -rn "alert\|Alert\|ALERT" src tests/src/browser guides/veneer.md` at dispatch.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. No install, commit, push, or discarding git command; no tree-wide `format`, `lint --fix`, or `build` (`npm run build:src:core`, `build:src:styles`, and `build:src:browser` are permitted for the conformance gate and reported). Scoped validation: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` (`--write` on your own TypeScript files where it fails; never on the guide); `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; `npm run test:conformance`. Write your instruments under `tmp/j-alert/` in the worktree; a mutation instrument runs each mutation over the whole test file (no `-t`), records every failing case, and restores the bytes with a digest receipt, as `tmp/j-collapse/mutations-3.py` did (read it from the retained copy `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-collapse-mutations-3.py`).

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message: the files touched; per obligation, what was built and the case that pins it with its red reading (where the behaviour is new) and its green reading, verbatim; the Unknowns' answers; the mutation table copied verbatim from the instrument's log; the verbatim output of every acceptance command; `git status --short` and `git diff --stat`; every shared-file patch as an exact diff block; the deviation state. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — on a contract in `types.ts` the behaviour cannot satisfy, a platform reading that contradicts the terrain record, a shared file outside the report-only row you would have to edit, or a gate red you cannot close inside the owned files. Decide, record, and carry on from the order of cases in the test file, the wording of comments and guide sentences, and the placement of a guide paragraph inside the subsection.

## Acceptance criteria

1. `npm run check:src:browser` exit 0; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` exit 0; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` exit 0.
2. `npm run test:src:browser` green on Chromium 153.0.8010.12, with every obligation's case present and the new behaviours' red readings recorded before their fixes.
3. `npm run test:guides` green (every new export documented; the Alert fence imports through `@orkestrel/veneer/browser`); `npm run test:policy` green.
4. `npm run build:src:core`, `build:src:styles`, and `build:src:browser` exit 0, then `npm run test:conformance` green with the Alert `plugin` row reading `shipped`, Proof `tests/src/browser/Alert.test.ts`, and the catalog's Obligation wording.
5. The mutation instrument's log carries one row per mutation over the whole file, every named case reddening, and the receipt `restored byte for byte`.
6. The status lists only owned files; every shared-file change is returned as a patch.

**Observations, not criteria.** The tree-wide `npm run check` and the whole-suite run, which the Orchestrator repeats on the merged tree.

## Review evidence

The actual diff (`git diff HEAD` with the new files intent-to-add) and `git status --short` of the worktree, captured by the Orchestrator as `j-alert.diff` and `j-alert-status.txt`, and the report; the audit runs `analyst` on Astra (objective: the sequences, the doors, the timing, the route, the proofs' binding) and `checker` on Sonnet (mechanical), with `reviewer` on Opus only where the API shape departs from the landed pattern.
