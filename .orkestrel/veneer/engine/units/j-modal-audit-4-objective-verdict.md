# J-MODAL audit round 4 (the landing round with its round-5 pass) — the objective lane's verdict (`analyst` on GPT-6 Astra through `codex exec`, read-only sandbox; retained verbatim from the journal's last agent message)

Thread `01a0d2e1-322b-73a0-a193-a24eaa3a608e`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-modal-audit-4.jsonl` (launch copy under `tmp/codex/`); 33 commands; 563 s; usage {"input_tokens":3577530,"cached_input_tokens":3399296,"cache_write_input_tokens":0,"output_tokens":14938,"reasoning_output_tokens":4597}. Retained verbatim from the exec's last message.

---

Objective lane — source audit with retained runtime evidence. Paths below are relative to the modal worktree; audit artifacts are under `scaffold/.orkestrel/veneer/engine/units/`.

1. **CONFIRMED — overflow-write lifetime read.**

   [ScrollLock.ts:76](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/src/browser/ScrollLock.ts:76) writes overflow and immediately checks the controller before testing the window or writing compensation. The abort listener is installed before registration and writing; destruction removes the holder and restores the snapshot.

   Attack: destroy the modal synchronously from a customized body’s overflow reaction, before `Modal.show()` receives the constructed lock. The signal releases the lock during construction; the new check prevents resumed compensation. `Modal.ts:243` then refuses the abandoned show.

   The proof at `tests/src/browser/Modal.test.ts:1362` distinguishes removing **only** this lifetime read: its observer starts after destruction returns, so the assertion at line 1402 detects subsequent writes, rather than restoration itself. Empty padding, restored overflow, and successful acquisition/release of a fresh lock additionally check cleanup. The retained red failure is at `j-modal-red-4.log.txt:9`; the exact mutation is recorded at `j-modal-mutations-4.log.txt:112`. The class remarks and guide describe the landed read (`ScrollLock.ts:23`; `guides/veneer.md:1895`).

2. **BROKEN — the numeric-string generalization exceeds Bootstrap’s normalizer.**

   [guides/veneer.md:2037](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/guides/veneer.md:2037) says “a numeric string becomes a number.” Bootstrap first requires the exact comparison `value === Number(value).toString()`; otherwise the value proceeds through URI decoding and JSON parsing (`node_modules/bootstrap/js/src/dom/manipulator.js:17`, `:30`).

   I directly exercised the installed normalizer and `Config._typeCheckConfig`, using Modal’s declared `(boolean|string)` pattern:

   | Input | Normalized value | Type check |
   |---|---|---|
   | `01` | `"01"` | Accepted |
   | `00` | `"00"` | Accepted |
   | `0x10` | `"0x10"` | Accepted |
   | `1e3` | `1000` | Rejected |
   | `1.0` | `1` | Rejected |
   | `0`, `1` | Numbers | Rejected |

   The numeric-looking strings that survive are truthy, so Bootstrap enables their backdrop and ordinary dismissal (`modal.js:160`, `:238`). This falsifies the general wording, without falsifying the paragraph’s explicitly listed examples.

   **Smallest fix:** describe the exact numeric comparison, followed by the existing JSON fallback. Preserve the correct readings for `[]`, `["%"]`, `""`, `0`, and `1`.

   **Proof binding:** `j-modal-normalize-probe.log.txt:1` records those listed examples but contains no leading-zero or hexadecimal input. Its readings do not distinguish the current generalization from the precise algorithm. Green guide parity does not supply that distinction.

3. **CONFIRMED — completed-event mutation and targeted lock readings.**

   [Modal.ts:293](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/src/browser/Modal.ts:293) clears the change before dispatching `shown`, then returns the lifetime result. This agrees with `types.ts:1307`: a completed-event listener may start a new change without retroactively taking over the completed show.

   | Proof | Mutation | Does its assertion distinguish the mutation? |
   |---|---|---|
   | `Modal.test.ts:1339`, shown hook hides | Replace the final lifetime return with `#holds(true)` | **Yes.** The hook completes a hide; line 1353 still requires the original show to resolve `true`. Retained result: `EXACT`, mutation log line 113. |
   | `Modal.test.ts:1250`, compensation reaction destroys | Bind the lock’s abort listener to `vn-never` | **Yes.** The targeted run fails at line 1290 on writes after destruction. `j-modal-targeted-4.log.txt:1` records the isolated case, failure, and matching restoration digests. |
   | `ScrollLock.test.ts:120`, signal lifecycle | Bind that listener to `vn-never` | **Yes.** The targeted run reaches the later-abort branch and fails at line 136 because the original style was not restored. Targeted log line 14 records this separately. |

   Attack: attribute the failures to leaked state from preceding cases, or let the pre-aborted branch stand in for later abortion. The targeted runs exclude those explanations. Their before/after digest is `e04a2efaa233fe73d4bc83ea5655e405433b33bd44188126b35ea3d615613f08`.

