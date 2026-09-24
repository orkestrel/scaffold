# J-MODAL audit round 3 — the objective lane's verdict (`analyst` on GPT-6 Astra through `codex exec`, read-only sandbox; retained verbatim from the journal's last agent message)

Thread `01a0d24f-610c-7ff1-adff-f7b6bd8c805a`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-modal-audit-3.jsonl` (launch copy under `tmp/codex/`); 71 commands; 860 s; usage {"input_tokens":2865034,"cached_input_tokens":2676480,"cache_write_input_tokens":0,"output_tokens":14415,"reasoning_output_tokens":4374}. Retained verbatim from the exec's last message.

---

Objective lane — source, platform, and recorded-proof audit.

Source references below are relative to `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal`; evidence filenames are relative to `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units`.

1. **BROKEN — The lock under the modal’s lifetime.**

   The omitted overflow read rests on a false platform claim. A body can be a customized built-in element: extend `HTMLBodyElement`, register with `{ extends: 'body' }`, and create the body with the registered `is` value. Such an element can observe `style`. `CSSStyleDeclaration.setProperty` carries `[CEReactions]`, so its attribute reaction can run before the write returns. See the [HTML custom-element definition](https://html.spec.whatwg.org/multipage/custom-elements.html#customized-built-in-element), [body interface](https://html.spec.whatwg.org/multipage/sections.html#the-body-element), and [CSSOM declaration interface](https://drafts.csswg.org/cssom/#the-cssstyledeclaration-interface).

   The failing interleaving is:

   - Use that body in a document with a window, with no inline padding, and construct a modal with `backdrop: false, focus: false`.
   - Arm a one-shot body `style` reaction that calls `modal.destroy()` when overflow becomes hidden.
   - `ScrollLock` registers its holder, records overflow, and writes it at [ScrollLock.ts:71](/C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/src/browser/ScrollLock.ts:71).
   - The reaction destroys the modal. Its abort destroys the lock, deletes the last-holder record, and restores the recorded overflow (`Modal.ts:353`; `ScrollLock.ts:117–124`).
   - Construction resumes after `ScrollLock.ts:76`. No lifetime read intervenes. It saves and writes body padding at lines 94–95, **after destruction returned**, then notices the abort at line 96.
   - The modal’s construction door calls `lock.destroy()` again (`Modal.ts:243–245`), but the document record is already absent. The new padding recording belongs to an orphaned snapshot and remains written.

   This contradicts the no-further-writes contract at `types.ts:408` and the “body is never a custom element” explanation at `ScrollLock.ts:25–26` and `j-modal-report-3.md:24`. This is a source-and-standard interleaving, not a browser reproduction performed in this lane.

   **Smallest fix:** read the lock’s controller immediately after the overflow write, before continuing or taking the no-window return. Add a customized-body regression whose assertions detect writes after destruction and residual padding. Removing that new read must redden that case. The existing autonomous fixed-element fixtures do not exercise this door.

   The other lifetime mechanisms withstand the attacks examined: an already-aborted signal returns before registration; abort releases a registered holder; padding and margin writes have immediate lifetime reads; a live-modal token takeover releases the locally constructed lock before assignment; repeated destruction cannot remove another holder. Evidence: `ScrollLock.ts:57–68,95–106,114–124`; `Modal.ts:235–247,351–365`; `types.ts:403–409`; `guides/veneer.md:77`.

   The round-3 proof bindings are:

   | Proof | Mutation and distinguishing assertion | Recorded binding |
   |---|---|---|
   | Compensation reaction destroys the modal, `Modal.test.ts:1249` | Remove the padding lifetime read. The observer armed **after** `destroy()` detects subsequent writes; restoration and a fresh modal’s release are also asserted at lines 1288–1301. | **Bound:** original red fails at the observer (`j-modal-red-3.log.txt:10–27`); the targeted mutation is `EXACT` (`j-modal-mutations-3.log.txt:108`). |
   | Same proof, signal connection | Change the lock’s abort listener to an unused event. Its assertions distinguish delayed cleanup from cleanup completed inside destruction. | The `JOINED` row at log line 107 **does not independently bind this named case**: earlier destruction tests can leak a holder and prevent its compensation reaction from occurring. Run this mutation against the named case alone to establish its own failure cause. |
   | Construction takeover, `Modal.test.ts:1304` | Remove `lock.destroy()` from the failed construction door. Body-style and reactor-padding restoration fail at lines 1333–1334. | **Bound:** the joint original red was contaminated, but the isolated red establishes its own cause (`j-modal-red-3-takeover.log.txt:10–24`); mutation line 109 is `EXACT`. |
   | Already-aborted and subsequently aborted signals, `ScrollLock.test.ts:120` | Remove the pre-aborted return: unchanged body style fails at line 125. Disable the abort listener: final-holder restoration fails at line 136. | **Pre-aborted branch bound:** original red at `j-modal-red-3.log.txt:50–65`, `EXACT` mutation at line 110. The supplied targeted row does not separately establish the later-abort branch’s red. |
   | Margin reaction aborts, `ScrollLock.test.ts:144` | Remove the margin lifetime read. The later sticky element receives a post-abort margin write. Lines 179–185 assert reaction reachability, no later writes, and restored properties. | **Bound by mutation, not red-first:** `EXACT`, log line 111. |
   | Destruction during a show, `Modal.test.ts:663` | Remove the signal passed to the lock. Body overflow remains hidden at line 698. | The re-anchored `JOINED` row at line 42 has a direct distinguishing assertion in this earlier case; later joined failures add no independent proof. |

2. **BROKEN — Sentences and the return contract.**

   The Bootstrap normalization paragraph still makes a false universal claim. Bootstrap executes `JSON.parse(decodeURIComponent(value))` and returns the original string if either operation throws. Therefore valid JSON containing an invalid percent escape need not become an array or object.

   Concrete input: `data-bs-backdrop='["%"]'`. The installed normalizer returns the string `["%"]`, because URI decoding throws. That string passes Modal’s boolean-or-string validation and enables ordinary backdrop dismissal. This contradicts `guides/veneer.md:997–1002`, specifically its claim that any other JSON-parsable value becomes what the JSON holds and that JSON arrays or objects therefore fail validation.

   I executed the installed `Manipulator.getDataAttribute` in Node with inert attribute-value inputs. It returned:

   | Attribute text | Observed normalized value |
   |---|---|
   | `[]` | Array |
   | `["%"]` | Original string |
   | `""` — JSON-encoded empty string | Empty string |
   | `0`, `1` | Numbers |

   Normalization was executed; the subsequent validation and dismissal conclusions come from `node_modules/bootstrap/js/src/util/config.js:51–59` and `modal.js:56–59,158–161,233–239`. The normalizer is at `dom/manipulator.js:8–33`. The encoded empty string also requires care: it passes string validation but disables the backdrop and dismissal through its falsy value.

   **Smallest fix:** describe URI decoding, JSON parsing, and fallback to the original string; describe ordinary dismissal as applying to truthy non-`static` values. Keep the correct raw-empty, `null`, numeric, and `[]` examples.

   The corrected bounce and return-contract clauses withstand the attacks examined:

   - `preventDefault()` cannot cancel `prevent`, while a hide or destruction inside dispatch or focus stops the bounce before its static write (`Modal.ts:474–483`).
   - Completed-event re-entry starts after `#changing` clears. A synchronous hide inside `shown` does not change the original show’s result merely by removing its token (`Modal.ts:293–295,336–338`; `types.ts:1216,1226`).
   - Destruction inside a completed event still returns `false`; the lifetime read remains. The “modal is destroyed” exception in the return contract therefore matters.

   For the new completed-event proof at `Modal.test.ts:1338`, the distinguishing mutation is to replace the final lifetime-only return with `#holds(true)` after `shown`. Its assertion at line 1352 would distinguish that mutation because the hook has hidden the modal. **That mutation was not recorded.** The test’s appearance in the broad “the signal is ignored” failure row (`j-modal-mutations-3.log.txt:45`) does not bind completed-event semantics: that mutation destroys ordinary modals during construction, before the hook runs. Thus `j-modal-report-3.md:15–17` overstates this proof’s mutation binding. An isolated targeted row would settle it.

