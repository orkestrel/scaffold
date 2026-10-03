# Stage B verdict check

**Do not record the verdict unchanged.** The proposed opt-in architecture is implementable, but its modal lifetime, public inventory, refusal evidence, and unit assignments need corrections. The browser readings support intrinsic growth and transformed-clip escape. They also establish the tooltip paint limit and expose a stage A visibility difference whose proposed repair is not sufficient.

The subject is `tmp/units/stage-b-wide-agent-6.md`, checked against `419245d6fe72cc74eebd228e29f8a5fc5fe89f02`. References to `sbm` mean `tmp/codex/stage-b-measurements.md`; `D3` means `tmp/codex/browser-stage-b-design-verdict.md` § D3. The fresh readings and exact probe source are retained in `tmp/codex/stage-b-verdict-check-measurements.json`.

## W1: subjects and mechanics

### Claims confirmed

The cited measurements establish the following, within their recorded fixtures:

| Claim | Evidence and boundary |
| --- | --- |
| Dialog normalization can match the sampled ordinary modal boxes; native opening adds modality and autofocus. | D3 `dialog-modal` and `oracle-dialog-stage-b`; `sbm` §§ 2 and 4. This is recipe evidence, not acceptance of an implemented Modal leaf. |
| Native close cancellation cannot replace every Bootstrap hide gate. | `sbm` § 1: auto/hint popovers have no cancel veto; dialog cancelability depends on activation and repetition. Dropdown Escape interception is an explicit exception. |
| `closedby="none"` plus the existing key path is a viable desktop design. | D3's Escape reading. Script `requestClose()` and native commands still require separate routing. |
| The classic stable-gutter fixture has double compensation under Bootstrap. | D3 records a 15 px scrollbar, stable layout, and an additional 15 px body padding. The default-launch measurements in `sbm` § 3 measured width zero; they must not be substituted for that classic-scrollbar result. |
| Manual promotion changes stacking, while the normalized geometry can match Popper. | D3 records the dropdown at `(70, 212)` and the normalized tooltip/arrow difference within 0.141 px. Neither reading proves the entire placement population. |
| Numeric and intrinsic vertical collapse animate to the same fixed-content endpoint. | D3 and the feasibility report record the sampled 120 px endpoint and the sheet's 350 ms transition. “Equal motion” means comparable sampled behavior, not identical elapsed times or a speed gain. |
| Until-found requires stylesheet and component-state integration. | `sbm` § 7 records hidden removal and noncancelable `beforematch`, with `.collapse` still hidden and no Bootstrap lifecycle. |
| Named details do not preserve the measured accordion veto; the sampled details animation exposes no usable animation/event completion. | `sbm` § 7. The completion finding applies to that recipe, not every possible details animation. |
| Hint replacement, interest Escape, ARIA reflection, visibility, and movement have the stated semantic differences. | `sbm` §§ 2, 4, and 6. ARIA reflection empties the string attribute; `checkVisibility` differs for skipped content; `moveBefore` preserves native state that `append` loses. |
| Native scrolling controls and View Transitions do not automatically supply Bootstrap's lifecycle. | `sbm` §§ 8–9. View Transition completion is independent, and the measured reduced-motion case retains its pseudo animations. |

The main code seams survive stage A: Modal's display writes are at `src/browser/Modal.ts:197` and `:217`; its private `#dialog` still denotes content; Lock still shares its first acquisition; Collapse derives its transition phase from the inline dimension; Dropdown constructs Placement only on the dynamic branch; Tip positions after insertion and subscribes to the closest modal's hide event. Offcanvas acquires its lock only when scrolling is disabled. The class ownership proposed for these changes is therefore plausible.

### Modal corrections

**The single engine-started flag has an observable race.** The proposed flag spans `close()` until its queued `close` event, and the opening listener ignores native calls while that flag is set. The fresh native probe recorded `beforetoggle(closed)`, then `beforetoggle(open)`, then the earlier `close` event observing `open:true`. An external reopen in that interval would bypass the proposed show gate. A delayed close event also cannot be treated as proof that the host is still closed. Use operation-specific suppression and account for stale completion events; test close/reopen and close/reopen/close before delivery. The native close algorithm queues its event, consistent with this reading; see the [HTML dialog algorithms](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element).

