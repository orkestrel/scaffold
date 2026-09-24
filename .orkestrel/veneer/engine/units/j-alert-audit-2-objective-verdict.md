# J-ALERT audit round 2 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d1c8-411c-7d21-a02f-796abaf02d1b`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-alert-audit-2.jsonl` (launch copy under `tmp/codex/`); 30 commands; 344 s; usage {"input_tokens":2099049,"cached_input_tokens":1943168,"cache_write_input_tokens":0,"output_tokens":9216,"reasoning_output_tokens":2625}. Retained verbatim from the exec's last message.

---

Objective lane — source review against the supplied execution evidence.

1. **CONFIRMED — close is in flight from dispatch.** The re-entry attack fails because `#closing` is set before `emitEvent`; an inner call returns before dispatch, and `finally` clears the marker after prevention or completion (`src/browser/Alert.ts:114`, `src/browser/Alert.ts:141`). The replacement case asserts the inner result, outer result, event sequence, disconnection, and released claim (`tests/src/browser/Alert.test.ts:382`). Its recorded red result identifies the outer-result assertion, followed by green (`tmp/j-alert/r2-a-red.log.txt:12`, `tmp/j-alert/r2-a-green.log.txt:11`). Moving the marker after dispatch and moving prevention outside `try` redden their named cases (`j-alert-mutations-2.py:104`, `j-alert-mutations-2.log.txt:28`).

   Door trace:
   - `close` dispatch: destruction is read before saving or writing; re-entry is refused. Listener changes to the token precede the snapshot and the close’s own token removal (`Alert.ts:120`).
   - Snapshot and layout: these perform reads, not host writes (`HostSnapshot.ts:73`, `helpers.ts:124`).
   - Token removal: synchronous destruction or restoration of `shown` stops continuation through `#holds`; re-entry remains refused (`Alert.ts:130`, `Alert.ts:161`).
   - Fade wait: destruction or a returned token stops continuation after the await. Removing `fade` can cancel the animation; the helper treats its rejected completion as settled (`Alert.ts:131`, `helpers.ts:85`).
   - Host removal: destruction, returned `shown`, or synchronous reinsertion into the document prevents `closed` (`Alert.ts:136`).
   - `closed` dispatch: destruction returns `false`; re-entry remains refused. Token restoration and reinsertion are not checked here. This preserves the sequence claimed here but contradicts claim 5’s broader return description (`Alert.ts:137`).
   - Destruction releases before restoration, so a replacement engine can claim the host during a restoration reaction; the shared snapshot transfers pending originals (`Alert.ts:146`, `HostSnapshot.ts:252`).

   The sequence retains Bootstrap’s removal-before-`closed` and disposal-after-`closed` ordering (`node_modules/bootstrap/js/src/alert.js:37`). No pre-`closed` write door inspected admits a persistent takeover state that the outer close subsequently overwrites.

2. **CONFIRMED — `AlertVocabulary`.** The attack was a missing, optional, or mutable vocabulary member and an orphaned inline declaration. The named interface has the required readonly map members, follows `CollapseVocabulary`’s form, types `Delegate.#alert`, and has the matching guide summary (`src/browser/types.ts:94`, `src/browser/types.ts:104`, `src/browser/Delegate.ts:77`, `guides/veneer.md:40`). Removing its guide row is the discriminating mutation: the retained red names the missing `interface AlertVocabulary`; the subsequent run is green (`tmp/j-alert/r2-b-red.log.txt:10`, `tmp/j-alert/r2-b-green.log.txt:9`). This proves surface membership, not runtime behavior.

3. **CONFIRMED — resolver names and shared containment path.** The attack was a closest match above the delegate root, including a match rejected before routing. `#conflicts`, button routing, collapse routing, and dismiss resolution use `#closest`; it retains the HTMLElement and containment checks (`src/browser/Delegate.ts:184`, `src/browser/Delegate.ts:206`, `src/browser/Delegate.ts:212`, `src/browser/Delegate.ts:224`). `#reach` returns the marked host; `#locate` returns the resolved, enabled, contained host. Their comments describe those results, and the contract import contains only `isInstance` (`Delegate.ts:13`, `Delegate.ts:257`, `Delegate.ts:282`).

   Removing containment makes the existing outside-root case observe prevention or `aria-pressed`, which its assertions reject (`tests/src/browser/Delegate.test.ts:626`). The corresponding mutation names that case `EXACT`; the scoped unmutated run reports `50 passed` (`j-alert-mutations-2.log.txt:57`, `tmp/j-alert/r2-ce-green.log.txt:11`). This row directly binds the button path; the source establishes that collapse uses the same resolver.

