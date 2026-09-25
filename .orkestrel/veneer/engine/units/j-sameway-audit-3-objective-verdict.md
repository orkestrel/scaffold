# J-SAMEWAY round-3 audit — the objective lane (analyst on GPT-6 Astra, thread 01a0d62d-e8b3-75c3-8cbe-3ef57d500836, journal tmp/codex/j-sameway-audit-3.jsonl; brief units/j-sameway-audit-3-analyst-brief.md; claims units/j-sameway-audit-claims-3.md)

Thread `01a0d62d-e8b3-75c3-8cbe-3ef57d500836`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-sameway-audit-3.jsonl` (launch copy under `tmp/codex/`); 28 commands; 543 s; usage {"input_tokens":2963722,"cached_input_tokens":2802048,"cache_write_input_tokens":0,"output_tokens":14277,"reasoning_output_tokens":5991}. Retained verbatim from the exec's last message.

---

Source review at `e557bfe`; no tests run. Behaviour traces are source deductions. Executed evidence comes from the retained Orchestrator logs. The audited source and instrument digests match those logs.

| Claim | Ruling | Evidence and proof distinction |
|---|---|---|
| **1. Every write has its entry** | **FAIL** | The entry lists distinguish backdrop tokens from connections, but their operations still conflate them. Offcanvas records a connection from `isConnected`, although `Backdrop.show()` decides insertion from `parentNode` (`src/browser/Offcanvas.ts:284`, `src/browser/Backdrop.ts:77`). Conversely, a hide’s token return calls `show()`, which can insert without a connection entry (`src/browser/Modal.ts:509`, `src/browser/Offcanvas.ts:495`). The concrete inputs follow. **Mutations:** the `D1-rec-*` and `D1-ret-*` rows distinguish omitted entries and returns on the supplied fixtures. **Assertions distinguish these accounting mismatches: no**; those fixtures leave the backdrop connected to its original parent. |
| **2. The lane’s witness closes** | **CONFIRMED** | Modal records no token entry, captures the parent, removes the backdrop, and returns the host entries plus `connection` after the disconnection reaction restores the host token (`src/browser/Modal.ts:391`, `:397`, `:401`, `:502`). Offcanvas follows the same path and retains its press listener (`src/browser/Offcanvas.ts:372`, `:397`, `:400`, `:494`). **Mutations:** `D1-rec-modal-hide-connection`, `D1-ret-modal-hide-connection`, and their Offcanvas counterparts. **Distinguished: yes**, by the parent and token assertions at `tests/src/browser/Modal.test.ts:3240` and `tests/src/browser/Offcanvas.test.ts:3538`. Retained failures are assertion failures (`units/j-sameway-mutations-3-orchestrator.log.txt:43`, `:49`). |
| **3. A stopped show returns only its own backdrop writes** | **FAIL** | The stated branches execute, including listener destruction for Offcanvas’s connection entry. However, “outside the page” does not establish that the show inserted anything. With an existing backdrop inside its detached original parent, Offcanvas records `connection`, `Backdrop.show()` inserts nothing, and the return destroys the backdrop and listener (`src/browser/Offcanvas.ts:285`, `:521`; `src/browser/Backdrop.ts:77`). **Mutations:** `D1-ret-*-show-token` distinguish token-only cleanup in a connected parent; `D1-rec-*-show-connection` distinguish missing cleanup after actual insertion. **Assertions distinguish the detached-parent input: no** (`tests/src/browser/Offcanvas.test.ts:3587`). |
| **4. A stopped hide returns only its own backdrop writes** | **FAIL** | Parent capture and token capture are independent, and closing destruction correctly passes host entries alone (`src/browser/Modal.ts:397`, `:422`; `src/browser/Offcanvas.ts:397`, `:414`). But a token entry invokes `Backdrop.show()`, whose insertion branch can restore a connection the hide never removed (`src/browser/Modal.ts:395`, `:509`; `src/browser/Offcanvas.ts:381`, `:495`; `src/browser/Backdrop.ts:77`). **Mutations:** `D1-ret-*-hide-token` distinguish missing token restoration; `A6-*` distinguish the closing destruction’s missing door. **Assertions distinguish an insertion without a connection entry: no**; the token-return fixtures keep the backdrop connected (`tests/src/browser/Modal.test.ts:1152`, `tests/src/browser/Offcanvas.test.ts:1796`). |
| **5. Each backdrop return reads the call** | **CONFIRMED** | Every entry runs through `#revert`, which checks lifetime and the carried identity. Each callback reads the current `#backdrop` (`src/browser/Modal.ts:501`, `:506`, `:529`, `:549`; `src/browser/Offcanvas.ts:488`, `:492`, `:515`, `:536`). Destruction and an accepted nested owner change suppress subsequent entries. When a token return inserts, the owner callback still precedes the backdrop’s lifetime/identity check (`src/browser/Backdrop.ts:79`). **Mutations:** `A4-*`, `A5-modal`, `A5-offcanvas`, and `A5-owner-lifetime`. **Distinguished: yes**, by nested-call state, absent stale token additions, and owner-destruction assertions (`tests/src/browser/Modal.test.ts:2809`, `:2970`; `tests/src/browser/Offcanvas.test.ts:3139`, `:3256`; `tests/src/browser/Backdrop.test.ts:261`). This confirms call ownership checks; they do not validate connection accounting. |
| **6. The proofs bind** | **CONFIRMED** | The retained base run reports assertion failures for the added cases (`units/j-sameway-red-3-orchestrator.log.txt:3`). A1 and A2 preserve the `expected` binding (`units/j-sameway-mutations-3.py:115`, `:131`). The instrument reads the named case’s failure messages and refuses the planted unbound identifier (`:270`, `:286`). Every retained `KILLED` row names `AssertionError`; D2 names `ReferenceError`; the controls hold (`units/j-sameway-mutations-3-orchestrator.log.txt:9`, `:34`, `:67`, `:68`, `:72`). **Mutations:** A1 changes the required end, A2 discards the observed end, and D2 renames the declaration without its uses. **Distinguished: yes**—behavioural assertion failure versus refused broken plant. This certifies the recorded cases, not untested parent states. |
| **7. Greenfield and scope** | **CONFIRMED** | The commit comparison matches `units/j-sameway-3-status.txt:1`: Modal, Offcanvas, their tests, and the guide. `src/browser/types.ts` and `tests/setupBrowser.ts` are byte-identical to `dc838aa`. `BackdropInterface` remains used by the fields; `#revert` remains called by the returning loops; the removed backdrop parameters have no remaining callers (`src/browser/Modal.ts:122`, `:492`, `:521`, `:549`; `src/browser/Offcanvas.ts:130`, `:481`, `:509`, `:536`). No compatibility path appears in the change. No behavioural mutation applies. |

