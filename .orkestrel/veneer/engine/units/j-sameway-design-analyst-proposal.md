# J-SAMEWAY design round — the objective lane's proposal (analyst on GPT-6 Astra)

Thread `01a0d593-92ea-7560-9863-fbcf9a6a131c`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-sameway-design-analyst.jsonl` (launch copy under `tmp/codex/`); 34 commands; 408 s; usage {"input_tokens":1119022,"cached_input_tokens":988672,"cache_write_input_tokens":0,"output_tokens":11905,"reasoning_output_tokens":2332}. Retained verbatim from the exec's last message.

---

1. **Door inventory and observable consequences**

   Recommend **A: complete the remaining change, skip the token write already made by the host, and dispatch the completed event**.

   All source references below are at **`7fd28dc`**. `M` means `src/browser/Modal.ts`; `O` means `src/browser/Offcanvas.ts`. **[read]** identifies source evidence; **[inferred]** identifies consequences derived from it. Proposed behavior and proofs are recommendations, not executed results. No files were edited, no tests were run, and no agents were spawned.

   **[read]** Before their own token write, these calls require the starting token state. A mismatch clears `#changing`; the early branches return `false` without completing or returning their previous writes. The returning branches begin at the engine’s own token write. (`M:257–286`, `M:324–327`, `M:412–422`; `O:243–277`, `O:320–328`, `O:395–405`.)

   The tables enumerate the doors. “Written” includes acquisitions and releases; each row includes the preceding executed steps, subject to options and existing resources. “Remaining” names the work the stopped call never reaches.

   **[inferred]** Perception descriptions assume the shipped cascade, ordinary hidden markup for opening, and a completed engine show before closing. Existing consumer attributes and styles remain where the call has not written them. Modal display therefore means “entry display, normally `none`” until its display write. Focus descriptions exclude additional focus changes made by consumer reactions.

   The Modal opening doors are:

   | Door and evidence | Written when it stops [read] | Remaining [read] | Result after animations settle [inferred] |
   |---|---|---|---|
   | After `show` dispatch, `M:239–242` | Pre-change event only; listener added `show`. | Entire opening sequence, `M:243–308`. | Normally `display:none`; entry ARIA; no acquired backdrop, lock, `modal-open`, isolation, or engine focus move. |
   | Scroll-lock construction, `M:250–261` | Lock construction; failed door destroys that local lock. | `modal-open`, adjustment, backdrop, insertion, display, ARIA, scrolling, transition, isolation, focus, event. | Normally hidden despite `show`; entry ARIA; this lock is released; no backdrop or engine focus move. |
   | Body `open` acquisition, `M:263–264` | Retained lock and body token. | Adjustment and subsequent opening work. | Normally hidden; entry ARIA; locked document with `modal-open`; no backdrop or isolation. |
   | Host adjustment, `M:265`, `M:499–504` | Previous acquisitions and whichever padding branch executes. | Backdrop and subsequent opening work. | Entry display and ARIA remain; compensation and lock remain; no backdrop or isolation. A rendered overflowing fixture can already paint after the reaction adds `show`. |
   | Awaited backdrop show, `M:266–273` | Previous work and backdrop show. | Host insertion, display, ARIA, scrolling, transition, isolation, focus, event. | Normally a shown backdrop over a hidden host; lock and body token held; entry ARIA; no isolation or engine focus move. |
   | Host insertion, `M:275–276` | Previous work and append into body. | Display and subsequent opening work. | Host connected but normally `display:none`; backdrop shown; entry ARIA; lock held; no isolation. |
   | Display write, `M:278` | `display:block`. | ARIA, scrolling, transition, isolation, focus, event. | Host paints with `show`, but entry `aria-hidden` can still hide it from accessibility; backdrop and lock remain; focus is not isolated. |
   | `aria-hidden` removal, `M:279` | Display and removal of `aria-hidden`. | `aria-modal`, role, scrolling, transition, isolation, focus, event. | Visible host without `aria-hidden`, but modal semantics remain incomplete; backdrop and lock remain; no isolation. |
   | `aria-modal` write, `M:280` | Previous work and `aria-modal="true"`. | Role, scrolling, transition, isolation, focus, event. | Visible modal-marked host with entry role; backdrop and lock remain; no isolation. |
   | Role write, `M:281` | Display and opening ARIA complete. | Scroll resets, token step, transition wait, isolation, focus, event, `M:282–308`. | Host appears shown with dialog semantics, backdrop, and lock, but opening never resets scrolling or establishes isolation and focus. |

   The Modal closing doors are:

   | Door and evidence | Written when it stops [read] | Remaining [read] | Result [inferred] |
   |---|---|---|---|
   | After `hide` dispatch, `M:314–317` | Pre-change event only; listener removed `show`. | Entire closing sequence, `M:318–372`. | `display:block` and shown ARIA remain. With `fade`, opacity settles to zero; without it, the modal remains visible. Backdrop, lock, body token, and isolation remain; no engine focus return occurs. |
   | Isolation destruction, `M:322–324` | Isolation reference cleared and isolation destroyed. | Token step, fade wait, hidden display and ARIA, backdrop removal, body-token release, padding removal, lock release, event. | Same display/ARIA/backdrop/lock inconsistency, but isolation is released and its trigger receives the focus attempt. |

   **[read]** Modal’s cascade supplies `display:none`; `show` changes the dialog transform, not host display. `.fade:not(.show)` supplies opacity zero. These are distinct from removing the modal’s box or pointer target. (`src/styles/components/_modal.scss:4–9,40–49,64–70`; `src/styles/components/_fade.scss:4–7,22–23`.) **[read]** Isolation destruction releases its claims and calls the saved trigger’s `focus()`. (`src/browser/Isolation.ts:121–127`.) **[inferred]** Thus a stopped fading Modal hide can leave an invisible, full-size pointer target over a shown backdrop.

   The Offcanvas opening doors are:

   | Door and evidence | Written when it stops [read] | Remaining [read] | Result after animations settle [inferred] |
   |---|---|---|---|
   | After `show` dispatch, `O:225–230` | Pre-change event only; listener added `show`. | Entire opening sequence, `O:231–299`. | Fixed panel becomes visible and on screen directly through CSS, with entry ARIA and no newly acquired backdrop, lock, isolation, or engine focus move. |
   | Scroll-lock construction, `O:239–247` | Lock construction; failed door destroys the local lock. | Backdrop, ARIA, `showing`, token step, waits, isolation, focus, event. | Panel visible through `show`; entry ARIA; this lock released; no backdrop or isolation acquired. |
   | Backdrop `show()` call, `O:250–271` | Lock where required; backdrop and press listener retained; backdrop opening started. | ARIA and subsequent opening work. | Panel visible with entry ARIA; backdrop finishes fading independently; lock held where required; no isolation. |
   | `aria-modal` write, `O:273` | Previous work and `aria-modal="true"`. | Role, layout read, `showing`, token step, waits, isolation, focus, event. | Visible panel with incomplete dialog semantics, backdrop, and applicable lock; no isolation. |
   | Role write, `O:274` | Opening ARIA complete. | Layout read and subsequent opening work. | Visible dialog with backdrop and applicable lock, but no isolation or engine focus move. |
   | `showing` addition, `O:276` | Previous work and `showing`. | Token step, waits, `showing` removal, isolation, focus, event. | `show showing` remains: visible and on screen, with ARIA, backdrop, and applicable lock; unfinished transition token and no isolation. |

   The Offcanvas closing doors are:

   | Door and evidence | Written when it stops [read] | Remaining [read] | Result [inferred] |
   |---|---|---|---|
   | After `hide` dispatch, `O:309–312` | Pre-change event only; listener removed `show`. | Entire closing sequence, `O:313–359`. | Panel becomes hidden and translated out, but shown ARIA, backdrop, applicable lock, and isolation remain. No engine focus return occurs. |
   | Isolation destruction, `O:318–320` | Isolation cleared and destroyed. | `hiding`, backdrop fade, token step, waits, transition-token cleanup, ARIA cleanup, backdrop removal, lock release, event. | Panel hidden and translated out; stale ARIA, backdrop, and lock remain; isolation released and trigger focus attempted. |
   | `hiding` addition, `O:321` | Isolation released and `hiding` written. | Backdrop fade and subsequent closing work. | `hiding` remains without `show`: computed visibility is **visible**, but the panel is translated off screen. Backdrop remains shown; ARIA remains modal/dialog; applicable lock remains; focus return already attempted. |

   **[read]** Fixed Offcanvas uses `display:flex`; its hidden state uses `visibility:hidden` and placement transforms. `showing` or `show:not(.hiding)` clears the transform; `showing`, `hiding`, or `show` supplies visible visibility. (`src/styles/components/_offcanvas.scss:9–59,142–153`.) **[inferred]** `display` alone cannot prove Offcanvas visibility or successful cleanup.

   **[read]** Offcanvas never writes `aria-hidden` in these sequences. Its backdrop starts concurrently, whereas Modal awaits its backdrop before writing host display. (`O:270–278,333–357`; `M:272–278`.) A ScrollLock releases only its own reference; another holder can keep document scrolling locked. (`src/browser/ScrollLock.ts:113–123`.)

   **[read]** No additional pre-token door exists between Modal’s role write and token addition, or between Offcanvas’s `hiding` door and token removal. Offcanvas’s backdrop hide removes its plain `div` token synchronously; its observer reaction runs during the later wait. (`M:281–286`; `O:321–331`; `src/browser/Backdrop.ts:84–92`.) The token-write doors themselves concern an opposite-direction reaction after that write, not the early agreement covered here.

   Carry the following observations without expanding this unit:

   | Engine | Observation at `7fd28dc` |
   |---|---|
   | Collapse | **[read]** Post-event refusals reject early endpoint tokens. Showing also rejects an early shown token after hiding a sibling; hiding rejects early removal during its initial size write. Other transition doors do not uniformly require the initial shown state. **[inferred]** Same-direction stopping exists, but is phase-specific. (`src/browser/Collapse.ts:153–190,206–235,280–301,346–352`.) |
   | Toast | **[read]** A hide rejects token removal in its pre-event, transition-token write, or animated wait. An initially hidden animated show rejects addition during its `fade` write. Addition inside `show` dispatch is instead included in its subsequent starting-state read. **[inferred]** Same-direction stopping exists, with a different pre-event show rule. (`src/browser/Toast.ts:152–188,193–220,235–249`.) |
   | Tooltip | **[read]** Fresh-tip show requires absence after insertion, linking, `inserted`, and placement; hide requires presence after its pre-event. **[inferred]** Same-direction stopping exists on the tip, including an `inserted` listener adding `show`. Container ownership remains an independent constraint. (`src/browser/Tooltip.ts:419–446,540–547,792–810`.) |
   | Dropdown | **[read]** Post-event refusals and pre-token placement, focus, ARIA, and placement-destruction doors require the starting menu state. **[inferred]** Same-direction stopping exists on the menu. (`src/browser/Dropdown.ts:199–227,271–287,319–335`.) |
   | Carousel | **[read]** Its endpoint token is `active`, not `shown`. It rejects early incoming activation or outgoing deactivation after `slide` and throughout pre-completion doors. **[inferred]** It has the analogous same-direction case. (`src/browser/Carousel.ts:316–330,348–453,456–503`.) |
   | Tab | **[read]** Early host activation or changed outgoing selection is rejected after pre-events. Later doors require written pane tokens but do not forbid an early pane `shown` token. **[inferred]** There is an analogous pre-event activation case, but no blanket same-direction refusal for early pane `show`. (`src/browser/Tab.ts:149–199,224–238`.) |

