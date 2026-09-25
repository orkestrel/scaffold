# J-SAMEWAY-ENGINES-B audit — the objective lane (analyst on GPT-6 Astra, journal tmp/codex/j-sameway-engines-b-audit.jsonl; brief units/j-sameway-engines-b-audit-analyst-brief.md; claims units/j-sameway-engines-b-audit-claims.md)

Thread `01a0d68b-c638-71e1-bd33-a4c1e1bc8faa`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-sameway-engines-b-audit.jsonl` (launch copy under `tmp/codex/`); 29 commands; 513 s; usage {"input_tokens":3387535,"cached_input_tokens":3205120,"cache_write_input_tokens":0,"output_tokens":13052,"reasoning_output_tokens":4243}. Retained verbatim from the exec's last message.

---

Source review at `b8a8805`, against `8bc940d`; no tests run. Behaviour traces below are source deductions. Executed evidence comes from the retained Orchestrator logs. The audited Dropdown and Tooltip sources and the mutation instrument match those logs’ SHA-256 digests. `units/` references name scaffold’s `.orkestrel/veneer/engine/units/` directory.

The claims receive these rulings.

| Claim | Ruling | Evidence and proof distinction |
|---|---|---|
| **1. B1: agreement completes** | **CONFIRMED** | Dropdown records its expected end after dispatch and skips the menu-token write when already satisfied (`src/browser/Dropdown.ts:249`, `:268`, `:452`, `:465`). Tooltip’s pre-token doors ignore the token while retaining ownership/container checks; its token steps skip an agreed write (`src/browser/Tooltip.ts:454`, `:469`, `:582`, `:884`, `:896`). Popover inherits that implementation (`src/browser/Popover.ts:44`). **Mutations:** `B1-dropdown-*-refusal`, `B1-dropdown-*-door`, `B1-dropdown-*-skip`, the Tooltip connection/link/inserted/owned-door and skip mutations, and the Popover inserted/refusal mutations. **Distinguished: yes**, through completion, events, visible state, and redundant-write assertions (`tests/src/browser/Dropdown.test.ts:1308`, `:1416`; `tests/src/browser/Tooltip.test.ts:2162`, `:2244`; `tests/src/browser/Popover.test.ts:698`). |
| **2. B2: takeover returns precisely the change’s writes** | **FAIL** | Dropdown records `aria-expanded` without recording its prior value or whether it changed, then writes a fixed opposite value. Its returns iterate forward (`src/browser/Dropdown.ts:264`, `:376`, `:399`, `:474`). Tooltip’s return removes its link rather than restoring the attribute’s prior value, and returns connection before link (`src/browser/Tooltip.ts:609`, `:824`). These violate E24’s prior-value, no-op, and reverse-order amendment (`decisions.md:291`). Ownership checks themselves hold (`src/browser/Dropdown.ts:413`; `src/browser/Tooltip.ts:632`). **Mutations:** the `B2-*-return-*`, recording, expected-end, and lifetime rows distinguish omitted operations on their fixtures. **Distinguish the accounting defects: no.** Dropdown’s proof explicitly expects an initially absent attribute to become `"false"` (`tests/src/browser/Dropdown.test.ts:1492`, `:1575`). |
| **3. B3: platform close completes or preserves an open overlay** | **FAIL** | Ordinary closes reach the hide sequence, and prevention is bounded by placement/tip identity. However, reopening after prevention calls `showPopover()` without checking whether reopening succeeded (`src/browser/Dropdown.ts:501`; `src/browser/Tooltip.ts:862`). Canceling that opening leaves `shown === true` over a closed overlay. The concrete input and in-flight traces follow. **Mutations:** `B3-*-observe`, `B3-dropdown-repromote`, and `B3-dropdown-bound`. **Distinguished: yes** for missing observation, missing reopening, and missing forcing (`tests/src/browser/Dropdown.test.ts:1776`, `:1822`, `:1845`; `tests/src/browser/Tooltip.test.ts:2482`; `tests/src/browser/Popover.test.ts:882`). **Distinguish refused reopening: no.** |
| **4. B4: write enumeration is complete and justified** | **FAIL** | The report’s ARIA rows prescribe fixed values rather than prior values (`units/j-sameway-engines-b-report.md:45`, `:57`). Its link row omits attribute presence/formatting changes that unlinking does not return. Its Tooltip hide enumeration also omits the interaction-state writes before the token step (`src/browser/Tooltip.ts:888`). The exit accounting follows. **The `#rehide` precondition holds:** it requires current ownership, the original container, and the missing token (`src/browser/Tooltip.ts:610`). **Mutation:** `B2-tooltip-precondition`; **distinguished: yes**, by the moved-tip assertions at `tests/src/browser/Tooltip.test.ts:2973`. The return mutations do not establish complete accounting. |
| **5. Writer’s E24/E18 choices hold** | **CONFIRMED** | Tooltip sets identity before dispatch, refuses a nested show, and permits a hide to supersede a shown tip’s change (`src/browser/Tooltip.ts:432`, `:550`, `:875`). Its returning step retains identity until `finally` (`:479`, `:609`). Dropdown does not rebuild released placement during a stopped hide (`src/browser/Dropdown.ts:461`, `:399`); stopped shows return their placement, and show-start leftover restoration is absent (`:254`, `:376`). These choices do not excuse claim 2’s accounting failures. |
| **6. T1: setup owns the tables** | **CONFIRMED** | The tables are frozen exports, including their composite rows, and absence uses `undefined` (`tests/setupBrowser.ts:2890`, `:2914`, `:2930`, `:2940`, `:2945`, `:2955`, `:2965`, `:2978`, `:2992`, `:3001`). Their names appear in the export assertion (`tests/setupBrowser.test.ts:877`, `:891`, `:902`). The changed cases import those tables; the remaining older literals predate this unit. Structural claim; no behavioural mutation applies. |
| **7. Recorded proofs bind** | **CONFIRMED** | The retained base run names assertion failures for the reported failing cases (`units/j-sameway-engines-b-red-orchestrator.log.txt:3`). The mutation reader requires collection of the named case and rejects suite errors and non-assertion failures (`units/j-sameway-engines-b-mutations.py:180`). The controls hold; `BOOM` and `UNBOUND` are refused (`units/j-sameway-engines-b-mutations-orchestrator.log.txt:47`, `:49`, `:50`). **Mutations:** wrong token expectations and omitted returns produce assertions; thrown errors and an unbound identifier produce refusals. **Distinguished: yes.** This confirms the recorded cases, not complete coverage. The base Tooltip bridge already covers Popover through its profile; the named green-on-base cases pin existing behaviour. |
| **8. Integrated sentences are true** | **FAIL** | The platform-close paragraphs promise successful reopening after prevention, contradicted by claim 3 (`guides/veneer.md:1749`, `:2862`, `:3088`). The added Tooltip paragraph says a taken-over hide leaves the tip “shown and named” (`:3004`), but takeover during closing placement destruction leaves the DOM token while clearing the engine’s tip reference and unlinking it (`src/browser/Tooltip.ts:803`, `:812`, `:816`, `:905`). The existing closing-token case asserts the surviving token, not the link (`tests/src/browser/Tooltip.test.ts:2798`). Source bytes are unchanged between `54a6c2f` and `b8a8805`; this is a truth finding. |
| **9. Greenfield and scope** | **CONFIRMED** | Git’s commit path lists match the reported scope: `54a6c2f` changes the engine files, their tests, and the setup pair; `b8a8805` changes only `src/browser/types.ts` and `guides/veneer.md`. The added ownership, return, and platform-observation members have callers (`src/browser/Dropdown.ts:260`, `:379`, `:492`; `src/browser/Tooltip.ts:472`, `:583`, `:633`). No unused compatibility path was found. No behavioural mutation applies. |

