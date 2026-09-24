# J-TOAST audit round 1 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d1e1-0e98-7883-9143-32d9861ffe9c`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-toast-audit.jsonl` (launch copy under `tmp/codex/`); 31 commands; 509 s; usage {"input_tokens":2309463,"cached_input_tokens":2151424,"cache_write_input_tokens":0,"output_tokens":13794,"reasoning_output_tokens":4401}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED — Construction, options, and lifetime. Objective lane; source and retained-evidence review.**

   Attacks using invalid vocabulary, failed attribute coercion, replacement vocabulary, duplicate ownership, destruction, and an already-aborted signal held. Validation precedes `claim`; constructor options override attributes; the installed parsers preserve explicit `false` and `0`; destruction aborts, clears the timer, releases ownership, then restores saved tokens (`src/browser/Toast.ts:76`, `src/browser/Toast.ts:217`, `src/browser/helpers.ts:212`, `src/browser/helpers.ts:260`).

   The assertions distinguish these mutations:

   | Proof | Mutation and distinguishing assertion |
   |---|---|
   | `tests/src/browser/Toast.test.ts:676` | Invalid class validation, omitted selector validation, omitted delay parsing, and invalid animated coercion: expected error codes, contexts, and unclaimed hosts distinguish them (`j-toast-mutations.log.txt:12`, `:33`, `:34`, `:35`). |
   | `tests/src/browser/Toast.test.ts:714` | Omitted registry claim: owner lookup and duplicate-construction rejection distinguish it (`j-toast-mutations.log.txt:37`). |
   | `tests/src/browser/Toast.test.ts:739` | Altered pre-aborted-signal branch: registry release and refused subsequent show distinguish it (`j-toast-mutations.log.txt:30`). This mutation does not independently disable the live signal listener. |
   | `tests/src/browser/Toast.test.ts:643` | Ignored classes or attributes: replacement-token assertions and invalid default attribute distinguish them (`j-toast-mutations.log.txt:31`, `:32`). |
   | `tests/src/browser/Toast.test.ts:622` | Omitted fade snapshot: restoration to the original tokens distinguishes it (`j-toast-mutations.log.txt:29`). |
   | `tests/src/browser/Toast.test.ts:249` | Omitted scheduling, ignored autohide, or unread delay attribute: hidden-event arrival, elapsed time, and the retained shown control distinguish them (`j-toast-mutations.log.txt:10`, `:11`, `:12`). |

   These whole-file rows name the affected cases and bind those assertions. The snapshot preserves unrelated consumer tokens; E13’s shared attribute-presence limitation remains outside this unit.