2. **Behavioral ruling**

   Adopt A for an accepted call that the host alone advances toward its requested endpoint.

   The alternatives have these consequences:

   | Option | Events and resolution | Cost |
   |---|---|---|
   | **A — complete and announce** | Accepted `show` → `shown`, or `hide` → `hidden`; resolve `true` after successful completion, subject to the existing destruction check. | Requires contract changes, guarded continuation, and distinction from nested calls. |
   | **B — complete silently** | Pre-change event only. To retain “true after the completed event,” resolve `false`. Returning `true` instead requires a separate contract change. | Consumers cannot use the result or completed event to track successful work; completion has an unexplained silent variant. |
   | **C — stop and document** | Pre-change event only; `false`. | Retains the incomplete display, accessibility, backdrop, lock, and focus states enumerated in the inventory. |

   **[read]** The interface explicitly lists token changes at doors among false outcomes and ties true to completed events. A therefore changes the public contract; it is not merely an implementation repair under unchanged remarks. (`src/browser/types.ts:1345–1365,1491–1511`.)

   Specify A as follows:

   - Keep initial already-at-endpoint refusal. A `show()` made on an already shown host, or `hide()` made on an already hidden host, remains `false` without events.
   - Prevention wins. A listener that changes the token and prevents the pre-change event receives no completion by this call.
   - After an accepted pre-change event, distinguish a direct token change from a nested engine change. Capture the existing change identity before dispatch and reject a superseded outer call, including when the nested call already completed.
   - While this call owns the change, an early endpoint token advances its expected token state. Continue the remaining sequence in its existing order, respecting options. Keep the lock constructed successfully during that agreement.
   - Skip the host’s already-satisfied shown-token operation. Do not repeat earlier writes or dispatch another pre-change event.
   - After observing the endpoint, every subsequent door requires that endpoint. If the host reverses it, apply E22’s opposite-direction return to the writes this call actually made.
   - Keep lifetime and identity checks. Destruction or supersession ends the old continuation; it cannot release or clear a later call’s resources or change.
   - Wait for the transitions the sequence still owns, finish resource work, release the change, and dispatch its normal completed event with its normal detail.

   **[read]** The existing sequence releases `#changing` before completed-event dispatch and returns the lifetime check afterward. Consequently, a completed-event listener can start another change without undoing the completion, but destruction inside that event can still make the original promise resolve `false`. Preserve that distinction. (`M:307–309,371–373`; `O:298–304,358–360`.)

   **[inferred]** Removing token checks throughout the pre-token phase is insufficient: it would miss a reversal after early agreement. Reusing the old `#holds` unchanged is also insufficient because it releases `#changing` on that agreement. (`M:412–415`; `O:395–398`.) Represent the call’s expected token through its continuation and a call-local observation; do not add a persistent duplicate of `shown`, an agreement option, or an observer. This historical expectation is distinct from the live `shown` getter.

   Read the combined rule beside E22 as:

   > Respect the token the host chose. When it advances an accepted change toward its requested endpoint, finish that change and announce completion. When it reverses the endpoint already reached, stop and return only that change’s writes to the chosen state, without announcing completion.

   Preserve E22’s limits: its returning step checks lifetime and change identity without repeatedly reconsidering the host token; acquired resources retain the existing holding rule; a lock already released is not reacquired. **[read]** The returning methods at this commit already check identity as well as lifetime. (`M:431–473`; `O:415–457`.) **[inferred]** Earlier agreement makes earlier reversal reachable, so returning an interrupted opening must be bounded by the writes actually performed, rather than assuming its whole display/ARIA prefix ran.

