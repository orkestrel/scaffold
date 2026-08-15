# H5 closing pass — did the fix round close what it carried?

Successor to `h5-audit-brief.md`. One lane: `reviewer`, engine **Opus 5**, native, read-only —
the closing auditor is the engine that did not write the fix (writer: Sol, resumed thread).
Verdict shape per `orkestrel-falsify`: per-claim verdicts with `file:line` evidence, one
terminal line.

## Subject

Commit `ce3ad45` (range `01b4fa7..ce3ad45`) in `/workspace/supervisor`,
branch `claude/orkestrel-test-package-0m1m8u`: 16 files, +362/−103 — the reconciled fix round
closing both audit lanes' findings per `tmp/redesign/h5-brief-2.md` (read it first; it names
each finding's ruling and grant).

## Claims

1. **The race is dead by the documented policy.** `HistoryManager` takes the raw history
   client plus an explicit refusal handler invoked only after its generation check; the exposed
   `operator.client.history` stays decorated; the constructor comment now states the actual
   policy truthfully. The four regressions (current refusal routes; held `AUTH` after `clear()`,
   after no-workflow login, after adoption — session intact, stale page dropped) bind the race.
2. **The guards are named, homed, and attacked.** `isHistoryRun`/`isHistoryPage` exported from
   `app/browser/validators.ts` in that file's voice beside `isApplicationRun`; `read()`
   consumes `isHistoryPage`; the negative controls (surplus, missing, malformed row, status,
   timestamps, empty cursor) and the refusal + colon/percent cursor proofs are real
   attacks, not restatements; `isBoolean` replaced the two-literal union.
3. **`changed` now means what it says.** The `(id, updated)` content-key derivation; undefined
   baseline reports false; the TSDoc states the rule; the four proofs (identical re-delivery,
   genuine transition, late first arrival, reload reset) bind it. H6 can render
   "History changed — Refresh" from this word honestly.
4. **The words are true.** `terminal`'s sentence states the persisted-snapshot fact with the
   `ended` contrast in the file's established voice; `loading`'s sentence admits the
   abandoned-read case; no other doc drifted in the fix.
5. **One tail shape, one home.** `ApplicationTail` declared once in `app/core/types.ts`,
   imported by both environments, `ClientTail` and the server-local declaration gone, every
   consumer moved, no alias; the types import block is sorted; `ClientRequestHandler.path`
   widened; the "catalog" phrase replaced.
6. **The fixture and the proof's home.** `ScriptedHistory` uses one seam-consistent verb pair
   with enumerating TSDoc; the tail-wire proof lives in its own `describe` naming its subject;
   the backpressure block's comment stays with its own tests; no assertion weakened anywhere in
   the round.

## Evidence (Orchestrator-supplied)

The fix diff is at `/home/user/scaffold/tmp/redesign/h5-fix2-evidence.diff`; the native
acceptance log at `tmp/redesign/h5-fix2-acceptance.log` (all gates and every listener suite).
The tree is committed and clean — Read files at their committed state. Prior-round context:
`tmp/redesign/h5-audit-brief.md`, the Sol verdict `tmp/codex/h5-audit-last.md`.

## Output

Per-claim numbered verdicts (CONFIRMED / BROKEN / UNRESOLVED / NOT-EVIDENCED) with evidence,
findings outside the claims if any, then exactly one terminal line:
`VERDICT: PASS|FAIL — N broken, N unresolved, N not-evidenced, N findings outside the claims`
