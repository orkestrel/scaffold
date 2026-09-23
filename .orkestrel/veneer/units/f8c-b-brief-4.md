# Unit F8c-B MOVE, round 4 — the remaining bare tokens the round-3 checker swept

Successor to `tmp/units/f8c-b-brief-3.md`. What changed and why: the round-3 checker confirmed the
three passages and swept the whole `### Tailwind` section of `guides/veneer.md` and the whole
`tests/setupService.ts` file for the same defect, finding eight more sentences where a code token
stands as a sentence subject with no noun after it. This round closes exactly those eight, with the
replacements fixed here. The earlier briefs stay in place unedited and bind where this one is silent.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-f8b` (branch
`unit/f8b`, the round-1 to round-3 writes uncommitted in the tree). Perform the assignment directly
and spawn nothing. Use absolute paths under `/home/user/veneer-f8b` for every command and file, and
run every npm and npx command from `/home/user/veneer-f8b`. Do not commit, push, install, or run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The eight sentences under § Obligations read as written there, nothing else changes, and
`npx oxfmt --check guides/veneer.md tests/setupService.ts`, `npm run check`, and `npm run
test:guides` exit 0.

## Context

**Evidence.** The sites, read verbatim by the Orchestrator on 2026-09-23 (line numbers
approximate): `tests/setupService.ts:48-49` ("`root` is the workspace root the cascade is read under
and the candidate list written under. Default: `WORKSPACE_ROOT`. `compiler` loads the PostCSS plugin
the compiler gate compiles with."); `:186` ("and `resolveBrowser` verifies a discovered one before
naming it"); `:313-314` ("`open` registers the scratch directory and then the browser as it acquires
each one, and `destroy` closes the browser and then removes the scratch."); `guides/veneer.md:349`
("`tests/fixtures/tailwind/consumer.css` is that fence with one line changed"); `:360`
("`tests/fixtures/tailwind/unexcluded.css` is the negative control"); `:364` ("It is the line
`src/styles/_tokens.scss` declares,"); `:374` ("`tests/setup.css` is where the workspace writes that
line.").

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/writing.md` § Code tokens.

**Installed primitives.** none touched.

**Host.** bash; `/home/user/veneer-f8b`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
`prettier` must never run, `oxfmt` is the formatter.

**Measurements.** The round-3 gates exited 0 per `tmp/units/f8c-b-report-3.md`.

**Control identifiers.** none.

**Standing conditions.** The guide's tables are `oxfmt`-padded; every edit here is inside prose, so
no table re-pads. Rewrap a paragraph only where a changed line exceeds 100 columns, and only that
paragraph.

## Unknowns

none.

## Obligations

Apply these replacements, each once:

1. `tests/setupService.ts` around line 48: "`root` is the workspace root" → "The `root` option is the
   workspace root".
2. Around line 49: "`compiler` loads the PostCSS plugin" → "The `compiler` option loads the PostCSS
   plugin".
3. Around line 186: "and `resolveBrowser` verifies a discovered one" → "and the `resolveBrowser`
   function verifies a discovered one".
4. Around lines 313 to 314: "`open` registers the scratch directory" → "the `open` method registers
   the scratch directory"; "and `destroy` closes the browser" → "and the `destroy` method closes the
   browser".
5. `guides/veneer.md` around line 349: "`tests/fixtures/tailwind/consumer.css` is that fence" →
   "The `tests/fixtures/tailwind/consumer.css` fixture is that fence".
6. Around line 360: "`tests/fixtures/tailwind/unexcluded.css` is the negative control" → "The
   `tests/fixtures/tailwind/unexcluded.css` fixture is the negative control".
7. Around line 364: "It is the line `src/styles/_tokens.scss` declares," → "It is the line the
   `src/styles/_tokens.scss` file declares,".
8. Around line 374: "`tests/setup.css` is where the workspace writes that line." → "The
   `tests/setup.css` file is where the workspace writes that line."

## Scope

**Owned.** `tests/setupService.ts` (the four sentences), `guides/veneer.md` (the four sentences and
the paragraphs they sit in, for rewrapping only), `tmp/units/f8c-b-report-4.md`.

**Shared (report-only).** none.

**Off-limits.** every other file and every other passage.

**What asserts the state this change ends.** `npm run test:guides` reads the guide; nothing asserts
the TSDoc text.

**Tools and limits.** Read, Grep, Edit, Bash; scoped `npx oxfmt --check` only; no `npm install`; no
git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/f8c-b-report-4.md` with the exact diff (`git diff -- guides/veneer.md
tests/setupService.ts`, this round's hunks) and the gate exits. Return as your final message the
report path, the `git status --short` output, and the gate exits. No process diary.

## Deviation contract

Stop and report on any replacement whose source text is not found once. Decide, record, and carry
on from the rewrap of a paragraph a changed line lengthens past 100 columns.

## Acceptance criteria

1. `grep -n` for each of the eight source phrases returns nothing and for each replacement returns
   one line (paste the results in the report).
2. `npx oxfmt --check guides/veneer.md tests/setupService.ts` exits 0.
3. `npm run check` exits 0.
4. `npm run test:guides` exits 0.

**Observations, not criteria.** none.

## Review evidence

A code change: the actual diff and the actual `git status --short`.
