# J-SAMEWAY design round — the subjective lane's proposal (planner on Opus 5.5, native; retained from its notification, 2026-09-24)

**Lane held: subjective** (shape, naming, ergonomics, design fit). Opus 5.5, native `planner`, read-only. It ran nothing. Code facts are read from the worktree at `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration`, which matches `7fd28dc` for the owned files. Every claim about what a user perceives is inferred from the shipped cascade, not measured.

## Design

### 1. Where the host can move the token toward the change's own end

A "door" is a point where the change reads the host again. Before its own token write, every change's door reads the token at its starting side. So a host that writes the end state early stops the change. Cascade used for the inferences: `.modal { display: none }` (`src/styles/components/_modal.scss:44`), `.modal.show .modal-dialog { transform: none }` (`:69-71`), `.fade:not(.show) { opacity: 0 }` (`_fade.scss:22-24`), and the offcanvas state rules (`_offcanvas.scss:54-59`).

**Modal `show`.** The token write is at `Modal.ts:286`. Once any door fails, the show leaves undone every later step: the isolation, the focus move, and `shown.vn.modal`.

| Door (read) | Written when it stops | What a user perceives (inferred) |
| --- | --- | --- |
| Re-read after `show.vn.modal`, `:242` | nothing | Nothing appears; the host is still `display: none`. `modal.shown` is `true`, so the next `show()` is refused. A later `hide()` dispatches `hidden` for a modal that never showed. |
| Scroll-lock construction, `:257` | the lock, then its release at `:258` | Same as the previous row. |
| `open` token, `:264` | lock, `modal-open` | The page stops scrolling and nothing is visible. The lock stays held (E13). |
| Adjustment, `:265` | the preceding plus padding | Same as the previous row. |
| Backdrop fade, `:273` | the preceding plus a shown backdrop | **Trap.** The page is dimmed and locked, and no modal is visible. The Escape listener (`:190`) and the press listener (`:191-199`) sit on a `display: none` host, so the user can't dismiss anything. |
| Append, `:276` | the preceding plus the host in the body | Same as the previous row. |
| `display`, `:278` | the preceding plus `display: block` | The dialog paints with no entrance motion. Markup `aria-hidden="true"` still hides it from assistive technology. The page is not inert, and focus stays on the trigger behind it. |
| `aria-hidden` `:279`, `aria-modal` `:280`, `role` `:281` | ARIA writes up to that door | The dialog is visible and announced, but focus stays behind it and the page behind stays interactive. |

**Modal `hide`.** The token removal is at `:325`. Once a door fails, the hide leaves undone `display: none`, the ARIA writes, the backdrop's removal, the release of the lock and the `open` token, and `hidden`.

| Door (read) | Written when it stops | What a user perceives (inferred) |
| --- | --- | --- |
| Re-read after `hide.vn.modal`, `:317` | nothing | **Trap.** Under `fade` the host is invisible (opacity 0) but still covers the viewport at modal z-index and takes every press. The backdrop dims at 0.5, the isolation keeps the page inert, and focus sits in the invisible host. Escape, a press beside the dialog, and the dismiss button all call `hide()`, which `#refused(false)` rejects (`:405-407`). Without `fade` the modal stays painted and still can't be dismissed. Only `show()` followed by `hide()`, or `destroy()`, recovers. |
| Isolation destruction, `:324` | the isolation released; focus returns to the trigger (`Isolation.ts:127`) | **Pointer trap.** The page is no longer inert, but the invisible host still takes every press. |

**Offcanvas `show`.** The token write is at `Offcanvas.ts:277`. Once a door fails, the show leaves undone the settle wait, the removal of `showing`, the isolation, the focus move, and `shown`. With the `show` token alone the panel slides in.

| Door (read) | Written when it stops | What a user perceives (inferred) |
| --- | --- | --- |
| Re-read after `show.vn.offcanvas`, `:230` | nothing | The panel slides in with no backdrop, no `aria-modal` or `role`, no lock, no isolation, and no focus move. It behaves as if the options were `backdrop: false, scroll: true`. `hide()` still works. |
| Lock construction, `:243` | the lock, then its release | Same as the previous row. |
| Backdrop insertion, `:271` | lock, backdrop inserted | The backdrop's own `show` keeps running and adds its token (`Backdrop.ts:74-81`, read). The page is dimmed and focus is behind the panel. A press on the backdrop still hides the panel. |
| `aria-modal` `:273`, `role` `:274` | the preceding plus ARIA | The panel is announced as a modal dialog, but the page is not inert. |
| `showing` `:276` | the preceding plus `showing` | The `showing` token stays until a later hide clears it (`:333`). |

