# J-SAMEWAY-ENGINES-B round 3 audit, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d724-63c3-7973-bea9-93c04fee757f`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-sameway-engines-b-audit-3.jsonl` (launch copy under `tmp/codex/`); 41 commands; 441 s; usage {"input_tokens":1446051,"cached_input_tokens":1294208,"cache_write_input_tokens":0,"output_tokens":12469,"reasoning_output_tokens":4883}. Retained verbatim from the exec's last message.

---

Source review of `87dc147` against `45aebaa`. No tests run. New counterexamples below are source deductions; executed evidence comes from the retained Orchestrator logs. The audited engine and mutation-instrument SHA-256 digests match that replay. All source references name `87dc147`; `units/` denotes scaffold’s `.orkestrel/veneer/engine/units/`.

| Claim | Ruling | Evidence and proof distinction |
|---|---|---|
| **1. P1 in Dropdown** | **CONFIRMED** | Show records ARIA and toggle changes at `src/browser/Dropdown.ts:276`, `:285`; hide records them at `:460`, `:468`. `recordHostWrite` omits unchanged targets; `rewindHostWrites` returns recorded values in reverse order (`src/browser/helpers.ts:950`, `:982`). Show destroys placement last, after checking ownership (`Dropdown.ts:385`). Fixed-value returns and Dropdown’s `#revert` are gone. **Mutations:** `P1-dropdown-fixed-aria`, `P1-dropdown-forward`, `P1-dropdown-placement-first`, `P1-dropdown-hide-fixed-toggle`. **Distinguished:** yes, by prior values and recorded write order (`tests/src/browser/Dropdown.test.ts:2159`). |
| **2. P1 in Tooltip and Popover** | **FAIL** | The return order and lifetime checks hold (`src/browser/Tooltip.ts:624`, `:647`). However, the call records only attribute presence (`:466`), **not prior membership of its ID**, and the return reads the mutable `tip.id` again (`:632`). Consequently it can remove a token it never added, or miss the token it actually added. Witnesses follow. **Mutations:** `P2-tooltip-presence`, `P2-tooltip-whole`, `P1-tooltip-order`, `B2-tooltip-lifetime`. **Distinguished:** yes for presence, unrelated IDs, order, and lifetime; **no** for prior membership or a changed tip ID. Those inputs are absent from `tests/setupBrowser.ts:3049`. Popover inherits this implementation (`src/browser/Popover.ts:44`). |
| **3. Refused reopening completes the hide** | **CONFIRMED under E24’s takeover rules** | Dropdown checks the reopening result and forces concealment (`src/browser/Dropdown.ts:504`); Tooltip and Popover do likewise (`src/browser/Tooltip.ts:882`). **Mutations:** `P3-dropdown`, `P3-tooltip`, `P3-popover` disable that fallback. **Distinguished:** yes: assertions require the repeated `hide`, completed `hidden`, false `shown`, and closed overlay (`tests/src/browser/Dropdown.test.ts:2213`, `tests/src/browser/Tooltip.test.ts:3259`, `tests/src/browser/Popover.test.ts:993`). Refusal alone no longer leaves stale shown state. Explicit takeover remains possible, as detailed below. |
| **4. B4’s named exceptions** | **CONFIRMED** | Dropdown hide saves snapshot holdings (`src/browser/Dropdown.ts:446`, `:591`), which destruction restores (`:326`). Its return does not rebuild placement (`:401`). Tooltip clears internal interaction state (`src/browser/Tooltip.ts:907`); discard forgets the tip, destroys placement, conditionally removes the tip, then unlinks it (`:814`). The named exceptions accurately describe the implementation. They do not excuse claim 2’s missing token accounting. |
| **5. Proofs bind** | **CONFIRMED for the recorded cases** | The base replay names assertion failures and reports `Tests 7 failed \| 126 passed (133)` (`units/j-sameway-engines-b-red-3-orchestrator.log.txt:3`, `:17`). Dropdown supersession is killed by `B2-dropdown-lifetime` and `B2-dropdown-superseded-placement`; Tooltip destruction is killed by `B2-tooltip-lifetime` (`units/j-sameway-engines-b-mutations-3-orchestrator.log.txt:24`, `:25`, `:42`). The assertions distinguish overwritten nested-show state and writes after destruction (`tests/src/browser/Dropdown.test.ts:2284`, `tests/src/browser/Tooltip.test.ts:3319`). The instrument checks collection, rejects suite errors and non-assertion failures, and requires successful process/report results for controls (`units/j-sameway-engines-b-mutations-3.py:217`). The replay reports `rows 54, missed 0`; controls hold and `BOOM`/`UNBOUND` are refused (`…mutations-3-orchestrator.log.txt:58`). This establishes those mutations, not complete behavioral coverage. |
| **6. Test tables** | **CONFIRMED** | Tables and their composite values are frozen (`tests/setupBrowser.ts:3013`, `:3049`). Their export assertions appear at `tests/setupBrowser.test.ts:881`, `:903`. Structural claim; no behavioral mutation required. |
| **7. Contract and guide truth** | **FAIL** | The corrected platform-close and discard descriptions match their ordinary paths. However, the guide’s promise that a stopped show writes back its own writes (`guides/veneer.md:3110`) is false for claim 2’s witnesses. The literal ID-removal wording in `src/browser/types.ts:1858`, `:2032` describes the current operation but does not establish prior-value correctness. The retained presence/order mutations do not distinguish the missing membership and stable-ID records. |
| **8. Greenfield and scope** | **CONFIRMED** | Commit path comparisons match the report and integration: engines, browser tests, setup pair, types, and guide (`units/j-sameway-engines-b-3-status.txt:1`). `Popover.ts` and `Placement.ts` have no difference against `45aebaa`. The changed implementation uses the shared leaves directly and retains no obsolete Dropdown return path (`src/browser/Dropdown.ts:276`, `:385`, `:401`). |

