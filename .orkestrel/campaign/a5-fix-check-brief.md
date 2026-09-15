# Unit A5-fix-check — mechanical verdict on unit A5-fix

## Role and lane

`checker` on Claude Sonnet, native, clean context, read-only (Read, Grep, Glob). Perform the
assignment directly and spawn nothing. Return the `orkestrel-falsify` verdict shape: numbered
per-claim verdicts (`CONFIRMED` with the evidence, `BROKEN` with the exact site and the smallest
fix, `UNRESOLVED` with what would settle it), findings outside the claims, attacked and held,
referrals, and exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
First line: `Lane: mechanical (checker, Sonnet)`. A claim whose only evidence is the writer's
report is `UNRESOLVED`. No process diary.

## Subject

The agent checkout `C:/Users/mikes/WebstormProjects/agent` at the commit named in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a5-fix-head.txt` (unit A5-fix over
`0af0785`), tree clean. This round decides whether A5-fix closes audit round A5-R1 so that the
ollama mirror is refreshed from this guide and the agent tarball repacked.

**Review evidence** (under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`):
the diff `a5-fix-diff.txt` (`git diff 0af0785 <tip>`), the status after the unit
(` M guides/agent.md`, ` M src/core/factories.ts`, ` M tests/guides.test.ts`; stat
`3 files changed, 32 insertions(+), 28 deletions(-)`), the unit brief `a5-fix-brief.md` (R1–R12,
each an exact replacement), the writer's report `a5-fix-report.md` (its command table is the
writer quoting itself), the round it repairs (`a5-audit-objective.md`, `a5-audit-subjective.md`,
`a5-audit-mechanical.md`, `design-reconciliation.md` § "Audit round A5-R1 (2026-09-15) — reconciled"),
and the Orchestrator's reproduction `a5-probe-stopping.log.txt`.

**Law:** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Writing and, under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, `writing.md` (§ Code tokens, the
substitution table), `documentation.md` § Parity, `tests.md`.

## Already established — do not re-run

Verified by the Orchestrator directly: the seven acceptance criteria of `a5-fix-brief.md` read as
met on the tree (`grep` counts 1/1/1 for the new comment and 0/0/0 for the old; `createAbort`
appears five times in `tests/guides.test.ts` and no `AbortController` remains inside the two
socket cases; no `expect(` sits inside a `finally` in the file; the diff stat names the three
owned files and `factories.ts` changes one line). The installed server's stop behaviour is as
`a5-probe-stopping.log.txt` records. V4 runs the gate chain in parallel; gate readings are its.

## Claims

1. **R1–R12 landed as the brief specified, and nowhere else.** For each repair, the replacement
   text in the tree equals the brief's text (allowing only the formatter's line wrapping inside a
   comment), at the site the brief names, and the diff contains no hunk the twelve repairs do not
   account for.
2. **The twins are equal and clause 36 is untouched.** The fence `Mounting the relay on your server`
   (`guides/agent.md:1103-1127`) equals the `@example` block in `src/core/factories.ts:80-105`
   with the ` * ` prefix stripped; the diff's only `guides/agent.md` hunks touch lines 1097, 1099,
   and 1126; clause 36 (`guides/agent.md:1018`) is byte-identical to `0af0785`.
3. **The substring guard binds the corrected line.** `tests/guides.test.ts` asserts the guide
   contains `process.on('SIGTERM', () => server.stop()) // signal cancellation, drain, then close the listener`
   and still asserts every other string the guard asserted at `0af0785`.
4. **The changed prose and comments obey the writing law.** Sweep `guides/agent.md:1097`, `:1099`,
   `:1126` and every comment line the diff adds to `tests/guides.test.ts` against the substitution
   table (case-insensitive, across inflections), the count rule, the code-token-plus-noun rule
   (a token in backticks followed by a noun; no bare token as a sentence subject), the present
   tense, `above`/`below`, and the serial comma. Name the pattern and the lines you swept. Rule
   each hit by the sense its row bans.
5. **Every comment the fix touched states what the evidence shows.** The R2 comment's mechanism
   matches `a5-probe-stop-3.log.txt` (`pending=0 upgraded=0` at the drain event, ~3 s in
   `server.close()`); the R3 comment's three statements are each true of the fence and the
   transcription (the `host` option added; the `serve` export not executed; `await server.stop()`
   in the case's `finally` in place of the `SIGTERM` listener) — read whether "after the case"
   states where the stop sits; the R8 comment's "the dispatcher itself answers" is true of the
   router's `404`/`405` defaults; the fence comment's three verbs match `a5-probe-stopping.log.txt`.
6. **Scope honesty.** The diff touches only `tests/guides.test.ts`, `guides/agent.md`, and
   `src/core/factories.ts`; `tests/setup.ts`, `tests/setup.test.ts`, `package.json`, and the
   vendored files carry no hunk; no `any`, `as` assertion, non-null assertion, access modifier,
   or nested function declaration is added; the added `let drained: number | undefined` and the
   `@orkestrel/abort` dynamic import follow the file's existing forms.

## Output

The verdict shape named under Role and lane. A referral, never a guess, for any judgment call.
