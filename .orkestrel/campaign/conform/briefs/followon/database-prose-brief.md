# Unit database-prose — the substitution-table sites outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/database`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of database, from the landed tip.

## Objective

Close the prose findings the conformance audit recorded outside its rows: every `via` in `tests/**` and every `now` in `guides/database.md` takes the substitution table's replacement or is deleted by sense, with the guide parity test and the gate chain green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (`via` → `through` or `by using`; `currently`, `now` → delete or give the date) and its sweep rule (rule every hit by the sense its row bans; record a hit in a permitted sense as permitted).

**Evidence.** The unit report's § Observations (`reports/conform-database-report.md`: fourteen `via` and `e.g.` sites in `tests/**`; `now` in `guides/database.md`), the round-1 checker's referral (`now` at `guides/database.md:475,488,663-665,778,826,1942`; `via` in `tests/**/*.ts`), and the round-1 objective lane's R2 (`units/l2a/database-objective-r1.md`).

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/database run <script>`, `npm --prefix /home/user/fleet/database test`, `git -C /home/user/fleet/database status --short`, `git -C /home/user/fleet/database diff`, `node /home/user/scaffold/tmp/work/evidence.mjs database`, `cd /home/user/fleet/database && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `guides/database.md`, `tests/**` except the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`.

**Off-limits.** Everything else, `src/**` included.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **`via` and `e.g.` in tests.** Sweep `\b(via|e\.g\.|i\.e\.)` case-insensitive over the owned `tests/**`; replace each hit in the banned sense (`via` → `through` or `by using`; `e.g.` → `for example`; `i.e.` → `that is`) and record a hit in a permitted sense (a quoted wire value, an identifier) as permitted.
2. **`now` in the guide.** Sweep `\b(now|currently)\b` case-insensitive over `guides/database.md`; delete each temporal hit or give the version or the date, and record a hit in a permitted sense (a value named `now`, a code token) as permitted. Where a presence guard in `tests/guides.test.ts` quotes a changed sentence, change the guard's string to the new text.
3. **Sweep.** Record both sweeps with their patterns, paths, and rulings.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs database`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/database-prose-report.md`: per row `applied` with the sites changed, the sweeps with their rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when a replacement would change a wire value or an identifier, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. Both sweeps read empty of banned senses.
2. `test:guides` exits 0 with every presence guard matching.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.

## Review evidence

`/home/user/work/evidence/conform-database.diff` and `.status` after the unit; the report.
