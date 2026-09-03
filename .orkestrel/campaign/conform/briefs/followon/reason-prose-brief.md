# Unit reason-prose — the prose sites outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/reason`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of reason (`803e4f6`), from the landed tip.

## Objective

Close the prose findings the conformance audit recorded outside its rows: the `defaults to …` form in `src/core/factories.ts` takes the form reason-subj-16 applied in `types.ts` and `constants.ts`; `via` leaves the test titles and comments; `simplest` leaves `tests/setup.ts`; the `tests/setup.ts` header stops naming an absent `setupBrowser.ts`; and the "seven" manager tally at `guides/reason.md:86-89` and `src/core/factories.ts:279` names the managers or drops the number, with the gate chain and the guide parity test green.

## Context

**Law.** `AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Substitutions and § Claims and time; the rule reason-subj-16 cites (read that row in `briefs/conform-reason-brief.md` § Rows and its landed form in `reports/conform-reason-report.md`).

**Evidence.** `reports/conform-reason-report.md` § Findings outside the enumerated scope and § Sweeps (the `via` sites: `tests/src/core/validators.test.ts:365`, `:438`, `SubjectBuilder.test.ts:15`, `InferentialReasoner.test.ts:1215`, `:1658`, `:1719`, `QuantitativeReasoner.test.ts:1420`, `LogicalReasoner.test.ts:31`, `:132`, `:912`, `Reason.test.ts:744`, `helpers.test.ts:337`, `:419`, `:1159`, `:1633`; `simplest` at `tests/setup.ts:159`; `defaults to` across `src/core/factories.ts`); the round-1 objective F-5 (`tests/setup.ts:3`); the round-2 checker R-3 (`guides/reason.md:86-89`, `src/core/factories.ts:279`). Line numbers are from the landed tip and can have moved.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/reason run <script>`, `npm --prefix /home/user/fleet/reason test`, `cd /home/user/fleet/reason && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure on an owned file), `git -C /home/user/fleet/reason status --short`, `git -C /home/user/fleet/reason diff`, `node /home/user/scaffold/tmp/work/evidence.mjs reason`, `cd /home/user/fleet/reason && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `src/core/factories.ts` (doc blocks only), `guides/reason.md` (the tally sentence and any guide twin of a changed doc sentence), `tests/**` except the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`.

**Off-limits.** Everything else, `src/core/types.ts` included.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **`defaults to`.** Read reason-subj-16's row and the form the unit landed in `src/core/types.ts` and `src/core/constants.ts`; apply the same form to every `defaults to …` site in `src/core/factories.ts` doc blocks. Where a guide sentence twins a changed doc sentence, change the twin.
2. **`via`.** Replace `via` with `through` or `by using` at the test sites by sense.
3. **`simplest`.** Rewrite `tests/setup.ts:159` without the superlative.
4. **The header.** Remove the clause at `tests/setup.ts:3` that points readers at `setupBrowser.ts`, keeping the rest of the header.
5. **The tally.** At `guides/reason.md:86-89` and `src/core/factories.ts:279`, name the managers or write the sentence without the number.
6. **Sweep.** Record the sweeps `\bvia\b`, `\bsimpl(y|e|er|est|ify|ified)\b`, `defaults to`, `setupBrowser`, and `\b(seven|six|eight)\b` (case-insensitive) over `src/core/factories.ts`, `guides/reason.md`, and the owned `tests/**`, ruling every remaining hit by sense.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs reason`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/reason-prose-report.md`: per row the sites changed with the line now, the sweeps with their rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when the landed form of reason-subj-16 cannot be read from the report and the tree, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweeps read empty of banned senses in the Owned files.
2. `test:guides` exits 0; every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