2. **BROKEN — The sequences do not detect every takeover.**

   **Synchronous pre-event re-entry escapes the identity check.** Construct with `{ animated: false, autohide: false }`; let a guarded `show.vn.toast` listener call `show()` again. The inner call completes synchronously, removes `showing`, clears `#change`, and emits `shown`. The outer call then passes `#refused()`, installs a new identity, repeats the writes, emits another `shown`, and returns `true`. The claimed outer `false` and single completed sequence therefore do not hold (`src/browser/Toast.ts:149`, `:154`, `:157`, `:173`, `:180`).

   The retained re-entry proof uses the default `animated: true`, so its inner call remains suspended with `showing` present. Its mutations remove the transition refusal or post-dispatch refusal; they bind that suspended case, not synchronous completion (`tests/src/browser/Toast.test.ts:822`, `j-toast-mutations.log.txt:25`, `:39`).

   Smallest fix: establish the call identity before the pre-change dispatch and check it afterward, including when a nested call has already completed. Preserve newest-call takeover rather than imposing E15’s one-direction refusal. Pin synchronous `show` re-entry and a shown toast whose `hide` listener synchronously calls `show`.

   **The fade door admits a consumer state that the next write overwrites.** Start with `show` present. In a one-shot custom-element reaction to the fade write, remove `show` without adding `showing`. The fade door checks only lifetime, identity, and absence of `showing`; it passes. The next write adds `show` back (`src/browser/Toast.ts:164`, `:169`, `:236`). This contradicts “No door admits a state the call then writes over.”

   Smallest fix: preserve the expected shown membership across the fade write and stop when that reaction changes it. Keep ordinary repeated `show()` on an unchanged shown toast valid.

   The remaining door trace holds within its stated checks:

   | Door | Reaction attack and result |
   |---|---|
   | Pre-show dispatch, `Toast.ts:151` | Destruction or adding `showing` is refused at `:154`; synchronous completed re-entry escapes as above. |
   | Pre-hide dispatch, `Toast.ts:188` | Destruction, adding `showing`, or removing `show` is refused at `:189`; synchronous nested show can finish before that read. |
   | Fade write, `Toast.ts:164` | Destruction, changed identity, or added `showing` stops the call; removed pre-existing `show` escapes as above. |
   | Show transition write, `Toast.ts:169` | Removing either required token stops further writes. Destruction and accepted re-entry invalidate lifetime or identity. |
   | Hide transition write, `Toast.ts:200` | Removing either required token stops further writes. Destruction and accepted re-entry invalidate lifetime or identity. |
   | Show/hide await, `Toast.ts:175`, `:205` | Destruction, changed identity, or missing required tokens stops completion. |
   | Show completion write, `Toast.ts:177` | Removed `show`, added `showing`, destruction, or accepted re-entry stops the completed event. |
   | Hide completion write, `Toast.ts:208` | Added `show` or `showing`, destruction, or accepted re-entry stops the completed event. |

   The normal write order matches installed Bootstrap’s `toast.js:75` and `:102`, subject to the documented layout read, omitted `hide` token, animation mechanism, and timer departures.

   Proof binding:

   | Proof | Mutation distinguished |
   |---|---|
   | `Toast.test.ts:81` | Omitted fade or zero-timeout completion; token sequence, actual transition, and finished-before-hidden order (`j-toast-mutations.log.txt:2`, `:8`). |
   | `Toast.test.ts:130` | Zero-timeout completion; actual fade completion precedes `shown` (`:8`). |
   | `Toast.test.ts:156` | Unconditional fade or unconditional await; immediate events and absent fade (`:3`, `:4`). |
   | `Toast.test.ts:188` | `transitionend`-only waiting; reduced motion produces no animation but must complete (`:9`). |
   | `Toast.test.ts:209` | Hidden-hide refusal or transition refusal removed; false results and event sequence (`:6`, `:25`). |
   | `Toast.test.ts:292` | Refusing an already-shown toast; successful repeated show and repeated events (`:5`). |
   | `Toast.test.ts:491` | Ignored pre-event cancellation; no writes, false results, and no completion (`:24`). |
   | `Toast.test.ts:532` | Cancelable completed event or permissive event guard; event readings and unchanged hook recorder (`:26`, `:27`). |
   | `Toast.test.ts:581` | Omitted destruction abort; abandoned result, restored tokens, released registry, and removed listeners (`:28`). |
   | `Toast.test.ts:757` | Omitted post-write read; observer records expose writes after destruction (`:38`). |
   | `Toast.test.ts:798` | Omitted post-show-dispatch read; observer records expose writes after listener destruction (`:39`). |
   | `Toast.test.ts:822` | Removed transition refusal or dispatch reread; binds animated re-entry only (`:25`, `:39`). |
   | `Toast.test.ts:869` | Omitted identity comparison; earlier call incorrectly completes despite a later call (`:40`). |
   | `Toast.test.ts:888` | Omitted post-await token check; removed `showing` incorrectly permits completion (`:43`). |
   | `Toast.test.ts:941` | Fade door ignoring `showing`; subsequent writes and completed event distinguish it (`:41`). |
   | `Toast.test.ts:977` | Show transition door ignoring tokens; subsequent completion distinguishes it without an await (`:42`). |
   | `Toast.test.ts:1014` | Show completion door ignoring tokens; incorrect `shown` distinguishes it (`:44`). |
   | `Toast.test.ts:1050` | Hide transition door ignoring tokens; subsequent removal distinguishes it without an await (`:45`). |
   | `Toast.test.ts:1087` | Omitted hide layout read or await token check; actual transition existence and refused completion distinguish them (`:7`, `:46`). |
   | `Toast.test.ts:1104` | Hide completion door ignoring tokens; incorrect `hidden` distinguishes it (`:47`). |

   These rows bind their named assertions, including the completion-reaction proof that a false-returning skeleton alone would not distinguish. They do not cover the escaping interleavings above.