Treating `aria-describedby` as a shared token list is **E24 applied at token granularity**, consistent with the Orchestrator’s explicit ruling. It needs no further departure ruling. That interpretation still requires recording which token changed and its prior membership. Attribute presence alone is insufficient. Whitespace normalization remains the accepted exception.

The change exits account for writes as follows. A failed ownership check suppresses the returning writes; destruction performs its own restoration.

| Change exit | Recorded state and return |
|---|---|
| Dropdown show: initial refusal, prevention, or post-dispatch halt | No return journal; resolves false (`Dropdown.ts:244`, `:246`, `:251`). |
| Dropdown show: refused placement | Placement restores its construction writes; no host journal (`:263`). |
| Dropdown show: stop after placement or focus | Empty host journal; destroys placement while still owning the call (`:266`). Focus is not returned. |
| Dropdown show: stop after ARIA or menu-token step | Journal contains ARIA only if its value changed; rewinds it, then destroys placement (`:276`, `:284`). |
| Dropdown show: stop after toggle-token write or placement update | Journal additionally contains the toggle token if changed; reverses host writes, then destroys placement (`:285`, `:289`, `:385`). |
| Dropdown hide: refusal, prevention, or post-dispatch halt | No return journal (`:431`). |
| Dropdown hide: stop after placement destruction or menu-token step | Snapshot holdings remain for destruction; released placement is not rebuilt (`:446`, `:452`, `:457`). |
| Dropdown hide: stop after toggle removal | Returns the toggle’s prior membership if changed (`:460`). |
| Dropdown hide: stop after ARIA write | Returns ARIA’s prior value, then the toggle’s prior membership, omitting unchanged targets (`:468`, `:401`). |
| Tooltip show: refusal, dispatch, old-tip discard, or build stop | No show-return journal. Discard, destruction, and content-return rules govern cleanup (`Tooltip.ts:435`, `:451`, `:453`, `:455`). |
| Tooltip show: insertion, linking, inserted-event, or placement-door stop | No `#rehide` call. Ownership/container loss follows E18. Refused placement discards the tip while the call still holds it (`:463`, `:469`, `:473`, `:479`). |
| Tooltip show: token-step or animation-wait stop | Passes `(change, tip, described)` to `#rehide`; records attribute presence but neither a stable linked ID nor prior membership. Returns placement, current `tip.id`, then eligible tip removal (`:486`, `:489`, `:624`). |
| Tooltip hide: dispatch, token-step, or wait stop | No returning step. Cleared interaction state stays cleared; token takeover leaves the tip held (`:903`, `:907`, `:918`, `:920`). |
| Tooltip hide: discard stop | Fields are cleared; placement is destroyed; eligible tip removal and unlinking run. A moved or re-marked tip may remain, unpromoted and forgotten (`:814`, `:924`). |
| Successful completion | Releases changing state and dispatches the completed event. Exceptions propagate; `finally` releases identity but provides no general rollback (`Dropdown.ts:295`, `Tooltip.ts:493`, `:930`). |

