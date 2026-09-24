# J-DROPDOWN audit round 3 — the objective lane's verdict (`analyst` on GPT-6 Astra through `codex exec`, read-only sandbox; retained verbatim from the journal's last agent message)

Thread `01a0d214-b34f-7e32-8f1c-31fe088e9be3`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-dropdown-audit-3.jsonl` (launch copy under `tmp/codex/`); 25 commands; 476 s; usage {"input_tokens":2152372,"cached_input_tokens":1994496,"cache_write_input_tokens":0,"output_tokens":12011,"reasoning_output_tokens":4188}. Retained verbatim from the exec's last message.

---

Objective lane — source audit with retained execution evidence.

1. **BROKEN — restoration does not complete before every nested `destroy()` returns.**

   The closing-`beforetoggle` repair works at its tested entry point: the dropdown retains its placement until destruction returns, and repeated placement destruction reaches snapshot restoration. See [Dropdown.ts:242](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown/src/browser/Dropdown.ts:242), `Dropdown.ts:321`, and [Placement.ts:187](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown/src/browser/Placement.ts:187).

   The broader assertion fails when re-entry occurs **during snapshot write-back**. The exact counter-interleaving is:

   - Show a dropdown whose custom-element menu observes `popover`. Initially, the menu has neither `popover` nor `data-popper-placement`.
   - Call `hide()`. Placement destruction hides the popover, then starts snapshot restoration.
   - `HostSnapshot.restore()` captures its records and empties its instance collections before writing them back.
   - Restoring the `popover` attribute invokes the menu’s attribute reaction. In that reaction, call `dropdown.destroy()`, then read `data-popper-placement`.
   - The nested placement restoration sees empty collections. The nested dropdown destruction returns while `data-popper-placement` still carries the shown placement’s side.
   - The interrupted restoration resumes and removes that attribute **after the nested `destroy()` returned**.

   Evidence: [HostSnapshot.ts:124](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown/src/browser/HostSnapshot.ts:124), `HostSnapshot.ts:187`, `HostSnapshot.ts:247`; placement saves `popover` at `Placement.ts:100` and the side at `Placement.ts:183`. Attribute reactions execute before control returns from the corresponding DOM operation. [HTML custom-element reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions)

   This is a source-and-platform counter-interleaving, not a browser reproduction performed by this lane. The same empty-record problem applies when destruction re-enters during the dropdown’s own snapshot restoration.

   The supplied proofs distinguish their intended mutations:

   | Proof | Mutation and distinguishing assertion | Binding |
   |---|---|---|
   | `Dropdown.test.ts:1245`, closing promotion during hide | Clear `#placement` before destroying it, or return early from an already-aborted placement. The immediate readings must already be restored; subsequent mutation records must be empty (`:1280`). | Yes. `j-dropdown-red-3.log.txt:39`; mutation log `:99` and `:101`. |
   | `Dropdown.test.ts:1288`, closing promotion during destruction | Return early from an already-aborted dropdown. Immediate readings must include restored placement, tokens, and expansion (`:1328`). | Yes. Red log `:66`; mutation log `:102`. |
   | `Placement.test.ts:523`, nested placement destruction | Return early from an already-aborted placement. Immediate attribute/anchor readings and later mutation records distinguish it (`:555`). | Yes. Red log `:97`; mutation log `:100`. |

   The `JOINED` row binds the named hiding-dropdown proof because that proof itself fails; the additional destruction proof exercises the same removed completion behavior. None of these fixtures re-enters from an attribute restoration reaction, so they do not distinguish the counter-interleaving above.

   The retargeted “destruction leaves the placement” row correctly removes the signal path and the explicit destruction path. Its earlier signal-only version did **not** bind the ordinary destruction proof: `j-dropdown-mutations-3-first-run.log.txt:33` reports `named: []`.

   **Required correction:** nested destruction must finish pending restoration work, not merely invoke `restore()` again. The shared snapshot needs a completion mechanism that preserves its existing takeover and precedence rules; suppressing remaining writes would leave owned state unrestored.

