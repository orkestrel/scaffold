<!-- U17-scaffold — checker (Sonnet, native), mechanical verification. Retained from the completion notification, 2026-09-15 (85 s, 21 tool uses). -->

1. CONFIRMED — `tests/setupPolicy.ts` throws `default export is unsupported at ${path}:${line}` in the `ExportAllDeclaration` branch when the alias is `default`, identical wording to the named-list branch; the pin `refuses a namespace export aliased as default` exists (`tests/setupPolicy.test.ts:114`).
2. CONFIRMED — `src/server/helpers.ts` refuses iff the record is absent or the staged owners are not a subset (`owners.every((owner) => record.includes(owner))`); the message reads `Staged Surface collisions differ from the inventory: NAME staged (…), recorded (…)`; the two new pins (`tests/src/server/helpers.test.ts:2064`, `:2088`) and the three kept pins exist; the `@throws` line and the guide sentence (`guides/scaffold.md:1382-1385`) state the subset rule.
3. CONFIRMED — `captureScaffoldMessage` is built on `captureError`; `captureScaffoldRejection` keeps its own try/catch.
4. CONFIRMED — `collectPolicyDeclarations(root, path, text)` exported (`tests/setupPolicy.ts:1402-1419`), called from both former catch sites, with one proof per outcome.
5. CONFIRMED — the three prose lines landed.
6. CONFIRMED, with a gap — exactly the seven owned files; the gates log shows `exit=0` after each step; the distribution log showed `5 passed | 1 skipped (6)` without an explicit exit marker (the Orchestrator appended its recorded reading).
7. CONFIRMED — ledger row `K-landing-pathspec` names `guides/supervisor.md` (staged, `A`) in the landing pathspec.

outside: none.

VERDICT: FAIL 6

<!-- Orchestrator: claim 6's gap closed by appending the recorded exit reading to U17-distribution.log.txt. -->