4. **CONFIRMED — focus control.** The attack was the precise previously invisible focus move: focus the alert’s previous sibling before closing. That sibling is now the connected, focusable `Elsewhere` button. The fixture rejects focus on it and requires `document.body` after the trusted click (`tests/src/browser/Delegate.test.ts:1058`). The mutation calls that sibling’s `focus()` (`j-alert-mutations-2.py:161`). The retained readings change from `MISSED` to `EXACT` against the named case (`tmp/j-alert/r2-d-red.log.txt:1`, `tmp/j-alert/r2-d-green.log.txt:1`). The control now distinguishes this focus theft from the passing implementation.

5. **BROKEN — the revised return description extends beyond the implemented checks.** `src/browser/types.ts:1821` promises `false` when `shown` returns or the host returns to the document “before the close completes.” A supported `closed` hook can perform either action before dispatch returns:

   ```ts
   const host = document.createElement('div')
   host.className = 'alert show'
   document.body.append(host)
   const alert = new Alert(host, {
     on: { closed: () => document.body.append(host) },
   })
   const result = await alert.close()
   ```

   The source yields `result === true`, a connected host, and `Alert.find(host) === undefined`: after the callback, it checks only the abort signal, releases, and returns `true` (`src/browser/Alert.ts:137`). Replacing the callback with `() => host.classList.add('show')` produces the same return-description contradiction. These are source-derived interleavings; this lane did not execute them.

   **Smallest correction:** narrow the return description to the takeover states read before `closed` dispatch, while retaining the lifetime check after that dispatch. That matches the guide’s stated token boundary (`guides/veneer.md:851`). Do not add further removal or token writes after `closed`.

   The remaining edits hold: the vocabulary summaries match their actual delegate consumers; the Methods row matches the method summary; E15 replaces the old re-entry description; and the example no longer claims dismissibility (`types.ts:1788`, `types.ts:1804`, `guides/veneer.md:378`, `guides/veneer.md:453`, `guides/veneer.md:855`). Bootstrap has no in-flight guard, and disposal nulls `_element`, making a later `close` fail when it reads the null trigger result (`node_modules/bootstrap/js/src/alert.js:38`, `node_modules/bootstrap/js/src/base-component.js:39`, `node_modules/bootstrap/js/src/dom/event-handler.js:259`).

   The summary-parity red binds reverting the map or method-summary text; it does not bind the truth of `@returns` (`tmp/j-alert/r2-f-red.log.txt:10`). Green parity therefore does not settle this defect.

