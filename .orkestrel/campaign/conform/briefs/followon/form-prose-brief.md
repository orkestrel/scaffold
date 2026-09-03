# Unit form-prose — the prose rows outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/form`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of form, from the landed tip.

## Objective

Close the prose findings the conformance audit recorded outside its rows: every count over a growable set in the guide and the setup proof is named or written without the number, every `above` and `below` document reference reads as the writing rules fix it, the `@throws` tag at `src/core/types.ts:109` opens in the `Thrown when …` form, and the `should` string literal at `tests/src/core/helpers.test.ts:242` takes the substitution table's replacement, with the gate chain green and the guide parity test green.

## Context

**Law.** `AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links (`preceding` and `following`, never `above` or `below`) and § Substitutions; `.claude/rules/typescript.md` (`@throws Thrown when …`); `.claude/rules/documentation.md` § Parity (a transcribed fence's presence guard must keep matching the guide).

**Evidence.** Round-1 objective F2 and F3 (`units/l2b/form-objective-r1.md`), the Luna checker's F-SET-REFERENCES and F-DIRECTIONAL-REFERENCES (`units/l2b/form-r1-checker-luna.md`), and the report's § Successor rows (`reports/conform-form-report.md`).

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/form run <script>`, `npm --prefix /home/user/fleet/form test`, `git -C /home/user/fleet/form status --short`, `git -C /home/user/fleet/form diff`, `node /home/user/scaffold/tmp/work/evidence.mjs form`, `cd /home/user/fleet/form && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `guides/form.md`, `src/core/types.ts` (line 109's doc block only), `tests/setup.test.ts` (line 104's comment only), `tests/src/core/helpers.test.ts` (line 242's string only), `tests/guides.test.ts` (only where a presence guard quotes a sentence this unit changes).

**Off-limits.** Everything else.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **Counts.** `guides/form.md:971` "none of the three switches" becomes "none of `hidden`, `locked`, and `disabled`"; `guides/form.md:1695` "those two" becomes "`values` and `parseValues`"; `tests/setup.test.ts:104` "The two routes" becomes "The measurement and the budget builders". Read each line first; the line numbers are from the landed tip and can have moved.
2. **Directional references.** `guides/form.md:41, 91, 449, 824, 1275, 1513, 1710` use `above` or `below` as document references; the replacements in order are "in this guide", "in the `## Surface` rows", "following budgets", "named budget", "preceding section", "preceding `## Surface` rows", and "preceding flagship fences". Read each sentence and fit the replacement to it; where a presence guard in `tests/guides.test.ts` quotes the sentence, change the guard's string to the new text.
3. **The `@throws` form.** `src/core/types.ts:109` opens `@throws The validator's own thrown value escapes the mutation call unchanged.`; rewrite the opening to `@throws Thrown when a {@link FieldValidator} …` and keep the remaining sentences.
4. **The `should` literal.** `tests/src/core/helpers.test.ts:242` carries `should` inside a string; replace it per the substitution table's row (`must`, `can`, `might`, or the imperative) by the sentence's sense, and change any assertion that reads that string.
5. **Sweep.** Record a case-insensitive sweep for `\b(above|below|should)\b` and for the number words over `guides/form.md`, `tests/setup.test.ts`, `src/**`, and `tests/**` (never `node_modules`), ruling every remaining hit by its sense.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs form`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/form-prose-report.md`: per row `applied` with the lines now at each site, the sweep with its rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when a quoted sentence is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweeps under row 5 read empty of banned senses.
2. `test:guides` exits 0 with every presence guard matching.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.

## Review evidence

`/home/user/work/evidence/conform-form.diff` and `.status` after the unit; the report.
