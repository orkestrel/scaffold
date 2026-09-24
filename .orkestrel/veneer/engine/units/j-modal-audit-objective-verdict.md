# J-MODAL audit round 1 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d1d5-3997-7633-abb4-daf38d274d4c`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-modal-audit.jsonl` (launch copy under `tmp/codex/`); 39 commands; 712 s; usage {"input_tokens":3254873,"cached_input_tokens":3061248,"cache_write_input_tokens":0,"output_tokens":20248,"reasoning_output_tokens":10178}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED — Construction and options; objective lane.** The attempted bypass was an invalid backdrop attribute with only one constructor path supplied. It remains rejected; supplying every affected path bypasses attribute coercion. Vocabulary validation and option resolution precede the registry claim, and vocabulary is copied. Evidence: `src/browser/Modal.ts:106`, `src/browser/Modal.ts:130`, `src/browser/Modal.ts:170`, `src/browser/helpers.ts:212`, `src/browser/helpers.ts:260`.

   Construction proof bindings distinguish the following mutations:

   | Proof in `tests/src/browser/Modal.test.ts` | Mutation and binding |
   |---|---|
   | Attribute precedence, `:479` | Ignore the static dismissal projection or focus attribute; the dismissal, focus, and backdrop assertions differ. |
   | Invalid attributes, `:535` | Let constructor `backdrop` override the attribute wholesale; the partial-override refusal fails. |
   | Replaced vocabulary, `:740` | Ignore classes, attributes, or selectors; replacing-token and decoy-body assertions differ. |
   | Invalid vocabulary, `:811` | Replace class validation with selector validation; the expected option error disappears. |
   | Ownership, `:830` | Omit the registry claim; lookup and duplicate-owner assertions differ. This mutation binds ownership, not independently the invalid-host branch. |
   | Lifetime, `:855` | Replace the already-aborted check with `lifetime === undefined`; the already-aborted instance remains registered. This binds that branch; the ordinary abort listener remains intact in the mutant. |

   These are substantive assertion bindings in `j-modal-mutations.py:117`, `:151`, `:154`, `:160`, and `:163`; their retained results appear at `j-modal-mutations.log.txt:31`, `:45`, and `:46`. Behavioral conformance beyond construction is ruled below.

