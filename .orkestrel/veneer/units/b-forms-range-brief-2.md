# Unit B-FORMS-RANGE-2 — the three exact patches the RANGE report carries

Successor to `tmp/units/b-forms-range-brief.md` (the unit that shipped `form-range`; its report is
`tmp/units/b-forms-range-report.md`). What changed: the unit returned green on its owned proofs and
three deviations, each an exact patch it measured but could not write because the file was
off-limits. The Orchestrator grants those files to this unit. Nothing else changes.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfr` (a git worktree
detached at `3a9202a`, carrying the RANGE unit's uncommitted writes). Perform the assignment
directly and spawn nothing. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Apply the three patches § Deviations of `tmp/units/b-forms-range-report.md` records (D1, D2, D3)
exactly, so `npm run test:setup` exits 0 and the `range-focus` page frame is registered and placed.

## Context

**Evidence.** Read `tmp/units/b-forms-range-report.md` § Deviations D1, D2, and D3 for the patches
and their measurements. In the tree at the time of this brief:

- `tests/setupServer.test.ts` line 1137 is `'figure',` inside the `Set([…])` literal of the case
  `skips engine and CSS obligations whose Proof cell is a dash`.
- `src/styles/_mixins.scss` line 40 is `@mixin border-reset {`.
- `src/styles/elements/_fieldset.scss` lines 9 to 13 are the `legend {` rule opening with
  `float: left;`, `width: 100%;`, `padding: 0;`.
- `src/styles/components/_form-range.scss` carries the `.form-range` host rule writing
  `width: 100%`, `height: var(--vn-space-12)`, `padding: 0`, `appearance: none`,
  `background-color: transparent`.
- `tests/setup.ts`: `CaptureKey` (line 167) is `{ scenario: CaptureScenario; subject: CaptureSubject }`;
  `BUTTON_KEYS` (line 219) is the pattern for a driven-state list; `CAPTURE_KEYS` (line 308) spreads
  `SHOWCASE_KEYS`, `BUTTON_KEYS`, `CASCADE_KEYS`; `CASCADE_KEYS` starts at line 261 and the RANGE
  unit appended `range` and `range-disabled` to it.
- `tests/setup.test.ts` line 71 is
  `expect(CAPTURE_KEYS).toStrictEqual([...SHOWCASE_KEYS, ...BUTTON_KEYS, ...CASCADE_KEYS])`, and
  the export inventory case around line 53 lists `'CAPTURE_KEYS'`.
- `tests/app/browser/integration.test.ts`: the case `reaches the range slider through the keyboard
  and leaves its ring to the thumb` (around line 650) drives `traverseAccessible` to the `Range`
  control and pushes a reading into `ARTIFACT`; the button focus page frame is placed by
  `if (VARIANT === LIGHT) await FRAMES.page('primary-focus', host)` (around line 354) and its dark
  twin (around line 389).
- `CaptureScenario` in `tests/setup.ts` is a union the RANGE unit extended with `range` and
  `range-disabled`; `range-focus` must join it the same way.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,writing}.md`.
Skill: none. Guide: `guides/veneer.md` (read; the RANGE unit already wrote its section).

**Installed primitives.** `@orkestrel/test` browser exports (`FRAMES.page` through
`tests/setupBrowser.ts`); nothing new is needed.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
Chromium 141 (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`). Seven sibling units and gate
chains share the container at a load average above 30 on 4 CPUs; a `test:journey`, `test:policy`,
or `test:setup` timeout is a timing reading you report, never a defect you diagnose. `prettier` must
never run; `oxfmt` is the formatter.

**Measurements.** Before editing: `npm run test:setup` reports `Tests 2 failed | 160 passed (162)`
per the report (the Set literal and the shared-block sweep). Re-take it and record the reading.

**Control identifiers.** none.

**Standing conditions.** The worktree is dirty with the RANGE unit's writes; keep them. The
`tests/setupServer.ts` `attributeSelector` region is untouched by this unit.

## Unknowns

none.

## Obligations

1. **D1.** In `tests/setupServer.test.ts`, inside the `Set([…])` literal of the case `skips engine
   and CSS obligations whose Proof cell is a dash`, add the line `'form-range',` directly after
   `'figure',`.
2. **D2.** In `src/styles/_mixins.scss`, directly before `@mixin border-reset {`, add the `flush-box`
   mixin exactly as the report's D2 writes it (its comment included). In
   `src/styles/elements/_fieldset.scss`, replace the `legend` rule's `width: 100%;` and `padding: 0;`
   lines with `@include flush-box;` at the position of `width`. In
   `src/styles/components/_form-range.scss`, replace the `.form-range` rule's `width: 100%;` and
   `padding: 0;` with `@include flush-box;` at the position of `width`. Confirm `_fieldset.scss` and
   `_form-range.scss` load `../mixins` (add `@use '../mixins' as *;` only where absent, the way
   `_icon-link.scss` loads it).
3. **D3.** In `tests/setup.ts`, add `range-focus` to `CaptureScenario` beside `range-disabled`; add
   `export const FORM_RANGE_KEYS: readonly CaptureKey[] = Object.freeze([Object.freeze({ scenario: 'range-focus', subject: 'Range' })])`
   with a doc block in the `BUTTON_KEYS` voice, placed directly after `CASCADE_KEYS`; spread
   `...FORM_RANGE_KEYS` last in `CAPTURE_KEYS`. In `tests/setup.test.ts`, add `'FORM_RANGE_KEYS'` to
   the export inventory at its sorted position and rewrite line 71 to the four-spread form the
   report's D3 shows (`FORM_RANGE_KEYS` last), importing it. In
   `tests/app/browser/integration.test.ts`, inside the case `reaches the range slider through the
   keyboard and leaves its ring to the thumb`, after the `:focus-visible` assertion, place the frame
   with `await FRAMES.page('range-focus', specimen)` under the same variant guard the button focus
   frame uses in that file (read which guard `primary-focus` uses and copy it; if the file places
   `primary-focus` once per mode across two cases, place `range-focus` under `VARIANT === LIGHT`
   in this case and add nothing elsewhere).

## Scope

- Owned: `tests/setupServer.test.ts` (the one line), `src/styles/_mixins.scss`,
  `src/styles/elements/_fieldset.scss`, `src/styles/components/_form-range.scss`, `tests/setup.ts`,
  `tests/setup.test.ts`, `tests/app/browser/integration.test.ts` (the one case).
- Shared (report-only): none.
- Off-limits: every other file. Do not revert or rewrite any RANGE unit write.
- What asserts the state this change ends: `tests/setupStyles.test.ts` shared-block sweep (owned
  by no one; it goes green), `tests/setup.test.ts` (owned), the journey portfolio case (it counts
  placed scenarios; the new frame is placed by the case above).
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-range-report-2.md` and return the same text: the before and after
`npm run test:setup` readings with counts, the compiled `legend` and `.form-range` declarations
from `dist/src/styles/index.css` after `npm run build:src`, the gate exits, `git status --porcelain`,
`git diff 3a9202a --stat`, and any deviation per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope that a gate names, or if a patch does not apply as
written. Settle yourself: the doc-block wording of `FORM_RANGE_KEYS`.

## Acceptance criteria

1. `npx oxfmt` over the owned files, then `npm run format:check`, `npm run lint:check`,
   `npm run check` exit 0.
2. `npm run build:src` exits 0 and the compiled `.form-range` and `legend` rules carry
   `width: 100%` and `padding: 0` (grep the built cascade).
3. `npm run test:setup` exits 0 (`162 passed` or more).
4. `npm run test:src:styles` exits 0.
5. `npm run test:app`, `npm run test:conformance`, `npm run test:guides`, `npm run test:policy`
   exit 0.
6. `git status --porcelain` lists the RANGE unit's files plus the owned files above and nothing else.

**Observations, not criteria.** `npm run test:journey` and `CAPTURE=1 npm run test:journey`
(report the exits and whether `tmp/capture/states/range-focus--light-1280.png` was written).

## Review evidence

The report, the diff of every owned file.
