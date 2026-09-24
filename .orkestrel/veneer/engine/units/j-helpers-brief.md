# Unit J-HELPERS — the engine's DOM traversal and reading helpers, extracted and routed

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash); the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers` (branch `unit/helpers`, cut from Veneer `main` at `e8251cf`, the J-TOAST landing; E14).

## Objective

The engine's repeated DOM readings live once in `src/browser/helpers.ts` as exported, tested, documented leaves, every duplicate site routes through them, the disabled predicate carries its rule-conforming name and is the one disabled reading of the delegate routes and the dropdown engine, and every suite stays green on Chromium 153.

## Context

**Evidence.** The design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-helpers-design-verdict.md` (one home for every ruling; where this brief and the verdict disagree, the verdict wins and the unit stops rather than resolving it): § 1 rules every member, § 2 fixes the six signatures and their contracts and sites, § 3 the disabled reading and the rename, § 6 the acceptance. The terrain behind it: `j-helpers-terrain.md`, `j-helpers-absorb-distillate.md`, `j-helpers-absorb-2-distillate.md`, and the two lane proposals `j-helpers-design-planner-proposal.md` and `j-helpers-design-objective-proposal.md` beside the verdict (read the proposals for their `file:line` evidence, never for a ruling the verdict did not adopt). The landed sources on `main`: `src/browser/helpers.ts`, `Delegate.ts`, `Tab.ts`, `Dropdown.ts`, `Collapse.ts`, `Carousel.ts`, `ScrollSpy.ts`, `Modal.ts`, `ScrollLock.ts`, and their tests; the guide `guides/veneer.md` (§ Surface, § Delegation, `#### Dropdown`, `#### ScrollSpy`).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (§ Non-negotiable rules, § Design laws, § TTTDD); `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md` (§ Standalone helpers: `read*` obtains a value from a live host object, `matches*` is a predicate; § Fixed derivation/construction forms: a new `is*` name is a total `Guard<T>`), `typescript.md` (TSDoc: a summary sentence, `@param`, `@returns`, `@remarks` where a boundary needs stating, one titled `@example` per export), `architecture.md` (§ Kind purity, § Wrapper test, § Functions and orchestration: no nested functions, a private method never forwards 1:1 to a helper with one caller), `patterns.md`, `tests.md` (real browser, `@orkestrel/test` recorders, the mutation each assertion distinguishes, a red reading before a new behaviour), `documentation.md` (parity: every export documented, a § Surface Summary equal to the doc block's description), `writing.md`; skill: none; spec: the verdict § 6.

**Installed primitives.** `@orkestrel/contract` 0.0.18 (`isInstance`, `instanceOf`); `@orkestrel/test` 0.0.22 (`createRecorder`, `waitForCondition`) and `@orkestrel/test/browser` (`mount`, `render`, `build`); the landed helpers (`readTargets`, `readTarget`, `readControls`, `computeNeighbor`, `reflow`, `readTag`, `matchesReducedMotion`, `settleAnimations`, `emitEvent`, `bindEventMap`, `resolveOptions`, `resolveVocabulary`) and `tests/setupBrowser.ts` (`scene`, the `mount*` fixtures, `recordEvents`).

**Host.** Windows 11; Git Bash (`npm.cmd` and `npx.cmd` resolve as `npm` and `npx`); the worktree root; the browser project launches Chromium 153.0.8010.12 and every receipt names it; `npm run test:src:browser -- <file>` runs one file; no network needed. The `prove` MCP server is not reachable to a subagent; record that you made no call. Headless Chromium may draw no classic scrollbar: pin `readScrollbarWidth` on a viewless document returning `0` and record the host's live width as an observation.

**Measurements.** None restated here; the verdict § 1 and § 2 cite the sites by symbol with approximate lines, and the proposals cite exact lines at `main` `7e96cf8`, which `e8251cf` moves only inside `Delegate.ts` (the toast fold) and the tests. Re-derive every line in the worktree.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The element guard is `isInstance(x, HTMLElement)` for every immediately invoked check and `instanceOf(HTMLElement)` only as a predicate passed to `filter` or `find`. E6: no alias, re-export, `@deprecated` tag, compatibility shim, or dead code; the renamed predicate leaves no `isDisabled` identifier anywhere in `src`, `tests`, or the guide. E12 and E13 stay untouched (no route's conflict entry and no snapshot bound changes). `Delegate.#locate` keeps its unbounded target read so an explicit outside target never falls back to the closest host. The optional `root` parameter of `readTarget` is a helper signature, not a `types.ts` change.

**The obligations (each an edit and a proof; red first where the behaviour is new).**

- **H1 `readClosest(element, selector, root?)`.** Extract from `Delegate.#closest` and delete the method; route every former call with `this.#root`, the `#routeTabKey` list read unbounded (its control keeps its later root check), `Tab.#wrapper` unbounded, and `Tab.#list`'s callers directly (delete `#list`). Contract per the verdict § 2. Cases: self inclusion; the guard on the first match (an SVG match returns `undefined`); root containment including root equality; an unbounded read; a selector error propagating.
- **H2 `readSiblings(element, selector, forward)`.** New; route `Dropdown.#locate` (next, previous, then the parent's descendants, `find(instanceOf(HTMLElement))`), `Delegate.#locateToggle` (previous, next, parent, `find(not disabled)`, then `readClosest(found, trigger, this.#root)`), and `ScrollSpy.#parents` (`[0]` of the preceding walk). Cases: each direction nearest first; self excluded; a matching non-HTML sibling returned; no parent returning `[]`. Site proof in `Delegate.test.ts`: a menu whose preceding toggle is disabled and whose following toggle is enabled takes the following one (red first if no case pins it).
- **H3 `readOutermost(root, selector)`.** New; `Carousel.#items`'s body becomes the call (the method stays, seven callers); `Collapse.#siblings` reads `readOutermost(parent, host + ', ' + transition)` then filters to not-the-host and `matches(host.shown, transition)`. Cases: a nested match excluded; the root excluded; a selector list `'.a, .b'` with `.b` inside `.a`; nesting through a non-HTML match.
- **H4 `readScrollbarWidth(document)`.** New; route `Modal.#adjust` and both `ScrollLock` measurement points, positions around the writes unchanged. Case: a viewless document (`document.implementation.createHTMLDocument()`) returns `0`.
- **H5 bounded `readTarget(trigger, attributes, root?)`.** Add the optional root; fold `Delegate.#readModal` into `#routeModal`; route `Delegate.#slideHost` through it. Case: an outside first result returns `undefined` with an inside second result present; the unbounded read unchanged.
- **H6 `matchesDisabled(element, token)`.** Rename `isDisabled` everywhere (helpers, the delegate's routes and preflight, `helpers.test.ts`, the guide's § Surface row, § Delegation and every `####` sentence naming it; reword "Bootstrap's `isDisabled`" to prose so every backticked name resolves). Route `ScrollSpy.#section`'s hand reading and `Dropdown.#refused` through it. Red first: a directly constructed `<a href="#" data-bs-toggle="dropdown" disabled>` toggle's `show()` resolves `false`; record the failing command and its count before the fix. ScrollSpy pins, green before and after: a `disabled="false"` link is observed, a `disabled` link is skipped. The dropdown-entry keyboard filter keeps its declared entry selector.
- **H7 The guide.** § Surface rows for the six exports with Summary cells equal to the doc blocks; the § Delegation sentence names the shared predicate by its new name; the `#### Dropdown` sentence states the engine's own show and hide refuse a disabled toggle by the same reading; the `#### ScrollSpy` sentence names the shared reading; the duplicate `computeNeighbor` § Surface row (two rows today, one with a summary differing from the doc block) becomes one row equal to the doc block.
- **H8 The instrument.** A whole-file mutation instrument (`tmp/j-helpers/mutations.py` in the worktree, the W2 shape: one row per mutation, the whole test file run, the named case, `EXACT`, `JOINED`, or `MISSED`, and a byte-for-byte restore receipt) with at least these rows: direction reversed in `readSiblings`; farthest-first order; the `:is()` wrapper dropped in `readOutermost`; the nested set not excluded; the null-view guard removed in `readScrollbarWidth`; containment applied before the guard in `readClosest`; the guard widened to `Element`; the bounded `readTarget` returning an inside second result; `Dropdown.#refused` reverted to the token-only reading; `ScrollSpy.#section` ignoring `disabled="false"`.

**Departures the guide lists.** None new; the `#### Dropdown` sentence on the engine's own disabled reading replaces the narrower one.

**Prior art (read, copied nowhere).** The proposals' evidence tables; `elements/src/browser/traversals.ts` and `mailbox/src/browser/helpers.ts` are unscoped local projects, read for shape only.

## Unknowns

1. Whether every branch of `Delegate.#locateToggle`, `Dropdown.#locate`, and `ScrollSpy.#parents` is pinned by an existing case: derive it by running the suites with each branch mutated, add the missing case, and report which branches were unpinned.
2. Whether the host's headless Chromium draws a classic scrollbar: report the live `readScrollbarWidth(document)` reading as an observation.

## Scope

**Owned.** `src/browser/helpers.ts`, `src/browser/Delegate.ts`, `src/browser/Tab.ts`, `src/browser/Dropdown.ts`, `src/browser/Collapse.ts`, `src/browser/Carousel.ts`, `src/browser/ScrollSpy.ts`, `src/browser/Modal.ts`, `src/browser/ScrollLock.ts`; `tests/src/browser/helpers.test.ts`, `tests/src/browser/Delegate.test.ts`, `tests/src/browser/Dropdown.test.ts`, `tests/src/browser/ScrollSpy.test.ts`, and any other `tests/src/browser/*.test.ts` file whose case names or imports the rename makes false; `guides/veneer.md` in the rows and sentences H7 names; `tmp/j-helpers/**` (the instrument and its logs).

**Shared (report-only).** `src/browser/types.ts` (a TSDoc sentence the change makes false: return an exact patch); `src/browser/index.ts` (the barrel already star-exports `helpers.ts`; report if not); `tests/setupBrowser.ts`; `ROADMAP.md`.

**Off-limits.** `src/browser/HostSnapshot.ts`, `Registry.ts`, `Button.ts`, `ColorMode.ts`, `Alert.ts`, `Toast.ts`, `Backdrop.ts`, `Isolation.ts`, `Placement.ts`, `Swipe.ts`, `constants.ts`, `validators.ts`, `parsers.ts`; `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/src/styles/**`, `tests/service/**`, `src/styles/**`, `app/**`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`.

**What asserts the state this change ends.** `tests/src/browser/index.test.ts` (the export list: `isDisabled` leaves, the five new names join; owned for that list); `tests/guides.test.ts` (every export documented; `report.drift`) read-only, closed through the guide rows; `tests/policy.test.ts` read-only. Search bound at dispatch: `grep -rn "isDisabled\|previousElementSibling\|nextElementSibling\|:scope \|innerWidth\|#closest\|#readModal\|#list()" src tests/src/browser guides/veneer.md`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. No install, commit, push, or discarding git command; no tree-wide `format`, `lint --fix`, or `build` (`npm run build:src:core`, `build:src:styles`, and `build:src:browser` are permitted for the conformance gate and reported). Scoped validation: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` (`--write` on your own TypeScript files where it fails; on the guide only through `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` after your edits, then `--check`); `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; then the three builds, `npm run test:conformance`, and `npm run test:setup`. Write the chain to `tmp/j-helpers/acceptance.sh` and run the file; keep each log under `tmp/j-helpers/`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message: the files touched; per obligation, what was built and the case that pins it with its red reading (where the behaviour is new) and its green reading, verbatim; the Unknowns' answers; the mutation table copied verbatim from the instrument's log; the verbatim output of every acceptance command; `git status --short` and `git diff --stat`; every shared-file patch as an exact diff block; the deviation state. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — on a route whose behaviour a helper cannot preserve, a contract in `types.ts` the change makes false beyond a TSDoc sentence, a shared file outside the report-only row you would have to edit, or a gate red you cannot close inside the owned files. Decide, record, and carry on from the order of cases in a test file, the wording of comments and guide sentences, the order of the helpers inside `helpers.ts`, and the placement of a guide paragraph inside its subsection.

## Acceptance criteria

1. `npm run check:src:browser` exit 0; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` exit 0; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` exit 0.
2. `grep -rn "isDisabled" src tests guides` matches nothing; under `src/browser`, `previousElementSibling`, `nextElementSibling`, `:scope `, and `innerWidth - documentElement.clientWidth` occur only in `helpers.ts`; `getAttribute('disabled')` and `, :disabled` occur only in `helpers.ts` and the dropdown-entry selector's declaration; `#closest(`, `#readModal(`, and `#list(` occur nowhere.
3. `npm run test:src:browser` green on Chromium 153.0.8010.12, with every H1 to H6 case present, the red readings of H2's site proof (where new) and H6's dropdown case recorded before their fixes, and every suite the change did not target green without edits.
4. `npm run test:guides` green (the six exports documented, the duplicate `computeNeighbor` row folded); `npm run test:policy` green.
5. `npm run build:src:core`, `build:src:styles`, and `build:src:browser` exit 0, then `npm run test:conformance` and `npm run test:setup` green.
6. The instrument's log carries one row per H8 mutation over the whole file, every named case reddening, and the receipt `restored byte for byte`.
7. The status lists only owned files; every shared-file change is returned as a patch.

**Observations, not criteria.** The tree-wide `npm run check` and the whole-suite run, which the Orchestrator repeats on the merged tree; the live scrollbar width.

## Review evidence

The actual diff (`git diff HEAD` with the new files intent-to-add) and `git status --short` of the worktree, captured by the Orchestrator as `j-helpers.diff` and `j-helpers-status.txt`, and the report; the audit runs `analyst` on Astra (objective: each helper's contract against every routed site, the order of the guards and bounds, the proofs' binding), `checker` on Sonnet (mechanical: the greps, parity, the status), and `reviewer` on Opus (subjective: the names, the doc blocks, the guide sentences).