The returning steps perform the following writes. Every individual entry is gated by the call’s identity and lifetime.

| Returning step | Received entries and resulting writes |
|---|---|
| Dropdown stopped show | Iterates supplied entries **in supplied order**. `placement`: destroys held placement and clears it if still the same instance. `aria-expanded`: writes `"false"`. `toggle`: removes the toggle’s shown token (`src/browser/Dropdown.ts:376`). |
| Dropdown stopped hide | Iterates supplied entries **in supplied order**. `toggle`: adds the toggle’s shown token. `aria-expanded`: writes `"true"` (`src/browser/Dropdown.ts:399`). |
| Tooltip/Popover stopped show | Receives `(change, tip)`, not a prior-value journal. If only the token moved, destroys placement, forgets/removes the tip while still eligible, then removes its ID from `aria-describedby` (`src/browser/Tooltip.ts:609`). |
| Tooltip/Popover stopped hide | No returning step. Before discard, takeover leaves the tip in place; discard follows E18’s removal and unlink rules (`src/browser/Tooltip.ts:899`, `:901`, `:905`). |

Dropdown’s explicit show and hide exits supply these entries.

| Exit | Returning step receives; resulting action |
|---|---|
| Show refused, prevented, or halted after dispatch (`src/browser/Dropdown.ts:238`, `:240`, `:245`) | None; returns `false`. |
| Show promotion refused (`:258`) | None; Placement has restored its construction writes. |
| Show stops after placement or focus (`:260`, `:262`) | `[placement]`; destroys placement. |
| Show stops after ARIA or menu-token step (`:265`, `:271`) | `[placement, aria-expanded]`; destroys placement, then writes `"false"`. |
| Show stops after toggle-token step or placement update (`:278`, `:281`) | `[placement, aria-expanded]`, plus `[toggle]` if absent before the call’s toggle write; performs the corresponding forward-order return. |
| Show completes (`:283`) | None; releases changing state, dispatches `shown`, returns the lifetime reading. |
| Hide refused, prevented, or halted after dispatch (`:442`, `:445`, `:448`) | None; returns `false`. |
| Hide stops after placement destruction or menu-token step (`:463`, `:468`) | None. Released placement stays released under the stated acquisition exception. |
| Hide stops after toggle removal (`:472`) | `[toggle]` if that token was present, otherwise `[]`; adds it back when recorded. |
| Hide stops after ARIA (`:475`) | The preceding toggle entries plus `[aria-expanded]`; adds the token when recorded, then writes `"true"`. |
| Hide completes (`:477`) | None; releases changing state, dispatches `hidden`, returns the lifetime reading. |