3. **CONFIRMED — The delay mechanism.**

   Attacks against restart, overlapping timers, held pointer/focus, descendant focus movement, and accepted-call cancellation held. `#schedule` clears the previous handle, requires a live, shown, settled toast with autohide, and installs a native timeout. Its callback clears the handle before calling `hide` (`src/browser/Toast.ts:267`). The interaction listeners and `#leave` implement the stated related-target and other-input checks (`:112`, `:286`).

   | Proof | Mutation and distinguishing assertion |
   |---|---|
   | `Toast.test.ts:249` | Missing scheduling, ignored autohide, unread delay: event arrival, elapsed delay, and held control (`j-toast-mutations.log.txt:10`, `:11`, `:12`). |
   | `Toast.test.ts:292` | Retaining the previous timer: elapsed time from restart and the hide recorder distinguish overlapping timers (`:23`). |
   | `Toast.test.ts:338` | Ignoring initial interaction, the other input, or leave scheduling: a timed control completes while the held toast remains shown, followed by a full-delay hide (`:13`, `:14`, `:15`, `:18`). |
   | `Toast.test.ts:389` | Omitting related-target containment: stopped descendant `focusin` prevents a later clear from masking the erroneous timer (`:19`). |
   | `Toast.test.ts:424` | Omitting pointer/focus entry clearing: the timed control outlasts the toast’s original deadline while the toast must remain shown (`:16`, `:17`). |
   | `Toast.test.ts:467` | Accepted hide retaining its timer: manually restored `show` must survive the control’s delay (`:20`). |
   | `Toast.test.ts:904` | Accepted show retaining its timer: takeover prevents completion from scheduling another timer, and the shown host must survive (`:21`). |

   The post-red descendant-focus and accepted-show cases are directly bound by their whole-file mutation rows.

   The destruction mutation is equivalent for the unmodified engine’s observable DOM and events: a surviving callback reaches `hide`, whose aborted-lifetime refusal precedes dispatch and mutation (`Toast.ts:187`, `:228`). It is not evidence that cancellation occurred; the cancellation requirement is satisfied by `destroy` calling `#clear` (`:220`). The retained `MISSED` row therefore supplies no timer-release proof (`j-toast-mutations.log.txt:22`).

4. **BROKEN — A destroyed delegate can acquire and drive a toast.**

   Use a button trigger carrying `data-bs-toggle="button"`, `data-bs-dismiss="toast"`, and a target naming a separate shown toast. Destroy the delegate from the button’s toggle listener. E12 permits this click because the hosts differ. After destruction returns, `#activate` continues to `#routeToast`; that route has no aborted check. It marks the toast, constructs and acquires an engine, restarts observation, and calls `hide` (`src/browser/Delegate.ts:179`, `:253`, `:261`, `:305`). Subsequent `destroy()` returns immediately because the delegate is already aborted (`:161`).

   Under nested roots, this also consumes the toast mark before the live outer delegate receives the click. The outer delegate therefore cannot acquire that toast through this click.

   Smallest fix: refuse the toast route before prevention, marking, construction, or driving when the delegate is aborted. Add the same-click destruction proof with a live outer delegate; assert that the outer delegate acquires and later restores the toast. The existing destruction proof covers collapse panels, not the new toast route (`tests/src/browser/Delegate.test.ts:805`).

   Other route attacks held: containment precedes marking; marks use route and driven host; a prevented hide remains marked; existing consumer engines are reused; the same-host conflict is refused before route effects. E12’s per-delegate boundary remains valid (`Delegate.ts:203`, `:279`, `:290`).

   | Toast route proof | Mutation distinguished |
   |---|---|
   | `Delegate.test.ts:1015` | Missing route, anchor prevention, closest-host fallback, or live-owned retention: hide, prevention, ownership, removal, and restoration assertions (`j-toast-mutations.log.txt:48`, `:49`, `:53`, `:64`). |
   | `Delegate.test.ts:1052` | Default host token, selector, classes, or attributes replacing configured values: replacement behavior and untouched decoy/default route (`:54`, `:55`, `:56`, `:57`). |
   | `Delegate.test.ts:1093` | Prevention after disabled rejection, ignored disabled state, or unread disabled attribute: canceled anchor clicks and no acquired toast (`:50`, `:51`, `:52`). |
   | `Delegate.test.ts:1111` | Removed containment, mark, or owner lookup: untouched outside host, consumer ownership, and a prevented hide recorded once (`:58`, `:59`, `:60`). |
   | `Delegate.test.ts:1165` | Removed conflict refusal: no initial effects, then successful routes with a consumer button (`:61`). |
   | `Delegate.test.ts:1201` | Disabled dismiss trigger still contesting: button toggles while no toast is acquired (`:63`). |
   | `Delegate.test.ts:1217` | Removed collapse conflict branch: unchanged host, absent engines, and absent events (`:62`). |
   | `Delegate.test.ts:1243` | Incorrect class validation: expected vocabulary error (`:65`). |

   The post-red disabled-trigger case is bound by its named mutation row. None of these rows attacks post-destruction toast acquisition.

5. **CONFIRMED — Guard, tables, and barrel.**

   Payload-bearing events, plain events, hostile prototype access, and throwing detail access failed to escape the guard. The installed `isInstance` contains its prototype check; `isToastEvent` additionally contains detail access (`src/browser/validators.ts:161`, `node_modules/@orkestrel/contract/dist/src/core/index.js:933`).

   Default-value and mutability attacks held: the tables contain the claimed Bootstrap defaults and are frozen (`src/browser/constants.ts:73`, `:81`, `:90`, `:98`, `:103`; Bootstrap `toast.js:41`). The barrel exposes Toast and the centralized exports.

   Proof binding:

   - `Toast.test.ts:27`: unfreezing `TOAST_DEFAULTS` fails the freeze assertion (`j-toast-mutations.log.txt:36`).
   - `validators.test.ts:172`: accepting arbitrary custom-event detail fails payload rejection (`:66`).
   - `validators.test.ts:185`: removing containment exposes the throwing detail accessor (`:67`). Removing only the payload check also incorrectly accepts that event, explaining its joined failure at `:66`.
   - `index.test.ts:15`: removing the Toast barrel export changes the asserted export set (`:68`).

   These rows bind the post-implementation proofs. `Toast.test.ts:60` independently checks the loaded cascade and fade fixture; it is not an engine-behavior negative control.

