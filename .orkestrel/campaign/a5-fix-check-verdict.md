<!-- checker on Claude Sonnet, native, clean context, read-only; the mechanical verdict on unit A5-fix (a5-fix-check-brief.md) against agent c9b35b2; returned 2026-09-15 after 120 s; retained verbatim from the returned message -->

Lane: mechanical (checker, Sonnet)

## Claims

1. **R1–R12 landed as the brief specified, and nowhere else.** CONFIRMED. Mapped every hunk in `a5-fix-diff.txt` to its repair: guides/agent.md hunk at lines 1097/1099 = R5+R6+R7+R10 verbatim; guides/agent.md hunk at line 1126 = R1; `src/core/factories.ts:104` = R1; `tests/guides.test.ts` import line 47 = R9; lines 453-461 hunk (delete old two-line comment, insert R3's four-line comment above `createServer`) = R3; lines 468-486 hunk = R8 (both edits); lines 489-505 hunk = R4; lines 118-125 (`finally` trimmed, assertions moved) = R12 flagship; line 128 test-name change = R11; lines 133-164 (`let drained`, `createAbort()` swap, R2 comment, moved assertions) = R9+R12 cancel case; line 167-173 substring guard = R1. No hunk is unaccounted for.

2. **The twins are equal and clause 36 is untouched.** CONFIRMED. `guides/agent.md:1103-1127` (read directly) equals `src/core/factories.ts:81-105` with the ` * ` prefix stripped, line by line including the R1 comment text. The diff's only `guides/agent.md` hunks touch lines 1097, 1099, and 1123-1129 (covering 1126); no hunk touches line 1018. Clause 36 at `guides/agent.md:1018` (read directly) is the pre-existing prose with no diff hunk over it.

3. **The substring guard binds the corrected line.** CONFIRMED. `tests/guides.test.ts:656-658` asserts `"process.on('SIGTERM', () => server.stop()) // signal cancellation, drain, then close the listener"`, and the surrounding `toContain` calls at lines 644-661 are otherwise unchanged from `0af0785`.

4. **The changed prose and comments obey the writing law.** BROKEN. Two of the landed comments violate the code-token-plus-noun rule's "no bare token as a sentence subject" clause (`.claude/rules/writing.md` § Code tokens):
   - `tests/guides.test.ts:466`: "`await server.stop()` after the case replaces the `SIGTERM` listener a test" — `` `await server.stop()` `` is the bare subject of "replaces," followed by "after the case," not a noun.
   - `tests/guides.test.ts:570-571`: "so `closeIdleConnections`\n\t\t\t\t// does not reach it and `server.close()` waits on the socket itself" — both `` `closeIdleConnections` `` and `` `server.close()` `` are bare code tokens used as sentence subjects.
   Smallest fix: give each token a noun (for example "the `closeIdleConnections` step does not reach it" / "the `server.close()` call waits on the socket itself"; "the `await server.stop()` call after the case replaces…").
   No other substitution-table or count/tense/`above`-`below`/serial-comma hit found in `guides/agent.md:1097`, `:1099`, `:1126` or the remaining added comment lines.

5. **Every comment the fix touched states what the evidence shows.** Partially CONFIRMED, one component UNRESOLVED.
   - R2 comment (`tests/guides.test.ts:571-574`, "seconds… reused keep-alive socket") — CONFIRMED against `a5-probe-stop-3.log.txt`: the `trip-then-cancel` rows report `stop() 3011.2 ms` / `2916.8 ms` / `2402.8 ms` with `drain pending=0 upgraded=0`.
   - R1 fence comment's three verbs ("signal cancellation, drain, then close the listener") — CONFIRMED against `a5-probe-stopping.log.txt` (`aborted=true` while draining; `status after stop: stopped`; `after-stop request: refused (ECONNREFUSED)`).
   - R3 comment's `host` and `finally`-placement statements — CONFIRMED by direct code reading (`host: '127.0.0.1'` added; `await server.stop()` sits in the case's `finally`). The `serve` export is not called anywhere in the transcription (confirmed: it is never referenced outside the guide fence). The phrasing "after the case" describing where the stop sits is imprecise — the stop runs inside `finally`, which executes after the try body, not literally "after the case" — **referral**: whether that phrasing is accurate enough is a judgment call, not a mechanical pass/fail.
   - R8 comment's "the dispatcher itself answers" — UNRESOLVED: no cited evidence (log or source line) in the review packet ties this to `@orkestrel/router`'s default 404/405 behavior; only the writer's report asserts it, which is not evidence.

6. **Scope honesty.** CONFIRMED. `git diff --stat` in `a5-fix-diff.txt` names only `guides/agent.md`, `src/core/factories.ts`, and `tests/guides.test.ts`; `src/core/factories.ts` shows one changed line (`-1`/`+1` at line 104). No hunk touches `tests/setup.ts`, `tests/setup.test.ts`, `package.json`, or a vendored file. No `any`, `as` assertion, non-null assertion, access modifier, or nested function declaration appears in the diff. `let drained: number | undefined` and `const { createAbort } = await import('@orkestrel/abort')` match the file's existing declaration and dynamic-import forms (confirmed against the unchanged adjacent import lines in the diff context).

## Findings outside the claims

- Acceptance criterion 3 of `a5-fix-brief.md` (`grep -n "…credential never leaves…" tests/guides.test.ts guides/agent.md` finds nothing) is not literally satisfied: `guides/agent.md:1095` contains the unrelated, pre-existing sentence "…and the credential never leaves the server," which the substring `credential never leaves` matches. This line carries no diff hunk and predates `0af0785`; the acceptance criterion's pattern is over-broad rather than the fix leaving stale prose. Not one of this round's numbered claims — reported for the Orchestrator's record.

## Attacked and held

Claims 1, 2, 3, and 6 attacked directly against the diff and the tree; held. Claim 5's evidence-backed components (R1, R2, R3's `host`/`finally` parts) attacked against the two probe logs; held.

## Referrals

- Claim 5, R3's "after the case" phrasing for where `await server.stop()` sits — send to the subjective lane (design-fit/wording judgment), not decidable mechanically.

VERDICT: FAIL 4; outside the claims: acceptance-criterion-3-overbroad-grep
