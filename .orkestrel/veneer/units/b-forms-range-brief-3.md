# Unit B-FORMS-RANGE-3 — reverse the `flush-box` extraction (D15)

Successor to `tmp/units/b-forms-range-brief-2.md`. What changed: ruling D15
(`tmp/units/b-sweep-design-verdict.md`) refuses `flush-box` as a coincidence wrapper; the sweep is
recalibrated by B-SWEEP instead. This unit restores the inline declarations.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfr` (detached at
`3a9202a`, carrying the RANGE and RANGE-2 writes, which you keep). Perform the assignment directly
and spawn nothing. Do not commit, push, install, or run any git command that discards a
working-tree change.

## Objective

`src/styles/_mixins.scss` no longer declares `flush-box`; `legend` in
`src/styles/elements/_fieldset.scss` and `.form-range` in `src/styles/components/_form-range.scss`
write `width: 100%;` and `padding: 0;` inline again, at the positions the RANGE-2 report's D2 diff
shows them removed from (the exact reverse of that patch); the compiled cascade is unchanged.

## Context

**Evidence.** `tmp/units/b-forms-range-report.md` § D2 shows the forward patch (the mixin before
`@mixin border-reset`, the two callers). `tmp/units/b-forms-range-report-2.md` records it applied.
Reverse it exactly: delete the mixin and its comment; in `legend`, replace `@include flush-box;`
with `width: 100%;` then `padding: 0;`; in `.form-range`, replace `@include flush-box;` with
`width: 100%;` and restore `padding: 0;` after `height: var(--vn-space-12);` as the original rule
wrote it (`width`, `height`, `padding`, `appearance`, `background-color`). Keep each partial's
`@use '../mixins' as *;` line where other mixins are still read from it (`_form-range.scss` reads
`transition`; `_fieldset.scss` reads `box-reset` — confirm by grep before deciding).

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/styles.md`.

**Host.** npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
`prettier` must never run.

**Standing conditions.** After this reversal `npm run test:setup` reddens on the shared-block sweep
(`.form-range` and `legend` share two declarations) until B-SWEEP's recalibration lands at
integration; report that reading as expected, not as a defect.

## Unknowns

none.

## Scope

- Owned: `src/styles/_mixins.scss`, `src/styles/elements/_fieldset.scss`,
  `src/styles/components/_form-range.scss`.
- Off-limits: every other file.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-range-report-3.md` and return the same text: the three diffs, the compiled
`legend` and `.form-range` declarations from `dist/src/styles/index.css` after `npm run build:src`,
the gate exits, `git status --porcelain`, and any deviation.

## Deviation contract

Stop and report if the reverse patch does not apply as written.

## Acceptance criteria

1. `npx oxfmt` over the owned files, then `npm run format:check`, `npm run lint:check` exit 0.
2. `npm run build:src` exits 0 and the compiled `.form-range` and `legend` rules carry
   `width: 100%` and `padding: 0`; `grep -c flush-box src/styles/_mixins.scss` prints 0.
3. `npm run test:src:styles` exits 0.
4. `git status --porcelain` lists the RANGE and RANGE-2 files and nothing new.

**Observations, not criteria.** `npm run test:setup` (expected red on the sweep alone).

## Review evidence

The report and the three diffs.
