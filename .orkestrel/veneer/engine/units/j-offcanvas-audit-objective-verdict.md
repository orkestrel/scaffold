# J-OFFCANVAS audit round 1 — the objective lane's verdict (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d3d8-b27e-79d2-af42-3ea4359b68f7`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-offcanvas-audit.jsonl` (launch copy under `tmp/codex/`); 38 commands; 655 s; usage {"input_tokens":4667902,"cached_input_tokens":4455808,"cache_write_input_tokens":0,"output_tokens":18021,"reasoning_output_tokens":8159}. Retained verbatim from the exec's last message.

---

OBJECTIVE lane — source review against the supplied execution evidence. Novel runtime attacks below were not executed.

1. **CONFIRMED — Construction.** I attacked partial backdrop overrides, malformed attributes beneath overrides, invalid selectors, duplicate ownership, an already-aborted lifetime, and stale `shown` state. The constructor preserves the independently resolved backdrop paths, validates before claiming, binds signal-scoped listeners, and writes no DOM state. `shown` reads the token directly. Evidence: `src/browser/Offcanvas.ts:109`, `:137`, `:173`, `:205`; `helpers.ts:217`, `:265`; `parsers.ts:218`.

   The construction observer and listener assertions distinguish added construction writes or missing bindings (`tests/src/browser/Offcanvas.test.ts:123`). The option, coercion, vocabulary, ownership, and abort cases distinguish ignoring constructor precedence, skipping validation, permitting duplicate ownership, or dropping abort handling (`:554`, `:604`, `:723`, `:773`, `:796`, `:823`). The mutation rows for default scrolling, unconditional backdrop, unconditional Escape, and missing abort subscription bind those specific assertions; they do not establish unrelated constructor properties.

2. **BROKEN — The claim incorrectly puts `reflow` inside `#apply`.** [Offcanvas.ts:248](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/offcanvas/src/browser/Offcanvas.ts:248) calls `reflow(host)` directly. This is a claim correction, not an engine defect: the helper performs a native layout read (`helpers.ts:124`), so the supplied reaction model does not require a write door there.

   The remaining show sequence withstands the source attacks. With `H0` meaning live and lacking `shown`, and `H1` meaning live and carrying it, the sequence is:

   `refusal → show dispatch → refusal → snapshot → ScrollLock/H0 → backdrop start → aria-modal/H0 → role/H0 → layout read → showing/H0 → shown/H1 → await/H1 → remove showing/H1 → Isolation/H1 → focus/H1 → completed event → recorded resize`.

   A reentrant call during a write is refused by `#changing`; an opposing token mutation fails the corresponding door; destruction fails the lifetime check. Construction failures additionally release the newly constructed mechanism. Pre-change dispatch permits the inner call to start, then refuses the outer call on its second read. Completed-event reentry starts a new change legitimately. Evidence: `Offcanvas.ts:209`, `:224`, `:246`, `:254`, `:339`.

   Proof binding:

   | Proof | Mutation and distinguishing assertion |
   |---|---|
   | Reentrant show, `Offcanvas.test.ts:1321` | Remove the post-dispatch refusal: outer/inner results and the event sequence distinguish it. |
   | Write takeover matrix, `:1071` | Remove each aria-modal, role, showing-addition, or showing-removal door: the document observer detects the next write. |
   | Destruction matrix, `:996` | The reported joined failures bind the affected matrix case, not every iteration independently; the loop stops at its first failed assertion. |
   | Lock-construction takeover, `:1557` | Remove construction cleanup: body style or compensation remains. |
   | Isolation-construction takeover, `:1522` | Remove construction cleanup: inert claims or later observation remain. |
   | Shown-token reversal, `:1383` | Remove the shown-write door: awaiting the slide loses the assertion that the transition is still running when the call returns. |
   | Slide-in destruction, `:648` | Remove the post-await door: subsequent host writes reach the observer. |
   | Focus destruction, `:1224` | Remove the focus door: the independently registered completed-event listener receives `shown`. |
   | Same-task insertion, `:232` | Remove `reflow`: the required transform transition is absent. |
   | Ordinary slide/fade, `:200`, `:267` | Remove transition waiting or either fade wait: recorded completion order differs. |
   | Reduced motion, `:251` | Creating a transition under reduced motion fails the animation assertion; the skeleton red alone does not isolate that mutation. |

   Smallest correction: remove `reflow` from the claim’s enumeration of `#apply` steps.