4. **CONFIRMED — merge preservation.**

   I compared the staged tree with each parent and checked the retained diff against the current staged diff. `j-modal-5.diff` matches `git diff --cached 9c56ad8` over the specified paths.

   Attack: silently lose a landed declaration, test, listener proof, or guide block during conflict resolution. Against `2cc0887`, the named constants, barrel, parsers, validators, and their ordinary tests lose no lines. `Delegate.test.ts` retains main’s content, including the listener-control case at line 245. The index type-test title changes to include Modal; its existing assertions remain (`tests/src/browser/index.test.ts:18`).

   The barrel adds the modal family before Delegate (`src/browser/index.ts:18`); the guide puts the Modal example after Carousel and its section after Carousel (`guides/veneer.md:629`, `:1838`). The named plugin rows retain shipped status and proof paths. The current unmerged and unstaged diffs are empty; `HEAD` and `MERGE_HEAD` match the brief.

   **Proof binding:** deleting Modal/Isolation barrel exports breaks the explicit exported-name assertion at `index.test.ts:53`; the retained mutation result is `EXACT` at log line 9. The listener-control fixture at `index.test.ts:154` establishes that the listener recorder can detect a module-installed listener.

5. **CONFIRMED — shared delegate mechanism.**

   [Delegate.ts:468](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/src/browser/Delegate.ts:468) has one conflict calculation. Modal toggle and enabled dismiss candidates enter a deduplicating Set only when `Modal.find` finds no engine. The resulting candidates join the other constructing hosts before any route executes. Disabled dismissal uses the same `#locate` predicate as actual dispatch.

   Modal participates in the click marks, ownership, construction, acquisition, and discard paths. ScrollSpy participates through scanning and ownership, rather than a click route. `#press` and `#scan` remain main’s implementations. The duplicate modal conflict and dismiss-resolution paths are absent.

   Attacks and proof binding:

   | Proof | Mutation that makes it fail | Distinction |
   |---|---|---|
   | Anchor toggle, `Delegate.test.ts:2917` | Remove modal-route `preventDefault` | **Yes:** `dispatchEvent` must return `false`. The retained row is `JOINED`. Its replacement also changes `#readModal(trigger)` to `#readModal(target)`; for this named direct-anchor case those are the same element, so cancellation still binds the named proof. |
   | Outer delegate survives earlier button listener, `:3093` | Remove the first modal lifetime read | **Yes:** the prevented open-modal hide would be dispatched again; the event recorder requires one hide. `EXACT`, log line 97. |
   | Outer delegate survives inner hide listener, `:3058` | Remove the lifetime read before marking | **Yes:** the dead inner delegate marks the target; `#construct` cannot undo that mark, and the outer delegate then fails to show it. `EXACT`, line 80. |
   | Destroyed dismiss route, `:3137` | Remove the lifetime read in shared `#reach` | **Yes:** the consumer-constructed modal at line 3164 bypasses `#construct`, so the assertions that it remains shown directly test `#reach`. `EXACT`, line 98. |
   | Nested roots, `:3205` | Remove the modal mark, prior-driven lookup, or shared dismiss mark | **Yes:** cancelled pre-change events preserve state, exposing duplicate routing in the event list. Results are `EXACT`, `EXACT`, and `JOINED` respectively, lines 102–104. |
   | Dismiss resolution, `:3250` | Remove the dismiss route, disabled check, or enclosing-host fallback | **Yes:** the assertions separately require no acquisition for disabled triggers and successful named/enclosing dismissal. The shared-helper mutations also affect Alert cases; their `JOINED` results do not erase these direct assertions. |
   | Same-host conflicts, `:3350`, `:3380` | Omit `...modals` from shared conflicts | **Yes:** the tests require absent engines and untouched state. The existing-Button branch also rejects unconditional same-host refusal. Both named cases fail in the `EXACT` row at line 88. |
   | Immediate shown-hook hide, `:3178` | Arm focus return on `shown` instead of before `show` | **Yes:** the earlier consumer hook completes the hide before late registration; focus fails to return. `EXACT`, line 99. |
   | Prevented show, `:2961` | Omit `refused.abort()` | **Yes:** a later independent hide incorrectly returns focus to the refused trigger. `EXACT`, line 79. |

   The dismiss route deliberately prevents an anchor/area default before its lifetime check (`Delegate.ts:580`); the toggle route checks lifetime first (`:786`). The guide states that distinction at `guides/veneer.md:2011` and `:2016`.