2. **BROKEN — The show sequence does not guard the writes inside isolation construction.** Put a custom element beside the modal and have its `inert` attribute reaction call `modal.destroy()`. `new Isolation(...)` writes that attribute before returning. During the reaction, `Modal.#isolation` is still undefined, so destruction cannot release the constructing isolation. Its constructor then continues claiming siblings and registering observations. Only afterward does `??=` store it and `#holds` return false. Subsequent destruction returns immediately because the modal is already aborted. The modal therefore leaves a live isolation after destruction. Evidence: `src/browser/Modal.ts:264`, `src/browser/Modal.ts:325`, `src/browser/Isolation.ts:76`, `src/browser/Isolation.ts:105`.

   The smallest complete repair must make construction cancellable before its first observable write and release partially acquired claims. Merely checking after the constructor returns cannot satisfy the promised absence of further writes.

   The ordinary sequence matches Bootstrap’s ordering. The pre-change dispatch is followed by refusal checks; lock acquisition, the body token, and adjustment have caller-level checks; backdrop completion is followed by a check; append, display, ARIA, role, the shown token, and focus use `#apply`. The scroll assignments and layout read do not themselves invoke the custom-element attribute-reaction seam. The dialog wait is followed by a check. The construction gap lies inside the isolation call, before its caller-level check. Evidence: `src/browser/Modal.ts:221`, `src/browser/Modal.ts:233`, `src/browser/Modal.ts:247`, `src/browser/Modal.ts:258`; Bootstrap `modal.js:98`, `modal.js:171`.

   Show proof bindings:

   | Proof in `tests/src/browser/Modal.test.ts` | Mutation and binding |
   |---|---|
   | Lifecycle, `:103` | Omit lock, open token, backdrop, isolation, host focus, or `aria-modal`; the corresponding state assertion differs. |
   | Show timing, `:158` | Stop awaiting the backdrop, or wait on the host instead of the dialog; recorded completion order differs. |
   | Detached host and scrolling, `:228` | Omit append or scroll resets; parent and scroll-position assertions differ. |
   | Prevention, `:251` | Ignore pre-change dispatch results; the mutation recorder observes writes. |
   | In-flight refusal, `:295` | Remove the in-flight guard; return values and event sequence differ. |
   | Events and hooks, `:327` | Make completion cancelable or admit malformed details; event flags or hook calls differ. |
   | `focus: false`, `:458` | Ignore the focus option; active element and inert assertions differ. This case exercises show/hide, not bounce. |
   | Destruction at a write, `:874` | Remove `#apply`’s post-write read; subsequent host mutations become observable. It exercises `role`, not resource construction. |
   | Destruction during `show`, `:915` | Remove the post-dispatch refusal; forbidden writes become observable. |
   | Re-entry, `:939` | Remove the post-dispatch refusal or in-flight guard; completion results or events differ. |
   | Removed shown token, `:964` | Retain the broken change identity or omit token checks; later hide or stopped-call assertions differ. |

   The retained rows bind these assertions (`j-modal-mutations.py:66`, `:78`, `:85`, `:89`, `:94`, `:97`, `:114`, `:166`; `j-modal-mutations.log.txt:10`, `:16`, `:19`, `:21`, `:23`, `:30`, `:51`).

   The reduced-motion case at `Modal.test.ts:212` has no relevant behavioral red reading: its joined failure under “the signal is ignored” destroys ordinary instances regardless of motion (`j-modal-mutations.py:151`, `j-modal-mutations.log.txt:45`). That row does **not** bind zero-animation completion. A control that specifically breaks completion without running animations would settle it. The sheet-reading case at `Modal.test.ts:91` checks the fixture’s CSS; it supplies no production-mutation proof.

3. **BROKEN — Bounce admits a completed hide and then writes over it.** Use a shown, non-fading modal with `backdrop: false` and `dismiss.escape: false`. Its `prevent` hook calls `hide()`. That hide completes synchronously through `hidden`; the bounce then resumes, checks only destruction and the static token, and adds `modal-static` to the hidden host. Evidence: `src/browser/Modal.ts:273`, `src/browser/Modal.ts:438`, `src/browser/helpers.ts:21`. Re-read the shown state and bounce ownership after dispatch and subsequent reaction-bearing operations, while preserving the ability to hide during a bounce.

   Bounce also calls `host.focus()` unconditionally under `focus: false`, contrary to the option’s “leaves focus alone” contract and R17’s no-focus-move obligation. A focusable shown host, a focused child, and Escape with escape dismissal disabled expose that contradiction. Evidence: `src/browser/Modal.ts:447`, `src/browser/types.ts:1184`. Apply the focus option to this path.

   The ordinary hide path correctly releases isolation before removing `shown`, waits on the host, hides and changes ARIA, awaits backdrop removal, releases the body token, clears padding, and releases the lock before `hidden`. Its direct host-write doors detect destruction and token restoration. Evidence: `src/browser/Modal.ts:273`; Bootstrap `modal.js:123`, `modal.js:245`.

   | Proof in `tests/src/browser/Modal.test.ts` | Mutation and binding |
   |---|---|
   | Hide timing, `:185` | Remove the host wait; the recorded fade/display order differs. |
   | Escape and bounce, `:378` | Ignore the escape option or retain the static token; shown state, prevent events, or eventual token removal differs. Neither mutation tests takeover during `prevent`. |
   | Press dismissal, `:415` | Ignore the mousedown target, dismissal option, or absent backdrop; the corresponding dismissal assertions differ. |
   | Adjustment, `:632` | Omit left-padding adjustment, resize binding, or hide cleanup; explicit inline-property assertions differ. |
   | Destruction in flight, `:661` | Omit abort, backdrop destruction, or lock release; completion, remaining backdrop, or overflow assertions differ. |
   | Completed-show destruction, `:715` | Omit isolation cleanup or saved host attributes; focus/inert or restoration assertions differ. |
   | Restored shown token during hide, `:1009` | Remove token checks; forbidden writes and `hidden` become observable. |

   These bindings are supported by `j-modal-mutations.py:83`, `:103`, `:107`, `:134`, `:141`, `:147`, `:173` and the corresponding retained rows at `j-modal-mutations.log.txt:18`, `:25`, `:37`, `:40`, `:43`, `:54`. Nonzero scrollbar compensation remains outside the recorded browser measurement.

