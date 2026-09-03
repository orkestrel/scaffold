# Unit console-prose — the prose and example sites outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/console`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of console (`cac35cd`), from the landed tip.

## Objective

Close the findings the conformance audit recorded outside its rows: the README's counts and filler words, the `e.g.` test titles, the `@src/core` specifiers in published TSDoc examples, the count and `today` claim in `src/core/errors.ts`, the two nested functions the report names as pre-existing, the inlined `normalizeVisible` expressions in two test files, and the substitution-table words surviving across `tests/**`, with the gate chain and the guide parity test green.

## Context

**Law.** `AGENTS.md` § Writing (no count over a growable set; no `just`) and § Design laws (no nested functions; export and test reusable logic); `/home/user/scaffold/.claude/rules/writing.md` § Substitutions and § Claims and time; `.claude/rules/documentation.md` § Guide examples (published specifiers, never `@src/*`, in a public example).

**Evidence.** `ledgers/followons.md`'s console entry; the report's own successor items in `reports/conform-console-report.md` (find the section that names the two pre-existing nested functions and the `@src/core` examples); round-1 objective R3 and R4 (`units/l2a/console-objective-r1.md`).

**Sites the record names.** `README.md:4` ("composing five concerns"), `:67` ("not just `console.*`"), `:83` ("three environment-scoped entry points"); `e.g.` in the titles at `tests/src/browser/helpers.test.ts:119` and `:438` (and `:143` where present); `@src/core` in TSDoc examples at `src/core/factories.ts:35`, `:70`, `:118`, `src/core/types.ts:160`, `src/core/Styler.ts:102`, and `src/server/factories.ts:40` (`:162` of `factories.ts` already reads `@orkestrel/console`); `src/core/errors.ts:13` ("the one throw site in this codebase today"); the inlined `normalizeVisible` expression at `tests/src/core/Spinner.test.ts:315` and `tests/src/core/Progress.test.ts:204`; the substitution set surviving across `tests/**/*.ts` at the sites the report lists. Line numbers are from the landed tip and can have moved.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/console run <script>`, `npm --prefix /home/user/fleet/console test`, `cd /home/user/fleet/console && npx vitest run …` with output captured under `/home/user/work/evidence/console-proofs/`, `cd /home/user/fleet/console && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure on an owned file), `git -C /home/user/fleet/console status --short`, `git -C /home/user/fleet/console diff`, `node /home/user/scaffold/tmp/work/evidence.mjs console`, `cd /home/user/fleet/console && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`. The offline audit's `configs/browsers.ts` row, where it reappears, is the Orchestrator's at landing: report it and do not stop on it.

## Scope

**Owned.** `README.md`, `src/**` (the TSDoc examples, the `errors.ts` sentence, and the two nested functions' extraction only), `tests/**` except the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, `guides/console.md` (only where a guide twin of a changed TSDoc sentence exists).

**Off-limits.** Everything else.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command. Never use a mock, spy, fake, or fake clock.

## Rows

1. **README.** Name the members instead of counting them at `README.md:4` and `:83`, and delete `just` at `:67`.
2. **Test titles.** Replace `e.g.` with `for example` (or recast) at the `tests/src/browser/helpers.test.ts` sites.
3. **Published examples.** Replace `@src/core` and `@src/server` with `@orkestrel/console` and `@orkestrel/console/server` in the named TSDoc examples; where `tests/guides.test.ts` or the guide transcribes a changed example, keep them aligned.
4. **`errors.ts`.** Rewrite the sentence at `src/core/errors.ts:13` without the count and without `today`.
5. **Nested functions.** Extract the two pre-existing nested functions the report names into module-scope declarations in the centralized file their kind prescribes, exported and tested (a small test per extracted helper where none exists), keeping behaviour identical; stop with a deviation report where the extraction would change a closure's captured state.
6. **`normalizeVisible`.** Replace the inlined expressions at the two test sites with the exported `normalizeVisible` from `tests/setup.ts`.
7. **Sweep.** Run the substitution-table sweep (`\b(should|simply|easy|just|currently|now|new|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|dummy)\b`, case-insensitive) over `README.md`, `src/**`, and the owned `tests/**`; replace each hit in a banned sense and record every permitted-sense hit.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs console`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/console-prose-report.md`: per row the sites changed with the line now, the extracted helpers with their tests, the sweep with its rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when an extraction would change behaviour, when a replacement would change a wire value or an identifier, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweep reads empty of banned senses in the Owned files; no `@src/` specifier survives in a published TSDoc example.
2. No nested function declaration survives at the two named sites; each extracted helper is exported and tested.
3. `test:guides` exits 0; every gate exits 0; the audit prints its summary clean beside any `configs/browsers.ts` row; `git status --short` lists only Owned paths.
