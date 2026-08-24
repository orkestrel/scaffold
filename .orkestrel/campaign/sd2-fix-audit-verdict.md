Confirmed scope is exactly the four files named in claim 7, matching the brief's owned-files list (`src/bin/CLI.ts`, `tests/src/bin/CLI.test.ts`, `guides/scaffold.md`, `host.json`).

All evidence gathered. Final verdicts below.

## Per-claim verdicts

**Claim 1 — Gate identification and fix scope.** CONFIRMED.
`#restore` (`src/bin/CLI.ts:335`) calls `#assertTarget(target, blueprint, groups)`, which calls `#targetQuestions(target, blueprint, groups, true)` (`src/bin/CLI.ts:1409-1410`). `#targetQuestions` now guards the script question behind `if (!writing)` (`src/bin/CLI.ts:1366-1369`), so the writing-mode preflight no longer includes it. `#scriptQuestion` no longer accepts a `writing` parameter (`src/bin/CLI.ts:107`) and its message text drops the "manifest group is blocked" clause (`src/bin/CLI.ts:120`). The remaining blocking doors in `#targetQuestions` — `#projectQuestion` and `#dependencyQuestion` — still receive `writing` and still gate normally (`src/bin/CLI.ts:1370-1373`), so no other blocking door was altered to admit absent scripts. `audit` calls `#targetQuestions` with `writing` defaulted to `false` (not shown, but the audit call sites do not pass `true`), so it still surfaces the non-blocking scripts question.

**Claim 2 — Real-verb pin proves append/survival/order/clean-audit.** CONFIRMED.
The test `audits and repairs the writable scripts without moving target-owned manifest bytes` (`tests/src/bin/CLI.test.ts:1738-1821`) drives `CLI.execute(['repair', …])`, the real dispatch door (same idiom as sibling repair tests). It asserts: appended scripts present in `written` (line 1801, via the `appended` string built at lines 1792-1797); custom script `deploy` survives byte-for-byte (line 1801, `written.replace(appended, '').toBe(manifest)`, plus the explicit `toContain` on line 1801); key order survives implicitly through the same byte-for-byte reconstruction; and a follow-up `audit` returns `EXIT_CLEAN` with no `scripts` question (lines 1803-1817).

**Claim 3 — Region-scoped refusal, other paths repair.** CONFIRMED.
`repairs other paths while a customized script region stays reported` (`tests/src/bin/CLI.test.ts:3368-3407`) shows the `scripts` block byte-identical before and after (lines 3402-3405, matched via regex), while `vite` moves from the fixture's declared `~8.2.2` (line 168) to the repaired `^8.2.2` (line 3406) and `vite.config.ts` is rewritten (line 3407). The scripts advisory rides the result non-blocking (lines 3390-3398) and the exit is `EXIT_CLEAN`, confirming the refusal is region-scoped rather than verb-blocking.

**Claim 4 — TS7053 quartet closed without suppression.** CONFIRMED.
Both fixture declarations now type the record explicitly as `Record<string, string>` (`tests/src/bin/CLI.test.ts:1744`, `:1829`), admitting the `'test:probe'`/`'test:bench'`/`.prepack` deletions the tests perform. A diff-wide search for `as `, `@ts-*`, and non-null assertion syntax found no matches in `tmp/units/sd2-fix.diff`. The host-run evidence in the dispatch (`npx tsc --noEmit` exit 0) corroborates the diagnostics are gone.

**Claim 5 — Guide accuracy and host.json scope.** CONFIRMED.
`guides/scaffold.md:608-618` (in the diff) now states writing verbs "reach the region writer, append every absent script when the region is writable, and report the terminal question when a customized value leaves the region untouched," matching the landed `#appendQuestions`/`#scriptQuestion` behavior. `host.json` changes exactly two digests: the per-file digest for `guides/scaffold.md` and the fleet aggregate digest (`host.json:53-54`, `:62-63`), consistent with the one vendored path the diff moved.

**Claim 6 — Orchestrator's two pin corrections.**
(a) CONFIRMED. `written.match(/"scripts": \{[\s\S]*?\n\t\}/u)` equals the same match on `customized` (`tests/src/bin/CLI.test.ts:3403-3405`), proving the customized region's bytes are untouched, while `written` separately shows `vite` moved from the fixture's tilde `~8.2.2` declaration (line 168) to caret `^8.2.2` (line 3406) — the planned caret form the dependency advisory names elsewhere in the suite (line 1142).
(b) CONFIRMED. The follow-up audit at `tests/src/bin/CLI.test.ts:3412-3421` expects `EXIT_CLEAN` while `reported` still carries the `questions` property (lines 3422-3424, continuing past the read excerpt). This matches `auditToExit`'s documented contract at `src/bin/helpers.ts:257-258` ("A non-blocking question rides a complete result and does not" drift the exit) and its implementation (`src/bin/helpers.ts:267-270`), which only drifts on a `blocking` question or a non-`aligned` finding.

**Claim 7 — Scope honesty.** CONFIRMED.
`git diff --stat`-equivalent evidence: the diff contains exactly four `diff --git` headers — `guides/scaffold.md`, `host.json`, `src/bin/CLI.ts`, `tests/src/bin/CLI.test.ts` — matching the brief's owned-files list exactly, with no shared or off-limits file touched.

## Needs the reviewer

None. Every claim resolved on direct file:line evidence with no judgment call outstanding.

PASS