**The `MODAL_OPEN` precheck needs its place in the existing no-op guards.** `Modal.show()` at `:116` returns for a destroyed, visible, or hiding instance. An unconditional open-attribute precheck would throw on a repeated show of the engine's own native modal, contradicting the verdict's mixed-trigger claim that the later command does nothing. Preserve those guards; apply the error to an otherwise accepted opening attempt on an externally open host. Revise the `@throws` text accordingly.

**Rollback is incomplete as written.** Before `#open`, `show()` creates `#showing`, acquires the lock, adds `modal-open`, and writes compensation (`Modal.ts:120`). Returning display to none and releasing the listed resources leaves a showing lifetime and possibly body class/padding writes. Specify rollback of the transition state and every acquisition/write, while preserving another overlay's ownership. Recheck destruction after synchronous native callbacks, including autofocus and `beforetoggle`.

**Forced close must bypass the ordinary hide refusal and settle pending work.** `hide()` refuses while `#showing` is present (`Modal.ts:129`). A forced native close during opening must abort that completion before cleanup, or a later `shown` can describe a closed native host. Also distinguish an already accepted hide from a fresh forced hide, so native events do not duplicate the before-event or `hidden`.

**Noncancelable component events require an inventory change.** `emitEvent` constructs every event with `cancelable:true` (`src/browser/helpers.ts:800`). It has no cancellation option. The existing Modal, Dropdown, and Tip close paths use this helper and consult their normal vetoes. The verdict must specify the shared dispatch contract and forced-completion path; copying dispatch logic into each class would violate centralization. W3 and W5 omit that shared change.

**Synchronous replay itself is feasible.** The fresh probe installed a target listener from document capture, cancelled native `show()`, and called `showModal()` synchronously under a reentrancy marker. The host ended `open:true`, `:modal:true`; the target listener saw the outer and nested opening events. Capture-installed command interception also prevented the native open; the same button without interception opened the dialog. These settle the platform prerequisites, not an unimplemented plugin's full lifecycle.

**The paint limit is now measured.** An ordinary body tooltip over native `.modal-content` painted beneath the content. A manually promoted body tooltip painted above it but remained absent from hit testing. Use an explicit container inside the modal for interactivity; promotion is a potential paint-only remedy. B3/B5 still owe the integrated branch and placement population.

### Lock, Collapse, and floating corrections

**The gutter design preserves `width` correctly, but its footprint must be explicit.** Running the existing loops with compensation zero still writes the body's padding and can save an existing inline padding attribute; it does not omit the entire adjustment footprint. The fresh zero-width control retained `padding-right:7px` and wrote `data-bs-padding-right="7px"`. Decide and document this exact behavior, rather than importing D3's different “omit adjustments and save attributes” proposal. The verdict's loop prescription is implementable; its rows must come from that prescription.

The fresh CDP toggle returned width zero with both `hidden:true` and `hidden:false`. It failed W5's required 15 px control. This does not refute the archived classic-scrollbar result, but it blocks treating B1's proposed instrument as available. Body-gutter, overlay-scrollbar, acquisition-order, RTL, both-edges, and modal-overflow proofs remain required.

**The intrinsic gain is measurable.** After content grew from 120 px to 240 px during the transition, the pixel-path sample was 117.359375 px with endpoint `120px`; the intrinsic sample was 234.71875 px with endpoint `auto`. Both were still showing. The numeric path is the control. This satisfies the narrow gain question, not B4's integration acceptance. Specify the Hold release lifetime and preserve the existing refusal of calls during a transition; B4's “reversal” reading must not silently introduce a different reversal contract.

**Delegated `topmost` needs a helper patch.** `resolveTipOptions` spreads typed options, but `resolveTipDelegate` explicitly reconstructs its output (`helpers.ts:642`) and cannot propagate an added leaf automatically. B5 must supply that source patch and its delegated-child proof.