3. **Proofs and distinguishing mutations**

   Add a separately named case for every inventory door in its engine’s mirrored test file. Each case must establish that its reaction ran at the intended boundary, then assert the completed user-visible endpoint, event sequence, and resolution.

   **[read]** Existing tests provide real custom-element attribute reactions, backdrop child connection/removal reactions, mutation-observer delivery during waits, focus listeners, and shipped-cascade readings. (`tests/src/browser/Modal.test.ts:979–1015,1064–1104,1230–1336`; `tests/src/browser/Offcanvas.test.ts:1192–1269,1710–1768`.) The customized-body fixture already replaces and restores `document.body`. (`tests/src/browser/Modal.test.ts:1917–1937`.)

   Use these door-specific inputs and mutations:

   | Engine and door | Reaction that advances the token | Mutation the case must distinguish |
   |---|---|---|
   | Modal show event | Accepted `show` listener adds token. | Reinstate endpoint refusal after dispatch. |
   | Modal lock construction | Full-width fixed custom element adds token during compensation. | Release the constructed lock and stop on agreement. |
   | Modal body `open` | Customized body reacts synchronously to `modal-open`. | Retain the old starting-state requirement at this door. |
   | Modal adjustment | Custom host reacts to the padding write; arrange a rendered overflowing host when scrollbar width is zero. | Retain the old starting-state requirement after adjustment. |
   | Modal backdrop wait | Observer adds host token during the backdrop’s real show/wait. | Reject agreement at the post-backdrop door. |
   | Modal insertion | Detached custom host adds token in its connection reaction. | Reject agreement after append. |
   | Modal display | Host’s style reaction adds token on `display:block`. | Reject agreement after display. |
   | Modal `aria-hidden` | Host reaction adds token on attribute removal. | Reject agreement after `aria-hidden`. |
   | Modal `aria-modal` | Host reaction adds token on attribute write. | Reject agreement after `aria-modal`. |
   | Modal role | Host reaction adds token on role write. | Reject agreement after role. |
   | Modal hide event | Accepted `hide` listener removes token. | Reinstate endpoint refusal after dispatch. |
   | Modal isolation release | Trigger’s focus listener removes token during isolation destruction. | Require the starting shown state after isolation release. |
   | Offcanvas show event | Accepted `show` listener adds token. | Reinstate endpoint refusal after dispatch. |
   | Offcanvas lock construction | Fixed custom element adds token during compensation. | Release the constructed lock and stop on agreement. |
   | Offcanvas backdrop call | Reinsert a held backdrop carrying a custom child; its connection reaction adds the host token. | Reject agreement immediately after `backdrop.show()`. |
   | Offcanvas `aria-modal` | Host reaction adds token on attribute write. | Reject agreement after `aria-modal`. |
   | Offcanvas role | Host reaction adds token on role write. | Reject agreement after role. |
   | Offcanvas `showing` | Host reaction adds token when `showing` arrives. | Reject agreement after `showing`. |
   | Offcanvas hide event | Accepted `hide` listener removes token. | Reinstate endpoint refusal after dispatch. |
   | Offcanvas isolation release | Trigger’s focus listener removes token during isolation destruction. | Require the starting shown state after isolation release. |
   | Offcanvas `hiding` | Host reaction removes token when `hiding` arrives. | Reject agreement after `hiding`. |

   **[inferred]** An observer of a fresh Offcanvas backdrop cannot isolate its immediate post-call door: the observer runs after the synchronous host writes. The held-backdrop connection reaction is required for that case. **[read]** The code explicitly places that door after the call for insertion reactions, and the existing tests describe the held-backdrop setup. (`O:266–271`; `tests/src/browser/Offcanvas.test.ts:1276–1283`.)

   Each opening case must assert the following proposed endpoint:

   - Modal: computed `display:block`, shown opacity and dialog transform, actual pointer target, no `aria-hidden`, `aria-modal="true"`, `role="dialog"`, backdrop present, applicable body token and lock, reset host/body scrolling, focus on a focusable host, and inaccessible outside focus under enabled isolation.
   - Offcanvas: computed `display:flex`, `visibility:visible`, settled transform, actual pointer target, absence of `showing` and `hiding`, modal/dialog ARIA, backdrop present and receiving a press beside the panel, applicable lock, and configured isolation/focus.
   - Event recording: the requested pre-change event followed by its completed event, with the original trigger detail, and `true`.

   Each closing case must assert the proposed hidden endpoint: Modal computed `display:none` and hidden ARIA; Offcanvas hidden visibility, its off-screen placement, and no transition tokens; no remaining backdrop; released engine lock/body-token reference; restored outside interaction and trigger focus; pre-change followed by completed event; `true`. In shared-lock cases, assert that the other holder remains effective.

   **[read]** These endpoint assertions follow the existing complete sequences and CSS, rather than an invented second implementation. (`M:278–309,324–373`; `O:273–304,320–360`; `src/styles/components/_modal.scss:40–70`; `src/styles/components/_offcanvas.scss:9–59`.)

   Add the following controls and mutations:

   - **Skip the redundant token write:** arm a class reaction after the host’s own change and make a repeated engine token operation reverse the token. Mutating away the skip must prevent the expected visible completion.
   - **Continue all remaining work:** independently omit display, ARIA, transition-token cleanup, backdrop cleanup, lock release, scroll reset, isolation, focus, or completed dispatch. The relevant endpoint assertion must fail.
   - **Agreement followed by reversal:** advance early, then reverse at a later pre-token door. Require `false`, no completed event, E22’s bounded returning writes, and its resource limits. Mutating token checks into lifetime-only checks must fail.
   - **Destruction during continuation or return:** require snapshot restoration and no subsequent writes. Removing the lifetime check must fail.
   - **Nested pre-event calls:** exercise nested completion and nested work still awaiting a transition. The superseded outer call stays `false` and emits no duplicate completed event. Removing the identity comparison must fail.
   - **Prevention and initial refusal:** require no continuation; changing those refusals into agreement must fail.
   - **Completed-event re-entry, custom vocabulary, and option combinations:** preserve event ownership and use resolved tokens and configured resources.

   **[read]** Existing opposite-direction token tests and returning-step tests must retain their meaning; existing same-direction stop expectations must change. Examples include Modal’s lock-takeover assertion and Offcanvas’s early ARIA, `showing`, and `hiding` rows. (`tests/src/browser/Modal.test.ts:979–1061,1860–1891`; `tests/src/browser/Offcanvas.test.ts:1208–1216,1249–1269,2227–2264`.)

   Require the implementing unit to run each proposed regression red against `7fd28dc`, record the exact command and observed failure, then run that same case green after repair. For example:

   `npm run test:src:browser -- tests/src/browser/Modal.test.ts -t "<exact case title>"`

   Repeat with the Offcanvas path and each exact title. **[read]** The script selects the real browser project. (`package.json:63`.) The expected reds in this proposal are **inferred**, not measured; mutation controls may already pass on the base and must not be reported as original regression reds.

