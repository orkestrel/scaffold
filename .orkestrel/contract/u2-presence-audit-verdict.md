# Audit verdict — u2-presence (commit 99283f9)

Round run 2026-09-01. Objective lane: clean-context Opus 5 (recorded substitution for dark
Sol). Subjective lane: not run this round — the subject's claims are correctness-shaped; the
mechanism's design fit was ruled in the design round. Checker: not run; the lane's own
mechanical sweeps covered the enumerations. Subject: the committed diff and the commit-exact
`dist` artifact (the lane detected the U3 writer's concurrent working-tree edits and correctly
bounded itself to the committed artifact).

## Per-claim rulings

1. Mask/collection answer equivalence at and under the width: CONFIRMED — 6240 differential
   cases, 0 divergences; negative control (limit forced to 1000000) reports 1999 divergences
   exactly in the aliasing widths; `__proto__`, exotic names, duplicate snapshots, hostile
   proxies all held.
2. Past-width branch verbatim: BROKEN — the guard's is; the parser/auditor/reporter collection
   paths are restructured, and the auditor/reporter vocabulary hoists sit outside the per-call
   containment for every width.
3. Hoists observable-equivalent: BROKEN — under a pre-module-load `Set` replacement (captured
   into `INTRINSICS`, inside the package's own documented promise), `compileReporter` throws
   `structure` where the parent returned a fault array; `compileAuditor` keeps its refusal but
   loses `path` from context. Parser hoist predates the commit and is within its door's
   contract.
4. Presence stays on the `enumerableKeys` snapshot: CONFIRMED — no own-check against the
   caller value anywhere in the file; non-enumerable own required key reads absent in both
   branches.
5. Added tests bind their defects: CONFIRMED for both named pairings, with reproduced
   mechanisms; two recorded gaps (aliasing test's parse/report assertions non-discriminating;
   the boundary test's control unnamed).
6. Non-negotiables: CONFIRMED; one writing-rule miss outside the enumeration (serial comma in
   the constants TSDoc).

VERDICT: FAIL — claims 2 and 3 BROKEN.

## Orchestrator triage

The broken surface is reachable only through a pre-module-load global replacement — but the
reporter's own code comment and the `compileReporter` TSDoc promise totality in exactly that
regime, so the code now contradicts its own documentation and the fix is owed now, not as a
documented obligation. Fix unit u2fix adopts the lane's prescription verbatim: plan-time
vocabulary builds through `attempt`, `undefined` on failure, per-call fallback inside the
existing containment (restoring the auditor's `path` context on the fallback), plus the serial
comma. Closure per the verbatim-adoption rule: mutation probe (pre-load-sabotage instrument
proving fault-array-not-throw at past-width, red under the committed form, green under the
fix), no fresh cross-engine round. Queued behind the live u4-leafgate writer.