3. **CONFIRMED — The attribution correction.**

   I attacked the correction by checking whether the original red reached the bounce and whether the replacement proof could pass without exercising it.

   The original failure is explicitly `Key sequence "{Escape}" was sent with nothing focused`, at `j-modal-red-2.log.txt:210–216`. It establishes no bounce-focus behavior. The corrected report identifies that limitation at `j-modal-report-3.md:43–44`.

   The current case focuses the inner button, sends Escape, waits for evidence that the static token existed, and checks that focus remains on the inner button (`Modal.test.ts:1172–1191`). Changing the bounce’s focus condition to execute under `focus: false` moves focus to the host and fails that assertion. The targeted row is `EXACT` (`j-modal-mutations-3.py:276–277`; `j-modal-mutations-3.log.txt:95`).

   Comparison of the round-2 and round-3 patches shows no change to this case or the bounce implementation. The correction is supported; the original red-first attribution is not.

4. **UNRESOLVED — The instrument.**

   The retained instrument and writer’s log substantiate the recorded-run clauses:

   - AST comparison of the mutation tables found no removed round-2 label, the claimed new lock rows, and the stated show-dispatch retargeting.
   - The source edits implement the claimed re-anchoring (`j-modal-mutations-3.py:75–76,154–156,178–180,305–316`).
   - The final log contains `61 EXACT` and `49 JOINED`, with no `MISSED`, `ERR`, or `NOREPORT`; its green rows match the claimed results (`j-modal-mutations-3.log.txt:112–119`).
   - The first full run misses precisely the named destruction and show-dispatch rows (`j-modal-mutations-3-first-run.log.txt:42,52`).
   - The logged before/after source hashes agree, and the current source bytes match those hashes. The recorded closing line is `receipt: restored byte for byte`.

   I attacked the receipt’s scope and the meaning of `JOINED`. The receipt covers the source population listed in `j-modal-mutations-3.py:44`, not an independent replay or every worktree file. The classifier records failing titles from an entire test file (`:324–336,363–367`); it does not distinguish a direct failure from contamination by an earlier case. The per-proof limitations under claims 1 and 2 therefore remain despite successful classification.

   `j-modal-mutations-3-orchestrator.log.txt` is absent. **The independent-replay clause remains UNRESOLVED**, as the brief requires. The landing-round replay against the actual landing instrument, with its restoration receipt and named-case causes for disputed bindings, would settle it.