6. **CONFIRMED — round-5 declaration and integration.**

   [types.ts:145](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/src/browser/types.ts:145) declares readonly resolved Modal groups after `CarouselVocabulary`. `Delegate.#modal` uses that interface at line 190, the guide carries its surface row at line 43, and `index.test.ts:39` asserts the required, non-nullable option-group shape.

   Attack: leave optional keys in the resolved vocabulary, omit a group, retain the inline declaration, or change runtime resolution while replacing its type. The declaration, consumer, and parent comparison exclude those changes.

   **Proof binding:** making a vocabulary group optional or changing its map would break the `expectTypeOf` equality when typechecked. The browser runtime pass alone cannot establish that type assertion; no new type-mutation receipt is claimed here.

   The delegation sentence now distinguishes disabled-aware dismiss from toggle (`guides/veneer.md:741`, `:746`). Current status contains no unstaged or unmerged entry. `tmp/j-modal/dry-check-5.log.txt:1` records the dry check; my read-only anchor/name comparison also found no mismatch.

7. **BROKEN — retained first-run history; replay clause UNRESOLVED.**

   The statement that the retained first full run missed the named lifetime rows is contradicted by that artifact:

   | Row | Retained first-run result |
   |---|---|
   | `the route runs after a listener destroys the delegate` | `MISSED`, `j-modal-mutations-4-first-run.log.txt:80` |
   | `the dismiss route reads no lifetime` | Already `EXACT`, the same file at line 98 |

   Thus `j-modal-report-4.md:88` and this claim misdescribe the retained first-run evidence. **Smallest fix:** correct the history to match the retained artifact, or identify and retain the actual earlier run being described. This does not invalidate the final lifetime proofs.

   The remaining instrument and scope clauses held against inspection:

   - Every previous mutation label remains; the added labels are the overflow-read and completed-event mutations. The final log records `61 EXACT`, `51 JOINED`, no missed/error rows, the stated green readings, and `receipt: restored byte for byte` (`j-modal-mutations-4.log.txt:114`).
   - `Isolation.ts`, `Backdrop.ts`, `HostSnapshot.ts`, and `Modal.ts` match `9c56ad8` byte-for-byte. The landed engines and `helpers.ts` match `2cc0887` byte-for-byte.
   - The landing additions introduce none of the prohibited constructs. Their element guards use `isInstance` or `instanceOf`, whose installed implementation calls `isInstance`.
   - The reports record no `prove`, commit, install, merge-abort, or discarding command. The established gate results were not rerun.

   **UNRESOLVED replay clause:** `j-modal-mutations-5-orchestrator.log.txt` is absent, as the brief predicts. The Orchestrator’s replay and subsequent landing-gate evidence must settle this clause.

