# Browser audit verdict — falsify round `browser-audit`

Subject: the browser engine of `@orkestrel/veneer` at veneer `main` `1e383be` (2026-10-02). Claims: the fourteen in veneer `tmp/units/browser-audit-claims.md`. The round decides whether stage A is accepted as landed or a fix unit opens first.

Ruling: `FAIL`. A fix unit (`browser-fix`) opens with the findings carried in § Carried.

## Lanes

| Lane       | Role       | Engine          | Mode                                                                                           | Verdict                                                          |
| ---------- | ---------- | --------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| subjective | `reviewer` | Claude Opus 5.5 | native Agent tool, read-only, no shell; 155 citations, 4 Bootstrap short names resolved by hand | `FAIL 1, 3, 5, 10, 12, 13, 14; outside: O1, O2, O3, O4, O5`      |
| objective  | `analyst`  | GPT-6 Astra     | `codex exec` at `danger-full-access` (the Windows sandbox blocks the shell at `workspace-write`); one Chromium probe of 20 cases, deleted before return, tree clean; 72 citations, 0 unresolved | `FAIL 1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 14; outside: none` |

No lane was skipped. The verdicts are kept verbatim at veneer `tmp/units/browser-audit-reviewer-verdict.md` and `tmp/units/browser-audit-analyst-verdict.md`, with the analyst's probe output at `tmp/units/browser-audit-analyst-output.txt`.

## Reproduction

The Orchestrator reproduced every runtime finding in its own Chromium probe (veneer `tmp/units/orchestrator.probe.test.ts.txt`, run log `tmp/units/orchestrator-probe-run.log`, 2026-10-02), each beside a control, and the structural findings by reading the cited lines.