**Offcanvas `hide`.** The token removal is at `:327`. Once a door fails, the hide leaves undone the settle wait, the removal of `hiding` and `showing`, the ARIA removal, the backdrop's removal, the lock release, and `hidden`.

| Door (read) | Written when it stops | What a user perceives (inferred) |
| --- | --- | --- |
| Re-read after `hide.vn.offcanvas`, `:312` | nothing | **Trap.** The panel slides out and ends `visibility: hidden`. The backdrop stays dimmed and the page stays inert. A press on the backdrop and Escape both call `hide()`, which is refused. |
| Isolation destruction, `:320` | the isolation released; focus returns to the trigger | **Pointer trap.** The backdrop takes every press, and every press is refused. |
| `hiding` write, `:321` | the preceding plus `hiding` (the case from report item 4) | **Pointer trap.** The `hiding` rule keeps the off-screen panel `visibility: visible`, so it stays focusable and in the accessibility tree with `aria-modal`. The backdrop stays dimmed. |

**The other engines** (read; carried as observations, not in this unit's scope):
- **`Collapse`:** the `show` re-read (`:160`), the `hide` re-read (`:210`), and the `hide` size-write door (`:225`, which requires `show` to be present). Its `show` write-stage doors (`:173-187`) read only `collapsing`, so they already tolerate an early host write.
- **`Toast`:** the `show` fade door (`:171`, animated only, when the host started hidden); the `hide` re-read (`:198`); the `hide` transition door (`:207`). This one leaves `showing` stuck, and `#refused()` (`:235-238`) then refuses every later call. That is the most severe case among the other engines.
- **`Tooltip`:** doors `:421`, `:430-432`, and `:441` on the tip it built, plus the `hide` door `:800`. E18 governs these.
- **`Dropdown`:** the `show` re-read `:204` and doors `:216`, `:222`, `:223`, `:224`; the `hide` re-read `:322` and door `:334`.
- **`Tab`:** only the re-read `:163`. Its write-stage doors read presence only, so they tolerate an early write.
- **`Carousel`:** has no `shown` token. The equivalent is the incoming item's `active` token, which the re-read `:328` and every door before `:475` read as absent.

### 2. Ruling: option A, stated as one rule with E22

**The rule.** The host's `shown` token is the state the host chose. Every write the engine owns ends up agreeing with it:
- **Before its own token write**, a change reads only its lifetime and whether a call of its own took over.
- **At the token step**, the change writes the token only when the host has not already written it.
- **From that step on**, the token must stay at the change's end.
- **If the token then leaves that end**, the change returns its writes and dispatches nothing (E22).
- **If the host wrote the token first**, the change completes every other write and dispatches its completed event.

The completed event fires exactly when the engine's writes reach the state the event names. The engine never writes the token itself, against the host or on top of the host's own write.

**What a consumer sees under A.** A normal pair of events: `show` then `shown`, or `hide` then `hidden`. `show()` and `hide()` resolve `true`, or `false` when a completed-event hook destroys the engine, as they do today at `:309` and `:373`. An early host write is not a takeover. Retire the phrase "a takeover in the change's own direction" (E22 amendment 4), so that "takeover" keeps one meaning: the token moved against the change.

**Mechanism.**
- **Pre-token doors:** `#holds(shown: boolean | undefined)` takes the form E18 gave `Tooltip` (`Tooltip.ts:540-549`). Every pre-token door passes `undefined`, which reads the lifetime only. That covers Modal `:257`, `:264`, `:265`, `:273`, `:276`, `:278-281`, and `:324`, and Offcanvas `:243`, `:271`, `:273`, `:274`, `:276`, `:320`, and `:321`. Post-token doors keep their boolean.
- **Token steps:** Modal `:286` and `:325` and Offcanvas `:277` and `:327` write only when `this.shown` differs from the change's end. A `DOMTokenList` write re-sets the attribute even when the value is unchanged (inferred from the DOM specification), so a same-value write would run the host's reactions again.
- **Re-read after the pre-change event:** it stops reading the token. It still stops for a destroyed engine, for `#changing`, and, in `Modal` only, when a listener's own call completed inside the dispatch. `Modal` detects that by reading `#change` before the dispatch and comparing it afterwards. It does not take the identity before the dispatch, as `Toast` does (`Toast.ts:156-161`): a call prevented inside a returning-step reaction would still move the identity and silently stop E22's step.
- **Dead code to delete (E6):** the lock-construction takeover branches (Modal `:255-260`, Offcanvas `:241-246`) can then fail only on destruction. Delete the takeover comment. Keep `lock.destroy()` only if the proof at Modal test `:1805` needs it.
- **Prose to rewrite:** the class TSDoc (Modal `:60-62`, Offcanvas `:65-67`); the `@returns` sentences at `types.ts:1390`, `:1400`, `:1536`, and `:1546`; and the guide door paragraphs (`guides/veneer.md:2142-2147` and `:2521-2526`). At `:2555`, the lock clause goes and the isolation clause stays. Draft guide sentence: "Before its token write a call reads only the modal's lifetime, so a host that writes the `shown` token first has made that write for the call: the call skips it, completes every other write, dispatches its completed event, and resolves `true`."

**Precedent (read).** `Tab`'s write-stage doors and `Collapse`'s show write-stage doors already read only what the change needs to keep, and complete through an early host write.

**Option D, weighed and refused.** D returns the change's writes to the start state while the host keeps `show`. That rebuilds the stale state of Modal `:242`: `shown` is `true` over a `display: none` host. It contradicts the token the host chose, which is E22's premise.

### 3. Proofs

Model each case on the H1 and H2 row matrices. Put the row tables in `tests/setupBrowser.ts`, as the tests.md data-table rule requires and E21 applied. Each row asserts what the user perceives after the settle wait: the resolved value; computed `display`, or computed `transform` and `visibility`; `aria-hidden`, `aria-modal`, and `role`; the backdrop's tokens and opacity; the hit target from `elementFromPoint`; `modal-open` and the body overflow; whether a sibling button is inert; `document.activeElement`; the event list; the host's class reactions that report an unchanged value.

**Planned cases.** Every row in the S cases is red on `7fd28dc` (inferred: each resolves `false` with no completed event). The unit records the command and the failing count.

| Case | Rows (driven the way existing cases drive them) | Named mutations (on the new code) |
| --- | --- | --- |
| Modal S1 "completes a show whose `shown` token the host writes first, at each door before the show's token write" | `event` hook; `lock` (custom element whose `style` reacts, as at test `:1860`); `open` (customized body, as at `:1917`); `adjust`; `backdrop` (observer); `append` (`connectedCallback`); `display`, `aria-hidden`, `aria-modal`, `role` (host reactions) | the terrain's token-reading door reddens the matching row; completion without `shown` reddens the event list; an unconditional token write reddens the unchanged-value reaction count; a re-read that reads the token reddens the `event` row |
| Modal S2 "completes a hide whose token the host removes first" | `event`; `isolation` (the `inert` reactor from H2); each with and without `fade` | same set |
| Offcanvas S1 | `event`, `lock`, `insertion` (held backdrop, as at test `:1285`), `aria-modal`, `role`, `showing` | same set |
| Offcanvas S2 | `event`, `isolation`, `hiding` | same set |
| Modal S3 and Offcanvas S3 "return a show whose token the host wrote first to the hidden state when the host drops it after the token step" | early write at `role`, then drop in the focus listener | a post-token door that reads `undefined` reddens S3 and H2 |
| Modal guard "runs one show and one `shown` when a listener's `show` completes at once" | `backdrop: false`, no `fade` (the nested show runs synchronously) | green on `7fd28dc`; dropping the identity comparison reddens it with a second `shown` event |

**Existing cases A makes false:** Offcanvas "stops each write sequence at the door after a write whose reaction takes the change over…" (the rows `show`/`aria-modal`, `show`/`role`, `show`/`showing` present, and `hide`/`hiding` present); Offcanvas "writes only the return to the state the host chose after a reaction to a backdrop write…" (the row `show`/`insertion`/`token`); Modal and Offcanvas "releases the scroll lock it constructed when a reaction inside the construction takes the show over". Strike each of these. Its door moves to an S row, so each door has one home.

## Alternatives

- **B: complete without the completed event.** A modal ends fully shown and `shown` never fires. `show()` then has to resolve either `true` without its event, which breaks the `@returns` contract, or `false` while the modal is shown. A consumer who resets a form on `hidden` never learns the modal closed. Rejected.
- **C: stop and state the limit.** This leaves the traps in section 1: Modal `:273`, `:317`, and `:324`, and Offcanvas `:312`, `:320`, and `:321`. In each, the user sees a dimmed, often inert page that every dismissal refuses. A stated limit can't make a dead page usable. Rejected.

## Units

**J-SAMEWAY**, role `opus`, engine Opus 5.5 (native). Routing: the work class is objective, which would normally go to `sol` on Astra; Bench law 5 routes it native because the proofs need a browser the Astra bench sandbox can't launch (as E23 routed J-GUARDS). Base: the `main` tip after J-INTEGRATION and then J-GUARDS land; J-GUARDS owns the guard import (Modal `:36`, Offcanvas `:34`), the `bindEventMap` calls (`:189`, `:191`), the `types.ts` detail types, and the guide event-table sentences at `:2131` and `:2511`, which share every file this unit edits, so the units run serially. Owned: `src/browser/Modal.ts`, `src/browser/Offcanvas.ts`, `src/browser/types.ts` (the Modal and Offcanvas `show` and `hide` `@returns` sentences only), `tests/src/browser/Modal.test.ts`, `tests/src/browser/Offcanvas.test.ts`, `guides/veneer.md` (the door paragraphs in `#### Modal` and `#### Offcanvas` only). Shared, report-only patch: `tests/setupBrowser.ts` for the row tables. Off-limits: `Backdrop.ts`, `HostSnapshot.ts`, `Isolation.ts`, `ScrollLock.ts`, `helpers.ts`, `validators.ts`, `constants.ts`, `Delegate.ts`, every other engine. Acceptance, cheapest first: scoped `check`, oxlint, oxfmt; no pre-token door reads the token and each token step writes only when the host has not; S1 and S2 red on `7fd28dc` then green; S3 and the Modal guard green; each named mutation reddens its case; H1, H2, and lifetime cases unchanged and green; only the struck cases change; the TSDoc, `@returns`, and guide state the one rule and no sentence calls an early host write a takeover; the dead lock branches gone; `test:guides` green; the whole `test:src:browser` as an observation. The unit's first measurement: whether Chromium 153 runs `attributeChangedCallback` for a `class` write with an unchanged value. Audit: `analyst` on Astra (objective), `reviewer` on Opus 5.5 (subjective), `checker` for the struck-case list and the prose sweep. Gates: `verifier` on Sonnet. The other engines' early-write doors: no carrier chosen yet; the `Toast` stuck `showing` token goes first.

## Tensions

- `show()` resolves `true` when the host wrote the token, so the resolved value mirrors the completed event; the other lane may argue `false` means "this call didn't write the token".
- The identity comparison is in `Modal` only: every Offcanvas change awaits before it clears `#changing` (`:278`, `:330`), so a nested call is still in flight at the re-read and an Offcanvas identity read could never be observed by a test.
- Row tables go in `tests/setupBrowser.ts`, per the rule; the H1 and H2 rows sit inline and are not moved here.
- Readings the dispatch did not supply: the red counts on `7fd28dc`; the unchanged-value class reaction in Chromium 153; whether the test host's scrollbar geometry makes `#adjust` write; a capture of the trap states in section 1, which are inferred, not measured.

## Risks

- Unobservable skip: if Chromium skips reactions for a class write with an unchanged value, the "writes only when the host has not" criterion can't be observed; the unit's first probe settles this.
- No entrance motion: a host that writes the token while the modal is `display: none` gets no entrance motion; the guide states this.
- Stale test assertions outside the struck list: the unit finds the full set by running the owned files.
- Identity timing: taking the identity before the dispatch, as `Toast` does, would break E22's returning step on a prevented nested call; the design compares identities instead.

PROPOSAL: Rule option A as one rule with E22. The host's `shown` token is the state it chose. Before its token write a change reads only its lifetime and whether its own call was taken over, and skips a token write the host already made. It then completes and dispatches its completed event. After its token write it returns its writes when the token leaves its end. Implement this in one serialized `opus` unit after J-GUARDS, proved by per-door completion matrices that are red on `7fd28dc`.
