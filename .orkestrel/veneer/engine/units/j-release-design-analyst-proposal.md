# J-RELEASE-DESIGN — the objective lane's proposal (2026-09-25)

`analyst` on GPT-6 Astra, read-only `codex exec`, thread `01a0d755-4cde-7500-955f-b8eb292ac965`, journal `tmp/codex/j-release-design-analyst.jsonl` (swept at acceptance). The brief is `units/j-release-design-brief.md`. The lane's final message follows verbatim.

## 1. Rulings on questions 1–6

**Proposal: correct the brief’s source premise before choosing the release mechanism.** The brief requires stopping when its account and a map disagree about code: [j-release-design-brief.md:22](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-design-brief.md:22).

The disagreement is concrete. The brief claims every engine except Dropdown has a whole-method abort latch: [j-release-design-brief.md:33](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-design-brief.md:33). At the designated checkout, verified as `3bb9afb062033ef12b76d18e9689c8730a02ba4b`:

- **Tooltip** latches only registry release and abort. Disarming, discarding, unlinking, returning content, and restoring the snapshot remain outside that latch: [Tooltip.ts:541](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b/src/browser/Tooltip.ts:541).
- **Placement** latches abort, observer disconnection, and native hiding; snapshot restoration remains outside the latch: [Placement.ts:241](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b/src/browser/Placement.ts:241).
- **S2 agrees with this source structure**, explicitly describing reachable fields during nested destruction and Placement’s reentry behavior: [j-release-sweep-s2-map.md:39](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-sweep-s2-map.md:39), [j-release-sweep-s2-map.md:48](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-sweep-s2-map.md:48).

These observations refute the universal latch premise; they do **not** establish that these implementations satisfy every release invariant.

| Question | Ruling |
|---|---|
| 1 — Mechanism | Deferred under the explicit stop instruction; neither A nor B is selected. |
| 2 — Save moment | Unsettled; the required law and evidence review stopped at the disagreement. |
| 3 — Primitives | Placement’s snapshot restoration is outside its latch; promotion ownership and completion remain unsettled. |
| 4 — Delegate | Unsettled under the same stop instruction. |
| 5 — Fresh reads | Unsettled under the same stop instruction. |
| 6 — Adoption units | Deferred until the evidence premise is corrected and the mechanism ruled. |

## 2. Mechanism’s contract

No TypeScript contract is proposed at this stop. Choosing one now would proceed beyond the brief’s explicit instruction.

## 3. Invariant, bound, and consumer’s interface

**Invariant:** The requested mechanism must finish pending releases before each `destroy()` returns, including nested calls, and release from recorded acquisition facts.

**Bound:** This round permits source review only and expressly requires stopping at the identified disagreement.

**Consumer’s interface:** `destroy(): void` is the existing interface at the verified sites; any shared mechanism’s interface remains undecided.

## 4. Unit plan

The immediate proposal is an Orchestrator correction to the brief’s “What the maps agree on” passage, distinguishing whole-method latches from latches around particular release steps.

No repair ownership or witness assignments are proposed before that correction and the resumed review. Existing unit ownership remains in force. No files were changed.

## 5. What could not be settled

The mechanism, save exceptions, remaining primitive behavior, Delegate, fresh-read repairs, dependency reuse, and complete map-row allocation remain unsettled.

**Resolving probe:** Review the cited methods at the verified commit and amend the brief’s universal latch statement to match them; then resume the prescribed law, map, contract, and installed-export review. Browser witnesses remain source derivations until repair units execute them red-first.