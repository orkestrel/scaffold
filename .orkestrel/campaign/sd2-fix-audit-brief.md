# Audit SD2-FIX — repair appends the absent writable scripts (scaffold)

Role: checker. Read-only mechanical conformance review. Attempt REFUTATION of each claim from
the actual diff and sources; CONFIRMED needs evidence, BROKEN needs the exact failing reading
and the smallest fix. End with one terminal line: `PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/scaffold` (baseline 5636a6a, writer
GPT-5.6 Sol; the two follow-up pin corrections in `tests/src/bin/CLI.test.ts` described in
claim 6 are the Orchestrator's). Diff captured at `tmp/units/sd2-fix.diff`; the writer's report
is `tmp/codex/sd2-fix-last.md`; the falsifying run and objective are in
`tmp/units/sd2-fix-brief.md`. Supplied host evidence (Orchestrator-run, authoritative):
`npx tsc --noEmit` exit 0, `test:config` complete and green, the CLI suite complete and green,
`test:guides` and `test:src:core` complete and green.

## Claims

1. The gate is the one the report names: writing-mode preflight (`#assertTarget` before
   `Materializer.declare`) included the scripts advisory among blocking target questions, so an
   absent planned script raised `TARGET` before the region writer ran. The fix excludes scripts
   from the writing preflight while `audit` keeps the non-blocking question — trace both paths
   in `src/bin/CLI.ts` and confirm no other blocking door still fires on absent scripts.
2. The real-verb pin (`tests/src/bin/CLI.test.ts`, the html-shaped repair test) drives the CLI's
   actual dispatch door and proves: absent writable scripts appended, custom script survival
   byte-for-byte, key-order survival, and a clean follow-up audit.
3. A DIFFERING (customized) writable script still refuses its region and still reports — the
   refusal is region-scoped, not verb-blocking, and other selected paths repair.
4. The TS7053 quartet is closed by typing the fixture records to admit the keys the tests read —
   no `as`, no `!`, no `@ts-*`, no suppression anywhere in the diff.
5. The guide edit documents the audit/write boundary truthfully against the landed code, and
   `host.json` regeneration covers exactly the vendored paths the diff moved.
6. The Orchestrator's two pin corrections are sound against the documented contract: (a) the
   region-refusal test asserts the customized scripts region bytes survive while the manifest's
   other planned regions repair (the fixture's tilde range takes the planned caret form the
   audit advisory names); (b) the follow-up audit exits `EXIT_CLEAN` with the non-blocking
   scripts question riding the result — per the `auditToExit` TSDoc ("A non-blocking question
   rides a complete result and does not" drift the exit). Confirm the corrected assertions test
   the intended property and not a weakened one.
7. The diff obeys the repository laws in its reach; only `src/bin/CLI.ts`,
   `tests/src/bin/CLI.test.ts`, `guides/scaffold.md`, and `host.json` moved.

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
