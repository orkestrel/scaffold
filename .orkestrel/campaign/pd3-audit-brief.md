# Audit PD3 — overlay query strip + serve detection (probe)

Role: checker. Read-only mechanical conformance review. Attempt REFUTATION of each claim from
the actual diff and sources; CONFIRMED needs evidence, BROKEN needs the exact failing reading
and the smallest fix. End with one terminal line: `PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/orkestrel/probe` (baseline c342227, writer
GPT-5.6 Sol). Diff captured at `/home/user/scaffold/tmp/units/pd3.diff`; the writer's report is
`/home/user/scaffold/tmp/codex/pd3-last.md`; the ruling is
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` rulings 7 and 8. Supplied host
evidence (Orchestrator-run): the probe full suite passed every project except the guides parity
gate, whose one missing name (`guardStage`) predates this unit and is carried separately — no
serve-detection false finding appeared in the full-suite reading.

## Claims

1. The runtime overlay lookup strips the module id at the FIRST `?` before overlay matching, so
   every query form (including `?raw` and compound queries) resolves the overlaid bytes; the
   red-first pin drove a non-`?v=` query that previously returned disk bytes.
2. The serve detection records what the loader actually served and, after a run, reports a
   covered overlay path the loader never served as an Issue: `origin: 'workspace'` when the
   target configuration served the module before probe's loader, `origin: 'instrument'` when
   probe's loader received the id but returned no overlay bytes. The distinction mechanism in
   the diff actually separates those states (name the mechanism you verified).
3. The detection is issue-producing, and its boundaries match the ruling: bare specifiers are
   not chased, and the type/runtime draft asymmetry stays.
4. The red-first records bind: each red names the mechanism whose absence produced it.
5. Scope honesty: only `src/server/stages/RuntimeStage.ts` and its test file moved; no guide,
   no public type file, no off-limits file.
6. The diff obeys the repository laws in its reach: no `any`, no assertions, no nested function
   declarations, `#` fields, centralized helpers where extracted, readonly public collections.

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
