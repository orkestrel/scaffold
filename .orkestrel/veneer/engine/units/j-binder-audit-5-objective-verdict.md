# J-BINDER audit round 5 — the objective lane's verdict, held by analyst on GPT-6 Astra (codex exec read-only, 2026-09-23)

Thread `01a0d049-0ca1-73c3-a2bd-04473ce5d76c`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-binder-audit-5-analyst.jsonl` (launch copy under `tmp/codex/`); 26 commands; 428 s; usage {"input_tokens":2173328,"cached_input_tokens":2017408,"cache_write_input_tokens":0,"output_tokens":11786,"reasoning_output_tokens":4229}. Retained verbatim from the exec's last message.

---

Objective lane — analyst.

1. **CONFIRMED.** I attacked destruction during each reaction-capable write, including the A→B→C interleaving.

   `Button.toggle` checks its controller before writing, after `classList.toggle`, and after `setAttribute`; a destroyed invocation returns the host’s live pressed state before another write or dispatch (`src/browser/Button.ts:98`, `:102`, `:104`). B therefore leaves C registered and unpressed, without `aria-pressed` or B’s completion event (`tests/src/browser/Button.test.ts:322`).

   `ColorMode` captures `#original` before its constructor calls `apply`; a live controller therefore does not skip the initial write (`ColorMode.ts:50`). `apply` checks again before storage (`:68`). `destroy` sets `#original` to `undefined` before either restoration write, and neither branch has subsequent writes (`:82`). Reentrant destruction cannot restart it.

   The snapshot’s token, class-attribute removal, inline-property, and attribute writes all pass through the ownership check in `#writeBack` (`HostSnapshot.ts:117`, `:122`, `:129`, `:137`, `:183`). Destruction’s restoration deliberately continues on targets nobody has taken; a replacement’s saves withdraw its targets. Delegate performs no additional host write after its engine call; the remaining browser helpers introduce no uncovered sequence.

   These traces use the platform’s rule that reactions run before the originating operation returns its saved result. [HTML reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions).