4. **BROKEN — A later isolation does not retain an already-cleared ancestor.** Start with an inert section containing hosts A and B. Construct isolation A: it claims the section false and B true. Construct isolation B: it clears B, but takes no false claim on the section because the section is already clear. Destroy A while B remains live: A’s last section claim restores the original inert attribute, making B unreachable. Evidence: `src/browser/Isolation.ts:76`, `src/browser/Isolation.ts:118`. Claim every required chain element as non-inert for each live isolation; do not infer that another isolation’s cleared attribute needs no claim.

   The existing overlap proof uses sibling hosts without an initially inert shared ancestor (`tests/src/browser/Isolation.test.ts:103`), so it does not distinguish this failure.

   Mechanism proof bindings:

   | Proof | Mutation and binding |
   |---|---|
   | `Backdrop.test.ts:17` | Unfreeze the table; the freeze assertion differs. |
   | `Backdrop.test.ts:22` | Omit reflow or remove before the hide fade; animation presence or connection order differs. |
   | `Backdrop.test.ts:56` | Ignore the parent; the parent assertion differs. |
   | `Backdrop.test.ts:68` | Permit another show while shown; the refusal assertion differs. |
   | `Backdrop.test.ts:83` | Ignore the later show identity; the old hide removes the new show’s element. |
   | `Backdrop.test.ts:99` | Omit destruction’s removal; connectivity differs. |
   | `Backdrop.test.ts:112` | **Unbound validation control:** the mutant uses unimported `isSelector`, so construction fails with an identifier error rather than exercising a replacement validator. |
   | `ScrollLock.test.ts:21` | Unfreeze selectors; the freeze assertion differs. |
   | `ScrollLock.test.ts:29` | Keep overflow visible, compensate narrow elements, or omit sticky margin; inline-state assertions differ. |
   | `ScrollLock.test.ts:60` | Remove the remaining-holder check; the first release restores overflow too early. |
   | `ScrollLock.test.ts:85` | Ignore replacement selectors; the selected and default elements differ. |
   | `ScrollLock.test.ts:103` | Continue compensation without a window; the formerly successful construction fails. |
   | `Isolation.test.ts:21` | Seal only the nearest level or omit original-value recording; ancestor-sibling and restoration assertions differ. |
   | `Isolation.test.ts:56` | Remove observation; the inserted sibling remains non-inert. |
   | `Isolation.test.ts:75` | Remove focus return; active-element assertions differ. |
   | `Isolation.test.ts:103` | Restore with claims remaining or omit chain clearing; the tested sibling handoffs differ. |
   | `Isolation.test.ts:137` | No retained mutation attacks invalid-host rejection; the file-import failure is not a behavioral red reading. |

   Evidence: `j-modal-mutations.py:177`, `:193`, `:196`, `:211`; `j-modal-mutations.log.txt:55`, `:62`, `:63`, `:70`. Repair the backdrop control’s import and obtain a targeted invalid-host control.

   The modal reference-count proof at `Modal.test.ts:570` distinguishes removing the remaining-holder check and independently rewriting the shared token. The E13 case at `Modal.test.ts:605` distinguishes never releasing the token; that mutation does not independently prove the empty-attribute boundary. Evidence: `j-modal-mutations.py:124`, `j-modal-mutations.log.txt:34`.