The following accounting covers every explicit show/hide exit. `S` denotes the show’s backdrop entries: `[]`, `[token]`, or `[connection, token]`. `F` denotes the hide’s token entry: `[]` or `[token]`. `C` denotes `[connection]` when the captured parent is non-null, otherwise `[]`. Concatenation preserves the displayed order.

Each supplied host entry performs these writes, provided the call still owns the live engine:

| Entry | Stopped show writes | Stopped hide writes |
|---|---|---|
| Modal `display` | `display: none` | `display: block` |
| Modal `aria-hidden` | `"true"` | Removes the attribute |
| `aria-modal` | Removes the attribute | `"true"` |
| `role` | Removes the attribute | `"dialog"` |
| Offcanvas `showing` | Removes the token | No such entry |
| Offcanvas `hiding` | No such entry | Removes the token |
| Backdrop `connection` | Clears the field and destroys the backdrop; Offcanvas also aborts its press listener | Appends the current backdrop to the captured parent |
| Backdrop `token` | Calls `hide()` if the backdrop remains held | Calls `show(owned)`, potentially inserting before adding the token |

A show’s connection return clears the backdrop field, so its subsequent token entry performs no separate write to the destroyed element (`src/browser/Modal.ts:537`, `src/browser/Offcanvas.ts:522`).

Modal’s explicit exits supply these entries:

| Exit | Returning step receives |
|---|---|
| Show refused, prevented, destroyed, or superseded during dispatch (`:252`, `:254`, `:258`) | No returning step |
| Show stops after lock acquisition, body-open acquisition, or adjustment (`:273`, `:275`, `:276`) | No returning step |
| Show stops after backdrop or host insertion (`:291`, `:295`) | `#rehide(change, S)` |
| Show stops after display (`:299`) | `[display] + S` |
| Show stops after `aria-hidden` (`:302`) | `[display, aria-hidden] + S` |
| Show stops after `aria-modal` (`:305`) | `[display, aria-hidden, aria-modal] + S` |
| Show stops after role, token, transition, isolation construction, or focus (`:309`, `:319`, `:322`, `:334`, `:338`) | `[display, aria-hidden, aria-modal, role] + S`; failed isolation construction also destroys that construction |
| Hide refused, prevented, destroyed, or superseded during dispatch; or stops during isolation release (`:346`, `:349`, `:353`, `:363`) | No returning step |
| Hide stops at token removal or host transition (`:368`, `:371`) | `#reshow(change, [], null)` |
| Hide stops after display (`:374`) | `[display]`, parent `null` |
| Hide stops after `aria-hidden` (`:377`) | `[display, aria-hidden]`, parent `null` |
| Hide stops after `aria-modal` (`:380`) | `[display, aria-hidden, aria-modal]`, parent `null` |
| Hide stops after role (`:384`) | `[display, aria-hidden, aria-modal, role]`, parent `null` |
| Hide stops after backdrop fade (`:395`) | `[display, aria-hidden, aria-modal, role] + F`, parent `null` |
| Hide stops after removal, open release, either padding removal, or lock release (`:401`, `:405`, `:408`, `:411`, `:415`) | `[display, aria-hidden, aria-modal, role] + C + F`, captured parent |
| Hide stops after closing destruction (`:422`) | `[display, aria-hidden, aria-modal, role]`, parent `null` |