**Findings fitting no claim:** none.

**Attacked and held — sequence doors and retained proof limits.**

The show/hide trace found no additional unguarded reaction-capable write in the audited sequence:

| Sequence | Reaction attack and result |
|---|---|
| Pre-change dispatch | Destruction, re-entry, or changed shown state is reread before acquiring resources (`Modal.ts:224`, `:298`). The re-entry proof at `Modal.test.ts:944` distinguishes removing the second show refusal read; merely destroying inside `show` no longer uniquely distinguishes it because the lock’s signal checks also stop that path. |
| Lock construction | Overflow, padding, and margin reactions can abort before the lock is assigned. The signal stops construction; the caller releases an unaccepted lock (`ScrollLock.ts:61`, `:77`, `:96`, `:106`; `Modal.ts:243`). Removing post-padding/post-margin checks is distinguished by `Modal.test.ts:1250` and `ScrollLock.test.ts:144`. |
| Open token and adjustment | Body-class reactions and host-style reactions are followed by the phase check (`Modal.ts:249`). Adjustment’s branches are mutually exclusive, so a reaction to its chosen write cannot lead to the other padding write. |
| Backdrop wait and host insertion | The await and insertion each precede a phase check (`Modal.ts:258`, `:262`). A connected callback that destroys or changes the token stops subsequent host writes. |
| Display and ARIA writes | Each write passes through `#apply`; destruction or token takeover stops the next write (`Modal.ts:264`). The role-reaction proof at `Modal.test.ts:879` distinguishes replacing that shared post-write read with unconditional success. |
| Shown-token write and dialog wait | Token removal stops show before isolation or `shown`; the later-token-return case distinguishes clearing the abandoned change (`Modal.ts:272`; `Modal.test.ts:969`). |
| Isolation and focus | Construction receives the lifetime signal; rejected construction is destroyed before assignment. Focus is followed by a phase check (`Modal.ts:279`). The isolation proofs at `Modal.test.ts:1053` and `:1099` distinguish disabling its abort listener and removing rejected-isolation cleanup respectively. Their assertions observe restored inert state and later insertions, rather than relying solely on whole-file failure labels. |
| Hide isolation release and token removal | Focus return may re-enter or change the host; `#apply(true)` checks it before token removal. Re-added shown state then stops hide (`Modal.ts:309`; `Modal.test.ts:1015`). |
| Hide completion writes | Host fade, display/ARIA changes, backdrop wait, open-token release, padding removal, and lock release each reach the relevant phase check before subsequent work (`Modal.ts:313`). |
| Completed dispatch | The change has ended; a listener’s new show/hide leaves the completed call’s result intact, unless destruction aborts its lifetime (`Modal.ts:293`, `:336`; `types.ts:1307`, `:1317`). |
| Bounce and update | Prevent-dispatch and focus re-entry are checked before adding the static token; destruction is checked before later removal. Update makes at most its selected padding write (`Modal.ts:413`, `:470`). The focus-false bounce proof is mutation-bound, not red-first, as corrected in `j-modal-report-3.md`. |

Timing proofs distinguish skipping the backdrop await, waiting on the host instead of the dialog, skipping the hide fade, and replacing animation settlement with `transitionend` (`Modal.test.ts:161`, `:188`, `:215`; mutation log lines 16–18 and 100). They establish behavior under the **test-local cascade**.

Guard proofs distinguish accepting missing detail, accepting invalid related targets, and propagating throwing accessors (`validators.test.ts:435`, `:461`; mutation log lines 4–6). Parser proofs distinguish changing `static` to `true` and accepting folded case/space (`parsers.test.ts:201`; log lines 7–8).

**Referrals and bounds.** Refer claim 2’s wording and claim 7’s artifact history to the landing correction. W5 retains the shipped-cascade reading. E12’s per-delegate conflict boundary and E13’s restoration bounds remain applicable. Browser tests, builds, and mutations were not executed by this lane; retained runs supply that evidence. No `prove` call was attempted, so there is no refused-call receipt.

VERDICT: FAIL 2, 7; outside the claims: none
