# J-SCROLLSPY audit round 2 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d1e9-5cc1-7a01-a8f5-b3c2b49831ad`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-scrollspy-audit-2.jsonl` (launch copy under `tmp/codex/`); 44 commands; 390 s; usage {"input_tokens":2470175,"cached_input_tokens":2293632,"cache_write_input_tokens":0,"output_tokens":10064,"reasoning_output_tokens":2902}. Retained verbatim from the exec's last message.

---

Objective lane — source review and supplied execution evidence.

1. **CONFIRMED — The `link` contract and retained list.** Attacked by removing the selected section while leaving its link’s token intact, mutating the caller’s threshold array, and changing overflow between refreshes. `ScrollSpy.ts:212` forgets the unmapped selection; `ScrollSpy.ts:149` freezes a copy; `ScrollSpy.ts:216` rereads overflow; `ScrollSpy.ts:218` supplies a fresh threshold array. The contract sentence is present at `types.ts:1083`.

   The proofs distinguish the mutations: deleting the refresh reset fails the assertion at `ScrollSpy.test.ts:945`; retaining the caller’s array makes the refresh assertion at `:964` fail; caching the root fails `:970`. The corresponding instrument edits are at `j-scrollspy-mutations-2.py:190`, `:192`, and `:202`; their named failures appear at `j-scrollspy-mutations-2.log.txt:64`, `:65`, and `:70`. The threshold recorder calls the real observer method (`tests/setupBrowser.ts:948`).

2. **CONFIRMED — The delivery doors.** Attacked with destruction, synchronous refresh, link-token removal, and restoration of the token being removed. The source checks the claimed predicates and returns before processing another entry when they fail.

   | Door | Required state after the operation | Evidence |
   |---|---|---|
   | Delivery entry | Live instance, current observer | `ScrollSpy.ts:267` |
   | Leaving-link removal | Live instance, current observer, leaving token absent | `ScrollSpy.ts:279` |
   | Target and cleared-link removals | Live instance, current observer, just-cleared token absent | `ScrollSpy.ts:299` |
   | Selected-link addition | Live instance, current observer, selected token present | `ScrollSpy.ts:301` |
   | Each parent addition | Live instance, current observer, selected token present | `ScrollSpy.ts:303` |
   | Activation dispatch | Live instance, current observer, selected token present | `ScrollSpy.ts:306` |

   `#apply` saves before writing and checks after the synchronous class reaction returns (`ScrollSpy.ts:363`). `#holds` reads every stated conjunct (`:345`). A reaction calling `refresh()` replaces the observer; destruction aborts the lifetime. Neither old call can continue through these doors. Non-HTML section targets are skipped at `:276`.

   The dispatch-token mutation fails the event and final-token assertions at `ScrollSpy.test.ts:1012`; the leaving-removal mutation fails `:1064`; the clearing-removal mutation fails `:1116`. Their exact named failures are recorded at `j-scrollspy-mutations-2.log.txt:66`, `:67`, and `:68`. The clearing case binds through its mutation row; it is not among the failures in the initial `r2-red.log.txt`.

   The parent-write destruction and selected-link removal proofs also distinguish their controls through event, mutation-record, and token assertions (`ScrollSpy.test.ts:828`, `:884`; instrument `:135`, `:138`). No examined door admits a failed **stated predicate** and then continues writing. These predicates do not promise to preserve arbitrary edits to other navigation elements: parent writes check the selected link, not every parent token.

3. **CONFIRMED — Corrected source and guide sentences.** Attacked the zero-scroll sentence with upward scrolling back to zero. The early return requires `down && scroll === 0` (`ScrollSpy.ts:286`), matching the corrected guide at `guides/veneer.md:821` and Bootstrap’s branch at `node_modules/bootstrap/js/src/scrollspy.js:184`.

   Destruction restores saved tokens rather than merely removing additions (`ScrollSpy.ts:234`; `types.ts:1095`; `guides/veneer.md:330`). The restoration proof starts with active navigation and an active third link, then checks their restoration and unrelated consumer edits (`ScrollSpy.test.ts:697`, `:725`).

   The construction scan precedes listener installation (`Delegate.ts:146`, `:156`); no insertion scan exists. The reinsertion distinction at `guides/veneer.md:579` therefore holds. The disabled-attribute comparison, malformed-escape containment, combined validation block, and non-HTML skip are implemented at `ScrollSpy.ts:246`, `:251`, `:142`, and `:276`. Blank-margin refusal belongs to the parser (`parsers.ts:54`), as the corrected guide states at `guides/veneer.md:847`. The doors paragraph matches the predicates ruled above (`guides/veneer.md:899`). The supplied guide gate exits successfully (`j-scrollspy-gates-2.log.txt:85`).

