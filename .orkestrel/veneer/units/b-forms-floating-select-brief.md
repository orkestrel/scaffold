# Unit B-FORMS-FLOATING-SELECT — the floating select's resolved line height after SELECT lands

The FLOATING landing's ROADMAP row carries to B-FORMS-SELECT the reading the select family unblocks:
after `.form-select` ships `appearance: none`, the floating select's `line-height: 1.25` resolves,
so the `toBe('normal')` assertion, its comment, and the guide's two sentences on the bare select go
false. The SELECT worktree was cut before FLOATING landed, so this follow-up unit closes them on the
session branch after the SELECT landing.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfx`, a git
worktree the Orchestrator cuts from the session branch after the SELECT landing (the commit is
named in the dispatch message; `node_modules` installed by the Orchestrator). Perform the assignment
directly and spawn nothing. Use absolute paths under `/home/user/veneer-bfx` for every command and
file, and run every npm and npx command from `/home/user/veneer-bfx`. Do not commit, push, install,
or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or
`git checkout-index`; undo a plant by the exact reverse edit.

## Objective

The floating select's line height is read resolved, the guide's two sentences state what ships, the
named plant reddens the assertion, and the gates in § Acceptance criteria are green.

## Context

**Evidence.** Read on 2026-09-23 in the FLOATING tree (line numbers approximate; locate each site
by its text): `tests/src/styles/components/form-floating.test.ts`, the geometry case "makes the
container the positioning box…", around lines 59 to 64: a comment opening "Chromium resets the line
height of a select that keeps its native appearance to `normal`" and the assertion
`expect(readStyle(select, 'line-height')).toBe('normal')`; `guides/veneer.md` § Form floating
classes around lines 850 to 855: "Chromium resets the line height of a select that keeps its native
appearance to `normal`, so the select's floated line height is read as a declaration until the
select family ships the rule that removes that appearance. The control's own border, radius, and
paint belong to the `.form-control` and `.form-select` rules, which Veneer does not ship yet, so
the frames the capture journey writes show the floated geometry over the bare controls; the reading
of the floated label against a styled control waits on those families." The release declares
`.form-floating > .form-select { line-height: 1.25 }` (`node_modules/bootstrap/dist/css/bootstrap.css`
around line 2603); `src/styles/components/_form-select.scss` declares `appearance: none` on
`.form-select`.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,writing,documentation}.md`. Skill: none.
Guide: `guides/veneer.md` § Form floating classes (owned, the two sentences only).

**Installed primitives.** `@orkestrel/test`: `readStyle`, `readPixels`, `requireValue` are the readers
the case uses; add no helper.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. `prettier` must never run; `oxfmt` is the formatter.
The styles project loads `dist/src/styles/index.css`, so run `npm run build:src` before every
browser reading and after every plant and revert.

**Measurements.** Yours to take first: with `.form-select` shipped, read the floating select's
`line-height` in the geometry case (`readPixels(select, 'line-height')` against the select's
`font-size` × 1.25) and record the value the assertion pins.

**Control identifiers.** none.

**Standing conditions.** none.

## Unknowns

- The resolved value: measure it before writing the assertion (the release's `1.25` at the select's
  font size; report the pixels read).

## Obligations

1. **The assertion.** Replace the comment and the `toBe('normal')` line with a comment stating that
   the `.form-select` rule removes the native appearance, so the floating select's `line-height:
   1.25` resolves against its font size, and an assertion `expect(readPixels(select,
   'line-height')).toBeCloseTo(readPixels(select, 'font-size') * 1.25, 1)` (or the exact reading the
   measurement gives, if the fractional form differs). Plant: change `1.25` to `1.5` in
   `src/styles/components/_form-floating.scss`'s `.form-floating > .form-select` rule; build; the
   case must redden; reverse exactly; build; green.
2. **The guide's two sentences.** Replace "Chromium resets the line height of a select that keeps
   its native appearance to `normal`, so the select's floated line height is read as a declaration
   until the select family ships the rule that removes that appearance." with "The `.form-select`
   rule removes the select's native appearance, so the floating select's `line-height: 1.25`
   declaration resolves against its type size and the proof reads it resolved." Replace "The
   control's own border, radius, and paint belong to the `.form-control` and `.form-select` rules,
   which Veneer does not ship yet, so the frames the capture journey writes show the floated
   geometry over the bare controls; the reading of the floated label against a styled control waits
   on those families." with "The select's own border, radius, and paint belong to the `.form-select`
   rule, which ships, so the `form-floating-select` frame shows the floated label over the styled
   select; the text control's belong to the `.form-control` rule, which the control family ships,
   so the text-control frames show the floated geometry over the bare control until it lands."
   Rewrap the paragraph at or under 100 columns.
3. Run `npx oxfmt --config .oxfmtrc.json --write` over the owned files.

## Scope

**Owned.** `tests/src/styles/components/form-floating.test.ts` (the geometry case's comment and
assertion only), `guides/veneer.md` (the two sentences only),
`src/styles/components/_form-floating.scss` (the plant and its exact revert only).

**Shared (report-only).** `ROADMAP.md` (the FLOATING row's SELECT carrier closes at this landing;
return the row's closing text).

**Off-limits.** Every other file, and the vendored files.

**What asserts the state this change ends.** The scoped browser run and `npm run test:guides`;
derived by running them.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Validate with `npx oxfmt --config .oxfmtrc.json --check` over the owned files, `npm run check`,
`npm run build:src`, `npx vitest run --config configs/src/vite.styles.config.ts --no-cache
--reporter=dot tests/src/styles/components/form-floating.test.ts`, and `npm run test:guides`, all
from `/home/user/veneer-bfx`.

## Output

Write `/home/user/veneer-bfx/tmp/units/b-forms-floating-select-report.md` and return the same text:
the measured value; each obligation with its site; the plant record (the red message, the green
reading, the partial's SHA-256 before and after); the ROADMAP closing text; the gate exits with
counts; `git status --porcelain`; and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on the line height reading `normal` after the SELECT landing, on the plant failing to
redden, and on any file outside § Scope a gate names. Decide, record, and carry on from the
comment's wording and the paragraph's wrapping.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files and `npm run check` exit 0.
2. `npm run build:src` and the scoped browser command exit 0 with every case passing, and the plant
   record shows the assertion reddening.
3. `npm run test:guides` exits 0.
4. `git status --porcelain` lists the two owned files and nothing else.

**Observations, not criteria.** `npm run test:src:styles`; any timeout under load.

## Review evidence

The report and the diff of the owned files against the worktree's base commit.