Tooltip and Popover share these explicit exits.

| Exit | Returning step receives; resulting action |
|---|---|
| Show refused, empty, or refused after content evaluation (`src/browser/Tooltip.ts:426`, `:429`) | None; returns `false`. |
| Show stops after dispatch, prevention, or blocked-host check (`:442`, `:443`) | None. |
| Show stops after old-tip discard (`:445`) | None; E18 governs that release and any moved tip. |
| Build returns no tip (`:447`) | None. Build-door failures return `undefined`; destruction returns owned content. A content-write/sanitizer exception releases the unfinished tip’s element content before propagating (`:641`, `:675`). |
| Show stops after insertion, link, or inserted event (`:454`, `:455`, `:457`) | None. Ownership/container loss follows E18; destruction performs its own cleanup. |
| Placement returns `undefined` (`:460`) | None. If the call still holds the tip, it discards it before returning `false`. |
| Show stops after placement (`:465`) | None; ownership/container loss follows E18. |
| Show stops at token step or after animation wait (`:472`, `:475`) | `(change, tip)` to `#rehide`. Only token-only takeover performs placement destruction, eligible removal, and unlinking. Destroyed, superseded, or moved-tip paths write nothing there. |
| Show completes (`:476`) | None; clears identity, dispatches `shown`, returns the lifetime reading. |
| Hide refused (`:876`) | None; returns `false`. |
| Hide stops after dispatch, prevention, or missing tip (`:884`, `:885`, `:887`) | None. |
| Hide stops at token removal or after animation wait (`:899`, `:901`) | None. The interaction flags have already been cleared. |
| Hide stops during discard or its following door (`:905`) | None. Discard has cleared published fields, destroyed placement, conditionally removed the tip, and unlinked it while live. E18 allows a moved or re-marked tip to remain. |
| Hide completes (`:906`) | None; clears identity, dispatches `hidden`, optionally starts an interaction-requested show, and returns the lifetime reading. |

Exceptions reject the call rather than returning a boolean. The `finally` blocks release the matching change; they provide no general rollback (`src/browser/Dropdown.ts:286`, `:480`; `src/browser/Tooltip.ts:479`, `:911`). Destruction during a completed-event dispatch makes the result `false` through the final lifetime reading.

The accounting failures have these concrete inputs.