3. **BROKEN — A stopped hide can still remove its backdrop.** The panel starts `backdrop.hide()` before removing `shown` (`Offcanvas.ts:296`). A custom-element reaction to that token removal can add `shown` back, making the panel’s door return `false` immediately (`:297`). Nevertheless, [Backdrop.ts:80](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/offcanvas/src/browser/Backdrop.ts:80) resumes its independent wait and removes the element at `:82`; neither its lifetime nor its change identity was invalidated.

   This is a concrete source interleaving contradicting the no-further-writes promise in `Offcanvas.ts:64` and `guides/veneer.md:2409`. It also contradicts the documented removal order: backdrop removal can precede the panel’s post-settle attribute removals.

   The existing token-reversal case observes **host attributes only** (`Offcanvas.test.ts:1462`). It cannot detect the backdrop’s later child-list mutation. Its `EXACT` mutation row binds the shown-removal door, not the broader no-further-writes claim.

   The other hide doors have the expected phase readings: isolation release/H1, hiding addition/H1, shown removal/H0, settle/H0, hiding-and-showing removal/H0, aria-modal removal/H0, role removal/H0, and lock release/H0 (`Offcanvas.ts:279`). Their controls bind as follows:

   | Proof | Mutation and distinguishing assertion |
   |---|---|
   | Reentrant hide, `Offcanvas.test.ts:1352` | Drop post-dispatch refusal: results or event sequence differ. |
   | Focus return destroys panel, `:1245` | Drop isolation-release door: subsequent writes reach the document observer. |
   | Takeover matrix, `:1071` | Drop hiding-addition, hiding-removal, aria-modal-removal, or role-removal door: subsequent document mutations are recorded. |
   | Slide-out destruction, `:1142` | Drop settle door: host cleanup writes occur after destruction. |
   | Customized-body release, `:1276` | Drop lock-release door: `hidden` is dispatched after destruction. |
   | Stopped-show cleanup, `:1383` | Remove only `hiding`: the final token assertion exposes leftover `showing`. |
   | Fade ordering, `:267` | Omit the hide fade wait: `hidden` precedes the deliberately longer fade. |

   Smallest correct repair: make backdrop removal a commit authorized after the panel’s post-settle door, while preserving concurrent fading. Another panel check after starting `Backdrop.hide()` cannot cancel its later removal. This requires a bounded shared-mechanism change and a document-level child-list assertion.

