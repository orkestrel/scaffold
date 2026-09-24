# J-TAB audit round 2 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d1e4-1c5a-7621-910a-d39c3b27fe77`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-tab-audit-2.jsonl` (launch copy under `tmp/codex/`); 53 commands; 534 s; usage {"input_tokens":2955921,"cached_input_tokens":2752512,"cache_write_input_tokens":0,"output_tokens":13730,"reasoning_output_tokens":5592}. Retained verbatim from the exec's last message.

---

Objective lane — source review against the captured round-2 diff and supplied execution records.

1. **CONFIRMED — outgoing-phase door.** I attacked the outgoing token removal and blur with sibling reactivation, third-control activation, destruction, and same-tab re-entry. The repaired predicate catches the sibling activation at `src/browser/Tab.ts:235`; lifetime and change identity remain checked at `:233` and `:234`.

   The write sequence is covered: outgoing `active` removal, blur, outgoing-pane token removal, outgoing selection and dropdown writes, incoming `active` addition, incoming selection and dropdown writes, then incoming-pane `active` and `shown` additions (`Tab.ts:179`, `:180`, `:183`, `:187`, `:190`, `:191`, `:194`, `:198`, `:377`). Each `#apply` performs its write and reads the predicate before the next write. The pane wait and `hidden` dispatch have subsequent reads at `:201` and `:206`. Destruction or re-entry during these writes fails the lifetime or identity check; another active control fails the sibling check; removing a required host or pane token fails that phase’s token check. No traced door admits a violation of those predicates and then proceeds to another write.

   Proof binding holds:
   - Removing the sibling read distinguishes the blur and third-control cases (`tests/src/browser/Tab.test.ts:1084`, `:1148`; `j-tab-mutations-2.py:201`; `j-tab-mutations-2.log.txt:74`). Their return-value and active-control assertions distinguish the mutation. The blur case additionally observes no subsequent writes.
   - Removing the pre-change sibling reread distinguishes the sibling-deactivation case (`Tab.test.ts:969`; instrument `:65`; log `:16`).
   - Removing the host-token read distinguishes the control-deactivation case without another active control masking it (`Tab.test.ts:1269`; instrument `:98`; log `:31`).
   - The multiple-active case asserts the first removal and refusal (`Tab.test.ts:1129`).

   The supplied initial red run records the blur and third-control failures at `tmp/j-tab/r2-red-1.log.txt:52` and `:71`. These named failures bind the proofs; the whole-file run is not being treated merely as a nonzero exit.

2. **CONFIRMED — delegate lifetime.** I attacked destruction during the earlier button route and during a tab’s initial attribute writes. The click route returns before prevention or marking at `src/browser/Delegate.ts:258`. Construction checks the delegate’s lifetime before acquisition, destroys the newly constructed tab when necessary, and returns no engine (`:297`). The key route checks lifetime after focus and shares that construction path (`:289`).

   Deleting the entry lifetime check makes the list-write assertion fail, even though the post-construction check can subsequently destroy the tab (`tests/src/browser/Delegate.test.ts:1250`; instrument `:205`; log `:75`). Deleting the post-construction check leaves an owner and attaches the observer, distinguished by the construction-reaction case (`Delegate.test.ts:1293`; instrument `:207`; log `:76`). The initial red run records these failures at `tmp/j-tab/r2-red-1.log.txt:10` and `:33`.

   The assertions bind the stated mutations. They do not independently isolate an earlier mark with no construction, or anchor prevention: the earlier-route fixture uses a button.

3. **BROKEN — the claimed panel collection is inaccurate.** `#conflicts` does **not** filter collapse panels to those inside the root. It filters only on `Collapse.find(panel) === undefined` (`src/browser/Delegate.ts:207`). With an in-root trigger targeting an unowned panel outside the root, that external panel enters `hosts`, contradicting the claim’s parenthetical.

   This does **not** break E12’s refusal behavior. `readTargets` returns unique elements (`src/browser/helpers.ts:164`), while the button and tab candidates are root-contained by `#closest` (`Delegate.ts:219`). An external panel therefore cannot introduce a duplicate. Actual collapse driving checks containment before marking (`:245`).

   The smallest correction is to the claim: say that all unowned named panels enter the collection, but only an in-root panel can duplicate another route’s candidate. The implementation matches the requested Alert shape. Removing the panel candidates and removing `#closest` containment are distinguished by the supplied named failures (`j-tab-mutations-2.log.txt:77`, `:78`).

4. **CONFIRMED — listener and abort mutations.** I tested the rival readings against the actual edits and assertions. Removing the key-listener registration changes the recorded root-listener population (`tests/src/browser/Delegate.test.ts:246`; `j-tab-mutations-2.py:215`; log `:79`). Removing only the live abort subscription leaves `Tab.find(control)` populated after abort (`tests/src/browser/Tab.test.ts:720`; instrument `:225`; log `:83`). The latter genuinely distinguishes live subscription loss rather than only an already-aborted signal.

5. **CONFIRMED — vocabulary and helper behavior.** I attacked toggle exclusion, a trigger that also matches the toggle selector, non-HTML matches, replacement selectors, and an undefined value actually present in the neighbor list. The implementations and assertions distinguish these cases (`src/browser/helpers.ts:314`, `:343`; `tests/src/browser/helpers.test.ts:625`, `:637`, `:658`).

   The targeted mutations bind through the named failures at `j-tab-mutations-2.log.txt:80`, `:81`, and `:82`. In particular, the list containing `undefined` makes the undefined-current proof distinguish dropping its special handling. `TabVocabulary` has the required readonly groups, is used by the delegate, and has the asserted public type (`src/browser/types.ts:105`; `Delegate.ts:78`; `tests/src/browser/index.test.ts:18`). The separate false helper remark is F1 below.