- **Dropdown changes a value its show never changed.** Start with a hidden menu and toggle `aria-expanded="true"`. Use the existing custom-menu reaction pattern to remove the menu’s shown token when the show adds it (`tests/src/browser/Dropdown.test.ts:1521`). The show’s ARIA write changes nothing, but its return writes `"false"` (`src/browser/Dropdown.ts:264`, `:271`, `:387`). Starting with the attribute absent instead exposes failure to restore absence. A hide has the symmetric defect when its prior ARIA value is already `"false"` (`:474`, `:404`).
- **Tooltip and Popover lose a prior attribute value.** Start with `aria-describedby=""`, show with animation, and remove the tip’s shown token during the wait. Linking replaces the empty attribute with the generated ID; returning removes the attribute entirely (`src/browser/Tooltip.ts:455`, `:475`, `:625`, `:824`). A value such as `"help  extra"` also returns with normalized spacing. Neither initial presence nor the exact prior value is returned.
- **Return order differs from E24.** Dropdown writes placement, ARIA, then toggle, and returns in that order. Tooltip writes connection, link, then placement, and returns placement, connection, then link. A closing `beforetoggle` listener during Dropdown’s return can therefore observe the still-written toggle and ARIA state. A tip’s disconnection reaction during Tooltip’s return observes its ID still linked. E24 requires the reverse order of first changing writes (`decisions.md:295`).
- **The hide table omits interaction writes.** Tooltip clears hover, focus, click, and entered state before removing the token (`src/browser/Tooltip.ts:888`). Token takeover returns none of those writes, and the report names no exception for them. Its statement that the hide wrote only its token is therefore incomplete.

Snapshot holdings remain governed by E13/E25. Focus has the report’s explicit non-return reason. Placement rebuilding remains an acquisition exception. E18 governs retained content, moved nodes, and discard. Those rules do not excuse the prior-value failures.

The platform-close traces are as follows.

| Situation | Dropdown | Tooltip and Popover |
|---|---|---|
| `hide-popover`, closing `toggle-popover`, or `hidePopover()` | The queued closed `toggle` reaches `#follow`; a held, connected, closed popover with the shown token runs `#conceal(undefined, false, false)` (`src/browser/Dropdown.ts:492`). | The closed `toggle` reaches `#dismiss`; the current shown tip runs `#conceal(false)` (`src/browser/Tooltip.ts:855`). Tooltip normally uses `hint`; Popover uses `manual` (`src/browser/Popover.ts:60`). |
| Close during show | Show has no await. A synchronous consumer close after promotion queues observation; the show completes or stops before that task runs. A surviving shown placement is then hidden. | During the fade, the token is present. Observation starts a hide with a fresh identity, superseding the show. The show later returns `false` without undoing that hide (`src/browser/Tooltip.ts:473`, `:610`, `:878`). |
| Close during hide | The synchronous hide normally finishes before observation; no held placement remains. | The token is already absent, so observation does nothing; the existing hide completes (`src/browser/Tooltip.ts:857`, `:896`). |
| Prevented hide, then another close | The first refusal records the placement and attempts reopening. The next close of that placement ignores prevention (`src/browser/Dropdown.ts:496`, `:502`). | The first refusal records the tip and attempts reopening. The next close of that tip ignores prevention (`src/browser/Tooltip.ts:858`, `:864`). |
| Close after destruction | Abort removes the observation listener (`src/browser/Dropdown.ts:194`, `:310`). | Abort removes the tip’s observation listener; the deferred continuation also requires that the same shown tip remain published (`src/browser/Tooltip.ts:525`, `:683`, `:863`). |

**The failing platform input is a prevented reopening.** Successfully show the overlay. Prevent its engine hide event. After the successful initial show, attach an overlay `beforetoggle` listener that prevents openings, then call `hidePopover()`.

The bridge dispatches the prevented hide, records its reopening allowance, and calls `showPopover()`. Canceling opening leaves the overlay closed; the platform permits that cancellation. See the [HTML popover opening algorithm](https://html.spec.whatwg.org/multipage/popover.html#show-popover). Neither bridge checks the resulting open state. Its shown token and engine state remain true, and no `hidden` event completes the hide. Another `hidePopover()` on the already closed element supplies no fresh close transition to activate the forced branch.

Prevention-only listeners on unchanged tips do not produce an endless reopening loop: the identity-bound allowance stops it. The retained Tooltip case exercises that situation (`tests/src/browser/Tooltip.test.ts:1647`). The refused-opening input instead leaves stale shown state. The Tooltip close table also omits `toggle-popover`, so that route has source support but no dedicated executed row in this unit (`tests/setupBrowser.ts:2945`).

Repair the return journal to record actual changes and prior values, restore those entries in reverse order, and preserve the explicit E18/acquisition exceptions. Handle refused reopening so the engine cannot retain shown state over a closed overlay. Align the guide and assertions with those outcomes.

No additional behaviour defect outside the claims was substantiated.

VERDICT: FAIL 2, 3, 4, 8