5. **CONFIRMED — Scope, gates, and added lines, bounded to the recorded round.**

   I attacked the scope claim by comparing round-2 and round-3 patch sections rather than treating the cumulative status as this round’s edit list. Only the claimed tracked files differ: Modal, ScrollLock, their tests, `types.ts`, and the guide. Current files also match the captured patch’s Git blob identities. The Delegate, Isolation, Backdrop, constants, parser, validator, and barrel changes in `j-modal-3-status.txt` are carried work, not new round-3 edits.

   The guide additions outside item B are the signal bullet and construction wording the claim expressly names (`guides/veneer.md:856–858,950–956`; `j-modal-report-3.md:111`). They introduce no additional API.

   Removing the repeated-destroy guard is safe: aborting an already-aborted controller is inert, and `holders.delete(this)` decides whether release proceeds (`ScrollLock.ts:117–120`). The repeated-release test protects a surviving holder (`ScrollLock.test.ts:68–82`). No added source uses the prohibited TypeScript constructs or Bootstrap event wiring. Element guards in the added paths use `isInstance` directly or the installed `instanceOf`, which calls it (`node_modules/@orkestrel/contract/dist/src/core/index.js:6395–6396`).

   The gate exits are recorded at `j-modal-gates-3.log.txt:24,27,34,79,92,105,127,139,152,165,203,613`. They were not rerun and are not findings. The report records no `prove` call at `j-modal-report-3.md:3`.

Findings fitting no claim: **none**.

**Attacked and held**

The remaining sequence review found these protections, with the overflow exception already assigned to claim 1:

| Sequence | Reaction or re-entry attack and result |
|---|---|
| Show pre-event | Destruction, token addition, or a nested show is followed by `#refused(true)` before acquisition (`Modal.ts:225–230`). The re-entry proof asserts the outer refusal, inner completion, event sequence, and single backdrop (`Modal.test.ts:943–965`); removing the post-dispatch read is `EXACT`, mutation log line 52. |
| Show writes | Lock completion, body-open write, adjustment, backdrop wait, host append, display, ARIA attributes, and role each lead to the required hidden-state door (`Modal.ts:243–267`). Connected/attribute reactions that destroy or add `shown` stop the outer call. Native scroll-position writes do not themselves invoke custom-element attribute reactions. |
| Show token and focus | Token insertion and dialog wait require `shown`; isolation construction has its own signal reads and local cleanup; focus is followed by another shown-state door (`Modal.ts:272–291`). Removing `shown` during token insertion suppresses completion; resources remain held until a documented release path (`Modal.test.ts:968–1011,1211–1243`). |
| Hide writes | The pre-event is reread; isolation release—including focus return—requires the still-shown state. Token removal, host wait, display/ARIA/role writes, backdrop wait, open-token release, padding removal, and lock release require the hidden state (`Modal.ts:299–335`). Adding `shown` during token removal stops later writes and suppresses `hidden` (`Modal.test.ts:1014–1047`). |
| Update and bounce | Adjustment’s branches are mutually exclusive from captured measurements, so a reaction to its single write has no subsequent adjustment write to overwrite its result (`Modal.ts:413–420`). Bounce rereads after dispatch and focus, and checks lifetime after its static write and await (`:470–487`). |
| Timing | Show waits on backdrop then dialog; hide waits on host then backdrop. Tests inspect transition existence and ordering (`Modal.test.ts:160–227`). Mutations removing those waits or substituting a host wait distinguish the assertions (`j-modal-mutations-3.py:87–93`). A transition-event-only wait cannot complete the reduced-motion case (`:288–290`). |