5. **BROKEN — Destroyed delegates can consume marks and continue dismissal.**

   - A button route can destroy its delegate through `toggle.vn.button`. On the same click, the later modal route still prevents defaults, marks its target, and may hide the open modal before checking its lifetime. An outer live delegate then sees the target marked and cannot drive it. Different button and modal hosts make this configuration non-conflicting under E12. Evidence: `src/browser/Delegate.ts:172`, `src/browser/Delegate.ts:259`, `src/browser/Delegate.ts:329`.
   - The dismiss route has no lifetime check. After an earlier route destroys the delegate, dismissal can acquire a new modal and restart observation. Later `destroy()` calls return immediately, leaving that acquisition unreleased. Evidence: `src/browser/Delegate.ts:155`, `src/browser/Delegate.ts:290`, `src/browser/Delegate.ts:344`.
   - Even destruction during the open modal’s hide occurs after the intended target was marked. The existing destruction test has no outer delegate and therefore misses the stranded mark (`tests/src/browser/Delegate.test.ts:1128`).

   Check lifetime before route effects and before marking/acquiring. Preserve an unconsumed target for a live outer delegate when the current delegate stops before driving it.

   Focus return has another ordering gap: a preconstructed modal’s earlier `shown` hook can synchronously hide a non-fading, backdrop-free modal. `hidden` then occurs before the delegate’s later `shown` listener installs its `hidden` listener. Bootstrap arms from `show`, before this completion interleaving. Evidence: `src/browser/Delegate.ts:275`, `src/browser/Modal.ts:269`; Bootstrap `modal.js:346`. Arm focus return early enough to catch this hide, retaining cancellation for a refused show.

   Delegate proof bindings:

   | Proof in `tests/src/browser/Delegate.test.ts` | Mutation and binding |
   |---|---|
   | Routing/default/focus, `:1015` | Omit routing, default prevention, or focus return; acquisition, dispatch result, or focus differs. |
   | Refused show, `:1059` | Omit refusal abort; a later unrelated show/hide returns focus incorrectly. |
   | Open modal first, `:1087` | Omit its hide; event order and old-host state differ. |
   | Destruction during hide, `:1128` | Remove the post-hide lifetime check; the target is acquired. Coverage stops at this single-delegate interleaving. |
   | Dismissal, `:1156` | Omit dismissal, disabled filtering, or ancestor resolution; acquisition/hidden assertions differ. |
   | Replacement vocabulary, `:1194` | Ignore modal selectors or classes; default/replacement routing assertions differ. |
   | Root containment/removal, `:1230` | Remove containment; the outside modal is acquired. This control does not isolate observer-release behavior. |
   | Button/modal conflict, `:1256` | Remove modal conflict refusal; forbidden engines/events appear. |
   | Collapse/modal conflict, `:1286` | Remove modal conflict refusal; forbidden engines or token changes appear. |
   | Invalid vocabulary, `:1303` | Substitute selector validation for class validation; the expected option error disappears. |

   Evidence: `j-modal-mutations.py:224`, `j-modal-mutations.log.txt:76`. These rows do not bind destroyed-delegate marks under nested roots or the synchronous completion-listener race.

6. **CONFIRMED — Guard, tables, parser, and barrel.** The attempted attacks were missing/null detail, a non-HTML target, throwing accessors, whitespace/case normalization of `static`, an unfrozen nested dismissal default, and missing barrel exports. The source and assertions reject these rivals. Evidence: `src/browser/validators.ts:162`, `src/browser/parsers.ts:53`, `src/browser/constants.ts:72`, `src/browser/constants.ts:89`, `src/browser/index.ts:11`.

   The guard-shape proof (`validators.test.ts:172`) distinguishes admitting missing detail or arbitrary targets; the hostile-accessor proof (`:198`) distinguishes rethrowing. The parser’s valid-input proof (`parsers.test.ts:48`) distinguishes converting `static` to true; its invalid-input proof (`:58`) distinguishes trimming/folding case. The export-list proof (`index.test.ts:15`) distinguishes omitting Modal and Isolation. Frozen-table proofs distinguish removal of the relevant freezes. Evidence: `j-modal-mutations.py:47`, `j-modal-mutations.log.txt:2`. The barrel mutation binds export membership, not the test’s window-listener claim; the recorder limitation remains a bound.