6. **BROKEN — the restoration explanation overstates what an initial active click saves.** The reverse iteration is correctly adopted in destruction and observer release (`src/browser/Delegate.ts:168`, `:356`). Reverting each order independently reddens its named restoration proof (`j-tab-mutations-2.py:227`, `:229`; log `:84`, `:85`). The markup assertions distinguish the order change (`tests/src/browser/Delegate.test.ts:1430`, `:1460`).

   However, `guides/veneer.md:909` says a tab acquired by clicking an already-active control “saves nothing at that click.” For ordinary markup lacking initial roles and states, construction plans, saves, and writes those attributes before `show()` refuses the already-active control (`src/browser/Tab.ts:108`, `:118`, `:149`, `:293`, `:333`). The guide’s statement is false.

   The smallest fix is to say that this click saves **no swap tokens**, while construction still records its initial attribute writes. Preserve the documented shared-snapshot bound and the reverse-order implementation.

7. **CONFIRMED — item G’s corrected sentences.** I attacked the claimed keyboard owner, direct activation of a disabled control, destruction during completion, and Bootstrap’s outgoing fade ordering. The revised interface assigns activation to Tab and listener cleanup to Delegate (`src/browser/types.ts:938`, `:1003`, `:1013`, `:1021`, `:150`). Direct `Tab.show()` does not enforce delegated disability, consistent with the revised wording.

   The corrected `hidden.bs.tab` sentence matches Bootstrap: outgoing completion is queued on the outgoing control’s `fade`, and otherwise runs before incoming activation (`node_modules/bootstrap/js/src/tab.js:99`, `:140`, `:152`; `guides/veneer.md:943`). The nav assertion measures control-color transitions and no pane fade (`tests/src/browser/Tab.test.ts:58`). Guide parity passed in the supplied gate record (`j-tab-gates-2.log.txt:85`).

8. **CONFIRMED — names and record types.** I looked for surviving renamed methods, tuple declarations, and inline dropdown object types. The doors use `host` and `pane`, selection takes `control`, and the renamed methods and named records are present (`src/browser/Tab.ts:230`, `:243`, `:293`, `:333`, `:345`, `:369`; `src/browser/types.ts:983`, `:993`). The surface rows match the records (`guides/veneer.md:125`). This is a source-shape ruling, not an additional behavioral proof.

9. **UNRESOLVED — independent replay clause.** As directed, the Orchestrator replay remains unresolved in this verdict. Settlement requires its completed replay, named-case results, and restoration receipt against the captured baseline.

   The remaining clauses withstand the audit. The captured status and diff stay within the owned files; the type hunks concern the authorized declarations (`j-tab-2-status.txt:1`; `j-tab-2.diff:1200`). A read-only comparison of the instrument declarations confirmed preserved round-1 labels and order, the reported re-anchoring, replacement proof bindings, and added rows. The retained log records the named failures, green baselines, and `receipt: restored byte for byte` (`j-tab-mutations-2.log.txt:2`, `:74`, `:86`, `:92`). The initially missed rows are the ones the report identifies (`j-tab-mutations-2-first-run.log.txt:16`, `:31`, `:75`).

   The supplied gate exits stand without rerunning them (`j-tab-gates-2.log.txt:18`, `:72`, `:578`). The added code contains no prohibited assertion, suppression, access modifier, default export, or Bootstrap wire dispatch. Documentation references to Bootstrap events describe the upstream surface.

**Findings fitting no claim**

- **F1 — false `readControls` remark.** `src/browser/helpers.ts:336` says a dropdown toggle is never a control. The trigger branch includes one: the existing fixture’s `#forced` element is a dropdown toggle carrying `data-bs-toggle="pill"`, and the expected result includes it (`tests/src/browser/helpers.test.ts:647`, `:654`). Correct the remark to “A dropdown toggle is excluded unless it also matches `trigger`.” Keep the query and test unchanged.

**Attacked and held**

- Nested-root duplicate driving remains distinguished because the test vetoes `show`, preventing the active-control refusal from hiding repeated drives (`tests/src/browser/Delegate.test.ts:1165`). Marks remain keyed by event, route, and host (`src/browser/Delegate.ts:313`).
- E12 correctly allows a consumer-owned engine and refuses competing constructions before either route runs (`Delegate.ts:180`; `Delegate.test.ts:1301`, `:1331`). Its amended per-delegate boundary remains valid.
- Unrelated token additions are preserved; the takeover predicate checks the documented phase tokens. The final `shown` dispatch is the completion boundary, after which the return checks destruction (`src/browser/Tab.ts:208`).
- The target-attribute override is correctly passed in the captured source (`j-tab-2.diff:749`). A transient worktree reading differed and was excluded from the product findings.

**Referrals**

- Correct claim 3’s collection description in the audit record.
- Carry claim 6’s wording correction under item F and F1 under item E.
- Retain E16’s disabled-reading change as its declared landing obligation, and J-SNAPSHOT-SHARED/E13 as their existing bounded follow-ups.

**Bounds**

This verdict reviews source and supplied execution evidence. No browser test, build, mutation, or gate was rerun; no file was written and no agent was spawned. No `prove` call was made or refused. The worktree changed during reading, so the captured diff governs the reviewed source.

VERDICT: FAIL 3, 6, 9; outside the claims: F1