**The floating gain and fallback are feasible in the sampled fixtures.** A menu at `(60, 92)`, sized `160 × 82`, remained hit-testable outside plain overflow. A transformed overflow ancestor clipped the unpromoted menu; manual promotion restored the hit at the same geometry. Cancelling promotion under the proposed reset left dropdown, tooltip, and popover panels displayed in the ordinary layer. Those measurements support the design, subject to B5's wider geometry and lifetime checks.

**The closed-panel claim contradicts attribute restoration.** Hold must restore an authored `popover` attribute. A restored `popover="manual"` panel can be opened with `showPopover()` while the component is closed; the probe confirmed this. “No native open needs reconciling” and “a closed call throws NotSupportedError” apply only when the original attribute was absent. Specify authored-attribute and already-open-state handling. Preserve stage A behavior when the leaf is absent.

**Cancellation and native exceptions need separate treatment.** W1 disagreement 10 says a cancelled dialog opening reports through `reportError`; the detailed mechanics only report a thrown error. Floating cancellation similarly has no thrown object to report. State cancellation as a defined rollback/fallback result and reserve reporting for actual errors, or declare and document a deliberate error contract.

### Refusals and deferrals

The following evidence needs correction or qualification; retaining a refusal as a scope decision remains possible.

| Refusal or deferral | Correction |
| --- | --- |
| Offcanvas manual and auto popovers share the hide-veto failure cited at `sbm:33`. | That reading tested **auto/hint**, not manual. Manual promotion lacks that automatic close watcher. Refusing manual in favor of a future dialog backend is a design choice, not this measured failure. |
| Toast promotion is refused because an outside toast is inert and container layout changes. | `sbm` § 5 also demonstrates live-region properties surviving manual promotion and promoted stacking inside the modal's interactive subtree. An opted-in page can choose that ancestry/layout. Universal irreconcilability is not established; outside inertness and changed container layout are real limits. |
| `@starting-style` is refused because motion is equal. | The feasibility report and `sbm` § 9 positively show a reconcilable fade, including a reduced-motion recipe. “No measured gain over the retained implementation” supports a scope refusal; incompatibility does not. |
| `:has(dialog:modal)` necessarily unlocks before the transition. | Under this verdict, `close()` occurs **after the host transition**, at `Modal.ts:217`. The conditional root lock would end before the later backdrop completion and Lock release at `:227`. Name that precise gap. The wheel readings show the root overflow strategy works; they do not establish the verdict's timing claim. |
| `scrollIntoView({container})` is proved different from Bootstrap's offset delta by `sbm:117`. | That measurement compares `nearest` against `all`. Research/code supplies the separate comparison with Bootstrap's algorithm. Retain the distinction, but correct the attribution. |
| Details has no completion signal; until-found Bootstrap markup never shows at all. | Limit the first to the sampled recipe. Limit the second to the unreconciled reveal under the sampled CSS: hidden removal alone leaves the collapse closed. These are not universal impossibility proofs. |
| Carousel until-found is refused because forced selection and restored hidden state depart from Bootstrap. | The verdict accepts those same categories of departure for other opted surfaces. Autoplay moving the result is a real extra problem, but no integrated carousel reading proves reconciliation impossible. Label this an explicit scope refusal or give it a gate. |
| `ariaNotify` duplicates speech. | Only accessibility-tree behavior was measured. Refusal to add an unproved announcement channel is supportable; duplicated speech was not demonstrated. |
| Auto/hint, native focus groups, scroll controls, and View Transitions do not reproduce Bootstrap automatically. | Confirmed within their cited cases. These justify retaining the existing mechanism; they do not establish that all opted-in adaptations are impossible. |

Keeping Trap, Backdrop, explicit anchor pairs, token-list description ownership, and the existing transition wait is supported. The declarations-only evidence for `::interest-button`, source-only anchoring, and other unmeasured recipes cannot be promoted to behavioral acceptance. The offcanvas-dialog, until-found, Android Back, and custom-command deferrals name genuine unresolved integration questions; none is an implemented capability at this tip.