2. **CONFIRMED — the arrow route checks the delegate’s lifetime after `show()`.**

   Attack: a `shown.vn.dropdown` listener destroys the delegate and focuses another connected button, while the dropdown was constructed directly and remains alive. [Delegate.ts:278](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown/src/browser/Delegate.ts:278) returns before querying entries or moving focus.

   The proof at `Delegate.test.ts:1387` distinguishes removal of that lifetime check: `:1414` requires focus to remain elsewhere, and `:1415`–`:1416` require the directly constructed dropdown to remain owned and shown. The retained red output identifies the erroneous focus on `#one` (`j-dropdown-red-3.log.txt:13`); the mutation row identifies this case as `EXACT` (`j-dropdown-mutations-3.log.txt:103`).

   Adjacent attack: navigation must continue when `show()` refuses because the menu is already open. The route does not inspect the promise’s boolean result. Repeated arrow navigation in `Delegate.test.ts:1119` exercises that path. The remarks at `Delegate.ts:54` and guide at `guides/veneer.md:950` accurately qualify focus movement by delegate lifetime.

3. **CONFIRMED — the entry-selector mutation now binds navigation.**

   Attack: retain the supplied trigger and menu selectors, but navigate with the default entry selector. The mutation changes only the entry-selector expression (`j-dropdown-mutations-3.py:261`; `j-dropdown-entry-row-line.py:9`).

   The fixture contains distinct `.dropdown-item` and `.vn-entry` controls. Acquisition and shown-class assertions execute before navigation at [Delegate.test.ts:1083](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown/tests/src/browser/Delegate.test.ts:1083). The retained diagnostic fails specifically at the focus assertion at `:1089`, not acquisition (`j-dropdown-entry-row-line.log.txt:3`).

   Its assertions therefore distinguish selecting the decoy from selecting the supplied entry. The whole-file row also names that case as `EXACT` (`j-dropdown-mutations-3.log.txt:92`). Unlike the earlier selector-group mutation, this row binds entry navigation alone.

4. **UNRESOLVED — the retained instrument is consistent, but independent replay is absent.**

   Attacks against the retained instrument held:

   - Comparing the parsed mutation definitions found no removed round-2 row. Changed rows are precisely the reported restoration re-anchors and the retargeted entry-selector row; the added rows target nested completion and arrow lifetime.
   - The runner deletes its preceding JSON report, reads failed assertion titles, and requires the named title to fail before assigning `EXACT` or `JOINED` (`j-dropdown-mutations-3.py:300`, `:342`). A nonzero exit alone is insufficient.
   - The full log records the claimed mutation outcomes and green baselines (`j-dropdown-mutations-3.log.txt:2`, `:104`). Its recorded source digests match the current audited source bytes.
   - The closing receipt is **`receipt: restored byte for byte`** (`j-dropdown-mutations-3.log.txt:112`).

   The carried red-first proofs also have discriminating assertions:

   | Carried proof | Mutation it distinguishes | Evidence |
   |---|---|---|
   | Refused dropdown promotion | Remove the promotion-state refusal, or let its error escape instead of resolving false | `Dropdown.test.ts:1145`; mutation log `:82`, `:84` |
   | Refused placement promotion | Remove the promotion-state refusal | `Placement.test.ts:475`; log `:83` |
   | Destroy during opening promotion | Remove the dropdown-to-placement signal | `Dropdown.test.ts:1186`; log `:86` |
   | Placement signal during promotion and later | Remove the abort listener | `Placement.test.ts:506`, `:516`; log `:87` |
   | Leftover-placement restoration door | Remove the lifetime/state check after restoring the old placement | `Dropdown.test.ts:1239`; log `:85` |
   | Visible-entry navigation | Omit `visibilityProperty` | `Delegate.test.ts:1120`; log `:88` |
   | Escape after delegate destruction | Focus the toggle unconditionally | `Delegate.test.ts:1208`; log `:89` |

   These whole-file rows bind the named proofs, not merely their files: the named cases fail, and the assertions address the removed behavior. They do not establish coverage of unrepresented reaction entry points.

   `j-dropdown-mutations-3-orchestrator.log.txt` is absent. The Orchestrator’s replay must reproduce the named failures, green baselines, and restoration receipt to settle this clause and the carried replay obligation.