4. **Unit ownership, order, and acceptance**

   Own the following implementation, contract, documentation, and proof surfaces:

   - `src/browser/Modal.ts`
   - `src/browser/Offcanvas.ts`
   - `src/browser/types.ts`, limited to these engines’ method and event contracts
   - `tests/src/browser/Modal.test.ts`
   - `tests/src/browser/Offcanvas.test.ts`
   - `guides/veneer.md`, limited to these engines’ completion, takeover, and resource statements

   Put reusable reaction fixtures and case matrices in `tests/setupBrowser.ts` under a coordinated shared-file patch, as `tests.md` requires. No stylesheet change is needed for this ruling: the required correction is completing the engine writes the existing cascade consumes. **[inferred]** (`M:278–308,332–372`; `O:273–299,333–359`; cited cascade rules.)

   **Order:** land after **J-GUARDS**. Its guard import and `bindEventMap` ownership in these engines persists until it lands, as the brief specifies. Preserve its landed guard/detail changes when updating the contracts. Do not expand this unit into the carried sibling-engine observations or snapshot implementation.

   Acceptance requires:

   - Every inventoried door has a reached, red-first browser proof and a distinguishing mutation.
   - Same-direction completion satisfies the complete perceptual endpoint and normal event/result contract.
   - Prevention, initial refusal, nested calls, lifetime, reversal, completed-event re-entry, options, and replacement vocabulary retain their specified behavior.
   - E22’s opposite-direction return remains bounded to performed writes; its lifetime, identity, and resource limits remain intact.
   - Interface remarks, event descriptions, class documentation, and guide statements agree. **[read]** The existing wording explicitly promises stopping on token changes and must be revised. (`src/browser/types.ts:1349,1359,1495,1505`; `guides/veneer.md:2002–2007,2128–2159,2414–2419,2520–2544`.)
   - The implementing unit records scoped type, formatting, lint, browser, guide, and policy results, then the required landing gates. **[read]** The relevant scripts exist at `package.json:50–63,67,74,90`. This design round claims no passing gate.

PROPOSAL: Adopt A for Modal and Offcanvas after J-GUARDS: let an accepted, unsuperseded change complete when the host advances its shown token early, skip the redundant token write, dispatch normal completion, and preserve E22’s bounded return when the host subsequently reverses that endpoint.