Offcanvas’s explicit exits supply these entries:

| Exit | Returning step receives |
|---|---|
| Show refused, prevented, destroyed, or superseded during dispatch; or stops after lock acquisition (`:239`, `:242`, `:247`, `:260`) | No returning step |
| Show stops after backdrop (`:293`) | `#rehide(change, S)` |
| Show stops after `aria-modal` (`:296`) | `[aria-modal] + S` |
| Show stops after role (`:299`) | `[aria-modal, role] + S` |
| Show stops after adding `showing`, adding `shown`, or waiting (`:304`, `:310`, `:312`) | `[showing, aria-modal, role] + S` |
| Show stops after removing `showing`, isolation construction, or focus (`:315`, `:328`, `:332`) | `[aria-modal, role] + S`; failed isolation construction also destroys that construction |
| Hide refused, prevented, destroyed, or superseded during dispatch; or stops during isolation release (`:344`, `:347`, `:351`, `:361`) | No returning step |
| Hide stops after adding `hiding` (`:363`) | `#reshow(change, [hiding], null)` |
| Hide stops after removing `shown` or waiting (`:379`, `:381`) | `[hiding] + F`, parent `null` |
| Hide stops after clearing transition tokens (`:384`) | `F`, parent `null` |
| Hide stops after removing `aria-modal` (`:387`) | `[aria-modal] + F`, parent `null` |
| Hide stops after removing role (`:391`) | `[aria-modal, role] + F`, parent `null` |
| Hide stops after backdrop removal or lock release (`:400`, `:405`) | `[aria-modal, role] + C + F`, captured parent |
| Hide stops after closing destruction (`:414`) | `[aria-modal, role]`, parent `null` |

Completed calls take no returning step. They retain their completed forward writes, dispatch the completed event, and return the lifetime reading (`src/browser/Modal.ts:340`, `:424`; `src/browser/Offcanvas.ts:334`, `:416`). Destruction during that dispatch makes the result false and invokes destruction’s restoration.

The unreturned acquisition and release writes follow the stated exceptions: locks, isolation, and Modal’s body-open token remain acquired or released as applicable. Modal’s padding follows the compensation exception. Its host insertion remains in the body, as the existing guide explicitly requires (`guides/veneer.md:2194`). Scroll resets remain resets. Clearing Offcanvas’s `showing` token leaves the settled shown state without an active slide-in marker; restoring that marker would not restore the settled state. These exceptions do not excuse the backdrop connection mismatches.

The round-2 witness traces to the intended result in each engine. Modal supplies `[display, aria-hidden, aria-modal, role, connection]` with the original parent. Offcanvas supplies `[aria-modal, role, connection]`. Neither supplies `token`. Consequently, the host returns to its shown display/ARIA state, the backdrop returns to its original parent without `show`, and Offcanvas retains its press listener.

The failing inputs are as follows:

- **A stopped show destroys an untouched parent relationship.** Create an Offcanvas host inside a detached element and construct it with `scroll: true`. Complete a show, then remove `show` from the host and backdrop. On the next show event, add the host’s `show` token and queue its removal in a microtask. The next show records `[connection, token]` because the backdrop is disconnected from the document. Its original parent already contains it, so `Backdrop.show()` writes only the token. The stopped show nevertheless removes it from that parent and aborts its listener. The constructor admits this HTMLElement input (`src/browser/Offcanvas.ts:137`); no consumer reparents the backdrop. Record actual parent insertion rather than document connectivity. The connected-parent case must continue to preserve the element and listener.

- **A stopped hide inserts a connection it never removed.** Complete a non-fading Modal show with `focus: false`, remove the backdrop element while leaving its `show` token, and register a hide-event listener that queues adding `show` to the host. Call `hide()`. The hide removes the backdrop token, then stops at the await’s door before reaching its removal step. Its return receives host entries plus `token`, with parent `null`. `Backdrop.show()` appends the element to the body anyway. Offcanvas reaches the same result through its wait exit. No foreign parent is involved. A token-only return must restore the token without inserting the element.

A reaction that reparents the backdrop between removal and return does not change the captured parent. If the backdrop’s disconnection reaction appends it to another parent and restores the host token, `#reshow` appends it back to the captured parent (`src/browser/Modal.ts:397`, `:508`; `src/browser/Offcanvas.ts:397`, `:494`). That input falls under the Orchestrator’s explicit foreign-parent exclusion and supplies no additional failure.

Destruction inside a backdrop return stops subsequent writes. During reconnection, a child’s `connectedCallback` can destroy the owner. Destruction aborts the owner, removes the backdrop, and restores its snapshot; the following token entry fails `#revert`. During a stopped show’s backdrop destruction, the field is already cleared before a child’s `disconnectedCallback` destroys the owner, and subsequent entries likewise fail ownership (`src/browser/Modal.ts:439`, `:537`, `:549`; `src/browser/Offcanvas.ts:425`, `:522`, `:536`).

No additional behaviour defect outside the claims was substantiated.

VERDICT: FAIL 1, 3, 4