The retained red-first proofs named by the earlier report also have these distinguishing assertions:

| Proof | Mutation it distinguishes; evidence |
|---|---|
| Isolation destruction during construction | Disable the signal listener: claims persist or later inert writes occur. `Modal.test.ts:1052–1095`; mutation log line 90 is `JOINED`, so that row alone does not isolate the named cause. |
| Isolation construction takeover | Omit local `isolation.destroy()`: inert claims or observation remain. `Modal.test.ts:1098–1128`; `EXACT`, log line 92. |
| Isolation signal | Remove the pre-aborted return: extra inert claims appear; disable the listener: abort fails to restore claims or stop observation. `Isolation.test.ts:159–174`; the recorded `EXACT` row at line 91 targets the pre-aborted branch. |
| Prevent-hook hide | Remove the post-dispatch idle read: static appears after synchronous hide. `Modal.test.ts:1131–1152`; `EXACT`, log line 93. The revised `focus: false` fixture prevents the later focus door from masking this mutation. |
| Focus-hook hide | Remove the post-focus idle read: static appears after the focus listener hides. `Modal.test.ts:1155–1169`; `EXACT`, log line 94. |
| Clear ancestor remains claimed | Skip claims on already-clear ancestors: releasing the earlier isolation restores inert while the later isolation still needs the ancestor. `Isolation.test.ts:137–156`; `EXACT`, log line 96. |
| Destroyed inner delegate leaves modal to outer | Remove the early modal-route lifetime read: the prevented hide is dispatched again. `Delegate.test.ts:1157–1198`; `EXACT`, log line 97. |
| Destroyed delegate acquires nothing through dismiss | Remove dismiss’s lifetime read: a modal is acquired and changed. `Delegate.test.ts:1201–1225`; `EXACT`, log line 98. |
| Completed-hook hide returns focus | Arm focus return on `shown` instead of before `show`: the synchronous hidden event is missed. `Delegate.test.ts:1228–1252`; `EXACT`, log line 99. |
| Replacing fixed selector | Omit selectors passed to the lock: the replacement stays unpadded and the default element is padded. `Modal.test.ts:1194–1208`; `EXACT`, log line 105. |

The delegate’s nested-root marks are keyed by event, engine class, and driven host. Containment precedes marking; an existing modal mark prevents repeating the preliminary hide; lifetime is reread after that hide (`Delegate.ts:277–320,326–347,352–363`). The nested-root proof prevents changes so duplicate dispatches remain observable; removing either route’s mark or the early already-driven check fails its event sequence (`Delegate.test.ts:1255–1297`; mutation log lines 102–104).

E12 refusal precedes routes and default prevention. It compares the actual modal host with the button host or named collapse panels and requires the relevant engines to be absent (`Delegate.ts:187–192,219–237`). Same-host refusal and the preconstructed-button exception are asserted at `Delegate.test.ts:1400–1444`. Different hosts and conflicts visible only across differently scoped delegates remain permitted by `decisions.md:53–57`.

The event guard rejects missing/non-object detail, non-HTML targets, and throwing accessors; the parser preserves exact `static` and delegates boolean coercion to the installed dependency (`validators.ts:162–171`; `parsers.ts:51–52`). The corresponding assertions distinguish admitting missing detail, admitting arbitrary targets, propagating accessor errors, converting `static` to `true`, and folding case or whitespace (`validators.test.ts:172–227`; `parsers.test.ts:48–66`; `j-modal-mutations-3.py:60–71`).

**Referrals and bounds**

- Carry claim 1’s overflow-door fix and customized-body reproduction into item A. Preserve first-holder selectors and shared reference counting.
- Carry claim 2’s normalization correction and targeted completed-event mutation into item B/evidence work.
- The Orchestrator owns the pending replay and isolated checks for the disputed `JOINED` bindings.
- E13’s shared-restoration re-entry and empty-attribute bounds remain with their designated shared owner; they are not new Modal findings.
- This lane ran no browser test, build, gate, or mutation and changed no files. No `prove` call was attempted, so there is no refused call or probe receipt to report.

VERDICT: FAIL 1, 2, 4; outside the claims: none