## W2: cross-cutting claims

**The stacking and focus distinction is correct.** Native insertion order replaces ordinary z-index ordering among promoted surfaces. Outside inertness must not be inferred to mean invisible paint: the fresh promoted-tooltip reading paints above the dialog while hit testing still excludes it.

**The Tab statement is too broad.** In the fresh embedded-document fixture, an ordinary dialog host with the real Veneer Trap wrapped from the last button to the first when an outside successor existed. Adding native modality made Tab leave the child document. This supports an embedded-frame departure. The original feasibility report expressly leaves standalone wrapping unmeasured; remove the unqualified product-wide “Tab from the last control leaves the document” claim until its document context is proved.

**Native close-event routing does not remove the lifetime obligations in W1.** Keep ordinary user hide vetoes distinct from reconciliation after an irreversible external close. `beforematch` is a reveal notification before the browser finishes ancestor revealing, not an already performed close; describe that future forced-show path separately.

**The transition-wait claim holds at the tip.** `awaitTransition` reads the element's own `CSSTransition` objects, excludes pseudo effects, and does not depend on `transitionend` (`helpers.ts:917`). `TransitionEvent.animation` therefore adds no needed linkage. Normal reduced-motion behavior remains stylesheet-dependent. The independent View Transition clock measured by `sbm` supports refusing a replacement completion model.

**P0 found a stage A difference, but not the prescribed universal repair.** With a visible anchor, both engines' dropdown and body-tooltip panels were hit-testable. After scrolling the anchor out of its scroller:

- Veneer's body tooltip at approximately `(56.734375, 65)` ceased to be hit-testable; Bootstrap's at `(57, 65)` remained hit-testable.
- Setting the Veneer tooltip's computed `position-visibility` to `always` did **not** restore the hit in this fixture, although its `.show` class remained present.
- For a dropdown retained inside the scroller, both engines were initially non-hit-testable after clipping. `always` made Veneer's menu hit-testable while Bootstrap's remained clipped.

Consequently, change P0 from “a positive result writes always” to “a positive result opens a scoped repair investigation with the Bootstrap paint/clipping controls.” A blanket write is not established as sufficient and changes the dropdown control. These are hit-testing readings, not pixel proof of every visibility path.

The mixed-invoker ordering and command-veto claims agree with `sbm` § 10. The router citation must change from the removed `src/browser/Engine.ts` to `src/browser/Veneer.ts:66`; `buildPlugin` still implements creation-only input routes (`helpers.ts:68`). The exact stage B trigger search in `src` and `app` returned no matches at the checked tip. Tailwind's until-found preflight text remains a declaration, not a native reveal invocation.

## W3: opt-in law and public inventory

**The blank-slate composition is preserved by the proposed approach.** At the tip, `Veneer` defaults to an empty plugin list; `createBootstrapPlugins()` is an explicit convenience; tip boot requires its plugin option. `resolvePlugins` replaces a duplicate name in its original position (`helpers.ts:158`), so the sample bundle followed by specialized modal/offcanvas plugins is valid explicit composition. `toggle.vn.button` remains unchanged.

Top-level boolean switches, narrow plugin records, readonly fields, types in `types.ts`, factories in `plugins.ts`, the realm-aware guard in `validators.ts`, and a `VeneerErrorCode` member follow the required structural shapes. `Lock.compensation` adds a real semantic distinction from measured `width`; `LockContext.reserved` records the first acquisition's decision, which cannot safely be recomputed from later CSS.

The inventory nevertheless needs these corrections:

- **Naming:** `topmost`, `intrinsic`, and `reserved` read as assertions. `dialog` and `gutter` are nouns used as behavioral booleans. The verdict's native-surface explanation does not supply the exception required by `scaffold/.claude/rules/names.md` § General vocabulary and its Boolean naming row. Resolve their names or record an explicit overriding ruling; do not claim unconditional conformance. They are not field-for-field transliterations of a native boolean member.
- **Shared events:** add the dispatch contract, helper implementation, TSDoc, guide parity, and tests needed for genuine noncancelable component events. W3 does not contain every public change until that shape is settled.
- **Delegation:** list `resolveTipDelegate`'s changed contract behavior and proof, alongside markup refusal.
- **Factory replacement:** qualify `ModalPluginOptions`' remark. `Registry.settle` retains an existing component for empty options and retains an already explicitly configured component even for later nonempty options (`Registry.ts:99`). The first nonempty factory configuration can replace a plugin-built instance; not every factory call “with options” replaces it. The replacement still resolves Bootstrap markup, so “those options alone” is also imprecise.
- **Frozen plugin configuration:** copy the selected leaves at factory creation, rather than closing over a caller-mutable options object. The proposed B2 caller-mutation case is the correct obligation.
- **Guide execution:** `tests/guides.test.ts` does not execute the DOM fence directly. Its existing boot-fence case pins text to a browser test transcription (`:83`), while the guides project runs in Node. Add the native-surfaces browser transcription and its guide-text pin, with ownership for both files.
- **Claims at the tip:** replace W3's “None … is false” with these corrections. Refresh guide references: event documentation is at `guides/veneer.md:598`, Engine departures at `:678`, and the stage-B status paragraph at `:954`.

The resolvers do ignore unknown markup leaves and retain typed leaves through their spreads. B2's parser/resolver proof can therefore land without changing those resolver implementations merely to admit the options. The separate delegate reconstruction and event-dispatch changes still require `helpers.ts` edits.

Refusing full component options on plugin factories is a scope choice. The law does not prohibit such options categorically; it requires a real consumer and a minimal justified capability. Likewise, a typed option that explicitly requests a root gutter is itself author opt-in. Disagreement 1(d) may be refused for shared-layout policy, but not on the factual premise that the author requested nothing.

## W4: stylesheet hand-off

**The reset-layer placement follows the declared cascade.** `ROADMAP.md:24` orders `reset` before `bootstrap`; normal reset declarations beat the user agent and yield to the lifted Bootstrap layer or unlayered Bootstrap rules. This supports one normalized popover reset without erasing Bootstrap's declared popover border/fill. Until-found still needs importance sufficient to beat Bootstrap's important hidden rule.

The no-Bootstrap-sheet-edit rule, consumer fence, gated float reset, and later transfer into the styles face are consistent. The gutter declaration stays a consumer choice under the recommended leaf, and the intrinsic mechanism needs no shared stylesheet declaration.

Correct these hand-offs:

- `ROADMAP.md:146` already says styles opens after browser stage B. W4's claim that it still says after stage A is false at `419245d`.
- The proposed fence matches `dialog.modal` without testing a component option. Loading it also normalizes a dialog whose leaf is off. Distinguish opting into a stylesheet from opting into component behavior; the no-leaf control cannot be claimed byte-equal to a page that lacks the fence. The verdict's closing request for a default-reset ruling correctly recognizes this coupling.
- Carry the measured paint limit into the guide and styles hand-off. Do not replace it with hit-order evidence.
- Keep D-1/D-3/D-6 and identity values as proposals, as the verdict labels them. The unavailable styles-lane report cannot independently corroborate its attributed agreement; the restated decisions are reviewable proposals, not a missing report reconstructed as evidence.
- D-1 also needs an explicit law reconciliation: `scaffold/.claude/rules/styles.md` § Folders places element styling in `elements/`. Moving tag looks into `_reset.scss` goes beyond user-agent neutralization. A user ruling can override that placement, but the verdict must identify the conflict rather than present it only as taste.

## W5: units, ownership, and controls

**The broad order is workable.** Stage A is landed at the required tip. Combining Modal, Lock, and Offcanvas avoids competing writers to Modal. Gated contracts can remain held patches until their gain reading passes. B1's setup ownership, B2's wiring ownership, the disjoint family class files, and B6's integration file exist.

The assignment table is incomplete in these places:

| Unit or shared change | Required correction |
| --- | --- |
| B3 forced events | Assign its `helpers.ts` dispatch patch, the associated contract slice, and `helpers.test.ts` proof. The statement that helpers needs no edit applies only to markup projection. |
| B4/B5 plugin configuration | `plugins.ts` and `plugins.test.ts` are owned by the earlier B2, but later gated units must add intrinsic/topmost construction options. Make these explicit held/report-only patches with a serial applier, or schedule a successor wiring owner. |
| B5 delegated tips | Assign the `resolveTipDelegate` patch and proof in the shared helper files. |
| `MODAL_OPEN` proof | W3 names `tests/src/core/errors.test.ts`; W5 assigns it to nobody. Assign it if a meaningful error behavior needs it, rather than adding a code-enumeration-only test. |
| Executed guide fence | Assign `tests/guides.test.ts` and a browser transcription file. B7 owning Markdown alone does not implement W3's proof. |
| B1 setup checks | Run the touched `setup:browser` and `setup` proofs/projects. `test:src:browser` does not collect those root setup proofs. |
| P0 versus B5 | Serially land and rebase any Placement repair before B5 writes Placement. Replace the prescribed repair with the measured seam and acceptance control. |
| B0 verification | Keep the expected temporary Lock diagnostics explicit. An expected intermediate type failure is not a passing contract gate. |

The gate/control audit is as follows:

| Gate | Control and falsifiable outcome |
| --- | --- |
| P0 | Visible anchor is a useful control. Add the ordinary Bootstrap clipped case and wait for rendering before hit testing. The fresh dropdown control shows why a universal `always` change is unsafe. |
| B1 readers/fence/pixels | The proposed wrong-value, raw-dialog, and known-paint controls can fail. The classic-scrollbar control actually failed here: width stayed zero. Resolve the instrument before accepting gutter evidence. |
| B2 capture installation | “Against a control” is underspecified. Name the unintercepted command/open action and the cancelled action. The fresh readings establish both platform outcomes. |
| B3 | The listed host, leaf, gutter, and ordinary-modal controls are appropriate. Expand the race/rollback cases from W1. Define P12 and P6 inline or give an exact source; those labels are not defined by this verdict. |
| B4 | Explicitly pair changing-content intrinsic and numeric paths, and add an unchanged-content equality control. Horizontal/leaf-off cases remain regression controls. The fresh growth reading is positive. |
| B5 | Pair the transformed clipped unpromoted panel with promotion, plus plain overflow and leaf-off/static controls. The fresh escape reading is positive; full family geometry remains outstanding. |
| G1 | No control is named. Add a Bootstrap `div.offcanvas` driven through the same options and breakpoint crossings, plus the dialog without the backend. |
| G2 | No control is named. Add ordinary hidden content and until-found without the correcting fence/handler, alongside an already-visible target. Name the reveal, sibling, scroll, and re-hide readings that fail the gate. |
| G3 | Escape is a useful comparison, but it cannot prove that Android Back reached the device/browser close mechanism. Add a Back-responsive native positive control and a no-watcher comparison. No Android reading was made in this check. |
| G4 | An active pane establishes target reachability, but cannot detect a broken hidden-ancestor reveal. Add an inactive ordinary-hidden pane and an unreconciled until-found pane. |
| G5 | The button without the command pair is a valid toggle-count control. Record a real command reaching its target as well; command suppression alone is not successful reconciliation. The first-consumer requirement remains separate. |

An empty statechart-change prediction is reasonable for a showcase that passes no leaves. It is not a substitute for checking the rows after a global Placement repair. Replace W5's “None … is false” with the ownership and instrument corrections.

## Probe, controls, and output

The final prescribed command was:

```text
npx vitest run --config vite.config.ts --project src:browser tests/src/browser/check.probe.test.ts
```

It exited 0: **9 tests passed in 4.30 s**. This is a browser-mechanics probe, not acceptance of stage B implementation. The final source and raw readings are in `tmp/codex/stage-b-verdict-check-measurements.json`; pixel captures are `tmp/codex/check-paint-{false,true}-{false,true}.png`.

The readings have these controls and limits:

| Reading | Control and output |
| --- | --- |
| Capture-installed listener and nested dialog opening | Intercepted command left `open:false`; the same button without interception opened. Nested replay recorded capture `1`, target openings `2`, `open:true`, `:modal:true`. |
| Queued native close | Close followed immediately by reopen recorded closed/open beforetoggle events before the queued close, which observed `open:true`. This tests native timing, not an implemented suppression flag. |
| Written open attribute | Assigning `open=true` recorded no beforetoggle/toggle/close events during the observation window. This supports the limited authored-open claim. |
| Refused promotion | Ordinary and attribute-restored controls displayed all sampled families. With cancelled promotion, dropdown, tooltip, and popover remained `display:block`, with sampled heights 42, 21, and 23 px. |
| Trap and Tab | Ordinary host wrapped to `first`; native host left the child document. Both used the real Modal/Trap and an outside successor. Standalone behavior remains unmeasured. |
| Classic scrollbar | Hidden and unhidden CDP settings both measured width zero. The required 15 px control failed. Existing inline body padding remained 7 px and was saved in the data attribute. |
| Authored popover | An existing manual-popover attribute supported hide followed by native reopen. The nested-dialog command opened its target and did not bubble to the outer dialog in this fixture. |
| Intrinsic growth | Numeric control sampled 117.359375 px; native auto sampled 234.71875 px after content doubled. Both sampled showing. This is a native recipe comparison, not an implemented intrinsic leaf. |
| Clip escape | Plain overflow allowed the menu hit with and without promotion. A transformed clipping ancestor suppressed the ordinary hit; promotion restored it at identical sampled geometry. |
| Paint versus hit | Ordinary-host tooltip pixel was `[0,255,0,255]`. Native modal plus ordinary tooltip yielded content red `[255,0,0,255]`; native modal plus promoted tooltip yielded green again, while both native-modal outside-tip hits were false. The contrasting known colors reject the wrong paint order. Initial coordinate calibrations failed their color control and are not used as evidence. |
| Anchor visibility | Visible-anchor controls hit in both engines. The clipped body-tooltip comparison and dropdown counterexample are reported in W2. Computed visibility and `.show` were recorded; no general repair is proved. |

The probe was deleted before return. No source, guide, configuration, or tracked test change was made. The initial `git status --porcelain` was empty. The final status was **not empty** because unrelated untracked audit files appeared under `tests/app/browser`: the `audit-missing-popover`, `audit-popover`, and `audit-tooltip` entry/test pairs, plus `showcase-audit-final.test.ts`, `showcase-audit-followup.test.ts`, and `showcase-audit-probe.test.ts`. This check did not create or remove those files. The brief's final empty-status condition therefore cannot be certified.

## Corrections required before recording

Record the verdict only after these corrections are incorporated:

1. Replace the modal's single suppression flag with specified handling for synchronous native calls and queued close events; complete rollback and forced-close transition cleanup.
2. Place `MODAL_OPEN` behind the existing lifecycle no-op guards, and reconcile cancellation versus error reporting.
3. Add the shared noncancelable-event contract and delegated-tip helper changes to W3 and their owned patches/proofs to W5.
4. Qualify authored-popover restoration, factory replacement, gutter write footprints, and embedded-document focus claims.
5. Record the positive intrinsic/clip readings and the measured tooltip paint/inertness distinction, while retaining the integrated acceptance gates.
6. Correct refusal citations and distinguish demonstrated incompatibility from scope refusals, especially manual offcanvas, toast promotion, starting-style, carousel reveal, and conditional scroll locking.
7. Resolve the boolean-name law for `dialog` and `gutter`; retain explicit composition and false defaults.
8. Assign gated plugin patches, error proof ownership, browser guide execution, guide-text pins, and the correct setup projects.
9. Supply the missing gate controls and a working classic-scrollbar instrument. Do not label the failed CDP control a passing measurement.
10. Turn P0 into a scoped repair investigation with both body-tooltip and clipped-dropdown controls; do not prescribe `position-visibility: always` as an established universal fix.
11. Refresh `Veneer.ts`, guide, and roadmap citations against `419245d`, and remove the already-resolved roadmap correction.