6. **UNRESOLVED — replay certification; the other scope and recorded-result clauses hold.** The captured status contains the authorized round-1 files plus `types.ts`; its hunks add `AlertVocabulary` and change only the named summaries and return description (`j-alert-2-status.txt:1`, `j-alert-2.diff:742`). Inspection found no prohibited TypeScript construct or executable `.bs.` wire name in the added source. Bootstrap wire names in the compatibility obligation describe the upstream contract.

   The Orchestrator’s gate log records the stated successful exits, including browser tests, guide parity, builds, and tree-wide checking (`j-alert-gates-2.log.txt:16`, `j-alert-gates-2.log.txt:67`, `j-alert-gates-2.log.txt:84`, `j-alert-gates-2.log.txt:563`). These gates were not rerun.

   The mutation log contains the claimed `EXACT`/`JOINED` results, green restoration runs, and `receipt: restored byte for byte` (`j-alert-mutations-2.log.txt:2`, `j-alert-mutations-2.log.txt:62`, `j-alert-mutations-2.log.txt:67`). Comparing labels found no lost round-1 row and only the named additions. The current source digests match the log’s recorded digests. The instrument removes the previous JSON report, inspects collected assertion results, and distinguishes named failures from joined failures (`j-alert-mutations-2.py:181`, `j-alert-mutations-2.py:218`).

   Proof-binding rulings beyond the round-2 pins above:
   - Lifecycle, timing, cancellation, restoration, and reaction proofs distinguish omission of removal, release, layout, settle, snapshot, abort, and the corresponding continuation reads. Their assertions inspect actual events, tokens, ownership, connectivity, and animation ordering (`tests/src/browser/Alert.test.ts:44`, `:83`, `:108`, `:172`, `:225`, `:358`, `:405`, `:419`, `:456`, `:494`, `:516`, `:552`; mutations at `j-alert-mutations-2.py:44`, `:55`, `:71`, `:78`, `:100`).
   - Vocabulary and construction proofs distinguish ignored groups, invalid-value acceptance, unfrozen defaults, and omitted ownership (`Alert.test.ts:17`, `:267`, `:296`, `:316`; mutations at `j-alert-mutations-2.py:86`). The “signal is ignored” mutation specifically breaks already-aborted construction and also destroys signal-less instances; its broad joined failures do not independently establish active-signal subscription coverage (`j-alert-mutations-2.py:83`).
   - Dismiss proofs distinguish omitted routing, incorrect prevention, ignored disabled states, missing target/fallback resolution, ignored overrides, and lost ownership (`Delegate.test.ts:1015`, `:1076`, `:1096`, `:1125`, `:1358`, `:1386`; mutations at `j-alert-mutations-2.py:117`).
   - The late outside-root proof binds removal of `#locate` containment: its named failure checks that the outside alert stays connected and unowned (`Delegate.test.ts:1249`, `j-alert-mutations-2.py:133`). The late consumer-alert conflict proof binds ignoring `Alert.find` during preflight: it requires actual button and alert events, so an erroneous conflict refusal fails (`Delegate.test.ts:1224`, `j-alert-mutations-2.py:153`). Whole-file execution does not invalidate these named failures.
   - Conflict, nested-root, and destroyed-delegate proofs distinguish omitted conflict membership, ignored existing owners, missing per-click marks, and missing lifetime refusal (`Delegate.test.ts:1162`, `:1199`, `:1270`, `:1311`, `:1340`; mutations at `j-alert-mutations-2.py:149`).
   - Guard proofs distinguish payload acceptance, accepting plain objects, and an uncontained throwing detail accessor (`tests/src/browser/validators.test.ts:171`, `j-alert-mutations-2.py:166`). The barrel proof distinguishes removing the Alert export (`tests/src/browser/index.test.ts:15`, `j-alert-mutations-2.py:172`). The round-1 missing-export failures collected no behavioral tests and do not themselves bind behavior; the named mutation failures supply the narrower evidence.

   The replay clause remains **UNRESOLVED**, as this brief explicitly directs. Its path existed when checked, contrary to the brief’s expected absence; its contents were not used to certify replay. The Orchestrator must certify the replay against this source and these proofs to settle that clause.

**Findings fitting no claim:** none.

**Attacked and held:** Nested delegates cannot retry a prevented alert close on the same click because the mark is keyed by event, route, and host; a later click may retry (`Delegate.ts:279`, `Delegate.ts:299`, `Delegate.test.ts:1311`). A destroyed delegate leaves the alert unmarked and undriven, allowing a remaining live delegate to reach it (`Delegate.ts:278`). E12 refuses duplicate construction on the same host before routing; an existing consumer engine or a distinct trigger host correctly permits the routes (`Delegate.ts:184`, `Delegate.test.ts:1199`, `Delegate.test.ts:1298`). Cross-delegate construction remains the explicitly accepted E12 boundary.

**Referrals:** Carry claim 5 to item F and reproduce its `closed`-hook vectors before fixing the sentence. Carry claim 6’s replay certification to the Orchestrator.

**Bounds:** This is a source review using retained execution evidence, not a fresh browser run. No files were written, no gates or mutations were rerun, no other lane’s verdict was read, and no subagent was spawned. No `prove` call was made or refused; no probe receipt is claimed.

VERDICT: FAIL 5, 6; outside the claims: none