7. **BROKEN — The patch does not make every contract and guide promise true.** The construction/destruction interleaving in claim 2 contradicts the restoration promise at `src/browser/types.ts:1246` and `guides/veneer.md:930`. The ancestor interleaving in claim 4 contradicts the claimed isolation handoff at `guides/veneer.md:854`. The unconditional bounce focus contradicts `ModalOptions.focus` at `src/browser/types.ts:1184`. None is corrected by `j-modal-patches/j-modal-shared.diff:3`.

   The guide also says a failed dismissal dispatches `prevent` and bounces (`guides/veneer.md:828`). A listener preventing `hide` while dismissal is enabled produces neither: `#escape` and `#press` simply call `hide()` (`src/browser/Modal.ts:421`, `:429`). Restrict that sentence to disabled dismissal options.

   The source supports the stated Bootstrap departures, including the deliberate `show()` route and host-based hide wait. The Modal example is structurally runnable, and the added compatibility obligation matches the `d271926` catalog. However, the literal “whitespace alone” clause is false: `git diff -w` retains the changed table delimiter at `guides/veneer.md:5805`. This is a description correction, not a behavioral defect.

   The returned patch updates matching summary text, but no supplied execution proves guide parity **with that unapplied patch**. That subclause remains unresolved until the orchestrator applies it and records the guide gate.

8. **UNRESOLVED — Independent mutation replay is absent.** `j-modal-mutations-orchestrator.log.txt` is absent, as the brief anticipates. Its controlled replay and restoration receipt are required to settle this clause.

   The remaining evidence supports the declared file scope and retained gate exits: `j-modal-status.txt:1`; `j-modal-gates.log.txt:23`, `:79`, `:92`, `:105`, `:127`, `:139`, `:152`, `:165`, `:203`, `:598`. The current source hashes match the mutation log’s recorded hashes. The log contains the stated green rows and `receipt: restored byte for byte` (`j-modal-mutations.log.txt:90`, `:99`).

   Added executable source uses the required element guards and introduces none of the prohibited assertion, suppression, accessibility-modifier, default-export, or `.bs.` event-wire forms. Bootstrap names in explanatory text are not dispatched wires. The writer records no `prove` call at `j-modal-report.md:3`.

   The first-run log supports the reported missed cases, but labels alone cannot establish the exact earlier mutations or that their revisions never weakened a control. The retained earlier instrument/version would settle that historical clause. `EXACT` and `JOINED` certify which titles failed; they do not resolve the binding defects above (`j-modal-mutations.py:299`).

**Findings fitting no claim:** none.

**Attacked and held:** Ordinary destruction after resources are stored restores them; the failure is destruction *during* acquisition. A token takeover intentionally leaves already-held resources for later cleanup; that differs from retaining resources after destruction. Escape/press origin checks and normal host/dialog/backdrop timing hold against their targeted mutations. E12 correctly permits different hosts and pre-existing owners; its cross-delegate amendment does not authorize a destroyed delegate to consume an undriven target. E13’s empty-attribute residue is an accepted bound, not a new defect.

**Referrals:** The fix round should carry the resource-construction cancellation and cleanup pin, the initially inert shared-ancestor pin, bounce takeover and `focus: false` pins, destroyed-delegate routing/mark pins under nested roots, and synchronous completion focus-return pin. Repair the invalid backdrop mutation and missing behavioral red bindings. The orchestrator owns reproduction, the shared contract patch, applied-patch guide verification, and independent mutation replay. Previously carried vocabulary, dismiss-resolution, disabled-reading, and backdrop-exclusion work remains with its named landing owners.

**Bounds:** This is a source review with retained execution evidence; the new interleavings were not executed in this lane. No browser test, build, mutation, or established gate was rerun. No files were written and no agents were spawned. No `prove` call was made, so there is no refused invocation or receipt to report. Nonzero scrollbar behavior and the shipped modal cascade remain outside the supplied browser readings.

VERDICT: FAIL 2, 3, 4, 5, 7, 8; outside the claims: none