| Probe | Finding                                                                                        | Reading                                                                                                   | Control                                                       |
| ----- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| P1    | an open dropdown whose menu is removed makes the next click throw `Dropdown toggle requires a menu` from the clear path and routes nothing | errors 1, `show.bs.collapse` 0                                                                            | menu kept: `show.bs.collapse` 1                               |
| P2    | a scope rooted at the toggle element never clears it on an outside click                       | menu still shown after the outside click                                                                  | the dropdown proofs' wrapper-rooted scope closes              |
| P3    | a factory call boots a document scope (an outside tooltip's `title` moved to `data-bs-original-title`); the tab adapter is absent until `createEngine`, and the implicitly booted scope never boots again | moved `hello`; active tab unregistered before and after `createEngine(document)`                          | —                                                             |
| P4    | a modal without `fade` given `show(); hide()` in one task                                      | Bootstrap `show, shown, hide, hidden`; engine `show, shown`, phase `shown`                                | `hide()` on a hidden modal emits nothing on either side        |
| P5    | a dropdown destroyed from its toggle's focus listener                                          | `destroyed` true, `shown.bs.dropdown` 1, `aria-expanded="true"`, menu shown                               | —                                                             |
| P6    | a destroyed modal's data API focus listener                                                    | `hidden.bs.modal` on the old host moves focus from an outside button to the opener                        | an unrelated event leaves focus alone                         |
| P7    | a delegated tooltip's child lifetime                                                           | the registered child is a `Tip`; two optionless `createTooltip(child)` calls return two new unregistered objects | a plain host returns one identity                             |
| P8    | `data-bs-offset="a,b"`                                                                         | the engine's menu sits 2 px below Popper's                                                                | `"0,0"`: 0 px                                                 |
| P9    | a `scale(1.5)` containing block                                                                | 1.5 px vertical difference against Popper, same placement                                                 | unscaled: 0 px                                                |
| P10   | the recorder's `aria-*` whitespace normalisation                                               | `aria-label="two  words"` against `"two words"`: 0 differences                                            | a planted class: 1 difference                                 |

Evaporated: the reviewer predicted that deleting `this.#position?.destroy()` in `src/browser/Tip.ts` reddens no proof; the mutation reddens the Tooltip and Popover `manual insertion` cases (2 failed of 248, `tmp/units/tip-mutation-run.log`), so the instrument catches it through the trigger's `anchor-name` attribute reading. The reviewer's "attacked and held" note that the engine routes once for a target an earlier capture listener removed is a misreading: the analyst measured zero dispatches, and Bootstrap's delegation (`node_modules/bootstrap/js/src/dom/event-handler.js:106`) walks the live parent chain and also dispatches zero.

## Rulings per claim

1. Claim fault. Both engines dispatch nothing for a trigger inside an open shadow root or a trigger an earlier listener detached, because Bootstrap's delegation walks the live parent chain from the retargeted `event.target`. The engine equals Bootstrap. The analyst's proposed fix (select the trigger from the composed path) would depart from Bootstrap and is refused. The successor claim reads "equal to Bootstrap".
2. `CONFIRMED` by both lanes (the analyst with real `Button` subclasses throwing in teardown).
3. `BROKEN`: a removed menu throws from the clear path and kills routing (reviewer); a scope rooted at the toggle never clears (analyst). Both reproduced. Carried as F1.
4. `BROKEN` (analyst) with the reviewer's O1 and O2 as the cause: factories boot a document scope as a side effect, the tab and collapse adapters install only inside `createEngine`, and an implicitly booted scope never boots again. Reproduced (P3). Carried as F2.
5. `BROKEN`: the modal completes asynchronously without animation where Bootstrap completes synchronously (both lanes; P4); a dropdown destroyed from its focus listener writes after destroy (analyst; P5). Alert, Button, Carousel, Tab, Tip, and Toast already complete synchronously without animation; Collapse and Offcanvas always wait as Bootstrap's do. Carried as F3.
6. `CONFIRMED`: the analyst measured focus wrapping, the two-modal focus against the oracle, and both lock release orders; the reviewer's `UNRESOLVED` is settled by that run.
7. `BROKEN` (analyst): `activateOverlay` and `restoreFocus` arm one-shot listeners that outlive the component; Bootstrap's `dispose` removes its namespaced one-off listener. Reproduced (P6). Carried as F4.
8. `BROKEN` (analyst): delegated tip children are `Tip` instances and the tooltip and popover factories settle only against their subclass. Reproduced (P7). Carried as F5.
9. Claim fault: the claim required `data:text/html` removed; Bootstrap's `SAFE_URL_PATTERN` admits the `data:` scheme and the engine's pattern is identical, so parity holds. No change. The reviewer confirmed the sanitizer line for line.
10. The lanes answered different questions. The analyst confirmed containment and the documented defaulting; the reviewer attacked parity with Popper: a non-finite offset part resolves to the engine's default distance where Popper applies 0. Reproduced (P8). Parity rules. Carried as F6.
11. `BROKEN` (analyst): under a `scale(1.5)` containing block the correction lands 1.5 px off, because it is computed in viewport space and written as a local translation. Reproduced (P9). The translated containing block, the oversized menu, and the partly clipped reference held. Carried as F7.
12. `BROKEN` (both): fifteen departure rows (`mistyped-input`, `input-functions`, `popper-callbacks`, `event-detail`, `transition-wait`, `transition-abort`, `registry-plugins`, `tip-boot`, `overlapping-locks`, `saved-attributes`, `anchor-placement`, `inline-arrow`, `config-popover-flip`, `popper-visibility-attributes`, `placement-restore`) are read by no comparison, because every `readDepartures` caller filters by a family prefix; the recorder re-joins every `aria-*` value by whitespace (P10). The recorded event list is a fixed set, which the guide must state as the bound. The Tip teardown mutation prediction evaporated. Carried as F8.
13. `BROKEN` (both): fixed `waitForDelay` sleeps gate completions in the Collapse, Tab, Carousel, Modal, Offcanvas, Toast, and Alert proofs; the error codes `ENGINE_DESTROY` and `TIP_HIDDEN` are asserted by message only and `DROPDOWN_MENU` has no proof; the family proofs import source files rather than the barrel. Carried as F9 and F10.
14. `BROKEN` (both): guide sentences that overstate (reduced motion, "each `*.bs.*` event", "measures both values", "proven equal under this table", the roadmap's "every transcript difference"), the `EngineAdapter.clear` and `Engine` sentences, `null` for absence in `LockSnapshot`, the mutable `CONFIGURED` and `DROPDOWN_ROUTES` exports (O3), the missing error contract (O4), and the two meanings of `EngineScopeInterface.component` (O5). Carried as F2, F8, F10, and F11.

## Carried into `browser-fix`

F1 dropdown menu kept at construction and the root included in clearing; F2 one adapter install rule, factories that never boot, ownership by creator, `EngineInteraction.owner`, the configured mark private to the registry, uniform constructor order; F3 synchronous modal and backdrop completion without animation, the dropdown reentrancy check as a declared departure; F4 the focus restoration guarded by the component's lifetime; F5 tip factories settling against `Tip`; F6 a non-finite offset part as 0; F7 the placement correction under a scaled containing block; F8 shared-mechanics rows bound to comparisons, a table-wide consumption assertion, exact `aria-*` values outside ID references; F9 condition waits, error codes asserted, barrel imports; F10 the errors kind file; F11 the type, doc, guide, and roadmap corrections, the lock priority restoration declared as a departure row. The fix brief carries each item's bound.

## Dropped on the record

- Reviewer claim 1 fix (a guide sentence about shadow roots): the engine equals Bootstrap; a sentence about equal behaviour is not a departure. Dropped.
- Reviewer item 12's Tip teardown mutation: evaporated under the run.
- Reviewer "attacked and held" routing-once note: refuted by the analyst's measurement and Bootstrap's source.
