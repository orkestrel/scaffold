# Unit R4 — close the remaining banned-term sites

## Role and engine

`builder` — Sonnet, native Claude subagent, the **roughnotes** checkout at
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer. The working tree carries three
earlier units uncommitted and the gates are green on it.

## Objective

Replace four prose sites in `tests/conformance.test.ts` that violate the writing rules. Unit R3
found them, supplied every replacement, and correctly declined to change them without instruction.
This is that instruction.

## The rule

`.claude/rules/writing.md` § Code tokens, references, and links bans `above` and `below` in
developer prose; use `earlier` or `later`. `AGENTS.md` § Writing bans a `both` tally whose sentence
does not name its members. No instrument catches either — the policy table carries no row for
`above` — so these passed every gate.

## The work

Four replacements in `C:\Users\mikes\WebstormProjects\roughnotes\tests\conformance.test.ts`. Each
is a comment. Change nothing else on any of these lines, and change no assertion.

1. The showcase control comment. Replace `so the comparisons above fail against it` with
   `so the comparisons earlier fail against it`.
2. The Vue-count control comment. Replace
   `so the same override yields the Vue plugin twice and the count above fails` with
   `so the same override yields the Vue plugin twice and the count earlier fails`.
3. The invocation-refusal control comment. Replace `so the refusal above fails against it` with
   `so the refusal earlier fails against it`.
4. The `both` tally. Replace the sentence `Both readings must fail against it` with
   `The emptied-output reading and the added-dependency reading fail against it`.

Find each by its quoted text rather than by line number; earlier units moved the lines.

## Scope

**Owned files:** `tests/conformance.test.ts` — these four comments only.

**Off-limits — do not edit, for any reason:** every other file in this checkout, including
`vite.config.ts`, `tests/setup.ts`, `tests/setup.test.ts`, and `package.json`; the vendored
`tests/config.test.ts`, `tests/policy.test.ts`, and `tests/setupPolicy.ts`; everything under `app/`
and `tests/app/`; `.orkestrel/`; and the sibling `scaffold` and `test` checkouts, where other units
are writing.

Do not commit, push, install, or bump anything. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. All four replacements are placed, found by text rather than by line number.
2. A case-insensitive sweep of `tests/conformance.test.ts` for `\babove\b` and `\bbelow\b` returns
   nothing. Report the command.
3. A sweep for `Both readings` returns nothing.
4. `npx oxfmt --config .oxfmtrc.json --check tests/conformance.test.ts` reports correct format.
5. `npm run test:conformance` passes with `12 passed (12)`, unchanged.
6. `npm run test:policy` passes.
7. `git status --short` names only the files earlier units left modified, with
   `tests/conformance.test.ts` among them. Report it.

## Deviation contract

A conflict stops you: report expected, found, exact evidence, done or not done. If a quoted text is
absent or appears more than once, stop and report with what you found. Do not improvise a
replacement and do not touch an assertion.

## Output

Your final message is your report:

1. **Done / not done** per replacement, with the before and after line.
2. **The sweeps** — each command and its result.
3. **Gates** — the conformance and policy counts, and the status output.

No process diary.