4. **CONFIRMED — Guard replacements and const assertion.** Attacked by inspecting the added test lines for remaining `instanceof` expressions and checking whether the tuple already had a declared contract. The event checks use `isInstance` at `ScrollSpy.test.ts:91` and `:359`. The literal at `:602` has no declared contract; `as const` at `:607` fixes its tuple shape within `.claude/rules/typescript.md:33`’s permission. The added test lines contain no remaining `instanceof` expression.

5. **CONFIRMED — Instrument rows bind their named cases.** Attacked the possibility that whole-file failures came only from unrelated assertions or harness breakage.

   - Removing observer identity permits the old delivery to advance after the listener’s refresh; the microtask records the resulting event total and active links (`ScrollSpy.test.ts:1183`, `:1197`).
   - Removing the activation early return causes observable writes and another event, rejected at `ScrollSpy.test.ts:1153`.
   - Returning `undefined` for valid margins directly contradicts `parsers.test.ts:49`.
   - Changing the default token to `current` still permits `spy.link` to select the link, but fails its computed background-color assertion (`ScrollSpy.test.ts:269`, `:271`). The joined failures do not replace that named style assertion.
   - Keeping `#link` after destruction is exposed by readding `active` and asserting the getter remains undefined (`ScrollSpy.test.ts:722`).

   The mutations preserve the import and collection graph (`j-scrollspy-mutations-2.py:200`, `:204`, `:206`, `:208`, `:210`). The instrument reads failed assertion titles from Vitest’s report, rather than inferring named failure from the process exit (`:226`, `:277`). The corresponding named results appear at `j-scrollspy-mutations-2.log.txt:69`, `:71`, `:72`, `:73`, and `:74`. These whole-file rows bind the named proofs.

6. **UNRESOLVED — Orchestrator replay clause; the remaining clauses hold.** The brief explicitly reserves adjudication of the Orchestrator replay. Settlement requires its completed replay to reproduce the named failures and restoration receipt.

   Attacked the remaining clauses through the retained diff, status, instrument definitions, and log. The status contains the authorized files (`j-scrollspy-2-status.txt:1`); the `types.ts` hunks change only the summaries at `:1083` and `:1095`. Comparing the instrument definitions finds every earlier mutation retained, with adaptations preserving the relevant mutation. The writer’s log records the asserted mutation results, successful final controls, matching before/after digests, and `receipt: restored byte for byte` (`j-scrollspy-mutations-2.log.txt:1`, `:75`, `:80`, `:81`).

   The supplied gates have the claimed successful exits, including the tree-wide check (`j-scrollspy-gates-2.log.txt:18`, `:72`, `:196`, `:576`). Added executable lines introduce none of the prohibited constructs. `instanceOf(HTMLElement)` passed to collection methods is a guard combinator, not an immediately invoked element check. Bootstrap event spellings retained in the compatibility inventory are descriptions of Bootstrap, not added runtime wire names. The report records that no `prove` call was made (`j-scrollspy-report-2.md:3`).

**Findings fitting no claim:** none.

**Attacked and held:**

- **Delegate routing:** nested roots cannot drive an already-marked route/host again; containment precedes panel marking; destruction stops before marking later panels (`Delegate.ts:224`, `:225`, `:234`). E12’s same-host refusal precedes routing and prevention (`:181`, `:194`). An existing consumer engine permits the other route to construct; distinct hosts and the amended cross-delegate configuration remain permitted. Supplied proofs exercise these distinctions at `Delegate.test.ts:741`, `:842`, `:866`, `:896`, and `:966`.
- **Scan ownership:** construction skips existing owners; removal releases acquired engines; scan failure destroys earlier acquisitions before rethrowing (`Delegate.ts:150`, `:152`, `:271`). Later insertion and reinsertion do not imply rescanning.
- **Guard and parsers:** SVG payloads and throwing accessors are rejected by the contained event guard (`validators.ts:166`). Sparse thresholds do not bypass validation: the installed `parseArray` rejects non-dense input, and `boundsOf` requires finite numbers (`node_modules/@orkestrel/contract/dist/src/core/index.js:7005`, `:6742`). Blank-margin rejection is an intentional parser restriction.
- **Sequence and timing:** selection follows Bootstrap’s directional comparison and zero-scroll exception. Activation has no animation wait. A normal later observer delivery remains allowed after an interrupted delivery; stopping the old delivery does not destroy the instance.

**Referrals:** Orchestrator replay adjudication under claim 6. No objective code defect referred.

**Bounds:** This is a source review against supplied execution records, not an independently executed browser audit. No browser test, build, mutation, or gate was rerun. No files were written and no agents were spawned. No `prove` call was attempted or refused; no probe receipt is claimed. E13’s accepted attribute-presence limitation is not reopened.

VERDICT: FAIL 6; outside the claims: none
