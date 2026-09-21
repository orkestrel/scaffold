# CL1 audit round 2 claims (the fix round)

Subject: the fix round of unit CL1 in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`),
written by `sol` on Astra under `units/cl1-brief-2.md` (retained under
`.orkestrel/veneer/units/`; carrying brief 1), report `units/cl1-report-2.md` with
`units/cl1-report.md`, over the U7f-fix landing `060ce02`. Evidence rendered by the Orchestrator:
`units/cl1-diff-2.patch.txt` (`git diff 060ce02`) beside round 1's `units/cl1-diff.patch.txt`
over the same base, and `tmp/audit/cl1-status-2.txt`. Rule on the diff and the live files,
never on the reports' word alone. Scope: implementation only, by the user's ruling. Astra wrote
the unit and the fix, so the Opus reviewer holds the objective lane and the Astra analyst the
subjective lane. Claims marked `[mechanical]` are the checker's; every other lane rules on every
claim. An extra finding is an implementation defect the fix round introduced or left open, with
a site and a one-line failure scenario, numbered from 6.

1. Finding 1 closed: `readOracleButton` replaces `resolveOracleButton` in `tests/setupBrowser.ts`
   with the same contract (bounded under the root, the reachability refusal kept), its two
   callers (the key press and the pointer hold helpers), the import, the browser export
   inventory, and its cases updated; `resolveOracleButton` occurs nowhere in the tree.
2. Finding 2 closed: `visitBreakpoint` lives in `tests/setupBrowser.ts` over the static
   `vitest/browser` import, with no dynamic import left; `tests/setupStyles.ts` imports nothing
   from `vitest/browser`, reads no window, and keeps the frozen `BREAKPOINT_CASES` table; the
   browser proof imports the helper from `./setupBrowser.js` and the table from
   `./setupStyles.js`; the styles export inventory no longer lists `visitBreakpoint` and the
   browser inventory does; the styles proof's case that the module exports nothing the document
   has to answer is true; the restoration proofs (sync failure, async failure that resizes,
   nested visit, the following case at the original size) still hold.
3. Finding 3 closed: the hold's cleanup path in `tests/setupBrowser.ts` releases the pointer in
   its own `try`/`catch` and throws the original pressed-state error with the release rejection
   as `cause`, matching the installed verb's shape; a case or a read of the code path shows the
   original error surfaces when the release rejects.
4. Finding 4 closed: no test datum names the unit: the reading-failure message in
   `tests/setupBrowser.test.ts` names the reading and the unreachable-selector fixture in
   `tests/setupConformance.test.ts` is named for what it is; the assertions that read those
   values are updated with them.
5. `[mechanical]` Scope, law, and gates: the round-2 diff differs from round 1's only in
   `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.ts`,
   `tests/setupStyles.test.ts`, and `tests/setupConformance.test.ts`; the status shows brief 1's
   seven files; in the diff no `any`, no assertion outside `as const`, no non-null assertion, no
   suppression comment, no skipped case other than `it.runIf`, no case named for a control, no
   plant residue; every export inventory equals its live module's export set; `listed` reads
   `['btn']`; the round-1 confirmations (the exclusion scanner, the property-free admission, the
   root-scoped drive, the breakpoint table) are not disturbed. The gates report 2 records exit 0
   on managed Chromium and Edge; the verifier lane re-runs the chain on the host and its reading
   rules the gate half.