6. **BROKEN — The guide and returned contract patch remain false in specific cases.**

   The guide’s unconditional single-transition re-entry statement is contradicted by synchronous nested completion described in claim 2 (`guides/veneer.md:878`). Repair it together with the mechanism.

   The returned `@returns` patch names token-based takeover but omits identity-only takeover (`j-toast-report.md:94`, `:97`). The retained proof removes `showing`, starts another show, and restores the expected `show`/`showing` state before the earlier call resumes. That earlier call returns `false` solely because `#change` differs (`tests/src/browser/Toast.test.ts:869`, `src/browser/Toast.ts:240`). Its identity-removal mutation explicitly distinguishes this condition (`j-toast-mutations.log.txt:40`). Add “a later call took over” separately from failed token checks to each affected return contract.

   The example’s prose promises hiding after the delay, but its code calls `destroy()` immediately after `show()` resolves, clearing that delay and restoring the host (`guides/veneer.md:454`, `:465`; `Toast.ts:217`). Either demonstrate delayed hiding before cleanup or describe the immediate cleanup the fence actually performs.

   The surface-summary rows match their source, and the compatibility diff preserves the Toast obligation while changing its proof and status (`guides/veneer.md:176`, `j-toast.diff:189`). The returned patch changes only `@returns`, so it introduces no method-summary parity change. Those facts do not establish behavioral truth or execution of the example; the guide test checks fence imports, not this toast lifecycle (`tests/guides.test.ts:128`).

7. **UNRESOLVED — Independent mutation replay pending; the remaining evidence holds.**

   The Orchestrator replay artifact is absent as the brief predicts. Its replay, named-case failures, green restoration runs, and byte-restoration receipt would settle this clause.

   The retained status lists only authorized files (`j-toast-status.txt:1`). The established gate exits are recorded in `j-toast-gates.log.txt:15`, `:69`, `:82`, `:95`, `:117`, `:129`, `:142`, `:155`, `:193`, and `:563`; none was rerun.

   The writer’s mutation instrument runs whole files, records named and joined failures, restores original bytes in `finally`, and compares digests (`j-toast-mutations.py:199`, `:216`, `:243`, `:255`). Its retained log carries the stated outcomes and restoration receipt (`j-toast-mutations.log.txt:69`, `:74`). Read-only hash comparisons matched the current source files to those retained digests. This establishes artifact correspondence, not independent replay.

   Inspection of added executable lines found no prohibited assertion, suppression, access modifier, default export, or Bootstrap event wire. Added `.bs.` text describes upstream behavior in the guide. Newly added invoked element guards use `isInstance`; pre-existing guards in other routes remain outside this unit’s edits. The report explicitly records no writer `prove` call (`j-toast-report.md:18`).

**Findings fitting no claim:** none.

**Attacked and held:** A completed fade-in can begin after `shown` under the shipped toast cascade plus the fade fixture; the retained proof explicitly observes that animation, so this is not evidence that the existing pre-completion wait was skipped (`Toast.test.ts:109`, `:125`). A no-animation show still yields when `animated` is true, which explains why the existing re-entry proof holds while the synchronous attack escapes. A prevented nested-root hide remains shown and therefore makes the mark-removal mutation meaningful. A replacement engine cannot revive a destroyed Toast instance: the surviving old timeout remains bound to the aborted instance.

**Referrals:** Carry claim 2’s identity and fade-door fixes, claim 4’s lifetime guard and nested-root proof, and claim 6’s contract and guide repairs into the fix round. Preserve the already-carried landing work: `ToastVocabulary`, shared dismiss resolution, consolidated conflict checking, and the shared disabled reading. The current decision record’s E16 assigns that disabled consolidation to the landing; it is not a newly discovered finding.

**Bounds:** Source paths refer to `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast`; evidence filenames refer to the brief’s `scaffold/.orkestrel/veneer/engine/units` directory. New interleavings above are source-derived findings, not newly executed browser observations; the Orchestrator must reproduce them before adopting repairs. No browser test, build, mutation, file write, or sub-agent was run. No other audit lane’s verdict was read. Tool discovery exposed a `prove` tool despite the brief’s reachability statement; no call was made, no refused-call receipt exists, and no receipt is claimed.

VERDICT: FAIL 2, 4, 6, 7; outside the claims: none