The earlier witnesses now trace as follows:

- **Dropdown absent or already-correct ARIA:** repaired. Absence returns as absence; an unchanged value records nothing.
- **Tooltip’s initially empty attribute:** repaired; it remains present and empty.
- **Tooltip’s spacing witness:** normalized spacing remains, as expressly ruled for the token list.
- **Return order:** repaired: Dropdown returns toggle, ARIA, placement; Tooltip returns placement, ID, tip.
- **Cleared interaction state:** now explicitly accounted for as internal state.
- **Canceled reopening:** reaches the forced hide.
- **Hide takeover inside discard:** the tip may remain shown and unpromoted, but is forgotten and unlinked; the revised guide now says this.

Claim 2 has these concrete counterexamples:

- **An existing token is removed despite no changing write.** In a fresh module instance, start with a connected trigger carrying `title="Saves"` and `aria-describedby="vn-tooltip-0"`, with no element having that ID. Start an animated Tooltip show, then remove the generated tip’s `show` token before the show’s await resumes. ID generation checks element IDs, not references (`Tooltip.ts:740`), so it chooses `vn-tooltip-0`. Linking leaves the existing token present (`:845`); the return removes it and leaves `aria-describedby=""` (`:632`, `:848`). Before the call’s link, membership was true; afterward it is false. The equivalent Popover input uses its generated prefix.
- **The return misses the token the call wrote.** Start an animated show with no description attribute. While it awaits, retain the linked ID, change the tip’s `id` to `replacement`, and remove its `show` token. The return attempts to unlink `replacement`, leaving the original generated ID dangling (`Tooltip.ts:469`, `:632`). The already-recorded `#linked` value is not used there.

Record the actual linked ID and its prior membership alongside attribute presence. Return only membership that the call changed.

For platform refusal, no duplicate `hidden` dispatch was found: Dropdown’s identity checks stop superseded concealment; Tooltip checks identity before completion, and subsequent queued close handling refuses an unpublished or no-longer-shown tip (`Dropdown.ts:437`; `Tooltip.ts:874`, `:895`, `:924`). A consumer can still deliberately leave `shown` true by re-adding the token during the forced hide’s removal. That is E24 takeover: `forced` ignores event prevention, not token takeover (`Dropdown.ts:454`, `Tooltip.ts:915`). The reopening claim’s confirmation therefore does not extend to a fresh takeover.

Outside the claims, **Dropdown supersession strands the earlier placement until destruction**. The smallest witness is the existing supersession fixture at `tests/src/browser/Dropdown.test.ts:2235`, followed by `await dropdown.hide()` before cleanup:

- The nested show replaces `#placement` (`Dropdown.ts:265`).
- The superseded return exits before destroying the earlier placement (`:387`).
- The later hide destroys only the replacement (`:450`).
- The earlier placement remains subscribed to the Dropdown’s lifetime (`Placement.ts:121`) and retains snapshot holdings. Consequently the replacement’s restoration cannot return shared `popover`, positioning, and anchor targets (`HostSnapshot.ts:196`).

The hide can complete while those placement attributes and styles remain. Destruction eventually releases them. The current supersession assertion checks the nested show’s immediate state, not cleanup after its later hide (`tests/src/browser/Dropdown.test.ts:2284`). This is a source-derived finding, not an executed reproduction.

VERDICT: FAIL 2, 7
