# J-RELEASE-DESIGN round 2 — the objective lane's stop (2026-09-25)

`analyst` on GPT-6 Astra, read-only `codex exec`, thread `01a0d758-5070-72f2-9b25-d07695eadc77`, journal `tmp/codex/j-release-design-2-analyst.jsonl` (swept at acceptance). The brief is `units/j-release-design-brief-2.md`. The lane's final message follows verbatim.

## 1. Rulings on questions 1–6

**Proposal: stop this design round under the brief’s explicit disagreement rule.** The revised brief and S3 still disagree about `ScrollLock.destroy()`.

- The brief says **“No latch”** and specifies that the holder set controls release. [j-release-design-brief-2.md:37](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-design-brief-2.md:37)
- S3 says **“Every release primitive in the slice is guarded by `if (aborted) return`”**, which includes `ScrollLock`. [j-release-sweep-s3-map.md:280](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-sweep-s3-map.md:280)
- The code agrees with the revised brief: `destroy()` calls `abort()` unconditionally, then checks the recorded holders; it contains no aborted-signal guard. [ScrollLock.ts:126](C:/Users/mikes/WebstormProjects/veneer/src/browser/ScrollLock.ts:126)

The controlling instruction is: **“When this brief and a map disagree about the code, the code wins; stop and name the disagreement.”** [j-release-design-brief-2.md:24](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-design-brief-2.md:24)

Accordingly:

| Question | Ruling |
|---|---|
| 1 — Mechanism | Not selected; the mandatory stop precedes choosing A, B, or another mechanism. |
| 2 — Save moment | Not ruled; the E25 exception remains to be reconciled. |
| 3 — Primitives | `ScrollLock` has no aborted-signal latch; the remaining design rulings are stopped. |
| 4 — Delegate | Not ruled under this stopped round. |
| 5 — Fresh reads | Not classified under this stopped round. |
| 6 — Units | No adoption plan approved from this incomplete review. |

## 2. Mechanism’s contract

No TypeScript contract is proposed under the mandatory stop.

The correction must distinguish **latching destruction** from **losing access to a restoration in progress**. `ScrollLock` deletes its shared lock record before calling `snapshot.restore()`. That ordering is present independently of any aborted-signal latch. [ScrollLock.ts:135](C:/Users/mikes/WebstormProjects/veneer/src/browser/ScrollLock.ts:135)

## 3. Invariant, bound, and consumer’s interface

**Invariant:** Release uses recorded ownership and retains access to pending restoration.

**Bound:** Correcting S3’s latch claim does not establish that its pending-restoration finding is false.

**Consumer’s interface:** Whether nested owner destruction completes the lock’s pending restoration before returning remains a behavioral claim requiring its red-first witness.

## 4. Unit plan

The prerequisite is an Orchestrator correction to **S3 § The source**, explicitly distinguishing `ScrollLock` from primitives whose entire destruction method is latched.

Retain S3’s last-holder station as an unexecuted finding: its own station description correctly identifies deletion before restoration. [j-release-sweep-s3-map.md:241](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-sweep-s3-map.md:241)

Repair ownership and map-row assignments remain unproposed because the brief requires stopping here.

## 5. What could not be settled

The mechanism, installed dependency fit, complete citation audit, and adoption plan remain unsettled.

The source reading above settles the latch disagreement. After correcting the record, execute S3’s M12/O10 witness: invoke owner destruction from a synchronous style reaction during lock release, then inspect the remaining compensation immediately after the nested call returns.

No files were changed, no agents were spawned, and no behavioral tests were run.