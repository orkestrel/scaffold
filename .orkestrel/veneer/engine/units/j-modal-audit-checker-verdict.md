# J-MODAL audit round 1 — the checker's verdict (`checker` on Sonnet, native subagent, read-only; 51 tool uses, 182 s; retained verbatim from the subagent's return)

**Checker (Sonnet, native Claude subagent with Read/Grep/Glob; mechanical conformance only).**

Verdicts on claims (mechanical clauses only, numbered as in `j-modal-audit-claims.md`):

1. **CONFIRMED** (mechanical). `src/browser/Modal.ts:77-453` is one class plus imports; constructor host guard `isInstance(host, HTMLElement)` at `Modal.ts:107`; `resolveVocabulary`/`resolveOptions` calls at `Modal.ts:112-158` match the described shape; `#options` assembly at `Modal.ts:159-166` matches the winning-path formula. Mutation log rows for the pinned behaviors present (`j-modal-mutations.log.txt` lines 7, 31-33, 40, 45, 49-50).
2. **CONFIRMED** (mechanical: sequence order matches source read at `Modal.ts:221-271`; mutation rows for the pinned sentences present at `j-modal-mutations.log.txt` lines 10-30, 45, 90). Timing/doors judgment is outside this lane's mechanical scope (referred to the objective lane).
3. **CONFIRMED** (mechanical: `hide` sequence at `Modal.ts:273-313`, `#escape`/`#press`/`#bounce` at `Modal.ts:421-452`; mutation rows lines 34-54).
4. **CONFIRMED** (mechanical: `Backdrop.ts`, `ScrollLock.ts`, `Isolation.ts` each one class plus imports, read in full; mutation rows lines 55-75; E13 bound row `j-modal-mutations.log.txt` line 36 present).
5. **CONFIRMED** (mechanical: Delegate route names `#routeModal`, `#routeDismiss`, `#readModal`, `#readDismissed`, `#conflictsModal` present per the report and grep of `Delegate.ts:234-291`; ten modal cases' mutation rows present, `j-modal-mutations.log.txt` lines 76-89).
6. **CONFIRMED**. `isModalEvent` (`validators.ts:162-172`) reads exactly `isInstance(value, CustomEvent)` inside a `try`, narrows to `ModalEventMap['show']`; `parseBackdrop` (`parsers.ts:53-55`) returns `'static'` for `'static'`, else `parseBoolean(value)`; all six tables (`MODAL_EVENTS`, `MODAL_CLASSES`, `MODAL_ATTRIBUTES`, `MODAL_SELECTORS`, `MODAL_DEFAULTS`, `BACKDROP_CLASSES`, `SCROLL_LOCK_SELECTORS`) are `Object.freeze` in `constants.ts:76-131`; barrel (`index.ts:11-14`) exports `./ScrollLock.js`, `./Backdrop.js`, `./Isolation.js`, `./Modal.js`; `index.test.ts` lists `Backdrop`, `Isolation`, `Modal`, `ScrollLock`, `isModalEvent`, `parseBackdrop`.
7. **CONFIRMED** for the mechanical clauses checkable without a diff tool: Modal `plugin` row reads `shipped` with Proof `tests/src/browser/Modal.test.ts` (`guides/veneer.md:6017`); the shared patch (`j-modal-patches/j-modal-shared.diff`) names only `types.ts` and `guides/veneer.md`, rewrites exactly the sentences the claim names. The Compatibility-table re-padding is whitespace-only outside the Modal row on the two rows sampled in full (Collapse and Toast, `j-modal.diff:478/484/691/697`, content identical except padding); the remaining five rows were not individually diffed byte-for-byte, so extend this sampling before treating the whole-table claim as closed beyond a reasonable sample. **Guide-prose-truth clauses ("each true of the source and of modal.js") are a judgment question — referred, not ruled on here.**
8. **CONFIRMED**. Status (`j-modal-status.txt`) lists exactly the ten modified and five new files (5 `A` + 10 `M` = 15 rows), matching the report's file list; no off-limits file (`types.ts`, `helpers.ts`, `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, `ROADMAP.md` all absent). The Orchestrator's independent gate run (`j-modal-gates.log.txt`) shows `check:src:browser exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:src:browser` 264 passed, `test:guides exit=0` (19 passed), `test:policy exit=0`, three builds exit=0, `test:conformance exit=0`, `test:setup exit=0`, tree-wide `check exit=0` — this is independent evidence, not the writer's quoted command, so **CONFIRMED, not UNRESOLVED**. The mutation log (`j-modal-mutations.log.txt`) independently shows every row `EXACT` or `JOINED`, the eight `GREEN?` rows at 0 failed of 29/7/5/5/44/12/5/3 matching the report's counts, digest before/after identical, `receipt: restored byte for byte`. Added-lines syntax sweep (`Modal.ts`, `Backdrop.ts`, `Isolation.ts`, `ScrollLock.ts`, `Delegate.ts`, `constants.ts`, `parsers.ts`, `validators.ts`) found no `any`, `as <type>`, non-null `!`, `@ts-`, `eslint-disable`, access modifier, or default export (the few `as`/`!.`-pattern hits are prose "as Bootstrap's..." and TSDoc, not syntax). `.bs.` wire names appear only inside the guide's Compatibility-table prose describing other engines' and Modal's Bootstrap-side behavior, never in `constants.ts` outside its default-attribute-name rows and never dispatched/listened for in source. Every immediately invoked element guard reads `isInstance(x, HTMLElement)` (`Modal.ts:107`, `Isolation.ts:60,77,84`, observer callback `Isolation.ts:47`); `instanceOf(HTMLElement)` appears only as a predicate to `.find`/`.filter` (`Modal.ts:168`, `ScrollLock.ts:70`), matching the permitted exception. The report states "I made no `prove` MCP call" (`j-modal-report.md:3`), matching the brief's standing condition that the server is unreachable to a subagent.

## Checklist

| Item | Met | Evidence |
|---|---|---|
| Status lists only owned files, no off-limits file | Met | `j-modal-status.txt` (15 rows) vs off-limits list in `j-modal-brief.md` § Scope |
| Gates green (Orchestrator's independent run) | Met | `j-modal-gates.log.txt` full run, exit=0 throughout, tree-wide `check exit=0` |
| Mutation log rows EXACT/JOINED, 0-failed GREEN? rows, receipt | Met | `j-modal-mutations.log.txt` lines 2-99 |
| Case titles present verbatim in the four+ new/changed test files | Met (sampled) | grep hits in `Modal.test.ts`, `ScrollLock.test.ts`, `Isolation.test.ts`, `Backdrop.test.ts`, `Delegate.test.ts` |
| No `.bs.` wire dispatch/listen outside `constants.ts`/guide prose | Met | `j-modal-gates.log.txt` bs-wire-grep block lines 205-213 (all guide-prose rows for other engines and Modal) |
| Forbidden syntax absent in added lines | Met | grep sweep across the eight touched/new source files, no true positives |
| Element guard reads `isInstance(x, HTMLElement)` for invoked checks | Met | `Modal.ts:107`, `Isolation.ts:60/77/84/47` |
| `Modal.ts` is one class plus imports | Met | `Modal.ts:1-453` |
| Barrel exports exactly the claimed names; export-list test matches | Met | `index.ts:11-14`, `index.test.ts` grep |
| Tables frozen | Met | `constants.ts:76-131` all `Object.freeze` |
| `plugin` row `shipped`, Proof `Modal.test.ts` | Met | `guides/veneer.md:6017` |
| Substitution-table terms absent from added prose | Met | grep swept `guides/veneer.md`, `Modal.ts`, `Backdrop.ts`, `Isolation.ts`, `ScrollLock.ts`; no hits |
| Shared-file patch names only `types.ts`/`guides/veneer.md` | Met | `j-modal-patches/j-modal-shared.diff` header lines |
| Report records no `prove` call | Met | `j-modal-report.md:3` |
| Compatibility-table whitespace-only re-padding outside Modal row | Met on sample, not exhaustively verified | `j-modal.diff` lines 478/691 (Collapse) and 484/697 (Toast) identical content, padding differs; the other five pre-existing rows were not individually diffed — **re-dispatch**: verify the remaining five rows (Dropdown, Tab, ScrollSpy, Alert, Carousel) with `git diff -w` inside the worktree to close this fully. |

## Referrals

- Claim 2's and claim 3's assertions about door-timing correctness (whether every write is truly followed by a door read in the order Bootstrap's source uses) are a behavioral-sequence judgment, not a mechanical one — refer to the objective lane (`analyst`).
- Claim 7's assertion that `#### Modal` "is true of the source and of modal.js" is a prose-truth judgment — refer to the subjective/objective lanes per the guide's Falsification law (a substring check does not establish behavioral truth).
- The Isolation/backdrop-exception ancillary deviation and the inline modal-vocabulary-type ancillary choice (both flagged "known before the round" in the claims file) are design-judgment items for the reviewer, not mechanical findings.

VERDICT: PASS