2. **CONFIRMED.** No reachable interleaving examined distinguishes the invocation object from the snapshot identity with the present captured-list cleanup. **Ruling: the owner becomes the snapshot; remove the fresh identity.**

   I attempted these distinctions:

   - **Round-4 reentry:** the nested call captures only `data-extra`. Its cleanup cannot visit the outer call’s `data-state` or `classed` entries (`HostSnapshot.ts:93`, `:143`, `:150`).
   - **Same-snapshot overlap:** to capture an outer pending key, the nested call must first save it. That save takes and withdraws the outer entry (`:66`, `:199`). The nested call completes its write and cleanup before the outer call resumes.
   - **Different snapshots:** their snapshot identities already differ. First publication wins, and unsuccessful publishers cannot write or withdraw the winner’s entry (`:171`, `:183`, `:206`).
   - **A third snapshot saving inside `#writeBack`:** `#take` removes the entry. The suspended write’s subsequent withdrawal cannot reclaim ownership or erase a differently owned entry (`:184`, `:185`, `:199`).
   - **A nested write throwing:** its `finally` cleans its captured keys before control returns. An exception escaping a custom-element callback is reported by the platform; it does not bypass that cleanup. [HTML callback invocation](https://html.spec.whatwg.org/multipage/custom-elements.html#invoke-custom-element-reactions).
   - **Replacement element map:** `#withdraw` retrieves the current map from the WeakMap rather than retaining the map used at publication (`:170`, `:205`). Replacing an emptied map leaves no abandoned published entry.

   The captured `records` and `classes` already carry each invocation’s cleanup domain; synchronous nesting and `#take` separate successive ownership of shared keys. The fresh object duplicates that separation. This confirms the claim’s redundancy premise, rather than just inferring equivalence from the green mutation (`j-binder5-mutation-results.json:27`). Preserve captured-key cleanup, unconditional self-take, and withdrawal after writing when applying the ruling.

3. **BROKEN.** The guide’s universal historical-state sentence contradicts the newly specified live-state behavior.

   [guides/veneer.md:552](C:/Users/mikes/WebstormProjects/veneer-binder/guides/veneer.md:552) says an engine constructed during **any** restoration write records the host as it was before the destroyed engine touched it. Counterexample:

   A starts on a host without `active`, toggles, then destroys itself. After its token and class-attribute restoration, the reaction to its final attribute write adds `active` and constructs B. A’s token entry has already been withdrawn, so B records the consumer’s new `active`, not A’s original absence (`Button.ts:62`; `HostSnapshot.ts:69`, `:185`). B’s later destruction preserves that token.

   The retained R1 proof establishes the corresponding snapshot behavior (`tests/src/browser/HostSnapshot.test.ts:188`, `:200`). The smallest correction is to restrict the historical-original guarantee to targets still published; already-written targets record the live host. The interface’s ordering, absent-class qualifier, self-take, and first-publisher clauses otherwise match the implementation (`types.ts:274`; `HostSnapshot.ts:83`, `:123`, `:171`). This is a factual contradiction, not a wording preference.

4. **UNRESOLVED.** The retained evidence supports the reported failures and assertion distinctions, but the promised independent replay is not yet available.

   `j-binder5-red.log.txt:2` records the named red cases and ends with `5 failed | 127 passed (132)`; `j-binder-gates-5.log.txt:44` records `134 passed (134)`. Definition/result names match without duplicates or recorded pattern errors. I found **no mutation whose recorded reddening its named proof could not produce**.

   | New proof | Mutation and distinguishing assertion |
   |---|---|
   | Button destroyed during token write | Removing the token re-check permits stale `aria-pressed`; its absence assertion fails (`Button.test.ts:325`; `j-binder5-mutations.json:3`). |
   | Button destroyed during `aria-pressed` write | Removing the attribute re-check returns `true` and dispatches; the expected `false` and independent event recorder distinguish it (`Button.test.ts:355`; mutations `:14`). |
   | ColorMode destroyed during attribute write | Removing the re-check stores `dark`; expected storage remains `light` (`ColorMode.test.ts:94`; mutations `:25`). |
   | Same-snapshot nested restoration | Deleting every pending entry on the element prevents the outer attribute/class cleanup (`HostSnapshot.test.ts:164`; `j-binder5-mutations-2.json:14`). |
   | Already-written target | Delaying withdrawal makes the receiver restore absence instead of `show` (`HostSnapshot.test.ts:200`; mutations `:47`). |
   | Self-take | Refusing the snapshot’s own pending entry lets the outer restore overwrite the transient value (`HostSnapshot.test.ts:228`; mutations `:58`). |
   | Throwing write | Returning from `finally` suppresses the exception, failing `success: false` immediately (`HostSnapshot.test.ts:239`; mutations-2 `:3`). |

   The throwing-write mutation therefore distinguishes the mutant, but its recorded failure does **not isolate withdrawal**: execution stops before the later-save assertion at `HostSnapshot.test.ts:245`. A mutation deleting cleanup while preserving exception propagation would isolate that assertion.

   The instrument saves original text and rewrites it after each handled run (`j-binder5-mutate.mjs:16`, `:37`). Current edited files round-trip through UTF-8 unchanged, and retained diff postimages match the available source. Historical byte restoration still lacks independent before/after verification.

   `j-binder-mutations-5-orchestrator.log.txt` is absent. Retaining the promised replay, its failing assertions, and source-byte verification would settle the outstanding evidence clauses.

5. **CONFIRMED.** I attacked the return value as a stale local result and compared the named moved rows against the actual result files.

   The destroyed Button returns `this.pressed`, which reads the resolved host token (`Button.ts:94`, `:102`, `:104`); the interleaving records `false` (`Button.test.ts:322`).

   | Mutation | Round 4 → round 5 |
   |---|---|
   | Pending targets never unpublished | `1/9 → 0/12`, then `1/13` with the throwing-write proof |
   | Pending original not taken | `4/71 → 6/76` |
   | Taken target not skipped | `4/71 → 5/76` |
   | Attributes before tokens | `2/48 → 4/53` |
   | Restore before releasing claim | `5/62 → 6/64` |

   Evidence: `j-binder4-mutation-results.json:3`, `:14`, `:25`, `:44`, `:129`; `j-binder5-mutation-results.json:49`, `:62`, `:74`, `:91`, `:102`; `j-binder5-mutation-results-2.json:3`. The added and removed failure titles match the report.

6. **CONFIRMED.** I attacked stale patch contexts, surface drift, and disagreement between retained evidence and available files.

   Every report-only patch passes `git apply --check --unidiff-zero`. Every retained diff postimage matches its available source. The barrel and explicit export assertion agree (`src/browser/index.ts:1`; `tests/src/browser/index.test.ts:11`).

   The supplied independent gate record establishes the scoped checks, browser results, guide parity, ownership grep, and bounded app failures (`j-binder-gates-5.log.txt:25`, `:44`, `:70`, `:87`, `:89`, `:128`). The changed source introduces no prohibited assertions, access modifiers, suppression directives, or compatibility paths. Invocation identity is ruled separately under claim 2; the factual guide contradiction is claim 3.

**Findings fitting no claim:** none.

**Attacked and held:** An empty nested `restore()` cannot withdraw outer records because its captured lists are empty. A pre-existing empty `class` attribute remains present, while an originally absent class attribute is removed only when empty (`HostSnapshot.ts:123`). Cleanup writes during destruction are required restoration, not resumed activation.

**Referrals:** Apply claim 2’s snapshot-owner ruling while retaining captured-key cleanup. Obtain claim 4’s independent replay and a cleanup-only throwing-write mutation. Preserve the existing referral of cross-engine overlap precedence to J-COLLAPSE.

**Bounds:** This is a source-and-record audit; no browser test, build, or mutation was run. The report’s “other rows kept their tallies” holds for failure membership, not every denominator: class-attribute handoff changes from `4/71` to `4/76`. Claim 3 does not invalidate the implementation’s correct preservation of later consumer edits.

VERDICT: FAIL 3, 4; outside the claims: none
