# Unit B-FORMS-MIXIN — the shared form-control declarations through two mixins (D40)

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfm`, a git
worktree the Orchestrator cuts from the session branch at the SELECT landing (the commit is named
in the dispatch message; `node_modules` installed by the Orchestrator). Perform the assignment
directly and spawn nothing. Use absolute paths under `/home/user/veneer-bfm` for every command and
file, and run every npm and npx command from `/home/user/veneer-bfm`. Do not commit, push, install,
or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or
`git checkout-index`; undo a control edit by the exact reverse edit.

## Objective

`_mixins.scss` carries the two mixins D40 fixes, `_form-select.scss` and `_input-group.scss` emit
their shared runs through them, the cascade compiles byte-identical to the block form, and the
duplication-floor case is green.

## Context

**Evidence.** Read on 2026-09-23 at the SELECT landing (line numbers approximate; locate each site
by its text): `tests/setupStyles.test.ts` around line 516, the case "repeats no partial's written
declaration block in another partial beyond the coincidence floor", red on `.form-select`
(`src/styles/components/_form-select.scss` around line 30) against `.input-group-text`
(`src/styles/components/_input-group.scss` around line 50), the shared declarations being
`font-size: var(--vn-size-3)`, `font-weight: var(--vn-weight-body)`, `line-height:
var(--vn-line-body)`, `color: var(--bs-body-color)`, `border: var(--bs-border-width) solid
var(--bs-border-color)`, and `border-radius: var(--bs-border-radius)`; `src/styles/_mixins.scss`
(the `transition`, `border-reset`, `focus-ring`, `forced-colors`, and `theme-tokens` mixins are the
form to follow, each with a TSDoc-style comment). In `.form-select` the four type declarations are
contiguous and the two border declarations are contiguous; the same holds in `.input-group-text`.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,writing}.md`;
D32 and D40 in `/home/user/veneer-bfm/tmp/units/decisions-round-2.md`. Skill: none. Guide:
`guides/veneer.md` (report-only).

**Installed primitives.** none touched.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. `prettier` must never run; `oxfmt` is the formatter.

**Measurements.** Take the compile baseline before any edit: `npx sass --no-source-map
src/styles/index.scss > /home/user/veneer-bfm/tmp/units/bfm-baseline.css`.

**Control identifiers.** none.

**Standing conditions.** `npm run test:setup` is red at dispatch on the duplication-floor case alone.

## Unknowns

- Whether `guides/veneer.md` § Form select classes or § Input group classes describes the type or
  border declarations as written in the partial: grep `font-weight\|line-height\|border-radius`
  in those sections, rule each hit, and return a patch for a sentence the mixins make false.

## Obligations

1. **The mixins.** In `src/styles/_mixins.scss`, after the `border-reset` mixin, add, each with a
   comment in the file's form stating what it emits and why (the release derives the run from its
   `$input-*` variables, so the form controls share it): `@mixin control-type { font-size:
   var(--vn-size-3); font-weight: var(--vn-weight-body); line-height: var(--vn-line-body); color:
   var(--bs-body-color); }` and `@mixin control-border { border: var(--bs-border-width) solid
   var(--bs-border-color); border-radius: var(--bs-border-radius); }`, exactly those declarations
   in that order.
2. **The partials.** In `.form-select` and `.input-group-text`, replace the four type declarations
   with `@include control-type;` at the same position and the two border declarations with
   `@include control-border;` at the same position; touch no other declaration.
3. **Byte identity.** `npx sass --no-source-map src/styles/index.scss >
   /home/user/veneer-bfm/tmp/units/bfm-after.css` and `cmp` against the baseline exits 0. Control:
   swap the order of the two declarations inside `control-border`, compile, record `cmp` exiting 1,
   restore by the exact reverse edit, and record `cmp` exiting 0 again.
4. Run `npx oxfmt --config .oxfmtrc.json --write` over the owned files.

## Scope

**Owned.** `src/styles/_mixins.scss`, `src/styles/components/_form-select.scss`,
`src/styles/components/_input-group.scss`.

**Shared (report-only).** `guides/veneer.md`; `ROADMAP.md`.

**Off-limits.** `src/styles/components/_form-control.scss` (absent here; the CONTROL unit routes it),
`tests/**`, the vendored files, and every other file.

**What asserts the state this change ends.** The duplication-floor case (`npm run test:setup`), the
ledger cases (`npm run test:conformance`), and the byte-identity compile; derived by running them.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Validate with `npx oxfmt --config .oxfmtrc.json --check` over the owned files, `npm run build:src`,
`npm run test:setup`, `npm run test:conformance`, and `npx vitest run --config
configs/src/vite.styles.config.ts --no-cache --reporter=dot
tests/src/styles/components/form-select.test.ts tests/src/styles/components/input-group.test.ts`,
all from `/home/user/veneer-bfm`.

## Output

Write `/home/user/veneer-bfm/tmp/units/b-forms-mixin-report.md` and return the same text: each
obligation with its site; the byte-identity record; the Unknown's hits and rulings with any guide
patch; the gate exits with counts; `git status --porcelain`; and deviations per § Deviation protocol
in `/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on `cmp` exiting non-zero after the obligations, on the floor case staying red, and on
any file outside § Scope a gate names. Decide, record, and carry on from the comments' wording.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files exits 0.
2. The byte-identity `cmp` exits 0 and the control exits 1.
3. `npm run build:src`, `npm run test:setup`, `npm run test:conformance`, and the scoped browser run
   exit 0.
4. `git status --porcelain` lists the three owned files and nothing else.

**Observations, not criteria.** Any timeout under load.

## Review evidence

The report and the diff of the owned files against the worktree's base commit.