4. **UNRESOLVED — The universal containment explanation lacks the required hit-testing evidence.** The supplied trusted-press test proves its HTML fixture: the recorded target is the fixture root, an inside press does nothing, static dismissal emits `prevent`, and absent backdrop does nothing (`Offcanvas.test.ts:465`).

   The untested attack is a painted SVG sibling beside the panel: place an SVG rectangle at the test’s outside-panel coordinate, directly under the panel’s parent. `Isolation` skips non-HTML siblings (`Isolation.ts:97`), while making the backdrop inert. The platform specifies that inert hit-testing behaves as `pointer-events: none`; it does not promise retargeting to the backdrop’s ancestor. The SVG rectangle is therefore a candidate non-inert target that does not contain the backdrop and is rejected by `Offcanvas.ts:385`. This is an inference from source and the [HTML inert-subtree rules](https://html.spec.whatwg.org/multipage/interaction.html#inert).

   Settle it with a trusted Chromium press recording `event.target`, backdrop connectivity, inert state, and resulting hide/prevent events. Use the existing HTML fixture as the control. Until then, the ancestor-containment claim is not confirmed.

   The existing controls bind their narrower claims: direct-target-only matching breaks the recorded-root press; unconditional hiding breaks static dismissal; removing the shown guard breaks hidden Escape refusal; altering the isolation or scroll conditions breaks the option matrix (`Offcanvas.test.ts:438`, `:465`, `:519`; mutation log `:21–28`).

5. **CONFIRMED — Responsive hide.** I attacked a fixed panel beside a responsive panel, vetoed hiding, and resize during an unfinished show. The listener checks lifetime and shown state, records an in-flight resize, and rereads computed position after the completed show event (`Offcanvas.ts:272`, `:398`).

   Removing the position check hides the fixed control; removing the listener prevents the responsive transition; removing recording or replay leaves the in-flight case without its ordered `shown → hide → hidden` events. The assertions distinguish those mutations (`Offcanvas.test.ts:847`, `:884`, `:908`; mutation log `:29–32`). Prevention remains authoritative.

6. **CONFIRMED — Destruction, within the inherited snapshot bounds.** I attacked destruction during an await, after completed isolation, repeated destruction, and reconstruction after release. Abort releases the signal-bound lock and isolation; the registry releases before the panel snapshot restores; the backdrop is destroyed; repeated destruction returns immediately (`Offcanvas.ts:320`).

   Removing the lock’s signal leaves body locking behind; removing the isolation’s signal leaves inert claims or permits construction to continue after destruction. The restoration and inert-construction assertions distinguish these mutations (`Offcanvas.test.ts:648`, `:700`, `:1475`; mutation log `:33–34`). Unrelated consumer classes and attributes survive.

   This does not certify stronger synchronous restoration guarantees than the audited `HostSnapshot.ts:124` supplies. E13’s inherited restoration limitations remain a landing reconciliation matter, not a new Offcanvas mechanism defect.

7. **CONFIRMED — Delegate mechanism, with bounded proof coverage.** I attacked nested roots, destruction in an earlier button route, destruction inside the other panel’s hide dispatch, disabled toggles, duplicate toggle/dismiss reach, and existing consumer engines.

   The trigger route checks lifetime before preventing, checks the nested-root mark before hiding another panel, then checks lifetime before marking the named host (`Delegate.ts:933`). The shared dismiss route refuses acquisition/driving after destruction (`:670`). E12 counts only would-be constructions and deduplicates Offcanvas reach (`:573`); refusal precedes every route (`:519`). The outer delegate can therefore acquire an unmarked host abandoned by the destroyed inner delegate.

   Proof binding:

   | Proof location in `Delegate.test.ts` | Distinguishing mutation |
   |---|---|
   | Toggle, trigger detail, focus return, `:3759` | Replace toggle with show; remove the hidden focus listener. |
   | Refused-toggle focus, `:3812` | Retain the listener after a false toggle; a later independent hide wrongly focuses the trigger. |
   | Other-panel hide, `:3840` | Omit the hide, or hide the named panel before toggling it; event order/veto assertions differ. |
   | Disabled toggle, `:3900` | Remove disabled checking; an engine is acquired. |
   | Dismissal, `:3925` | Remove dismissal routing; expected hidden events never arrive. |
   | Replacement vocabulary, `:3961` | Ignore the group; default triggers act or replacing triggers/tokens fail. The disabled-reading mutation also directly breaks this case. |
   | Root bound/removal release, `:3999` | Drop the target root; the outside host acquires an engine. Omitting `Offcanvas.find` from discard/release handling would distinguish removal ownership, but the cited target-root row does not prove that separate property. |
   | Nested roots, `:4031` | Drop the early driven-host check; the prevented other-panel hide is requested again. |
   | Destruction during other hide, `:4076`, `:4102` | Drop the post-hide lifetime read; the inner delegate marks the target and deprives the outer delegate of it. |
   | Earlier button destruction, `:4135` | Drop the initial lifetime read; another hide request is recorded. |
   | Destroyed dismiss route, `:4179` | Drop `#reach`’s lifetime check; its consumer-owned panel hides. The supplied instrument contains no matching control for this proof; skeleton success does not bind it. |
   | Same-host conflicts, `:4217`, `:4263` | Omit Offcanvas from preflight; engines are constructed instead of refusal. |
   | Disabled conflict candidate, `:4247` | Count the disabled toggle; the valid button route is incorrectly refused. |
   | Toggle/dismiss deduplication, `:4280` | Replace the Offcanvas set with an array; the click is incorrectly refused. |
   | Route order, `:4303` | Move Offcanvas before Toast; event order changes. |
   | Group validation, `:4340` | Skip group validation; invalid construction succeeds. |

   The corresponding named `EXACT`/`JOINED` rows bind the identified assertions where listed. They do not substitute for missing controls on distinct assertions.

8. **BROKEN — Source-policy and documentation claims are not all true.**

   - **Nested function:** [Offcanvas.test.ts:406](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/offcanvas/tests/src/browser/Offcanvas.test.ts:406) assigns a local arrow function to `hook`. It is neither passed directly as an anonymous callback nor returned directly. This contradicts the claim and `architecture.md`’s function-placement rule. Replace it with direct recorder callbacks or an approved shared test helper.
   - **Backdrop sequence:** `guides/veneer.md:2314` places backdrop removal after panel attribute removal. `Backdrop.ts:82` removes it inside the fade operation before the panel’s `Promise.all` completes. Correct the mechanism and its documentation together under claim 3.
   - **Contract detail:** `types.ts:1377` says the trigger is undefined on every event other than `show`; `Offcanvas.ts:271` and `Offcanvas.test.ts:418` carry it on `shown` too. Name `show` and `shown` in that sentence.
   - **Independent mutation replay: UNRESOLVED.** The required `j-offcanvas-mutations-orchestrator.log.txt` is absent. Its recorded replay would settle this clause.

   The remaining inspected declarations hold: frozen tables, readonly vocabulary groups, barrel export, and guard containment are present. Replacing the related-target check with unconditional acceptance breaks invalid-detail and throwing-accessor assertions (`validators.test.ts:496`, `:533`); removing the barrel export breaks the export inventory (`index.test.ts:109`). The vocabulary assertion is a typecheck proof, not a runtime mutation proof.

   The supplied mutation log contains the claimed row labels, clean restoration runs, matching before/after digests, and `receipt: restored byte for byte`. I independently read current hashes; they match. The instrument checks replacement cardinality, parses named failing cases, and restores bytes in `finally` (`j-offcanvas-mutations.py:240`). Nevertheless, a whole-file `JOINED` row establishes a named failure, not its causal diagnostic, and a matrix failure establishes no result for iterations never reached. The independent replay must retain that distinction.

   The Orchestrator’s established gate exits and owned-file status are accepted as supplied. No gate was rerun or reported as a finding.

9. **BROKEN — The duplicated guards have no separating runtime invariant.** `isModalEvent` and `isOffcanvasEvent` execute identical checks and inspect no wire name (`validators.ts:321`, `:375`). Passing an otherwise valid event under either namespace defeats the attempted justification that separate event maps require separate implementations: namespace selection already belongs to `bindEventMap` (`helpers.ts:55`).

   The landing should adopt one shared guard—proposed name `isRelatedEvent`—over a shared `relatedTarget` detail contract in `types.ts`, update Modal and Offcanvas callers, and remove the old exports without aliases under E6. Carrier: the landing’s shared `validators.ts`/`types.ts` consolidation and its barrel, guide, and test updates.

   The listed Offcanvas methods describe their actions. `parseBackdrop` correctly serves Offcanvas already; its modal-only remarks are incomplete documentation, not a coercion defect. Add the Offcanvas consumer to those remarks in the landing.

**Findings fitting no claim:** none.

**Attacked and held**

- Prevented show/hide leave the observed DOM untouched (`Offcanvas.test.ts:311`). Ignoring cancellation would violate the observer and return assertions.
- Calls during an established transition are refused (`:353`); a completed-event listener starting another change is intentionally allowed (`:1591`).
- Wrong-shaped hook events are rejected (`:385`). The guard’s lack of namespace discrimination is correct because the binder selects the wire name.
- Plain backdrop token writes have no custom-element attribute reaction. The claim 3 defect is the later asynchronous removal, not a missing synchronous reaction door. Custom-element host reactions occur before the decorated DOM operation returns, supporting the host-door tests’ ordering. [HTML custom-element reactions](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions)

**Referrals**

- Reproduce claim 3 with document child-list observation through backdrop settlement before briefing the shared Backdrop repair.
- Supply the SVG trusted-press capture for claim 4.
- Carry claim 8’s concrete source/documentation corrections and claim 9’s shared-guard consolidation into landing.
- Correct the audit brief’s missing `j-w2-terrain-record.md` reference. The available Offcanvas terrain distillate does not make that named artifact present.

**Bounds**

No browser test, build, mutation, source edit, or sub-agent ran. No `prove` invocation or refused call occurred; no probe receipt is claimed. The runtime interleaving in claim 3 is source-derived and requires Orchestrator reproduction. Claim 4 remains undecided rather than being promoted from a hit-testing inference. Other lanes’ verdicts were not read.

VERDICT: FAIL 2, 3, 4, 8, 9; outside the claims: none