5. **BROKEN — the scope and gate evidence hold, but the unqualified destruction-contract clause does not.**

   The counter-interleaving under claim 1 contradicts completion on return of the synchronous destruction contracts at [types.ts:507](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown/src/browser/types.ts:507) and `types.ts:919`. An unchanged declaration does not establish that its implementation fulfills it.

   The other clauses survived inspection:

   - Round-2 and round-3 status files match. Comparing retained patch sections shows no round-3 `types.ts` change and only the arrow-lifetime qualifier changed in the guide.
   - `HostSnapshot.ts` has no subject patch.
   - The Orchestrator’s gate log records the stated successful exits, including the tree-wide check (`j-dropdown-gates-3.log.txt:22`, `:78`, `:91`, `:104`, `:126`, `:138`, `:151`, `:164`, `:202`, `:597`). These were not rerun.
   - The added code contains no prohibited assertion, suppression, accessibility modifier, default export, or Bootstrap wire-event listener/dispatch.
   - Added element checks use `isInstance` directly or installed `instanceOf`, which calls `isInstance` (`node_modules/@orkestrel/contract/dist/src/core/index.js:6395`).
   - The report explicitly records that no `prove` call was made (`j-dropdown-report-3.md:3`).

**Findings fitting no claim:** none.

**Attacked and held**

The sequence trace preserves Bootstrap’s synchronous ordering (`node_modules/bootstrap/js/src/dropdown.js:124`, `:187`) while adding refusal checks:

| Door | Reaction considered and resulting behavior |
|---|---|
| Show dispatch | Prevention stops immediately; destruction or a nested show leaving the menu shown is reread before mutation (`Dropdown.ts:192`). |
| Old-placement restoration | Destruction or a changed menu token stops the subsequent placement operation (`:206`). Claim 1 identifies the separate incomplete-restoration problem inside that operation. |
| Placement construction | Destruction during the popover attribute write or opening event propagates through the signal; refused promotion restores and becomes a false show result (`Placement.ts:100`; `Dropdown.ts:288`). |
| Toggle focus and expansion | Destruction stops further dropdown writes; adding the menu token early fails the expected-hidden check. Re-entry while `#change` is set is refused (`Dropdown.ts:215`, `:261`). |
| Menu shown-token addition | A reaction removing the token prevents toggle-token writing and completed dispatch (`:219`; `Dropdown.test.ts:1080`). |
| Toggle shown-token addition and placement update | Destruction or removal of the menu token prevents the remaining completion (`Dropdown.ts:220`). |
| Hide dispatch and placement restoration | Prevention, destruction, or loss of the expected shown token stops subsequent hide writes (`:309`, `:321`). |
| Menu-token removal | A reaction restoring the token prevents toggle-token removal and expansion changes (`:324`; `Dropdown.test.ts:1115`). |
| Toggle-token removal and expansion | Each write rereads lifetime and the expected-hidden menu state (`Dropdown.ts:325`). |
| Completed dispatch | The change marker is cleared before dispatch, permitting a listener’s next operation. The interrupted operation makes no further DOM write (`:222`, `:329`). |

Under nested delegates, marks are keyed by event, route class, and driven host. Removing the click or key mark reddens the nested-root proof; its prevented hide makes duplicate routing observable (`Delegate.ts:331`; `Delegate.test.ts:1276`; mutation log `:67`, `:90`). Destruction after an earlier route stops the dropdown route before marking (`Delegate.ts:246`).

E12 refusal occurs before routing, marking, construction, or default prevention when the same host would receive competing constructions (`Delegate.ts:183`, `:197`). A pre-existing engine permits the other route to construct and drive; this is the correct adjacent behavior (`Delegate.test.ts:1316`). E12’s cross-delegate configuration allowance remains intact.

The guard’s hostile-accessor attack is contained, and its wrong-click-type control distinguishes permissive narrowing (`validators.ts:162`; `validators.test.ts:197`; mutation log `:71`–`:72`). Parser controls distinguish swapped dismissal switches, malformed offsets, reversed pairs, and unknown display values (`parsers.test.ts:48`, `:70`, `:80`, `:97`; mutation log `:73`–`:77`, `:93`–`:94`).

**Referrals**

Carry claim 1 to the shared snapshot owner and the successor item A. `HostSnapshot.restore()` explicitly restores only newly saved records on re-entry (`HostSnapshot.ts:131`); the dropdown repair assumes stronger completion behavior. Reproduce the `popover`-removal interleaving before prescribing the shared change. Preserve takeover, first-save precedence, and completed-event re-entry. E13’s allowance for empty `class` or `style` attributes does not cover a still-unrestored side attribute.

**Bounds**

This lane ran no browser test, build, mutation, or `prove` call and wrote no files. No `prove` call was refused. The new counter-interleaving is source-derived; runtime evidence comes from the supplied logs. The tested closing-event repairs hold, but they do not prove completion during snapshot write-back. Independent replay remains unresolved.

VERDICT: FAIL 1, 4, 5; outside the claims: none
